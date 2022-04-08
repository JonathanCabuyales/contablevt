import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogeditrolComponent } from './dialogeditrol.component';

describe('DialogeditrolComponent', () => {
  let component: DialogeditrolComponent;
  let fixture: ComponentFixture<DialogeditrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogeditrolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogeditrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
