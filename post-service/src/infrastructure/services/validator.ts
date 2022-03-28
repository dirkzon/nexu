import { ValidationError } from "apollo-server-express";
import { validateOrReject } from "class-validator";

export async function ValidateClass(input) {
    try {
        await validateOrReject(input);
    } catch(e) {
        throw new ValidationError(e[0])
    }
}