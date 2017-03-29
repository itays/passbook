import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { tree } from '../../../assets/mock';
import { Password } from '../../models/password';
import { PasswordsService } from '../../services/passwords.service';
var _ = require('lodash');
@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  @Output() onSelectPassword:EventEmitter<Password> = new EventEmitter();
  selectedPassword: Password = null;
  isEditing: boolean = false;
  tree = tree;
  
  constructor(private ps: PasswordsService) { 
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
}
