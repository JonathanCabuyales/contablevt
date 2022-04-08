import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfirmasComponent } from './dialogfirmas.component';

describe('DialogfirmasComponent', () => {
  let component: DialogfirmasComponent;
  let fixture: ComponentFixture<DialogfirmasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfirmasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfirmasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
