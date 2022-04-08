import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialognotaComponent } from './dialognota.component';

describe('DialognotaComponent', () => {
  let component: DialognotaComponent;
  let fixture: ComponentFixture<DialognotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialognotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialognotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
