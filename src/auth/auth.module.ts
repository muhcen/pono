import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrtegy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'topSecret51',
            signOptions: { expiresIn: 90 * 24 * 60 * 60 },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrtegy],
    exports: [JwtStrtegy, PassportModule],
})
export class AuthModule {}
