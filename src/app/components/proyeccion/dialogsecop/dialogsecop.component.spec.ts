import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogsecopComponent } from './dialogsecop.component';

describe('DialogsecopComponent', () => {
  let component: DialogsecopComponent;
  let fixture: ComponentFixture<DialogsecopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogsecopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogsecopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
