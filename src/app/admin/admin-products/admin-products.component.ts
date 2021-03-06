import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { ProductsService } from 'src/app/shared/services/products.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Product } from 'src/app/shared/classes/product.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {
  productCategories: Array<ICategory> = [];
  products: Array<IProduct> = [];
  productCategory: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string;

  editId: number;
  editStatus: boolean = false;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  urlImage: string;

  constructor(private categoriesService: CategoriesService,
              private productsService: ProductsService,
              private prStorage: AngularFireStorage) {
    this.getCatData();
    this.getProdData();
  }

  ngOnInit() { }

  private getCatData(): void {
    this.categoriesService.getCategories().subscribe(
      data => {
        this.productCategories = data;
      },
      err => { console.log(err); }
    );
  }

  private getProdData(): void {
    this.productsService.getProducts().subscribe(
      data => {
        this.products = data;
      },
      err => { console.log(err); }
    );
  }

  public addProduct(): void {
    const newProd = new Product(1,
      this.productCategory,
      this.productName,
      this.productDescription,
      this.productPrice,
      this.productImage);
    if (this.products.length > 0) {
      newProd.id = this.products.slice(-1)[0].id + 1;
    }
    this.productsService.postProducts(newProd).subscribe(
      () => {
        this.getProdData();
      }
    );
    this.productName = '';
    this.productCategory = null;
    this.productDescription = '';
    this.productPrice = 0;
    this.productImage = null;
  }


  public upload(event): void {
    const id = Math.random().toString(36).substring(2)
    this.ref = this.prStorage.ref(`images/${id}`)
    this.task = this.ref.put(event.target.files[0])
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL()
        this.downloadURL.subscribe(url => this.productImage = url)
      })
    ).subscribe();
  }



  public deleteProduct(obj: IProduct): void {
    this.productsService.deleteProduct(obj.id).subscribe(
      () => {
        this.getProdData();
      }
    );
  }

  public editProduct(obj: IProduct): void {
    this.productName = obj.name;
    this.productCategory = obj.category;
    this.productDescription = obj.description;
    this.productPrice = obj.price;
    this.productImage = obj.image;
    this.editStatus = true;
  }

  public saveEditProduct(): void {
    // tslint:disable-next-line: max-line-length
    const editProd = new Product(this.editId, this.productCategory, this.productName, this.productDescription, this.productPrice, this.productImage);
    this.productsService.editProduct(editProd).subscribe(
      () => {
        this.getProdData();
      }
    );
    this.productName = '';
    this.productCategory = null;
    this.productDescription = '';
    this.productPrice = 0;
    this.productImage = '';
    this.editStatus = false;
  }


}
