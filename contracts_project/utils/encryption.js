const crypto = require('crypto');
const fs = require('fs');

// AES-256-CBC configuration
const ALGORITHM = 'aes-256-cbc';

function encryptFile(inputPath, outputPath, key) {
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);

    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    // Save IV at the beginning of the file (16 bytes) then encrypted data
    output.write(iv);

    input.pipe(cipher).pipe(output);

    return new Promise((resolve, reject) => {
        output.on('finish', () => resolve({ iv: iv.toString('hex') }));
        output.on('error', reject);
    });
}

function decryptFile(inputPath, outputPath, key) {
    const fileData = fs.readFileSync(inputPath);

    // Extract IV (first 16 bytes)
    const iv = fileData.subarray(0, 16);
    const encryptedText = fileData.subarray(16);

    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);

    const decrypted = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final()
    ]);

    fs.writeFileSync(outputPath, decrypted);
}

// Generate a random 32-byte key (256 bits)
function generateKey() {
    return crypto.randomBytes(32).toString('hex');
}

module.exports = { encryptFile, decryptFile, generateKey };

// Example usage if run directly
if (require.main === module) {
    const command = process.argv[2];
    const file = process.argv[3];

    if (command === 'generate-key') {
        console.log(generateKey());
    } else if (command === 'encrypt' && file) {
        const key = process.argv[4];
        if (!key) { console.error("Key required"); process.exit(1); }
        encryptFile(file, file + '.enc', key).then(() => console.log('Encrypted'));
    } else if (command === 'decrypt' && file) {
        const key = process.argv[4];
        if (!key) { console.error("Key required"); process.exit(1); }
        decryptFile(file, file.replace('.enc', '.dec'), key);
        console.log('Decrypted');
    }
}
