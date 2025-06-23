import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GithubProvider from 'next-auth/providers/github'
// import XProvider from 'next-auth/providers/x'
// import LinkedInProvider from 'next-auth/providers/linkedin'
import mongoose from 'mongoose'
import Payment from '@/models/Payment'
import User from '@/models/User'
import connectDb from '@/utils/db/connectDb'
export const authoptions = NextAuth({
    providers: [
        // OAuth authentication providers...
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),

    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === 'github') {
                await connectDb();


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
        }
    },
    async session({ session, user, token }) {
        await connectDb();
        // Add user id to the session
        const currentUser = await User.findOne({ email: session.user.email })

        session.user.name = currentUser.name
        return session
    }
})

export { authoptions as GET, authoptions as POST }