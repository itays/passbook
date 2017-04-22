import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
  transform(value, searchTerm){

    if (!searchTerm) {
      return value;
    }
    searchTerm = searchTerm.toLowerCase();
    return JSON.parse(JSON.stringify(value)).filter((cat) => {
      cat.passwords = cat.passwords.filter((pass) => {
        return pass.name.toLowerCase().includes(searchTerm);
      });
      return cat.passwords.length > 0;
    });
  }
}