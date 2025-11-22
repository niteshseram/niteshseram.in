import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return Response.json({ message: 'Slug is required.' }, { status: 400 });
    }

    const views = await prisma.views.findUnique({
      where: {
        slug,
      },
    });

    return Response.json({ total: views?.count.toString() });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ message }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return Response.json({ message: 'Slug is required.' }, { status: 400 });
    }

    const newOrUpdatedViews = await prisma.views.upsert({
      where: { slug },
      create: {
        slug,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });

    return Response.json({
      total: newOrUpdatedViews.count.toString(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ message }, { status: 500 });
  }
}
