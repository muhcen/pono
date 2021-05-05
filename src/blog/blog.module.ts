import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogResolver } from './blog.resolver';
import { Blog } from './blog.entity';
import { BlogService } from './blog.service';
@Module({
    imports: [TypeOrmModule.forFeature([Blog])],
    providers: [BlogResolver, BlogService],
})
export class BlogModule {}
