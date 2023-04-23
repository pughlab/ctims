import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const RefreshToken = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        const headers = req.headers
        const token = headers['refresh-token']
        return token
    }
);
