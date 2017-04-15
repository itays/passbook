import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Password } from '../../models/password';
import { Category } from '../../models/category';
import { PasswordsService } from '../../services/passwords.service';
import { MdDialog, MdDialogRef } from '@angular/material';

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
    let dialogRef = this.dialog.open(DialogResult, {disableClose: false});
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

@Component({
  selector: 'dialog-result-example-dialog',
  template: `
    <h1 md-dialog-title>Are you sure you want to delete it?</h1>
    <div md-dialog-actions>
      <button md-button (click)="dialogRef.close(true)">Yes</button>
      <button md-button (click)="dialogRef.close(false)">No</button>
    </div>
  `,
})
export class DialogResult {
  constructor(public dialogRef: MdDialogRef<DialogResult>) {}
}
