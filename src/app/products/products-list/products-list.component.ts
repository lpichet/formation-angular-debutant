import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';``
import productsData from '../products.json';
import { Category, Product } from '../product';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { AsyncPipe } from '@angular/common';

// type ProductType = {
//   id: number;
//   name: string;
//   price: number;
// }

// type ProductStockType = ProductType & {
//   stock?: number | null;
// }

// let productStock: ProductStockType = {
//   id: 1,
//   name: 'Product 1',
//   price: 100
// }

// type StockStatus = 'in stock' | 'out of stock';

// interface ProductInterface {
//   id: number;
//   status: StockStatus;
//   status2: 'in stock' | 'out of stock';
// }

// interface ProductInterface {
//   test: string;
// }

// interface ProductStockInterface extends ProductInterface {
//   stock: number;
// }
// var productStock2: ProductStockInterface = {
//   id: 1,
//   status: 'in stock',
//   status2: 'out of stock',
//   stock: 10,
//   test: 'test'
// }


@Component({
  selector: 'ngshop-products-list',
  imports: [ProductCardComponent, AsyncPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  private favorites: Set<number> = new Set();

private productService = inject(ProductService);
products$ = this.productService.products$;
  
  
  constructor() {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    const storedFavorites: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.favorites = new Set(storedFavorites);
  }

  private saveFavorites(): void {
    localStorage.setItem('favorites', JSON.stringify(Array.from(this.favorites)));
  }

  public toggleFavorite(productId: number): void {
    if (this.favorites.has(productId)) {
      this.favorites.delete(productId);
    } else {
      this.favorites.add(productId);
    }
    this.saveFavorites();
  }

  public isFavorite(productId: number): boolean {
    return this.favorites.has(productId);
  }
}
