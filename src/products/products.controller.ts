import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateProductDto } from './dto/createProduct.dto';
import { DeleteProductDto } from './dto/deleteProduct.dto';
import { FilterProductsDto } from './dto/filterProducts.dto';
import { UpdateDto } from './dto/updateProduct.dto';
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
    ): Promise<Pagination<Product>> {
        return this.productsService.getAllProducts(filterProductsDto);
    }

    @Get('/:id')
    getProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProduct(id);
    }
    @Delete('/:id')
    deleteProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) deleteProductDto: DeleteProductDto,
        @Req() req,
    ): Promise<void> {
        return this.productsService.deleteProduct(id, deleteProductDto, req.user);
    }
    @Patch('/:id')
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) updateDto: UpdateDto,
    ): Promise<Product> {
        return this.productsService.updateProduct(id, updateDto);
    }
}
