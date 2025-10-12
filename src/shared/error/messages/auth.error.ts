export const authError = {
    AUTH_001: {
        code: 'AUTH_001',
        message: 'Invalid credentials provided.',
        status: 401,
    },
    AUTH_002: {
        code: 'AUTH_002',
        message: 'Email already exists.',
        status: 409,
    },
    AUTH_003: {
        code: 'AUTH_003',
        message: 'Failed to create user.',
        status: 500,
    },
}