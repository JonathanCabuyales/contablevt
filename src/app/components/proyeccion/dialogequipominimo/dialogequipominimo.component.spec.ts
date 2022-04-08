import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogequipominimoComponent } from './dialogequipominimo.component';

describe('DialogequipominimoComponent', () => {
  let component: DialogequipominimoComponent;
  let fixture: ComponentFixture<DialogequipominimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogequipominimoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogequipominimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
