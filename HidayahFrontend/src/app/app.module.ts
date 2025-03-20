import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SigninComponent } from "./Auth/signin/signin.component";
import { RouterModule } from "@angular/router";
import { PagesModule } from "./Pages/pages.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { HidayahHomeComponent } from "./Layout/hidayah-home/hidayah-home.component";





@NgModule({
    declarations: [
      AppComponent,
      SigninComponent,
      HidayahHomeComponent
    ],
    imports: [
      BrowserModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      PagesModule,
      HttpClientModule
    ],
    exports:[RouterModule],
    providers: [
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }