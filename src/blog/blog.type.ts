import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Blog')
export class BlogType {
    @Field((type) => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    description: string;
}
