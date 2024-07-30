import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime, switchMap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

import { GeocodingResponse } from '../../models/weather';
import { WeatherService } from '../../services/weather.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrl: './weather-summary.component.css',
})
export class WeatherSummaryComponent implements OnInit, OnDestroy {
  weatherForm: FormGroup;
  filteredLocations!: Observable<any[]>;
  selectedLocation: any;
  displayedColumns: string[] = [
    'time',
    'temperature_2m_max',
    'temperature_2m_min',
    'rain_sum',
    'snowfall_sum',
    'wind_speed_10m_max',
    'wind_direction_10m_dominant',
    'sunrise',
    'sunset',
  ];
  weatherData: any[] = [];
  locationFieldDisplayValue!: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private socket: Socket,
    private authService: AuthService,
    private weatherService: WeatherService
  ) {
    this.weatherForm = this.fb.group({
      location: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.filteredLocations = this.weatherForm
      .get('location')!
      .valueChanges.pipe(
        debounceTime(200),
        startWith(''),
        switchMap((value) => this._filter(value || ''))
      );
  }

  ngOnInit() {
    this.socket.on('weatherUpdate', (data: any) => {
      if (this.authService.isAuthenticated()) {
        this.weatherData = this.weatherService.transformWeatherData(data);
        this.snackBar.open('Weather data fetched successfully!', 'Close', {
          duration: 2000,
        });
      } else {
        this.authService.logout();
      }
    });
  }

  private _filter(value: string): Observable<any[]> {
    if (value.length < 3) {
      return new Observable((observer) => observer.next([]));
    } else {
      return this.weatherService.getLocations(value);
    }
  }

  onSubmit() {
    if (this.weatherForm.valid && this.selectedLocation) {
      const { latitude, longitude } = this.selectedLocation;
      this.socket.emit('getWeather', latitude, longitude);
    }
  }

  onOptionSelected(event: any) {
    this.selectedLocation = event.option.value;
    const optionValue = event.option.value;
    this.locationFieldDisplayValue = `${optionValue.name}, ${optionValue.country}, ${optionValue.admin1}`;
    this.weatherForm.get('location')?.setValue(this.locationFieldDisplayValue);
  }

  ngOnDestroy() {
    this.socket.disconnect();
  }
}
