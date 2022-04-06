import { Image } from "./Image";

export class User {
    name: string;
    id: string;
    email: string;
    bio: string;
    createdAt: Date; 
    avatar: Image;
}