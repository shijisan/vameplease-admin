//This is a lib of the schema/db init

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
   log: ['query', 'info', 'warn', 'error'], 
 });

export { prisma };
