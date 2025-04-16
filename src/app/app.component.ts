import { Component } from '@angular/core';
import { NavbarComponent } from './header/navbar/navbar.component';
import { NavcategoriesComponent } from './header/navcategories/navcategories.component';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NavbarComponent, NavcategoriesComponent, RouterOutlet],
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
