import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material'
@Component({
  selector: 'dialog-result-example-dialog',
  template: `
    <h1 md-dialog-title>{{dialogRef.config.data.title}}</h1>
    <div md-dialog-content>{{dialogRef.config.data.body}}</div>
    <div md-dialog-actions>
      <button md-button (click)="dialogRef.close(true)">Yes</button>
      <button md-button (click)="dialogRef.close(false)">No</button>
    </div>
  `,
})
export class Dialog {
  constructor(public dialogRef: MdDialogRef<Dialog>) {}
}