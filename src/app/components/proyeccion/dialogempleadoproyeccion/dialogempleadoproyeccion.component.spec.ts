import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogempleadoproyeccionComponent } from './dialogempleadoproyeccion.component';

describe('DialogempleadoproyeccionComponent', () => {
  let component: DialogempleadoproyeccionComponent;
  let fixture: ComponentFixture<DialogempleadoproyeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogempleadoproyeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogempleadoproyeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
