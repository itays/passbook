import { Component, OnInit } from '@angular/core';
import { PasswordsService } from './services/passwords.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedPassword = null;
  constructor(private ps: PasswordsService){
    ps.onDelete$.subscribe(() => this.selectedPassword = null);
  }
  
  ngOnInit(){
    
  }
  
}
