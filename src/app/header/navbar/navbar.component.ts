import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../products/services/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ngshop-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private cartService = inject(CartService);
  cartLength: number = this.cartService.getCartLength();

  constructor() {
    this.cartService.setCartLengthCallback((length: number) => {
      this.cartLength = length;
    });
  }
}
