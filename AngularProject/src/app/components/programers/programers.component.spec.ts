import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramersComponent } from './programers.component';

describe('ProgramersComponent', () => {
  let component: ProgramersComponent;
  let fixture: ComponentFixture<ProgramersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
