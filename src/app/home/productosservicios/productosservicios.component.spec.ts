import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosserviciosComponent } from './productosservicios.component';

describe('ProductosserviciosComponent', () => {
  let component: ProductosserviciosComponent;
  let fixture: ComponentFixture<ProductosserviciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosserviciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosserviciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
