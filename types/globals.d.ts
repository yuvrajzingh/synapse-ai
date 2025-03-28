import { User } from "./types";

declare global {
    interface CustomJwtSessionClaims extends User{} //because by default clerk doesn't know about the custom claims that we've set up 
}