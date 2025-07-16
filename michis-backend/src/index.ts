import { Hono } from 'hono';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { auth } from './lib/auth';
import { appRouter, createContext } from './trpc';
import * as dotenv from 'dotenv';

dotenv.config();

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono! tRPC + Drizzle + Better-Auth Backend');
});

// Better Auth routes
app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

// tRPC routes
app.use('/api/*', async (c) => {
  return fetchRequestHandler({
    endpoint: '/api',
    req: c.req.raw,
    router: appRouter,
    createContext: () => createContext({ req: c.req.raw }),
  });
});


const port = process.env.PORT || 3000;

console.log(`🚀 Server running on http://localhost:${port}`);
console.log(`📊 tRPC endpoint: http://localhost:${port}/api/trpc`);
console.log(`🔐 Auth endpoint: http://localhost:${port}/api/auth`);

export default {
  port,
  fetch: app.fetch,
};
