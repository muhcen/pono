import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { createQueryBuilder } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { FilterProductsDto } from './dto/filterProducts.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
    async getProduct(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw new NotFoundException(`product with id ${id} dos not find.`);
        }
        return product;
    }
    constructor(
        @InjectRepository(ProductRepository) private productRepository: ProductRepository,
    ) {}

    createProduct(createProductDto: CreateProductDto, user: User): Promise<Product> {
        return this.productRepository.createProduct(createProductDto, user);
    }

    async getAllProducts(filterProductsDto: FilterProductsDto): Promise<Product[]> {
        const { search, price } = filterProductsDto;
        const query = this.productRepository.createQueryBuilder('product');
        if (search) {
            query.andWhere('(product.title LIKE :search OR product.description LIKE :search)', {
                search: `%${search}%`,
            });
        }
        if (price) {
            query.andWhere('(product.price = :price)', { price });
        }
        const products = await query.getMany();
        return products;
    }
}
