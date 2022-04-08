import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogconvenioComponent } from './dialogconvenio.component';

describe('DialogconvenioComponent', () => {
  let component: DialogconvenioComponent;
  let fixture: ComponentFixture<DialogconvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogconvenioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogconvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
