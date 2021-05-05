import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { BlogType } from './blog.type';

@Resolver((of) => BlogType)
export class BlogResolver {
    constructor(private blogService: BlogService) {}

    @Query((returns) => BlogType)
    blog() {
        return {
            id: 'kf7y42h48trhi4',
            title: 'bad man',
            description: 'ekfkdjfejfiefijfkefje ef e efjejf oefj  f',
        };
    }

    @Mutation((returns) => BlogType)
    createBlog(@Args('title') title: string, @Args('description') description: string) {
        return this.blogService.createBlog(title, description);
    }
}
