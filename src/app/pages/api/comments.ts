// pages/api/comments.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { caseId, comment } = req.body;

    // Validate request body
    if (!caseId || !comment) {
      return res.status(400).json({ message: 'caseId and comment are required' });
    }

    try {
      const newComment = await prisma.comment.create({
        data: {
          caseId,
          content: comment,
          // Add other fields as necessary
        },
      });
      res.status(201).json(newComment);
    } catch (error) {
      // Log the error for debugging purposes
      console.error(error);

      // Send a more generic message to the client
      res.status(500).json({ message: 'Failed to submit comment' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}