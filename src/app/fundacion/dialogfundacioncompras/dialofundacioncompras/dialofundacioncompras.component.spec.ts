import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialofundacioncomprasComponent } from './dialofundacioncompras.component';

describe('DialofundacioncomprasComponent', () => {
  let component: DialofundacioncomprasComponent;
  let fixture: ComponentFixture<DialofundacioncomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialofundacioncomprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialofundacioncomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
