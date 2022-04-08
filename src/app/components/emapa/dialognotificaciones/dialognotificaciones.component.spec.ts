import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialognotificacionesComponent } from './dialognotificaciones.component';

describe('DialognotificacionesComponent', () => {
  let component: DialognotificacionesComponent;
  let fixture: ComponentFixture<DialognotificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialognotificacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialognotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
