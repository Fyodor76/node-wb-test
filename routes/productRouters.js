import express from 'express';
import { ProductController } from '../controllers/productController.js';
import authenticate from '../middlewares/isAuth.js';

export const routerProduct = express.Router();

routerProduct.post('/', authenticate, ProductController.createProduct);
routerProduct.get('/', ProductController.getProducts);
routerProduct.get('/products-recommendation', authenticate, ProductController.getProducts);
routerProduct.get('/:id', authenticate, ProductController.getProductById);
routerProduct.put('/:id', authenticate, ProductController.updateProduct);
routerProduct.delete('/:id', authenticate, ProductController.deleteProduct);

