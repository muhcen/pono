import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductRepository) private productRepository: ProductRepository,
    ) {}

    createProduct(createProductDto: CreateProductDto, user: User):Promise<Product> {
        return this.productRepository.createProduct(createProductDto, user);
    }
}
