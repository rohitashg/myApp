import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppUtil } from './app.util';
import 'rxjs/Rx';


@Injectable()
export class HttpService {
    constructor(private http: Http, private appUtil: AppUtil) {
    }

    post(url, param) {
        let token = this.appUtil.getAccessToken();
        let body = param //JSON.stringify(param) || null;
        if (token) {
            let options = new RequestOptions({
                headers: new Headers({ 'token': token, 'Content-Type': 'application/json' })
            });
            return this.http.post(url, body, options).map((res: Response) => res.json());
        } else {
            return this.http.post(url, body).map((res: Response) => res.json());
        }

    }

    get(url) {
        let token = this.appUtil.getAccessToken();
        if (token) {
            let options = new RequestOptions({
                headers: new Headers({ 'token': token, 'Content-Type': 'application/json' })
            });
            return this.http.get(url, options).map((res: Response) => res.json());
        } else {
            return this.http.get(url).map((res: Response) => res.json());
        }

    }


    delete(url, param) {
        let token = this.appUtil.getAccessToken();
        let body = JSON.stringify(param) || null;
        if (token) {
            let options = new RequestOptions({
                headers: new Headers({ 'token': token, 'Content-Type': 'application/json' }),
                body: body
            });
            return this.http.delete(url, options).map((res: Response) => res.json());
        } else {
            return this.http.delete(url, body).map((res: Response) => res.json());
        }
    }

    put(url, param) {
        let token = this.appUtil.getAccessToken();
        let body = JSON.stringify(param) || null;
        //if( token ) {
        let options = new RequestOptions({
            headers: new Headers({ 'token': token, 'Content-Type': 'application/json' })
        });
        return this.http.put(url, body, options).map((res: Response) => res.json());
        //} else {
        //return this.http.put(url, body).map((res: Response) => res.json());
        //}

    }

}
