import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SigninComponent } from "./Auth/signin/signin.component";
import { HidayahHomeComponent } from "./Layout/hidayah-home/hidayah-home.component";
import { AuthGuard } from "./Guards/auth.guard";




const routes: Routes = [
   {path:'',pathMatch:'full',redirectTo:'signin'},
    {path:'signin',component:SigninComponent},
    {
        path:'hidayahHome',
        // canActivate: [AuthGuard],
        component:HidayahHomeComponent,
        // loadChildren:()=> import('./Pages/pages/pages.module').then(m=>m.PagesModule)
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }