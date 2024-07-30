import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeocodingResponse } from '../models/weather';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient){}

  getLocations = (name: string) => {
    return this.http
      .get<GeocodingResponse>(
        `https://geocoding-api.open-meteo.com/v1/search?name=${name}`
      )
      .pipe(map((response) => response.results || []));
  }

   transformWeatherData = (data: any) => {
    const weatherData = data.daily.time.map((time: string, index: number) => ({
      time,
      temperature_2m_max: data.daily.temperature_2m_max[index],
      temperature_2m_min: data.daily.temperature_2m_min[index],
      rain_sum: data.daily.rain_sum[index],
      snowfall_sum: data.daily.snowfall_sum[index],
      wind_speed_10m_max: data.daily.wind_speed_10m_max[index],
      wind_direction_10m_dominant: data.daily.wind_direction_10m_dominant[index],
      sunrise: data.daily.sunrise[index],
      sunset: data.daily.sunset[index],
    }));
    return weatherData;
  };
}