import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Category } from '../../products/product';

@Component({
  selector: 'ngshop-navcategories',
  imports: [NgClass],
  templateUrl: './navcategories.component.html',
  styleUrl: './navcategories.component.css'
})
export class NavcategoriesComponent {
  @Input() onFilterBy!: (category: Category) => void;
  @Input() category!: Category;

  handleClick(category: Category) {
    this.onFilterBy(category);
  }
}
