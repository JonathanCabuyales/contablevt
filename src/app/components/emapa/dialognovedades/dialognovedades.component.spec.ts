import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialognovedadesComponent } from './dialognovedades.component';

describe('DialognovedadesComponent', () => {
  let component: DialognovedadesComponent;
  let fixture: ComponentFixture<DialognovedadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialognovedadesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialognovedadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
