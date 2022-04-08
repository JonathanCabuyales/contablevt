import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcalculoempleadosComponent } from './dialogcalculoempleados.component';

describe('DialogcalculoempleadosComponent', () => {
  let component: DialogcalculoempleadosComponent;
  let fixture: ComponentFixture<DialogcalculoempleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcalculoempleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcalculoempleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
