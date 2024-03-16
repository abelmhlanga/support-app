import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
export async function verifyUserCredentials(email: string, password:string) {
    // Find the user by email
    const user = await prisma.user.findUnique({where: { email },});
    // If user is found and passwords match, return the user,otherwise return null
    if (user && bcrypt.compareSync(password, user.password)) {
        return user;
    } else {
         return null;
    }
}
