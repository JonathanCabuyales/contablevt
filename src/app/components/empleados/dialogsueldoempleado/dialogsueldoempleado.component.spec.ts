import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsueldoempleadoComponent } from './dialogsueldoempleado.component';

describe('DialogsueldoempleadoComponent', () => {
  let component: DialogsueldoempleadoComponent;
  let fixture: ComponentFixture<DialogsueldoempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogsueldoempleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogsueldoempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
