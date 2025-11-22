import { createHash } from 'crypto';

import { REACTION } from '@/constants';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const ipAddress = req.headers.get('x-forwarded-for') || '0.0.0.0';

    const currentUserId = createHash('md5')
      .update(ipAddress + process.env.IP_ADDRESS_SALT!, 'utf8')
      .digest('hex');
    // Identify a specific users interactions with a specific post
    const sessionId = slug + '___' + currentUserId;

    if (!slug) {
      return Response.json({ message: 'Slug is required.' }, { status: 400 });
    }

    const [reactions, user] = await Promise.all([
      prisma.reactions.findUnique({
        where: {
          slug,
        },
      }),
      prisma.session.findUnique({
        where: { id: sessionId },
      }),
    ]);

    return Response.json({
      likes: (reactions?.likes || 0).toString(),
      loves: (reactions?.loves || 0).toString(),
      isLiked: Boolean(user?.isLiked),
      isLoved: Boolean(user?.isLoved),
    });
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
    const ipAddress = req.headers.get('x-forwarded-for') || '0.0.0.0';

    const currentUserId = createHash('md5')
      .update(ipAddress + process.env.IP_ADDRESS_SALT!, 'utf8')
      .digest('hex');
    // Identify a specific users interactions with a specific post
    const sessionId = slug + '___' + currentUserId;

    if (!slug) {
      return Response.json({ message: 'Slug is required.' }, { status: 400 });
    }

    const types = await req.json();

    const likesCount = types.filter(
      (type: string) => type === REACTION.like,
    ).length;
    const lovesCount = types.filter(
      (type: string) => type === REACTION.love,
    ).length;

    const [newOrUpdatedReactions, user] = await Promise.all([
      prisma.reactions.upsert({
        where: { slug },
        create: {
          slug,
          likes: likesCount,
          loves: lovesCount,
        },
        update: {
          likes: {
            increment: likesCount,
          },
          loves: {
            increment: lovesCount,
          },
        },
      }),

      // increment the number of times this user has liked this post
      prisma.session.upsert({
        where: { id: sessionId },
        create: {
          id: sessionId,
          isLiked: likesCount > 0,
          isLoved: lovesCount > 0,
        },
        update: {
          ...(likesCount > 0 && { isLiked: true }),
          ...(lovesCount > 0 && { isLoved: true }),
        },
      }),
    ]);

    return Response.json({
      likes: (newOrUpdatedReactions.likes || 0).toString(),
      loves: (newOrUpdatedReactions.loves || 0).toString(),
      isLiked: Boolean(user.isLiked),
      isLoved: Boolean(user.isLoved),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return Response.json({ message }, { status: 500 });
  }
}
