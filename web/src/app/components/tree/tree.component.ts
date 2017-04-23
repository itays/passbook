import { Component, OnInit, Output, Input ,EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { tree } from '../../../assets/mock';
import { Password } from '../../models/password';
import { Category } from '../../models/category';
import { PasswordsService } from '../../services/passwords.service';
import { MdMenuTrigger, MdDialog, MdDialogRef, MdDialogConfig} from '@angular/material';
import { SearchPipe } from '../../pipes/search.pipe';



@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',  
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, AfterViewInit  {
  @Input() categories: Category[];
  @Output() onSelectPassword:EventEmitter<Password> = new EventEmitter();
  @ViewChild(MdMenuTrigger) trigger: MdMenuTrigger;
  
  selectedPassword: Password = null;
  isEditing: boolean = false;
  searchTerm: string;
  tree = tree;
  
  constructor(private ps: PasswordsService, public dialog: MdDialog) { 
    ps.isEditing$.subscribe(
      isEditing => {
        this.isEditing = isEditing;
      }
    );
    ps.onDelete$.subscribe(
      () => {
        this.selectedPassword = null;
        this.getTree();
      }
    );
    ps.onUpdate$.subscribe((pass: any) => {
      this.selectedPassword = pass;
      this.tree.forEach((branch, index) => {
        branch.passwords.forEach((pa, ind) => {
          if (pa._id === pass._id) {
            this.tree[index].passwords[ind] = pass;
            return;
          }
        })
      });
      
    });
  }

  ngOnInit() {
    
    this.getTree();
  }

  ngAfterViewInit(){
    this.trigger.onMenuClose.subscribe(() => {
      
    });
  }

  getTree(){
    this.ps.getTree().subscribe(
      (data) => this.tree = data,
      (err) => {
        console.log(err);
      }
    );
  }

  onSelect(pass) {
    this.selectedPassword = pass;
    this.onSelectPassword.emit(pass);
  }

  isActive(pass){
    return this.selectedPassword && this.selectedPassword.name === pass.name;
  }

  onAddNewPass(){
    this.selectedPassword = new Password();
    this.ps.setIsEditing(true);
    this.onSelectPassword.emit(this.selectedPassword);
  }

  onAddNewCat(){
    let dialogData = new MdDialogConfig();
    dialogData.data = {
      categories: this.categories
    };
    dialogData.disableClose = true;
    let dialogRef = this.dialog.open(AddCategoryDialog, dialogData);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}

@Component({
  selector: 'add-category-dialog',
  template: `
    <h1 md-dialog-title>Add a new category</h1>
    {{isExists}}
    <form #newCategoryForm="ngForm">
      <div md-dialog-content>
        <md-input-container>
          <input mdInput placeholder="New Category" name="newpass" [(ngModel)]="newPass" #newpass="ngModel" (keyup)="checkExists()"required />
        </md-input-container>
      </div>
      <div md-dialog-actions>
        <button type="button" md-raised-button color="primary" (click)="onAddCategory()" [disabled]="!newCategoryForm.form.valid || isExists">Add</button>
        <button type="button" md-raised-button (click)="dialogRef.close(false)">Cancel</button>
      </div>
    </form>`,
})
export class AddCategoryDialog {
  @ViewChild('newCategoryForm') newCategoryForm;
  categories: Category[];
  newPass: string
  categoriesNames;
  isExists: boolean = false;
  constructor(public dialogRef: MdDialogRef<AddCategoryDialog>, private ps: PasswordsService) {
    this.categories = this.dialogRef._containerInstance.dialogConfig.data.categories;
    this.categoriesNames = this.categories.map((c) => c.name.toLowerCase());
  }
  onAddCategory(){
    this.dialogRef.close({success: true}); 
  }
  checkExists(){
    this.isExists = this.categoriesNames.includes(this.newPass.toLowerCase());
  }
}
