import { JwtModuleOptions } from "@nestjs/jwt";

export function JwtConfig(): JwtModuleOptions {
    return {
        secret: "c3VwZXJzZWNyZXRrZXk=",
    };
}