import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogprodservComponent } from './dialogprodserv.component';

describe('DialogprodservComponent', () => {
  let component: DialogprodservComponent;
  let fixture: ComponentFixture<DialogprodservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogprodservComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogprodservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
