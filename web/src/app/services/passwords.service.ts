import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Password } from '../models/password';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PasswordsService {
    private isEditing: Subject<boolean> = new Subject<boolean>();
    private onDelete: Subject<Password> = new Subject<Password>();
    private apiUrl: string = 'http://localhost:9000/api';
    private passwordsUrl: string = this.apiUrl + '/passwords';
    private treeUrl: string = this.passwordsUrl + '/tree';

    onDelete$ = this.onDelete.asObservable();
    isEditing$ = this.isEditing.asObservable();

    constructor(private http: Http){

    }

    setIsEditing(editing: boolean) {
        this.isEditing.next(editing);
    }

    getTree(): Observable<any> {
        return this.http.get(this.treeUrl).map(this.extractData).catch(this.handleError);
    }

    remove(pass: Password) : Observable<any> {
        return this.http.delete(`${this.passwordsUrl}/${pass._id}`).map(this.extractData);
    }

    fireOnDeleteEvent(){
        this.onDelete.next();
    }

    handleError(err: Response) {
        return Observable.throw(err);
    }

    extractData(res: Response) {
        return  res.json() || {};
    }
}