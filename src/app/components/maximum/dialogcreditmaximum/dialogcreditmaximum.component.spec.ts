import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcreditmaximumComponent } from './dialogcreditmaximum.component';

describe('DialogcreditmaximumComponent', () => {
  let component: DialogcreditmaximumComponent;
  let fixture: ComponentFixture<DialogcreditmaximumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcreditmaximumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcreditmaximumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
