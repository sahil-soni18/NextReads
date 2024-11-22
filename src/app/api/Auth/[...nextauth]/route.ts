import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const handler = await NextAuth(authOptions)

export { handler as GET, handler as POST}