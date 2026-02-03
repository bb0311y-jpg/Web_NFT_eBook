import crypto from 'crypto';
import fs from 'fs';

const ALGORITHM = 'aes-256-cbc';

// Decrypts file buffer and returns decrypted buffer
export function decryptBuffer(encryptedBuffer: Buffer, key: string): Buffer {
    // Extract IV (first 16 bytes)
    const iv = encryptedBuffer.subarray(0, 16);
    const encryptedText = encryptedBuffer.subarray(16);

    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key, 'hex'), iv);

    const decrypted = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final()
    ]);

    return decrypted;
}
