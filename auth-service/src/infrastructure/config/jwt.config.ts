import { JwtModuleOptions } from "@nestjs/jwt";

const { JWT_SECRET_KEY } = process.env;

export function JwtConfig(): JwtModuleOptions {
    return {
        secret: `${JWT_SECRET_KEY}`,
    };
}