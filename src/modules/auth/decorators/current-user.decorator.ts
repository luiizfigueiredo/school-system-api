import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

interface JwtPayload {
  sub: string;
}

interface RequestWithUser {
  user?: JwtPayload;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): JwtPayload | undefined => {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<{ req: RequestWithUser }>();
    return gqlContext.req.user;
  },
);
