import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessingToServiceComponent } from './accessing-to-service.component';

describe('AccessingToServiceComponent', () => {
  let component: AccessingToServiceComponent;
  let fixture: ComponentFixture<AccessingToServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessingToServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessingToServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
