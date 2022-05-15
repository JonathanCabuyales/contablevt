import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoglameComponent } from './dialoglame.component';

describe('DialoglameComponent', () => {
  let component: DialoglameComponent;
  let fixture: ComponentFixture<DialoglameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoglameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoglameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
