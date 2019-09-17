import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  products: Array<IProduct> = [];
  constructor(private productsService: ProductsService) {
    this.getProdData();
  }

  ngOnInit() {
  }

  private getProdData(): void {
    this.productsService.getProducts().subscribe(
      data => {
        this.products = data.filter(obj => obj.category === 'drinks');
      },
      err => { console.log(err); }
    );
  }

}
