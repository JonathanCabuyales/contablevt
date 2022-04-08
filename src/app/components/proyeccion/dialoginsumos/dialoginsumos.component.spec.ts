import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoginsumosComponent } from './dialoginsumos.component';

describe('DialoginsumosComponent', () => {
  let component: DialoginsumosComponent;
  let fixture: ComponentFixture<DialoginsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoginsumosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialoginsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
