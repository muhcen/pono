import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { BlogType } from './blog.type';

@Resolver((of) => BlogType)
export class BlogResolver {
    constructor(private blogService: BlogService) {}

    @Query((returns) => BlogType)
    getBlog(@Args('id') id: string) {
        return this.blogService.getBlog(id);
    }

    @Mutation((returns) => BlogType)
    createBlog(@Args('title') title: string, @Args('description') description: string) {
        return this.blogService.createBlog(title, description);
    }
}
