import { Component, inject } from '@angular/core';
import { CartService } from '../../products/services/cart.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Product } from '../../products/product';

@Component({
  selector: 'ngshop-cart',
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private cartservice = inject(CartService);
  cart$ = this.cartservice.cart$;
  total$ = this.cartservice.cartTotalPrice$;

  removeFromCart(product: Product) {
    this.cartservice.removeFromCart(product);
  }
}
