import { Component, OnInit } from '@angular/core';
import { tree } from '../../../assets/mock';
@Component({
  selector: 'tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  tree = tree;
  constructor() { }

  ngOnInit() {
    console.log(tree);
  }

}
