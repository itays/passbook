import { Routes } from '@angular/router';
import { TreeComponent } from './components/tree/tree.component';
import { PasswordDetailComponent } from './components/password-detail/password-detail.component';

export const ROUTES: Routes = [
  { path: '', component: TreeComponent},
  { path: 'passwords/:id', component: PasswordDetailComponent}
];
