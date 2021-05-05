import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
    constructor(@InjectRepository(Blog) private blogRepository: Repository<Blog>) {}
    async getBlog(id: string) {
        const blog = await this.blogRepository.findOne({ id });
        return blog;
    }
    async createBlog(title, description) {
        const blog = await this.blogRepository.create({ title, description });

        return this.blogRepository.save(blog);
    }
}
