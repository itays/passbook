import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { tree } from '../../../assets/mock';
@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  @Output() onSelectPassword:EventEmitter<any> = new EventEmitter();
  selectedPassword = null;
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
