import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogInput } from './blog.input';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) {}
    async getBlog(id: string) {
        const blog = await this.blogRepository.findOne({ id });
        return blog;
    }
    async createBlog(createBlog: CreateBlogInput) {
        const { title, description } = createBlog;
        const blog = await this.blogRepository.create({ title, description });

        return this.blogRepository.save(blog);
    }
}
