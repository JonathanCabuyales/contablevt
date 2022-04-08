import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcomprasComponent } from './dialogcompras.component';

describe('DialogcomprasComponent', () => {
  let component: DialogcomprasComponent;
  let fixture: ComponentFixture<DialogcomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcomprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
