import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcreateasientoscontComponent } from './dialogcreateasientoscont.component';

describe('DialogcreateasientoscontComponent', () => {
  let component: DialogcreateasientoscontComponent;
  let fixture: ComponentFixture<DialogcreateasientoscontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcreateasientoscontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcreateasientoscontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
