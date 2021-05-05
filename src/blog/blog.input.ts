import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateBlogInput {
    @Field()
    @MinLength(4)
    title: string;

    @Field()
    @IsString()
    description: string;
}
