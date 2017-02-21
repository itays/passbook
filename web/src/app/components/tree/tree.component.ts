import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { tree } from '../../../assets/mock';
import { Password } from '../../models/password';
@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  @Output() onSelectPassword:EventEmitter<Password> = new EventEmitter();
  selectedPassword: Password = null;
  tree = tree;
  constructor() { }

  ngOnInit() {
    console.log(tree);
  }

  onSelect(pass) {
    this.selectedPassword = pass;
    this.onSelectPassword.emit(pass);
  }
  

}
