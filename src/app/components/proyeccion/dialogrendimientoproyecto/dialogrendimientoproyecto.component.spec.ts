import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogrendimientoproyectoComponent } from './dialogrendimientoproyecto.component';

describe('DialogrendimientoproyectoComponent', () => {
  let component: DialogrendimientoproyectoComponent;
  let fixture: ComponentFixture<DialogrendimientoproyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogrendimientoproyectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogrendimientoproyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
