import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { FindUserDto } from './dto/findUser.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    signUp(createUserDto: CreateUserDto) {
        return this.userRepository.signUp(createUserDto);
    }

    async signIn(findUserDto: FindUserDto): Promise<{ token }> {
        const email = await this.userRepository.signIn(findUserDto);

        const payload = { email };

        const token = await this.jwtService.sign(payload);

        return { token };
    }
}
