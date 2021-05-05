import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateBlogInput } from './blog.input';
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
    createBlog(@Args('createBlog') createBlog: CreateBlogInput) {
        return this.blogService.createBlog(createBlog);
    }
}
