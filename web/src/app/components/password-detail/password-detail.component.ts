import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Password } from '../../models/password';
import { Category } from '../../models/category';
import { PasswordsService } from '../../services/passwords.service';
import { MdDialog } from '@angular/material';
import { Dialog } from '../dialog/dialog.component';
@Component({
  selector: 'password-detail',
  templateUrl: './password-detail.component.html',
  styleUrls: ['./password-detail.component.scss']
})
export class PasswordDetailComponent implements OnInit {

  private _selectedPassword: Password;
  public isNew: boolean;
  public isEditing: boolean = false;
  public model: Password;
  public categories: Category[];
  

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
    this.ps.getCategories().subscribe(
      (cats) => { 
        this.categories = cats;
      });
  }

  onEdit() {
    this.ps.setIsEditing(true);
  }

  onCancel() {
    this.ps.setIsEditing(false);
    if (this.isNew) {
      this.model = this._selectedPassword = null;
      this.isNew = false;
    }
    else {
      this.model = JSON.parse(JSON.stringify(this.selectedPassword));
    }
  }

  onSave(){
    this.ps.save(this.selectedPassword).subscribe((res) => {
      if (!this._selectedPassword._id) {
        this._selectedPassword._id = res._id;
      }
      this.ps.setIsEditing(false);
      this.ps.fireOnUpdateEvent(this.selectedPassword);
    })
  }

  onDelete(){
    let dialogData = {
      title: 'Are you sure you want to delete it?'
    };
    let dialogRef = this.dialog.open(Dialog, {disableClose: false, data: dialogData});
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
}


