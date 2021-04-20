import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { FindUserDto } from './dto/findUser.dto';
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

    @Post('/signIn')
    signIn(@Body() findUserDto: FindUserDto): Promise<{ token }> {
        return this.authService.signIn(findUserDto);
    }
}
