import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PasswordsService {
    private isEditing: Subject<boolean> = new Subject<boolean>();
    isEditing$ = this.isEditing.asObservable();

    setIsEditing(editing: boolean){
        this.isEditing.next(editing);
    }
}