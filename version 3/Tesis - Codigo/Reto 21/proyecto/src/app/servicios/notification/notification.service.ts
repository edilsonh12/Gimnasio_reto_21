import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  URL = 'http://localhost:9000';

  constructor(
    private http:HttpClient
  ) {

   }


   //Metodos del cliente-----------------------------------------------------------

   selectAllNotification(form:any){
    return this.http.post(`${this.URL}/notification/selectAllNotification`,form);
   }

   countRowsNotifications(form:any){
    return this.http.post(`${this.URL}/notification/countRowsNotifications`,form);
   }

   deleteNotificationUser(form:any){
    return this.http.post(`${this.URL}/notification/deleteNotificationUser`,form);
   }

   createNotification(form:any){
    return this.http.post(`${this.URL}/notification/createNotification`,form);
   }

   //-------------------------------------------------------------------------------



}