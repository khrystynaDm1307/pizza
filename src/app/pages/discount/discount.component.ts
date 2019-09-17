import { Component, OnInit } from '@angular/core';
import { IDiscount } from 'src/app/shared/interfaces/discout.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  discounts: Array<IDiscount>;
  constructor(private discountService: DiscountService) { 
    this.getData();
  }

  ngOnInit() {}

  private getData(): void {
    this.discountService.getDiscounts().subscribe(
      data => {
        this.discounts = data;
      },
      err => { console.log(err); }
    );
  }
  // private getDisData(): void {
  //   this.discounts = this.discountService.getData();
  //   console.log(this.discounts);
  // }

}
