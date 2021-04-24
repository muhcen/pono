import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const role = request.user.role.toLowerCase();
        console.log(roles, role, roles.includes(role));
        if (!roles.includes(role)) {
            throw new ForbiddenException(`${role} connot access this route`);
        } else {
            return true;
        }
    }
}