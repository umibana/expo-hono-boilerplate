import type { inferAsyncReturnType } from '@trpc/server';
import { db } from '../db';
import { auth } from '../lib/auth';

export async function createContext(opts: { req: Request }) {
  // Get session from better-auth
  const session = await auth.api.getSession({
    headers: opts.req.headers,
  });

  return {
    db,
    session: session?.session || null,
    user: session?.user || null,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>; 