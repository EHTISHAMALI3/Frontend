import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SigninComponent } from "./Auth/signin/signin.component";
import { RouterModule } from "@angular/router";
import { PagesModule } from "./Pages/pages.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { LayoutComponent } from "./Layout/layout/layout.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from "./Interceptors/auth.interceptor";
import { AuthService } from "./Services/auth.service";
import { NgxSpinnerModule } from "ngx-spinner";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';





@NgModule({
    declarations: [
      AppComponent,
      SigninComponent,
      LayoutComponent
    ],
    imports: [
      BrowserAnimationsModule,
      BrowserModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      PagesModule,
      HttpClientModule,
      NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
      ToastrModule.forRoot({
        timeOut: 3000,
      }),
      
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA],
    exports:[RouterModule],
    providers: [
      AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }