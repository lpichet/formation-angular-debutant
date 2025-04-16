import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Product } from '../../product';
import { PricePartsPipe } from '../../pipes/price-parts/price-parts.pipe';
import { TruncatePipe } from '../../pipes/truncate/truncate.pipe';
import { NgClass } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'ngshop-product-card',
  imports: [PricePartsPipe, TruncatePipe, NgClass],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() isFavorite!: boolean;
  @Output() toggleFavorite = new EventEmitter<void>();
  private cartService = inject(CartService);
  
  public addToCartHandler() {
    this.cartService.addToCart(this.product);
  }

  public toggleFavoriteHandler(): void {
    this.toggleFavorite.emit();
  }
}
