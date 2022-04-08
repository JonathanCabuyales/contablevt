import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogitemscompraComponent } from './dialogitemscompra.component';

describe('DialogitemscompraComponent', () => {
  let component: DialogitemscompraComponent;
  let fixture: ComponentFixture<DialogitemscompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogitemscompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogitemscompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
