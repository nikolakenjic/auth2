import { ObjectId } from "mongodb";

declare global {
    namespace Express {
        interface UserPayload {
            userId: ObjectId;
            role: string;
            sessionId?: ObjectId;
        }

        interface Request {
            user: UserPayload
        }
    }
}

export {}