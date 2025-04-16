import { Component, inject, OnDestroy } from '@angular/core';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { Category, Product } from './products/product';
import productsData from './products/products.json';
import { NavbarComponent } from './header/navbar/navbar.component';
import { NavcategoriesComponent } from './header/navcategories/navcategories.component';
import { ProductService } from './products/services/product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, Subscription, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ProductsListComponent, NavbarComponent, NavcategoriesComponent, AsyncPipe],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy{
  products: Product[] = [];
  category: Category = 'all';
  category$ = new BehaviorSubject<Category>('all');
  private subProducts: Subscription | null = null;
  private productService = inject(ProductService);
  public products$ = this.category$.pipe(
    switchMap((category) =>
      this.productService.getProducts().pipe(
        map((products) =>
          category === 'all'
            ? products
            : products.filter((product) => product.category === category)
        )
      )
    )
  );


  constructor() {
    this.subProducts = this.productService.getProducts()
    .pipe(
      takeUntilDestroyed()
    )
    .subscribe((products) => {
      this.products = products;
    });
  }
  public filterBy(category: Category) {
    this.category$.next(category);
    // console.log(category);
    this.category = category;
    // this.products = category === 'all'
    // ? [...productsData]
    // : [...productsData.filter(product => product.category === category)];
  }

  ngOnDestroy(): void {
    if(this.subProducts) {
      this.subProducts.unsubscribe();
    }
  }
}
