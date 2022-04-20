import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginCommand } from "../commands/login.command";
import {JwtService} from '@nestjs/jwt'
import { AuthStore } from "../ports/AuthStore";
import * as bcrypt from 'bcrypt';
import { ValidateClass } from "../../infrastructure/services/validator";
import { AuthData } from "../../domain/models/auth";

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
    constructor(
        readonly jwtService: JwtService,
        readonly authStore: AuthStore,
        ) {}

    async execute(command: LoginCommand): Promise<AuthData> {
        await ValidateClass(command);
        return new Promise(async (resolve, reject) => {
            const user = await this.authStore.getUserByData(command.user);
            if (!user) return reject('User not found');
            bcrypt.compare(command.password, user.passwordHash, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const scope = command.scope.join(' ');
                    const payload = { user_name: user.name, id: user.id, scope: scope }
                    return resolve({
                        accessToken: this.jwtService.sign(payload),
                        tokenType: "Bearer",
                        scope: scope,
                    });
                };
                return reject('Incorrect username/email or password');
            });
        });
    }
}