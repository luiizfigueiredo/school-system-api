import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const ActiveUserId = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = getRequest(context);
    const userId = (request as any).userId;

    if (!userId) {
      throw new UnauthorizedException();
    }

    return userId;
  },
);

function getRequest(context: ExecutionContext): Request {
  const gqlContext = GqlExecutionContext.create(context);
  return gqlContext.getContext().req as Request;
}