import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogitemsnotaventaComponent } from './dialogitemsnotaventa.component';

describe('DialogitemsnotaventaComponent', () => {
  let component: DialogitemsnotaventaComponent;
  let fixture: ComponentFixture<DialogitemsnotaventaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogitemsnotaventaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogitemsnotaventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
