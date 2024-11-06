import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// Get all account types
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const accountTypes = await prisma.accountType.findMany({
      include: {
        requirements: true,
        customFields: {
          include: {
            validation: true
          }
        }
      }
    });
    res.json(accountTypes);
  } catch (error) {
    console.error('Error fetching account types:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single account type
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const accountType = await prisma.accountType.findUnique({
      where: { id: req.params.id },
      include: {
        requirements: true,
        customFields: {
          include: {
            validation: true
          }
        }
      }
    });

    if (!accountType) {
      res.status(404).json({ error: 'Account type not found' });
      return;
    }

    res.json(accountType);
  } catch (error) {
    console.error('Error fetching account type:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
