import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/shared/database/repositories/user.repositories';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
