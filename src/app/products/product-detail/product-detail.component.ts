import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Product } from '../product';

@Component({
  selector: 'ngshop-product-detail',
  imports: [AsyncPipe, CurrencyPipe, NgClass],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute)
  productService = inject(ProductService)
  cartService = inject(CartService);
  product$ = this.route.params.pipe(
    map(params => params['id']),
    switchMap(id => this.productService.getProductById(id))
  );
  
  isFavorite$ = combineLatest([this.productService.favorites$, this.product$]).pipe(
    map(([favorites, product]) => favorites.has(product.id))
  );

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  toggleFavorite(product: Product): void {
    this.productService.toggleFavorite(product.id);
  }
}
