import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { tree } from '../../../assets/mock';
import { Password } from '../../models/password';
import { PasswordsService } from '../../services/passwords.service';

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
  }

  ngOnInit() {
    // console.log(tree);
  }

  onSelect(pass) {
    this.selectedPassword = pass;
    this.onSelectPassword.emit(pass);
  }

  isActive(pass){
    return this.selectedPassword && this.selectedPassword.name === pass.name;
  }
}
