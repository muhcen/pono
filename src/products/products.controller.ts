import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
    Req,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from './dto/createProduct.dto';
import { FilterProductsDto } from './dto/filterProducts.dto';
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

    @Get()
    getAllProducts(
        @Query(ValidationPipe) filterProductsDto: FilterProductsDto,
    ): Promise<Product[]> {
        return this.productsService.getAllProducts(filterProductsDto);
    }

    @Get('/:id')
    getProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProduct(id);
    }
}
