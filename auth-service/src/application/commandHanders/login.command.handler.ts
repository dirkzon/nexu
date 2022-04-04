import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { ValidateClass } from "src/infrastructure/services/validator";
import { LoginCommand } from "../commands/login.command";
import {JwtService} from '@nestjs/jwt'
import { AuthData } from "src/domain/models/auth";
import { AuthStore } from "../ports/AuthStore";
import * as bcrypt from 'bcrypt';

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
                    const payload = { user_name: user.name, id: user.id }
                    return resolve({
                        accessToken: this.jwtService.sign(payload),
                        tokenType: "Bearer",
                        scope: "",
                    });
                };
                return reject('Incorrect username/email or password');
            });
        });
    }
}