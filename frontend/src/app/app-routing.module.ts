import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WeatherSummaryComponent } from './components/weather-summary/weather-summary.component';
import { AuthGuard } from './route-guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full'},
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'weather', component: WeatherSummaryComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
