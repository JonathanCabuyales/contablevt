import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtrasosComponent } from './atrasos.component';

describe('AtrasosComponent', () => {
  let component: AtrasosComponent;
  let fixture: ComponentFixture<AtrasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtrasosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtrasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
