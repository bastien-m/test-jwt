import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService <T> {
  
  constructor(protected root: string, protected httpService: HttpClient) {
  }

  get apiRoute(): string {
    return `/api/${this.root}`;
  }

  list(): Observable<T[]> {
    return this.httpService.get<T[]>(`/api/${this.root}/all`);
  }

  get(id: number): Observable<T> {
    return this.httpService.get<T>(`/api/${this.root}/${id}`);
  }

  add(o: T): Observable<T> {
    return this.httpService.post<T>(`/api/${this.root}`, o);
  }

  delete(id: number | string): Observable<HttpResponse<any>> {
    return this.httpService.delete<HttpResponse<any>>(`/api/${this.root}/${id}`);
  }

}
