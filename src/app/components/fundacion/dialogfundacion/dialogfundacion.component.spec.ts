import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogfundacionComponent } from './dialogfundacion.component';

describe('DialogfundacionComponent', () => {
  let component: DialogfundacionComponent;
  let fixture: ComponentFixture<DialogfundacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogfundacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogfundacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
