import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogeditinventarioComponent } from './dialogeditinventario.component';

describe('DialogeditinventarioComponent', () => {
  let component: DialogeditinventarioComponent;
  let fixture: ComponentFixture<DialogeditinventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogeditinventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogeditinventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
