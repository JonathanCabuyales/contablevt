import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatastrosComponent } from './catastros.component';

describe('CatastrosComponent', () => {
  let component: CatastrosComponent;
  let fixture: ComponentFixture<CatastrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatastrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatastrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
