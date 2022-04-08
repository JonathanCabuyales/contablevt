import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoginventarioasignadoComponent } from './dialoginventarioasignado.component';

describe('DialoginventarioasignadoComponent', () => {
  let component: DialoginventarioasignadoComponent;
  let fixture: ComponentFixture<DialoginventarioasignadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoginventarioasignadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoginventarioasignadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
