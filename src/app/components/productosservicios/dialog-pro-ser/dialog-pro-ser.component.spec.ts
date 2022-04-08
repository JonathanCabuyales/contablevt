import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProSerComponent } from './dialog-pro-ser.component';

describe('DialogProSerComponent', () => {
  let component: DialogProSerComponent;
  let fixture: ComponentFixture<DialogProSerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProSerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProSerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
