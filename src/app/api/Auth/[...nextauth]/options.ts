import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; // For password comparison
import { connectToDatabase } from "@/lib/dbConnect";
import User from "@/models/User.model"; // Import your user model
import { NextAuthOptions } from "next-auth";

type UserType = {
  id: string;
  email: string;
  username: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials): Promise<UserType | null> => {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = credentials;

        try {
          // Connect to the database
          await connectToDatabase();

          // Find the user by email
          const user = await User.findOne({ where: { email } });

          if (!user) {
            throw new Error("No user found with the given email");
          }

          // Compare the provided password with the hashed password
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          // Return the user object as expected by NextAuth
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          console.error("Error in authorize function:", error);
          return null; // Return null if any error occurs
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Attach user details to the session object
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          username: token.username,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};

export default NextAuth(authOptions);
