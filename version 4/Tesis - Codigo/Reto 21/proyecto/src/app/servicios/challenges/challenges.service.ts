import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  URL = 'http://localhost:9000';

  constructor(
    private http:HttpClient
  ) { }

  createChallenges(body:FormData){
    return this.http.post(`${this.URL}/challenges/createChallenges`,body);
  }

  selectAllChallenges(){
    return this.http.get(`${this.URL}/challenges/selectAllChallenges`);
  }





  selectTraining(form:any){
    return this.http.post(`${this.URL}/challenges/selectTraining`,form);
  }

  insertTraining(form:any){
    return this.http.post(`${this.URL}/challenges/insertTraining`,form);
  }


  deleteTraining(form:any){
    return this.http.post(`${this.URL}/challenges/deleteTraining`,form);
  }


  cancelChallenges(form:any){
    return this.http.post(`${this.URL}/challenges/cancelChallenges`,form);
  }

  updateStateChallenges(form:any){
    return this.http.post(`${this.URL}/challenges/updateStateChallenges`,form);
  }




  selectClientRegistered(form:any){
    return this.http.post(`${this.URL}/challenges/selectClientRegistered`,form);
  }

  selectClientNoRegistered(form:any){
    return this.http.post(`${this.URL}/challenges/selectClientNoRegistered`,form);
  }

  registeredClientToChallenges(form:any){
    return this.http.post(`${this.URL}/challenges/registeredClientToChallenges`,form);
  }

  searchOneUser(form:any){
    return this.http.post(`${this.URL}/challenges/searchOneUser`,form);
  }

  searchDataChallenges(form:any){
    return this.http.post(`${this.URL}/challenges/searchDataChallenges`,form);
  }

  selectState(){
    return this.http.get(`${this.URL}/challenges/selectState`)
  }






  updateChallengesNoImg(form:any){
    return this.http.post(`${this.URL}/challenges/updateChallengesNoImg`,form);
  }

  updateChallengesImg(body:FormData){
    return this.http.post(`${this.URL}/challenges/updateChallengesImg`,body);
  }

  selectDataFromChallenges(form:any){
    return this.http.post(`${this.URL}/challenges/selectDataFromChallenges`,form);
  }

  selectTrainingFromChallenges(form:any){
    return this.http.post(`${this.URL}/challenges/selectTrainingFromChallenges`,form);
  }






  //Metodos del cliente------------------------------------------------------------------

  selectStateChallengesUser(){
    return this.http.get(`${this.URL}/challenges/selectStateChallengesUser`);
  }

  selectTrainingChallenges(form:any){
    return this.http.post(`${this.URL}/challenges/selectTrainingChallenges`,form);
  }

  selectOneTrainingChallenges(form:any){
    return this.http.post(`${this.URL}/challenges/selectOneTrainingChallenges`,form);
  }

  registeredClientChallenges(form:any){
    return this.http.post(`${this.URL}/challenges/registeredClientChallenges`,form);
  }

  validateUserAndChallenges(form:any){
    return this.http.post(`${this.URL}/challenges/validateUserAndChallenges`,form);
  }


  //-------------------------------------------------------------------------------------


}
