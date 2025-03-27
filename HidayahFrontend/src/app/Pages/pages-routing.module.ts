import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolyQuranComponent } from './holy-quran/holy-quran.component';
import { NooraniPrimerComponent } from './noorani-primer/noorani-primer.component';
import { PracticeBoardComponent } from './practice-board/practice-board.component';
import { HidayahHomeComponent } from './hidayah-home/hidayah-home.component';

const routes: Routes = [
  // {path:'home',pathMatch:'full',redirectTo:'home'},
  {path:'home',component:HidayahHomeComponent},
  {path:'hidayah/holyQuran',component:HolyQuranComponent},
  {path:'hidayah/nooraniPrimer',component:NooraniPrimerComponent},
  {path:'hidayah/practiceBoard',component:PracticeBoardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
