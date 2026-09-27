import dns from "node:dns";
dns.setServers(["1.1.1.1", "1.0.0.1"]);
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("gympilot_db");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
   
    client
  }),

  emailAndPassword: { 
    enabled: true, 
  }, 

   socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID , 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET , 
        }, 
    },
});