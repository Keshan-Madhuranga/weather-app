import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSummaryComponent } from './weather-summary.component';

describe('WeatherSummaryComponent', () => {
  let component: WeatherSummaryComponent;
  let fixture: ComponentFixture<WeatherSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeatherSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
