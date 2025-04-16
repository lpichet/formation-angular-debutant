import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { Category, Product } from '../product';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  public category$ = new BehaviorSubject<Category>('all');
  public products$ = this.category$.pipe(
    switchMap((category) =>
      this.getProducts().pipe(
        map((products) =>
          category === 'all'
            ? products
            : products.filter((product) => product.category === category)
        )
      )
    )
  );

  private getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  public filterByCategory(category: Category): void {
    this.category$.next(category);
  }
}
