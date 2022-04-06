import { validateOrReject } from "class-validator";

export async function ValidateClass(input) {
    try {
        await validateOrReject(input);
    } catch(e) {
        const constraint = e[0].constraints;
        throw new Error(constraint[Object.keys(constraint)[0]]);
    }
}