import type { NextApiRequest, NextApiResponse } from 'next';
import prisma  from '../../../lib/utils/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    // Validate request query
    if (!id) {
        return res.status(400).json({ message: 'id is required' });
    }

    if (req.method === 'GET') {
        // Retrieve a single support case
        try {
            const supportCase = await prisma.supportCase.findUnique({ where: { id: Number(id) } });
            if (supportCase) {
                res.status(200).json(supportCase);
            } else {
                res.status(404).json({ message: 'Case not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to retrieve case' });
        }
    } else if (req.method === 'PUT') {
        // Update a support case
        const { title, description, status } = req.body;

        // Validate request body
        if (!title || !description || !status) {
            return res.status(400).json({ message: 'title, description, and status are required' });
        }

        try {
            const updatedCase = await prisma.supportCase.update({
                where: { id: Number(id) },
                data: {
                    title,
                    description,
                    status,
                    // Add other fields as necessary
                },
            });
            res.status(200).json(updatedCase);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to update case' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}