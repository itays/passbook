import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'password-detail',
  templateUrl: './password-detail.component.html',
  styleUrls: ['./password-detail.component.scss']
})
export class PasswordDetailComponent implements OnInit {
  @Input() selectedPassword;
  constructor() { }

  ngOnInit() {
  }

}
