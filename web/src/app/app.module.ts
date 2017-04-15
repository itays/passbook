import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { PasswordDetailComponent } from './components/password-detail/password-detail.component';
import { Dialog } from './components/dialog/dialog.component';
import { PasswordsService } from './services/passwords.service';
import { SearchPipe } from './pipes/search.pipe';
import 'hammerjs';


@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    PasswordDetailComponent,
    Dialog,
    SearchPipe,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  entryComponents: [Dialog],
  providers: [PasswordsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
