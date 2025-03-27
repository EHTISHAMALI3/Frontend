import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HolyQuranComponent } from './holy-quran/holy-quran.component';
import { NooraniPrimerComponent } from './noorani-primer/noorani-primer.component';
import { PracticeBoardComponent } from './practice-board/practice-board.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HttpClientModule } from '@angular/common/http';
import { HidayahHomeComponent } from './hidayah-home/hidayah-home.component';


@NgModule({
  declarations: [
    HolyQuranComponent,
    NooraniPrimerComponent,
    PracticeBoardComponent,
    HidayahHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    CarouselModule ,
    HttpClientModule
  ]
})
export class PagesModule { }
