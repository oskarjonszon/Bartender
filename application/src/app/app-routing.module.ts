import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { AddDrinkComponent } from './add-drink/add-drink.component';
import { BrowseDrinksComponent } from './browse-drinks/browse-drinks.component';
import { ViewDrinkComponent } from './view-drink/view-drink.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './Services/auth-guard.service'


const routes: Routes = [
  { path: "**", redirectTo: "auth/login", canActivate: [AuthGuardService] },
  { path: '', component: HomepageComponent },
  { path: 'create', component: AddDrinkComponent, canActivate: [AuthGuardService]},
  { path: 'browse', component: BrowseDrinksComponent},
  { path: 'view/:id', component: ViewDrinkComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
