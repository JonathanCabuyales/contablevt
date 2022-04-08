import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfechasComponent } from './dialogfechas.component';

describe('DialogfechasComponent', () => {
  let component: DialogfechasComponent;
  let fixture: ComponentFixture<DialogfechasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfechasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfechasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
