import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const secretKey = process.env.TURNSTILE_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json(
                { success: false, error: 'Missing TURNSTILE_SECRET_KEY' },
                { status: 500 }
            );
        }

        const body = await request.json();
        const token = body?.token;
        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Missing token' },
                { status: 400 }
            );
        }

        const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: secretKey,
                response: token,
            }),
        });

        const verifyResult = await verifyResponse.json();
        return NextResponse.json({
            success: Boolean(verifyResult?.success),
            errors: verifyResult?.['error-codes'] || [],
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Verification failed' },
            { status: 500 }
        );
    }
}
