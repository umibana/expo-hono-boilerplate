import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/index";
import { user, session, account, verification } from "../db/schema";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user,
            session,
            account,
            verification,
        }
    }),
    emailAndPassword: {
        enabled: true,
    },
    advanced: {
        database: {
            generateId: () => crypto.randomUUID(),
        },
    }
});