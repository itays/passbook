import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Password } from '../../models/password';
import { Category } from '../../models/category';
import { PasswordsService } from '../../services/passwords.service';
import { MdDialog, MdSlideToggle } from '@angular/material';
import { Dialog } from '../dialog/dialog.component';

@Component({
  selector: 'app-password-detail',
  templateUrl: './password-detail.component.html',
  styleUrls: ['./password-detail.component.scss']
})
export class PasswordDetailComponent implements OnInit {

  private _selectedPassword: Password;
  public isNew: boolean;
  public isEditing: boolean = false;
  public model: Password;
  @Input() categories: Category[];
  showGenerator: boolean = false;
  newPass: string;
  passLength: number = 8;
  @ViewChild(MdSlideToggle) slideToggle: MdSlideToggle;

  @Input() set selectedPassword(newPass: Password) {
    if (!newPass) {
      this._selectedPassword = null;
      return;
    }
    this._selectedPassword = JSON.parse(JSON.stringify(newPass));
    if (!this._selectedPassword._id) {
      this.isNew = true;
    }
  }

  get selectedPassword(): Password {
    if (this._selectedPassword) {
      this.model = JSON.parse(JSON.stringify(this._selectedPassword));
    }
    return this._selectedPassword;
  }

  constructor(private ps: PasswordsService, public dialog: MdDialog) {
    ps.isEditing$.subscribe(
      isEditing => {
        this.isEditing = isEditing;
      }
    );
  }

  ngOnInit() {
  }

  onEdit() {
    this.ps.setIsEditing(true);
  }

  onCancel() {
    this.ps.setIsEditing(false);
    this.showGenerator = false;
    if (this.isNew) {
      this.model = this._selectedPassword = null;
      this.isNew = false;
    } else {
      this.model = JSON.parse(JSON.stringify(this.selectedPassword));
    }
  }

  onSave() {
    this.ps.save(this.selectedPassword).subscribe((res) => {
      if (!this._selectedPassword._id) {
        this._selectedPassword._id = res._id;
      }
      this.ps.setIsEditing(false);
      this.isNew = false;
      this.ps.fireOnUpdateEvent(this.selectedPassword);
    });
  }

  onDelete() {
    const dialogData = {
      title: 'Are you sure you want to delete it?'
    };
    const dialogRef = this.dialog.open(Dialog, { disableClose: false, data: dialogData });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {

        this.ps.remove(this.selectedPassword).subscribe((res) => {
          this.ps.fireOnDeleteEvent();
        },
          (err) => {
            console.log(err);
          }
        );
      }
    });
  }

  toggleGenerator(slideToggleChange) {
    this.showGenerator = slideToggleChange.checked;
  }

  onGenerate() {
    const specialChars = '!S%@#';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + specialChars;
    let pass = '';
    while (pass.length < this.passLength) {
      const index = Math.floor(Math.random() * chars.length);
      const char = chars[index];
      if (this.ifCharExists(char, pass)) {
        continue;
      } else {
        pass = pass + char;
      }
    }
    const reg = /[!S%@#]/;
    if (!reg.test(pass)) {
      const randomIndex = Math.floor(Math.random() * specialChars.length);
      pass = pass.substr(0, pass.length - 1) + specialChars[randomIndex];
    }
    this.newPass = pass;
  }

  chooseGenerated() {
    this.slideToggle.toggle();
    this.showGenerator = false;
    this._selectedPassword.password = this.newPass;
  }

  ifCharExists(char, pass) {
    if (!pass.length) {
      return false;
    }
    if (pass.indexOf(char) !== -1) {
      return true;
    }
    return false;
  }
}


