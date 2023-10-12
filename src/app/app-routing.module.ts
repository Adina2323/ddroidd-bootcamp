import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { FinalPageComponent } from './final-page/final-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'join-us', component: RegisterFormComponent},
  { path: 'final',component: FinalPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
