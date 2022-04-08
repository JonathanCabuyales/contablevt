import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmisproyeccionesComponent } from './dialogmisproyecciones.component';

describe('DialogmisproyeccionesComponent', () => {
  let component: DialogmisproyeccionesComponent;
  let fixture: ComponentFixture<DialogmisproyeccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmisproyeccionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmisproyeccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
