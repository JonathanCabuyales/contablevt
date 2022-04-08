import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmiproyeccionComponent } from './dialogmiproyeccion.component';

describe('DialogmiproyeccionComponent', () => {
  let component: DialogmiproyeccionComponent;
  let fixture: ComponentFixture<DialogmiproyeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmiproyeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmiproyeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
