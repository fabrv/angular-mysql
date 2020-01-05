import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  public getUsers (): Promise<any> {
    return new Promise ((users) => {
      this.http.get('http://localhost:4000/users')
      .subscribe(
        data => users(data),
        error => users({status: false, error: error})
      )
    })
  }

  insertUser (data: { name: string, lastnames: string, civilState: string, cui: string }): Promise<any> {
    return new Promise((response)=>{
      this.http.post('http://localhost:4000/users', data).subscribe(
        data => response({status: true, data: data}),
        error => response({status: false, error: error})
      )
    })
  }

  patchUser (id: number, data: { name: string, lastnames: string, civilState: string, cui: string }): Promise<any> {
    return new Promise((response)=>{
      this.http.patch(`http://localhost:4000/users?id=${id}`, data).subscribe(
        data => response({status: true, data: data}),
        error => response({status: false, error: error})
      )
    })
  }
}
