import { NotAcceptableException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
    async createProduct(createProductDto: CreateProductDto, user: User): Promise<Product> {
        try {
            const { title, description, price } = createProductDto;
            const product = new Product();
            product.title = title;
            product.description = description;
            product.price = price;
            product.user = user;
            await product.save();
            // delete product.user;
            return product;
        } catch (error) {
            throw new NotAcceptableException(error.detail);
        }
    }
}
