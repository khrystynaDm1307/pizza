import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.scss']
})
export class PizzaComponent implements OnInit {
  products: Array<IProduct> = [];
  constructor(private productsService: ProductsService) {
    this.getProdData();
  }

  ngOnInit() {
  }

  private getProdData(): void {
    this.productsService.getProducts().subscribe(
      data => {
        this.products = data.filter(obj => obj.category === 'pizza');
      },
      err => { console.log(err); }
    );
  }

}
