import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { FindUserDto } from './dto/findUser.dto';
import { UnauthorizedException } from '@nestjs/common';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(createUserDto: CreateUserDto):Promise<User> {
        try {
            const user = new User();

            user.email = createUserDto.email;
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;
            user.role = createUserDto.role;
            user.password = String(await this.createHash(createUserDto.password));
            await user.save();
            return user;
        } catch (error) {
            throw new UnauthorizedException(error.detail)
        }
    }

    async signIn(findUserDto: FindUserDto) {
        const { email, password } = findUserDto;

        const user = await this.findOne({ email });

        if (user && (await user.validatePassword(password))) {
            const email = user.email;
            return email;
        } else {
            throw new UnauthorizedException('password or email is not correct');
        }
    }
    async createHash(password: string) {
        return await bcrypt.hash(password, 12);
    }
}
