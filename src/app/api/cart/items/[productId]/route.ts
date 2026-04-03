import { NextRequest, NextResponse } from 'next/server';

import { requireAuthenticatedUser } from '@/server/auth';
import { removeProductFromCart } from '@/server/orders';
import { handleRouteError, parsePositiveInteger } from '@/server/http';

export const runtime = 'nodejs';

interface RouteContext {
  params: Promise<{ productId: string }>;
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const user = requireAuthenticatedUser(request);
    const { productId } = await context.params;

    return NextResponse.json(
      removeProductFromCart(user.id, parsePositiveInteger(productId, 'ID товара')),
    );
  } catch (error) {
    return handleRouteError(error);
  }
}
