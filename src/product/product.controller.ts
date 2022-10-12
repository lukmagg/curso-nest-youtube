import {
  Controller,
  Post,
  Put,
  Res,
  HttpStatus,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    //console.log(createProductDTO);
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created!',
      product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: 'Products!',
      products,
    });
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) {
      throw new NotFoundException('Product does not exists');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Product!',
      product,
    });
  }

  @Delete('/delete/:productID')
  async deleteProduct(@Res() res, @Param('productID') productID) {
    const productDeleted = await this.productService.deleteProduct(productID);
    if (!productDeleted) {
      throw new NotFoundException('Product does not exists');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully!',
      productDeleted,
    });
  }

  @Put('/update/:productID')
  async updateProduct(
    @Res() res,
    @Param('productID') productID,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!updatedProduct) {
      throw new NotFoundException('Product does not exists');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Product Updated Successfully!',
      updatedProduct,
    });
  }
}
