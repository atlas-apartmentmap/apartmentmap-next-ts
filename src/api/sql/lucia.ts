import pg from "pg";
import { Lucia } from "lucia";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";

const pool = new pg.Pool();

const adapter = new NodePostgresAdapter(pool, {
    user: "auth_user",
    session: "user_session"
});

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => ({
        // attributes has the type of DatabaseUserAttributes
        username: attributes.username
    })
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string;
}