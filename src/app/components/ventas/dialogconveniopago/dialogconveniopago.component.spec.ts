import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogconveniopagoComponent } from './dialogconveniopago.component';

describe('DialogconveniopagoComponent', () => {
  let component: DialogconveniopagoComponent;
  let fixture: ComponentFixture<DialogconveniopagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogconveniopagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogconveniopagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
