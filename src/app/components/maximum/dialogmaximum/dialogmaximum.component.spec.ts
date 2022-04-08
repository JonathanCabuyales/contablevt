import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmaximumComponent } from './dialogmaximum.component';

describe('DialogmaximumComponent', () => {
  let component: DialogmaximumComponent;
  let fixture: ComponentFixture<DialogmaximumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmaximumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmaximumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
