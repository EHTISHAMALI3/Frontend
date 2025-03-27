import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./Auth/signin/signin.component";
import { AuthGuard } from "./Guards/auth.guard";
import { LayoutComponent } from "./Layout/layout/layout.component";




const routes: Routes = [
   {path:'',pathMatch:'full',redirectTo:'signin'},
    {path:'signin',component:SigninComponent},
    {
        path:'hidayah',
        canActivate: [AuthGuard],
        component:LayoutComponent,
        loadChildren:()=> import('./Pages/pages.module').then(m=>m.PagesModule)
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }