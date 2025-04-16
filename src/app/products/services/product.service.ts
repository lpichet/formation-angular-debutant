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
  private favorites: Set<number> = new Set();
  public favorites$ = new BehaviorSubject<Set<number>>(this.favorites);
  public isFavorite(productId: number): boolean {
    return this.favorites.has(productId);
  }

  private getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }
  

  public getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  public filterByCategory(category: Category): void {
    this.category$.next(category);
  }

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const storedFavorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.favorites = new Set(storedFavorites);
    this.favorites$.next(this.favorites);
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
    this.favorites$.next(this.favorites);
  }

  public toggleFavorite(productId: number): void {
    if (this.favorites.has(productId)) {
      this.favorites.delete(productId);
    } else {
      this.favorites.add(productId);
    }
    this.saveFavorites();
  }
}
