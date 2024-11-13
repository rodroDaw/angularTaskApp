import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from '../task/crud/crud.component';
import { BoardComponent } from '../task/board/board.component';

const routes: Routes = [
  { path: '', component: CrudComponent },
  { path: 'board', component: BoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
