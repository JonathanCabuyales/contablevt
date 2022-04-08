import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasdashComponent } from './comprasdash.component';

describe('ComprasdashComponent', () => {
  let component: ComprasdashComponent;
  let fixture: ComponentFixture<ComprasdashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasdashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasdashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
