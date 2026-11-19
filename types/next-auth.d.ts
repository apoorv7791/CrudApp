import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      username?: string;
    } & DefaultSession["user"];
  }
}

declare module "@auth/core/types" {
  interface Session {
    accessToken?: string;
  }

  interface User {
    username?: string;
    accessToken?: string;
  }
}
