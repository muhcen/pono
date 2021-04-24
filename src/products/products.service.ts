import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/auth/user.entity';
import { CreateProductDto } from './dto/createProduct.dto';
import { DeleteProductDto } from './dto/deleteProduct.dto';
import { FilterProductsDto } from './dto/filterProducts.dto';
import { UpdateDto } from './dto/updateProduct.dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductRepository) private productRepository: ProductRepository,
    ) {}

    async getProduct(id: number): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        this.checkProduct(product, id);

        return product;
    }
    createProduct(createProductDto: CreateProductDto, user: User): Promise<Product> {
        return this.productRepository.createProduct(createProductDto, user);
    }

    async getAllProducts(filterProductsDto: FilterProductsDto): Promise<Pagination<Product>> {
        const { search, price } = filterProductsDto;
        let { page, limit }: IPaginationOptions = filterProductsDto;
        page = page === undefined ? 1 : page;
        limit = limit === undefined ? 10 : limit;
        const query = this.productRepository.createQueryBuilder('product');
        query.orderBy('product.price', 'DESC');
        if (search) {
            query.andWhere('(product.title LIKE :search OR product.description LIKE :search)', {
                search: `%${search}%`,
            });
        }
        if (price) {
            query.andWhere('(product.price = :price)', { price });
        }
        const products = await query.getMany();

        return paginate(this.productRepository, { page, limit });
    }
    async deleteProduct(id: number, deleteProductDto: DeleteProductDto, user: User): Promise<void> {
        const product = await this.productRepository.findOne(id);
        const { text } = deleteProductDto;
        this.checkProduct(product, id);

        if (user.id !== product.user.id) {
            throw new ForbiddenException('someone can delete product who create product');
        }

        if (text !== product.title) {
            throw new NotAcceptableException(
                `if you sure for delete products you must type (${product.title})`,
            );
        }

        try {
            await this.productRepository.delete(product);
        } catch (error) {
            throw new NotAcceptableException(error.detail);
        }
    }
    async updateProduct(id: number, updateDto: UpdateDto): Promise<Product> {
        const product = await this.productRepository.findOne(id);
        this.checkProduct(product, id);
        const { title, description, price } = updateDto;
        if (title) {
            product.title = title;
        }
        if (description) {
            product.description = description;
        }
        if (price) {
            product.price = price;
        }

        try {
            await product.save();
            return product;
        } catch (error) {
            throw new NotAcceptableException(error.detail);
        }
    }
    checkProduct(product: Product, id: number) {
        if (!product) {
            throw new NotFoundException(`product with id (${id}) dos not find.`);
        }
    }
}
