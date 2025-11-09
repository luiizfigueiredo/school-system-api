import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

interface JwtPayload {
  sub: string;
}

interface RequestWithUser {
  user?: JwtPayload;
  headers?: {
    authorization?: string;
  };
}

@Injectable()
export class JwtAuthGuard {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    // Get the GraphQL context
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<{ req: RequestWithUser }>();
    const request = gqlContext.req;

    // Extract token from Authorization header
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      // Verify the token
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      // Attach the user payload to the request object
      request.user = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractTokenFromHeader(request: RequestWithUser): string | undefined {
    const authHeader = request.headers?.authorization;
    if (!authHeader) {
      return undefined;
    }

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
