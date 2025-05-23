import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@/models/course";

declare module "next-auth" {
    interface Session {
        user : {
            id: number,
            email: string,
            password: string,
            name: string,
            surname: string,
            userRole: UserRole,
            group: number,
        };

        tokens : {
            accessToken: string,
            refreshToken: string,
            expiresIn: number,
        }
    }
}

declare module "next-auth/jwt"{
    interface JWT {
        user : {
            id: number,
            email: string,
            password: string,
            name: string,
            surname: string,
            group: number,
            userRole: UserRole,
        };
        
        tokens : {
            accessToken: string,
            refreshToken: string,
            expiresIn: number,
        }
    }
}