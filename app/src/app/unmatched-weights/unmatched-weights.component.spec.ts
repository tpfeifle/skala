import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnmatchedWeightsComponent } from './unmatched-weights.component';

describe('UnmatchedWeightsComponent', () => {
  let component: UnmatchedWeightsComponent;
  let fixture: ComponentFixture<UnmatchedWeightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UnmatchedWeightsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnmatchedWeightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
