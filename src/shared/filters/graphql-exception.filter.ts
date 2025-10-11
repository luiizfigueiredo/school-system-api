import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { BaseError } from '../error/base-error';

@Catch(BaseError)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: BaseError) {
    return new GraphQLError(exception.message, {
      extensions: {
        code: exception.code,
        statusCode: exception.getStatus(),
      },
    });
  }
}
