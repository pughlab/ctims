import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        const user = req.user
        return user
    }
);
