import { AsyncPipe, CommonModule, NgClass } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Category } from '../../products/product';
import { ProductService } from '../../products/services/product.service';

@Component({
  selector: 'ngshop-navcategories',
  imports: [NgClass, AsyncPipe],
  templateUrl: './navcategories.component.html',
  styleUrl: './navcategories.component.css'
})
export class NavcategoriesComponent {
  private productService = inject(ProductService);
  public category$ = this.productService.category$;

  handleClick(category: Category) {
    this.productService.filterByCategory(category);
  }
}
