import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogempleadosComponent } from './dialogempleados.component';

describe('DialogempleadosComponent', () => {
  let component: DialogempleadosComponent;
  let fixture: ComponentFixture<DialogempleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogempleadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogempleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
