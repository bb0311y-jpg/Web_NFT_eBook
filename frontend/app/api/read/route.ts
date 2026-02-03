import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { decryptBuffer } from '@/lib/encryption';

export async function POST(req: NextRequest) {
    try {
        const { signature, message } = await req.json();

        // TODO: Verify signature using 'viem' or 'ethers'
        // const valid = await verifyMessage({ address: userAddress, message, signature });
        // if (!valid) return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });

        // For prototype: Assume valid
        console.log("Mock verification passed via signature:", signature);

        // Read Encrypted File
        const filePath = path.join(process.cwd(), 'public', 'book.epub.enc');
        const encryptedBuffer = fs.readFileSync(filePath);

        // Decrypt
        const key = process.env.ENCRYPTION_KEY || "";
        if (!key) throw new Error("Server Key missing");

        const decryptedBuffer = decryptBuffer(encryptedBuffer, key);

        // Return binary
        return new NextResponse(new Uint8Array(decryptedBuffer), {
            headers: {
                'Content-Type': 'application/epub+zip',
                'Content-Disposition': 'attachment; filename="book.epub"',
            },
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to read book' }, { status: 500 });
    }
}
