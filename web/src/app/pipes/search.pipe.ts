import { Pipe, PipeTransform } from '@angular/core';
var _ = require('lodash');


@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
  transform(value, searchTerm){

    if (!searchTerm) {
      return value;
    }
    searchTerm = searchTerm.toLowerCase();
    return _.filter(JSON.parse(JSON.stringify(value)), (cat) => {
      cat.passwords = _.filter(cat.passwords, pass => pass.name.toLowerCase().includes(searchTerm));
      return cat.passwords.length > 0;
    });
  }
}