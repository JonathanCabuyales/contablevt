import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogeditnotaComponent } from './dialogeditnota.component';

describe('DialogeditnotaComponent', () => {
  let component: DialogeditnotaComponent;
  let fixture: ComponentFixture<DialogeditnotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogeditnotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogeditnotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
