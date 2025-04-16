import { Component, inject, Input } from '@angular/core';
import { Product } from '../../product';
import { PricePartsPipe } from '../../pipes/price-parts/price-parts.pipe';
import { TruncatePipe } from '../../pipes/truncate/truncate.pipe';
import { AsyncPipe, NgClass } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs';

@Component({
  selector: 'ngshop-product-card',
  imports: [PricePartsPipe, TruncatePipe, NgClass, RouterLink, AsyncPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  isFavorite$ = this.productService.favorites$.pipe(
    map((favorites) => favorites.has(this.product.id))
  );
  public addToCartHandler() {
    this.cartService.addToCart(this.product);
  }

  public toggleFavoriteHandler(): void {
    this.productService.toggleFavorite(this.product.id);
  }
}
