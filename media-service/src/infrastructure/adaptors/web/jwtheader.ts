import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import jwt_decode from 'jwt-decode';

export const JWT = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const jwt_data = jwt_decode(req.headers['user']);
    const user = {
      user: jwt_data['user_name'],
      id: jwt_data['id'],
      scope: jwt_data['scope'],
    };
    return user;
  },
);
