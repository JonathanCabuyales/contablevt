import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagloproyeccionesComponent } from './diagloproyecciones.component';

describe('DiagloproyeccionesComponent', () => {
  let component: DiagloproyeccionesComponent;
  let fixture: ComponentFixture<DiagloproyeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagloproyeccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagloproyeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
