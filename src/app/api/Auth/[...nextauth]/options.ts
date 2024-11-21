import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbConnect'; 
import User from '@/models/User.model';

type Credentials = {
  email: string;
  password: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Credentials): Promise<any> {
        try {
          await dbConnect();

          const user = await User.findOne({
            where: {
              email: credentials.email,
            },
          });

          if (!user) {
            throw new Error('No user found with this email');
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordCorrect) {
            return {
              id: user._id,
              email: user.email,
              username: user.username,
            };
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: any) {
          throw new Error(err.message || 'Error during authentication');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || null;
        token.isVerified = user.isVerified || false;
        token.isAcceptingMessages = user.isAcceptingMessages || false;
        token.username = user.username || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          isVerified: token.isVerified,
          isAcceptingMessages: token.isAcceptingMessages,
          username: token.username,
        };
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
};
