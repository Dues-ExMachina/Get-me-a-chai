import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import mongoose from 'mongoose'
import Payment from '@/models/Payment'
import User from '@/models/User'
import connectDb from '@/utils/db/connectDb'

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === 'github') {
                await connectDb()

                const currentUser = await User.findOne({ email: user.email })

                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: profile.login,
                        profilepic: profile.avatar_url,
                    })

                    await newUser.save()
                }
            }
            return true
        },
        async session({ session }) {
            await connectDb()
            const currentUser = await User.findOne({ email: session.user.email })
            session.user.name = currentUser.name
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
