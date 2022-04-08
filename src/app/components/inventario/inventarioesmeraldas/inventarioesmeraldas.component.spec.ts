import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioesmeraldasComponent } from './inventarioesmeraldas.component';

describe('InventarioesmeraldasComponent', () => {
  let component: InventarioesmeraldasComponent;
  let fixture: ComponentFixture<InventarioesmeraldasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioesmeraldasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioesmeraldasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
