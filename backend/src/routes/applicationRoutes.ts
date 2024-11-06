import { Router, Request, Response } from 'express';
import prisma from '../config/database';

const router = Router();

// Get all applications
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        accountType: true,
        customFieldValues: true,
        businessDetails: {
          include: {
            boardMembers: true
          }
        }
      }
    });
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single application
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const application = await prisma.application.findUnique({
      where: { id: req.params.id },
      include: {
        accountType: true,
        customFieldValues: true,
        businessDetails: {
          include: {
            boardMembers: true
          }
        }
      }
    });

    if (!application) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }

    res.json(application);
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create application
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      accountTypeId,
      applicationType,
      ghanaCard,
      customFieldValues,
      businessDetails,
      notes
    } = req.body;

    const application = await prisma.application.create({
      data: {
        accountTypeId,
        applicationType,
        ghanaCard,
        notes,
        customFieldValues: {
          create: customFieldValues
        },
        businessDetails: businessDetails ? {
          create: {
            ...businessDetails,
            boardMembers: {
              create: businessDetails.boardMembers
            }
          }
        } : undefined
      },
      include: {
        accountType: true,
        customFieldValues: true,
        businessDetails: {
          include: {
            boardMembers: true
          }
        }
      }
    });

    res.status(201).json(application);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update application status
router.patch('/:id/status', async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, notes } = req.body;
    const { id } = req.params;

    const application = await prisma.application.update({
      where: { id },
      data: {
        status,
        notes,
        reviewedBy: req.user?.id,
        reviewedAt: new Date()
      }
    });

    res.json(application);
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
