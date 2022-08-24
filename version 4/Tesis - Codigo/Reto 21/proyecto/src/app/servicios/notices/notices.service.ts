import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticesService {
  URL = 'http://localhost:9000';

  constructor(
    private http: HttpClient
  ) { }

  getNotices(){
    return this.http.get(`${this.URL}/notice/selectNotice`);
  }

  insertDate(form:any){
    return this.http.post(`${this.URL}/notice/createDate`,form);
  }

  createNotice(body:FormData){
    return this.http.post(`${this.URL}/notice/createNotice`,body);
  }

  getOneNotice(form:any){
    return this.http.post(`${this.URL}/notice/selectOneNotice`,form);
  }

  getFromDelete(form:any){
    return this.http.post(`${this.URL}/notice/selectFromDelete`,form);
  }

  deleteDate(form:any){
    return this.http.post(`${this.URL}/notice/deleteDate`,form);
  }

  deleteNotice(form:any){
    return this.http.post(`${this.URL}/notice/deleteNotice`,form);
  }



  updateNotice(form:any){
    return this.http.post(`${this.URL}/notice/updateNotice`,form);
  }

  updateNoticeImg(body:FormData){
    return this.http.post(`${this.URL}/notice/updateNoticeImg`,body);
  }






  getViewNotices(){
    return this.http.get(`${this.URL}/notice/SelectViewNotice`);
  }

  getViewOneNotice(form:any){
    return this.http.post(`${this.URL}/notice/selectViewOneNotice`,form);
  }

  getViewNoticeExcep(form:any){
    return this.http.post(`${this.URL}/notice/selectPreviewNotice`,form);
  }


  getTreeNotice(form:any){
    return this.http.post(`${this.URL}/notice/selectNoticeTree`,form);
  }

}
