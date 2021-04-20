import { User } from 'src/auth/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @ManyToOne((type) => User, (user) => user.id)
    user_id: string;
}
