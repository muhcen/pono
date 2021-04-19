import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createTask.dto';
import { RoleStatusValidationPipe } from './pipes/role-status-validation.pipe';
import { UserRole } from './user-role.enum';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signUp')
    @UsePipes(ValidationPipe)
    signUp(
        @Body() createUserDto: CreateUserDto,
        @Body('role', RoleStatusValidationPipe) role: UserRole,
    ) {
        createUserDto.role = role;
        return this.authService.signUp(createUserDto);
    }
}
