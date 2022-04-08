import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdevolucionComponent } from './dialogdevolucion.component';

describe('DialogdevolucionComponent', () => {
  let component: DialogdevolucionComponent;
  let fixture: ComponentFixture<DialogdevolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogdevolucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogdevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
