import { Routes } from '@angular/router';
import { CartComponent } from './cart/cart/cart.component';
import { ProductsListComponent } from './products/products-list/products-list.component';

export const routes: Routes = [
    { path: '', component: ProductsListComponent },
    { path: 'cart', component: CartComponent },
];
