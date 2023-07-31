import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { firestore } from '@/lib/firestore';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { authOptions } from '@/lib/authOptions';
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
