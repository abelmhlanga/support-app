// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyUserCredentials } from '../../lib/auth/auth';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Validate request body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        try {
            const user = await verifyUserCredentials(email, password);
            if (user) {
                // Implement session creation and token generation logic here
                res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } catch (error) {
            // Log the error for debugging purposes
            console.error(error);

            // Send a more generic message to the client
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}