import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Password } from '../../models/password';
import { PasswordsService } from '../../services/passwords.service';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'password-detail',
  templateUrl: './password-detail.component.html',
  styleUrls: ['./password-detail.component.scss']
})
export class PasswordDetailComponent implements OnInit {

  private _selectedPassword: Password;
  public isEditing: boolean = false;

  @Input() set selectedPassword(newPass: Password) {
    this._selectedPassword = JSON.parse(JSON.stringify(newPass));
  }

  get selectedPassword(): Password {
    return this._selectedPassword;
  }

  get model() {
    return JSON.stringify(this.selectedPassword);
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
