import { API_BASE_URL } from '@/config/http';
import NextAuth, { NextAuthOptions } from 'next-auth'
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials'

async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            authorization: `Refresh ${token.tokens.refreshToken}`
        },
    })
    const response = await res.json();
    return {
        ...token,
        tokens: response,
    }
}


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                },
                password: {
                    label: 'Password', type: 'password'
                }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null
                const { email, password } = credentials;
                const res = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify({ user: { email, password } }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                if (res.status === 401 || res.status === 400) {
                    return null
                }
                const user = await res.json();
                return user
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user }
            if (new Date().getTime() < token.tokens.expiresIn) {
                return token
            }
            return await refreshToken(token);
        },
        async session({ token, session }) {
            session.user = token.user
            session.tokens = token.tokens
            return session
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }