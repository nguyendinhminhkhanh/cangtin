import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './account/auth/login/login.component';
import { authguardGuard } from './shared/authguard/authguard.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: "account",
    loadChildren: ()=> import("./account/account.module").then((m)=> m.AccountModule),
  },
  {
    path: "layout",
    component: LayoutComponent,
    canActivate: [authguardGuard],
    loadChildren:()=> import("./pages/pages.module").then((m)=> m.PagesModule),
  },
  {
    path: "**",
    component: LoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
