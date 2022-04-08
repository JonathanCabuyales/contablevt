import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogeditempleadoComponent } from './dialogeditempleado.component';

describe('DialogeditempleadoComponent', () => {
  let component: DialogeditempleadoComponent;
  let fixture: ComponentFixture<DialogeditempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogeditempleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogeditempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
