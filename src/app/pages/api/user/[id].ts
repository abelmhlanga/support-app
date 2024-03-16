import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // Validate request query
  if (!id) {
    return res.status(400).json({ message: 'id is required' });
  }

  if (req.method === 'GET') {
    // Retrieve a single user's account information
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve user' });
    }
  } else if (req.method === 'PUT') {
    // Update a single user's account information
    const { name, email } = req.body;

    // Validate request body
    if (!name || !email) {
      return res.status(400).json({ message: 'name and email are required' });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name,
          email,
          // Add other fields as necessary
        },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to update user' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}