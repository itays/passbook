import { Component, OnInit } from '@angular/core';
import { PasswordsService } from './services/passwords.service';
import { Category } from './models/category';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedPassword = null;
  public categories: Category[];
  constructor(private ps: PasswordsService) {
    ps.onDelete$.subscribe(() => this.selectedPassword = null);
  }

  ngOnInit() {
    this.ps.getCategories().subscribe(
      (cats) => {
        this.categories = cats;
      });
  }
}
