import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { FindUserDto } from './dto/findUser.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<Object> {
        const user = await this.userRepository.signUp(createUserDto);
        const { email } = user;
        const payload: JwtPayload = { email };
        const token = await this.jwtService.sign(payload);
        delete user.password;
        return { token, data: { user } };
    }

    async signIn(findUserDto: FindUserDto): Promise<{ token }> {
        const email = await this.userRepository.signIn(findUserDto);

        const payload: JwtPayload = { email };

        const token = await this.jwtService.sign(payload);

        return { token };
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();

        return users;
    }
}
