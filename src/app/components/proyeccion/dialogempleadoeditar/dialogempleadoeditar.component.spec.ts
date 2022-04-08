import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogempleadoeditarComponent } from './dialogempleadoeditar.component';

describe('DialogempleadoeditarComponent', () => {
  let component: DialogempleadoeditarComponent;
  let fixture: ComponentFixture<DialogempleadoeditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogempleadoeditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogempleadoeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
