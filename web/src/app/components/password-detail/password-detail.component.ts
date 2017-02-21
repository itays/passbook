import { Component, OnInit, Input } from '@angular/core';
import { Password } from '../../models/password';
@Component({
  selector: 'password-detail',
  templateUrl: './password-detail.component.html',
  styleUrls: ['./password-detail.component.scss']
})
export class PasswordDetailComponent implements OnInit {

  private _selectedPassword: Password;

  @Input() set selectedPassword(newPass: Password) {
    this._selectedPassword = newPass;
  }

  get selectedPassword(): Password {
    return this._selectedPassword;
  }
  constructor() { }

  ngOnInit() {
  }

}
