import { inject, Injectable } from '@angular/core';
import { CartItem } from '../cartItem';
import { Product } from '../product';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: CartItem[] = [];
  cartLength$ = new BehaviorSubject<number>(0);
  cartTotalPrice$ = new BehaviorSubject<number>(0);
  cart$ = new BehaviorSubject<CartItem[]>(this.cart);
  private cartLengthCallback: ((length: number) => void) | null = null;
  private http = inject(HttpClient);
  
  constructor() {
    this.loadCart();
  }
  private loadCart() {
    const apiUrl = `${environment.apiUrl}/carts/1`;
    this.http.get<{products: CartItem[]}>(apiUrl).subscribe({
      next: (response) => {
        this.cart = response.products;
        this.notifyCartLengthChange();
      },
      error: (error) => console.error('Failed to load cart from the server:', error)
    });
  }

  addToCart(product: Product) {
    const existingProduct = this.cart.find(item => item.product.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    const apiUrl = `${environment.apiUrl}/carts/1`;
    this.http.put(apiUrl, {products: this.cart}).subscribe({
      next: (response) => this.notifyCartLengthChange(),
      error: (error) => console.error('Failed to update cart on the server:', error)
    });
  }

  removeFromCart(product: Product) {
    const existingProduct = this.cart.find(item => item.product.id === product.id);
    if (existingProduct) {
      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        this.cart = this.cart.filter(item => item.product.id !== product.id);
      }
    }
    const apiUrl = `${environment.apiUrl}/carts/1`;
    this.http.put(apiUrl, {products: this.cart}).subscribe({
      next: (response) => this.notifyCartLengthChange(),
      error: (error) => console.error('Failed to update cart on the server:', error)
    });
  }

  public getCartLength() {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }
  
  public getTotalPrice() {
    return this.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  setCartLengthCallback(callback: (length: number) => void): void {
    this.cartLengthCallback = callback;
    this.notifyCartLengthChange();
  }

  private notifyCartLengthChange(): void {
    this.cartTotalPrice$.next(this.getTotalPrice())
    this.cart$.next(this.cart);
    this.cartLength$.next(this.getCartLength());
    if (this.cartLengthCallback) {
      this.cartLengthCallback(this.getCartLength());
    }
  }
}
