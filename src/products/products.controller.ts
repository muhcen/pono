import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    createProduct(
        @Body(ValidationPipe) createProductDto: CreateProductDto,
        @Req() req,
    ): Promise<Product> {
        return this.productsService.createProduct(createProductDto, req.user);
    }
}
