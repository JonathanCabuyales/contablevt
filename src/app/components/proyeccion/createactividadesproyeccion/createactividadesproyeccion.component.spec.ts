import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateactividadesproyeccionComponent } from './createactividadesproyeccion.component';

describe('CreateactividadesproyeccionComponent', () => {
  let component: CreateactividadesproyeccionComponent;
  let fixture: ComponentFixture<CreateactividadesproyeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateactividadesproyeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateactividadesproyeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
