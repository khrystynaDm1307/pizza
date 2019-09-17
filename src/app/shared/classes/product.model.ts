import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct {
    constructor(
        public id: number,
        public category: string,
        public name: string,
        public description: string,
        public price: number,
        public image: string
    ) { }
}
