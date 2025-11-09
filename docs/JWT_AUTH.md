# JWT Authentication Guard

## Overview
This project implements JWT-based authentication for GraphQL endpoints using NestJS guards and decorators.

## Components

### JwtAuthGuard
The main authentication guard that validates JWT tokens on all GraphQL requests by default.

Location: `src/modules/auth/guards/jwt-auth.guard.ts`

### Decorators

#### @Public
Marks a route as public (no authentication required).

Usage:
```typescript
@Public()
@Mutation(() => SigninResponse)
async signin(@Args('input') input: SigninInput) {
  // ...
}
```

#### @CurrentUser
Extracts the authenticated user from the request context.

Usage:
```typescript
@Mutation(() => ChangePasswordResponse)
async changePassword(
  @CurrentUser() user: JwtPayload,
  @Args('input') input: ChangePasswordInput,
) {
  // user.sub contains the user ID
}
```

## How It Works

1. **Global Protection**: All routes are protected by default via `APP_GUARD`
2. **Token Validation**: The guard extracts the JWT from the `Authorization: Bearer <token>` header
3. **Public Routes**: Routes marked with `@Public()` bypass authentication
4. **User Context**: Authenticated user info is attached to the request and can be accessed via `@CurrentUser()`

## Protected Endpoints

By default, all GraphQL queries and mutations are protected except those explicitly marked with `@Public`:

### Public Endpoints:
- `signup` - User registration
- `signin` - User login

### Protected Endpoints:
- `changePassword` - Requires valid JWT token
- `users` query - Requires valid JWT token

## JWT Payload Structure

```typescript
interface JwtPayload {
  sub: string; // User ID
}
```

## Error Handling

The guard throws `UnauthorizedException` in these cases:
- Token not provided
- Invalid token
- Expired token

## Example Request

### Get Users (Protected)
```graphql
query {
  users {
    id
    name
    email
  }
}
```

Headers:
```
Authorization: Bearer <your-jwt-token>
```

### Change Password (Protected)
```graphql
mutation {
  changePassword(input: {
    newPassword: "newSecurePassword"
  }) {
    success
    message
  }
}
```

Headers:
```
Authorization: Bearer <your-jwt-token>
```

Note: The userId is automatically extracted from the JWT token, so you don't need to provide it in the input.
