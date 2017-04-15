import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Password } from '../models/password';
import { Category } from '../models/category';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PasswordsService {
    private isEditing: Subject<boolean> = new Subject<boolean>();
    private onDelete: Subject<Password> = new Subject<Password>();
    private onUpdate: Subject<Password> = new Subject<Password>();
    private apiUrl: string = 'http://localhost:9000/api';
    private passwordsUrl: string = this.apiUrl + '/passwords';
    private treeUrl: string = this.passwordsUrl + '/tree';

    onDelete$ = this.onDelete.asObservable();
    onUpdate$ = this.onUpdate.asObservable();
    isEditing$ = this.isEditing.asObservable();

    constructor(private http: Http){

    }

    setIsEditing(editing: boolean) {
        this.isEditing.next(editing);
    }

    getTree(): Observable<any> {
        return this.http.get(this.treeUrl).map(this.extractData).catch(this.handleError);
    }

    getCategories(): Observable<Category[]> {
        return this.http.get(this.apiUrl+'/categories').map(this.extractData).catch(this.handleError);
    }

    remove(pass: Password) : Observable<any> {
        return this.http.delete(`${this.passwordsUrl}/${pass._id}`).map(this.extractData);
    }

    save(pass: Password): Observable<any> {
        if (!pass._id) {
            return this.http.post(this.passwordsUrl, pass).map(this.extractData).catch(this.handleError);
        }
        return this.http.put(`${this.passwordsUrl}/${pass._id}`, pass).map(this.extractData).catch(this.handleError);
    }

    fireOnDeleteEvent(){
        this.onDelete.next();
    }

    fireOnUpdateEvent(pass: Password) {
        this.onUpdate.next(pass);
    }

    handleError(err: Response) {
        return Observable.throw(err);
    }

    extractData(res: Response) {
        return  res.json() || {};
    }
}