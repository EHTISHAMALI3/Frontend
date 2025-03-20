import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolyQuranComponent } from './holy-quran/holy-quran.component';
import { NooraniPrimerComponent } from './noorani-primer/noorani-primer.component';
import { PracticeBoardComponent } from './practice-board/practice-board.component';

const routes: Routes = [
  {path:'holyQuran',component:HolyQuranComponent},
  {path:'nooraniPrimer',component:NooraniPrimerComponent},
  {path:'practiceBoard',component:PracticeBoardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
