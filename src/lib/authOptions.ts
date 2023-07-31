import NextAuth, { NextAuthOptions } from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { firestore } from '@/lib/firestore';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, credentials?.email || '', credentials?.password || '');
          if (userCredential) {
            return { id: userCredential.user.uid, name: userCredential.user.displayName, email: userCredential.user.email };
          } else {
            return null;
          }
        } catch (err) {
          // TODO: 에러 핸들링
          throw new Error('로그인 실패');
        }
      },
    }),
  ],
  adapter: FirestoreAdapter(firestore) as unknown as NextAuthOptions['adapter'],

  callbacks: {
    async jwt({ token, ...rest }) {
      return token;
    },

    async session({ session, token, user }) {
      return session;
    },

    // Other callback events can be added here as needed
  },
};
