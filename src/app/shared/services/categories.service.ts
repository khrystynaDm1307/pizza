import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/categories';
  }

  public getCategories(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.url);
  }

}
