import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLExceptionFilter } from './shared/filters/graphql-exception.filter';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error) => {
        const originalError = error.extensions?.originalError as any;

        if (!originalError) {
          return {
            message: error.message,
            statusCode: error.extensions?.statusCode || 500,
            error: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
          };
        }

        return {
          message: originalError.message,
          statusCode: originalError.extensions?.statusCode || 500,
          error: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
        };
      },
    }),
    AuthModule,
    DatabaseModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GraphQLExceptionFilter,
    },
  ],
})
export class AppModule {}
