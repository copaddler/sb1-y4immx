import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { z } from 'zod';

const boardMemberSchema = z.object({
  name: z.string(),
  position: z.string(),
  ghanaCardNumber: z.string().regex(/^GHA-\d{9}-\d$/),
});

const businessDetailsSchema = z.object({
  businessName: z.string(),
  registrationNumber: z.string(),
  businessType: z.string(),
  businessAddress: z.string(),
  boardMembers: z.array(boardMemberSchema),
});

const applicationSchema = z.object({
  applicationType: z.enum(['individual', 'business']),
  accountType: z.enum(['savings', 'current', 'business-basic', 'business-premium']),
  ghanaCard: z.string(),
  businessDetails: businessDetailsSchema.optional(),
});

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const data = applicationSchema.parse(body);

    const application = await prisma.application.create({
      data: {
        applicationType: data.applicationType,
        accountType: data.accountType,
        ghanaCard: data.ghanaCard,
        userId: session.id,
        ...(data.businessDetails && {
          businessDetails: {
            create: {
              ...data.businessDetails,
              boardMembers: {
                create: data.businessDetails.boardMembers,
              },
            },
          },
        }),
      },
      include: {
        businessDetails: {
          include: {
            boardMembers: true,
          },
        },
      },
    });

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const applications = await prisma.application.findMany({
      where: {
        userId: session.id,
      },
      include: {
        businessDetails: {
          include: {
            boardMembers: true,
          },
        },
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}