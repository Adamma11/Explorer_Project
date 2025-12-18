import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor{
    constructor(
        private activateRoute:ActivatedRoute
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const accessToken = localStorage.getItem('accessToken');
        if(req.url.indexOf("jasper") == -1){
            const UpdatedRequest = req.clone({
                headers: req.headers.set('Authorization',`Bearer ${accessToken}`)
            })
            return next.handle(UpdatedRequest);
        }else{
            return next.handle(req);
        }
    }

}