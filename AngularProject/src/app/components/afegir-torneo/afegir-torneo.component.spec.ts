import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfegirTorneoComponent } from './afegir-torneo.component';

describe('AfegirTorneoComponent', () => {
  let component: AfegirTorneoComponent;
  let fixture: ComponentFixture<AfegirTorneoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfegirTorneoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfegirTorneoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
