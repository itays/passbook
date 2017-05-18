import { Component } from '@angular/core';
import { MdDialogRef, MdDialogConfig } from '@angular/material'
@Component({
  selector: 'dialog-result-example-dialog',
  template: `
    <h1 md-dialog-title>{{config.data.title}}</h1>
    <div md-dialog-content>{{config.data.body}}</div>
    <div md-dialog-actions>
      <button md-button (click)="dialogRef.close(true)">Yes</button>
      <button md-button (click)="dialogRef.close(false)">No</button>
    </div>
  `,
})
export class Dialog {
  config: MdDialogConfig;
  constructor(public dialogRef: MdDialogRef<Dialog>) {
    this.config = this.dialogRef._containerInstance.dialogConfig;
  }
}