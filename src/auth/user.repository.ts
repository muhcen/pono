import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/createTask.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(createUserDto: CreateUserDto) {
        const user = new User();

        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.role = createUserDto.role;
        user.password = String(await this.createHash(createUserDto.password));

        try {
            await user.save();
            return user;
        } catch (error) {
            return { detail: error.detail };
        }
    }

    async createHash(password: string) {
        return await bcrypt.hash(password, 12);
    }
}
