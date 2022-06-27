import axios from "axios";
import mongoose from "mongoose";
import NextAuth from "next-auth"
import { signIn } from "next-auth/client";
import GoogleProvider from "next-auth/providers/google"
import conn from '../../../dbConn'


import user from '../../../models/user.model';
import cartModel from "../../../models/cart.model";

conn();


export default NextAuth({
  session: {
    jwt: true
  },

  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    
    }),
    
    
  ],
  pages: {
    signIn: '/index'
  },
  database: process.env.DATABASE_URL,
  callbacks: {
 
    async jwt(token, user) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session(session, token) {

        const uid = mongoose.Types.ObjectId(token.id);
        const data = await user.findById(uid);
        const cart = await cartModel.findOne({ordered_by:uid}).populate({
          path: 'ordered_by',
        })
        session.user = data
        session.cart = cart
      
        return session
  
    }
  }

})