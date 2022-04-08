import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogempleadoComponent } from './dialogempleado.component';

describe('DialogempleadoComponent', () => {
  let component: DialogempleadoComponent;
  let fixture: ComponentFixture<DialogempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogempleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
