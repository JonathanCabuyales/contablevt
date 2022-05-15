import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogvtcomprasComponent } from './dialogvtcompras.component';

describe('DialogvtcomprasComponent', () => {
  let component: DialogvtcomprasComponent;
  let fixture: ComponentFixture<DialogvtcomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogvtcomprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogvtcomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
