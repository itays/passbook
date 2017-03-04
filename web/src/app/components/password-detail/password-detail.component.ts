import { Component, OnInit, Input } from '@angular/core';
import { Password } from '../../models/password';
import { PasswordsService } from '../../services/passwords.service';

@Component({
  selector: 'password-detail',
  templateUrl: './password-detail.component.html',
  styleUrls: ['./password-detail.component.scss']
})
export class PasswordDetailComponent implements OnInit {

  private _selectedPassword: Password;

  @Input() set selectedPassword(newPass: Password) {
    this._selectedPassword = JSON.parse(JSON.stringify(newPass));
  }

  get selectedPassword(): Password {
    return this._selectedPassword;
  }

  get model() {
    return JSON.stringify(this.selectedPassword);
  }
  constructor(private ps: PasswordsService) { }

  ngOnInit() {
  }

  onEdit(){
    this.ps.setIsEditing(true);
  }

  onCancel(){
    this.ps.setIsEditing(false);
  }

}
