// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      username: string;
    };
  }

  interface JWT {
    id: string;
    email: string;
    username: string;
  }
}