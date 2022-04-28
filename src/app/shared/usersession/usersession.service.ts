import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersessionService {

  private sessionStatus = new BehaviorSubject(false)

  getUserSession = this.sessionStatus.asObservable()
  constructor() { }

  setSession(status: any){
    sessionStorage.setItem('userStatus', status)
    this.sessionStatus.next(status)
  }
}
