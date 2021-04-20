import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @MinLength(4)
    title: string;
    @IsNumber()
    price: number;
    @IsString()
    @MinLength(10)
    description: string;
}
