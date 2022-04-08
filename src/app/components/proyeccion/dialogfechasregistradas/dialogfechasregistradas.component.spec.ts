import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfechasregistradasComponent } from './dialogfechasregistradas.component';

describe('DialogfechasregistradasComponent', () => {
  let component: DialogfechasregistradasComponent;
  let fixture: ComponentFixture<DialogfechasregistradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfechasregistradasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfechasregistradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
