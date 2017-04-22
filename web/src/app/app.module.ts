import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { TreeComponent, AddCategoryDialog } from './components/tree/tree.component';
import { PasswordDetailComponent } from './components/password-detail/password-detail.component';
import { Dialog } from './components/dialog/dialog.component';
import { PasswordsService } from './services/passwords.service';
import { SearchPipe } from './pipes/search.pipe';
import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    AddCategoryDialog,
    PasswordDetailComponent,
    Dialog,
    SearchPipe,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  entryComponents: [Dialog, AddCategoryDialog],
  providers: [PasswordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
