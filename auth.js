
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },

            async authorize(credentials) {
                const response = await fetch(
                    "https://dummyjson.com/auth/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            username: credentials.username,
                            password: credentials.password,
                        }),
                    }
                );

                if (!response.ok) {
                    return null;
                }

                const user = await response.json();

                if (!user.accessToken) {
                    return null;
                }

                return {
                    id: String(user.id),
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    username: user.username,
                    accessToken: user.accessToken,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user.username = token.username;
            return session;
        },
    },
});
