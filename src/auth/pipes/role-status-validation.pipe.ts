import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UserRole } from '../user-role.enum';

@Injectable()
export class RoleStatusValidationPipe implements PipeTransform {
    readonly allowedStatues = [UserRole.USER, UserRole.ADMIN];
    transform(value: any) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatues.indexOf(status);
        return idx !== -1;
    }
}
