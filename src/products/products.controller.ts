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
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateProductDto } from './dto/createProduct.dto';
import { DeleteProductDto } from './dto/deleteProduct.dto';
import { FilterProductsDto } from './dto/filterProducts.dto';
import { Roles } from './gaurds/roles.decorator';
import { RolesGuard } from './gaurds/roles.gaurd';
import { UpdateDto } from './dto/updateProduct.dto';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { UserDecorator } from './decorator/user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('products')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post()
    @Roles('admin')
    createProduct(
        @Body() createProductDto: CreateProductDto,
        @UserDecorator() user: User,
    ): Promise<Product> {
        return this.productsService.createProduct(createProductDto, user);
    }

    @Get()
    getAllProducts(@Query() filterProductsDto: FilterProductsDto): Promise<Pagination<Product>> {
        return this.productsService.getAllProducts(filterProductsDto);
    }

    @Get('/:id')
    getProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
        return this.productsService.getProduct(id);
    }
    @Delete('/:id')
    deleteProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() deleteProductDto: DeleteProductDto,
        @UserDecorator() user: User,
    ): Promise<void> {
        return this.productsService.deleteProduct(id, deleteProductDto, user);
    }
    @Patch('/:id')
    @Roles('admin')
    updateProduct(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: UpdateDto,
    ): Promise<Product> {
        return this.productsService.updateProduct(id, updateDto);
    }
}
