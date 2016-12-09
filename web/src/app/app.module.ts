import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { TreeComponent } from './components/tree/tree.component';
import { PasswordDetailComponent } from './components/password-detail/password-detail.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './routes';



@NgModule({
  declarations: [
    AppComponent,
    TreeComponent,
    PasswordDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
