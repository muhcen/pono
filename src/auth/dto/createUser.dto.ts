import { IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(8)
    email: string;
    @IsNotEmpty()
    @MinLength(4)
    firstName: string;
    @MinLength(4)
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    role: UserRole;
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
