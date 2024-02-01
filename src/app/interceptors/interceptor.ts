import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userOnlineStr = localStorage.getItem('userOnline');

    // Assurez-vous que userOnlineStr n'est pas nul et n'est pas une chaîne vide
    if (userOnlineStr && userOnlineStr.trim() !== '') {
      const userOnline = JSON.parse(userOnlineStr);
      if (userOnline && userOnline.original.data.access_token) {
        const token = userOnline.original.data.access_token;
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    return next.handle(request);
  }
}
