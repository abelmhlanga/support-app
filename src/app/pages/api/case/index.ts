import type { NextApiRequest, NextApiResponse } from 'next';
import prisma  from '../../../lib/utils/prisma';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    if (req.method === 'POST') {
        // Create a new support case
        const { title, description, userId } = req.body;

        // Validate request body
        if (!title || !description || !userId) {
            return res.status(400).json({ message: 'title, description, and userId are required' });
        }

        try {
            const newCase = await prisma.supportCase.create({
                data: {
                    title,
                    description,
                    userId,
                    // Add other fields as necessary
                },
            });
            res.status(201).json(newCase);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to create case' });
        }
    } else if (req.method === 'GET') {
        // Retrieve all support cases
        try {
            const cases = await prisma.supportCase.findMany({
                // Add any filters or sorting here
            });
            res.status(200).json(cases);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to retrieve cases' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}