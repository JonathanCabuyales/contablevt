import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoginventarioComponent } from './dialoginventario.component';

describe('DialoginventarioComponent', () => {
  let component: DialoginventarioComponent;
  let fixture: ComponentFixture<DialoginventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoginventarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoginventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
