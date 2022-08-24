import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  URL = 'http://localhost:9000';

  constructor(
    private http: HttpClient
  ) { }

  getTrainings(){
    return this.http.get(`${this.URL}/training/selectTraining`);
  }

  getCategory(){
    return this.http.get(`${this.URL}/training/selectCategory`);
  }

  getSubCategory(form:any){
    return this.http.post(`${this.URL}/training/selectSubCategory`,form);
  }

  createTraining(body:FormData){
    return this.http.post(`${this.URL}/training/createTraining`,body);
  }

  getOneTraining(form:any){
    return this.http.post(`${this.URL}/training/selectOneTraining`,form);
  }

  getOneTrainingUpdate(form:any){
    return this.http.post(`${this.URL}/training/selectOneTrainingUpdate`,form);
  }

  updateTraining(form:any){
    return this.http.post(`${this.URL}/training/updateTraining`,form);
  }

  updateTrainingImg(body:FormData){
    return this.http.post(`${this.URL}/training/updateTrainingImg`,body);
  }


}
