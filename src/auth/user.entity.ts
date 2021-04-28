import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserRole } from './user-role.enum';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    role: UserRole;

    async validatePassword(password) {
        return await bcrypt.compare(password, this.password);
    }
}
