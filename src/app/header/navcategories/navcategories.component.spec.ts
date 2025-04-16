import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavcategoriesComponent } from './navcategories.component';

describe('NavcategoriesComponent', () => {
  let component: NavcategoriesComponent;
  let fixture: ComponentFixture<NavcategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavcategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavcategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
