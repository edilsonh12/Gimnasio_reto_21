import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  URL = "http://localhost:9000";

  constructor(
    private http: HttpClient
  ) { }

  
  createPoll(form:any){
    return this.http.post(`${this.URL}/poll/createPoll`,form);
  }

  selectGenderUserPoll(form:any){
    return this.http.post(`${this.URL}/poll/selectGenderUserPoll`,form);
  }

  validateHistory(form:any){
    return this.http.post(`${this.URL}/poll/validateHistory`,form);
  }

  validateExams(form:any){
    return this.http.post(`${this.URL}/poll/validateExams`,form);
  }

  validateExercise(form:any){
    return this.http.post(`${this.URL}/poll/validateExercise`,form);
  }

  updatePassword(form:any){
    return this.http.post(`${this.URL}/poll/updatePassword`,form);
  }



  //Métodos para el registro de documentos---------------------------------------

  registerDocumentPerson(body:FormData){
    return this.http.post(`${this.URL}/poll/registerDocumentPerson`,body);
  }

  updatePasswordPersonal(form:any){
    return this.http.post(`${this.URL}/poll/updatePasswordPersonal`,form);
  }

  //-----------------------------------------------------------------------------


}
