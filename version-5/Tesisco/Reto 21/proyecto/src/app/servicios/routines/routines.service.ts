import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { post } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class RoutinesService {

  URL = 'http://localhost:9000';

  constructor(
    private http: HttpClient
  ) {

  }

  createRoutines(form:any){
    return this.http.post(`${this.URL}/routines/createRoutine`,form);
  }

  getDays(){
    return this.http.get(`${this.URL}/routines/selectDay`);
  }

  getSeries(){
    return this.http.get(`${this.URL}/routines/selectSeries`);
  }

  getRepetitions(){
    return this.http.get(`${this.URL}/routines/selectRepetitions`);
  }

  getTipoEjecucion(){
    return this.http.get(`${this.URL}/routines/selectTipoEjecucion`);
  }

  getListTrainingReg(form:any){
    return this.http.post(`${this.URL}/routines/selectTrainingPlan`,form);
  }


  insertTrainingToPlan(form:any){
    return this.http.post(`${this.URL}/routines/createTraining`, form);
  }

  deleteTrainingToPlan(form:any){
    return this.http.post(`${this.URL}/routines/deleteTraining`,form);
  }

  finishRoutine(form:any){
    return this.http.post(`${this.URL}/routines/finishRoutine`,form);
  }

  cancellRoutine(form:any){
    return this.http.post(`${this.URL}/routines/cancellRoutine`,form);
  }

  cancellRoutinePlan(form:any){
    return this.http.post(`${this.URL}/routines/cancellRoutinePlan`,form);
  }


  cancelRoutinePlanPersonal(form:any){
    return this.http.post(`${this.URL}/routines/cancelRoutinePlanPersonal`,form);
  }


  getRoutines(){
    return this.http.get(`${this.URL}/routines/selectRoutines`);
  }










  getOneRoutines(form:any){
    return this.http.post(`${this.URL}/routines/seletOneRoutine`,form);
  }

  updateNameRoutine(form:any){
    return this.http.post(`${this.URL}/routines/updateNameRoutine`,form);
  }

  cleanTraining(form:any){
    return this.http.post(`${this.URL}/routines/cleanTraining`,form);
  }





  //Actualizar routine general-------------------------------------------------------->

  updateRoutineUser(form:any){
    return this.http.post(`${this.URL}/routines/asssingRoutine`,form);
  }

  createRoutinePersonal(form:any){
    return this.http.post(`${this.URL}/routines/createRoutinePersonal`,form);
  }


  //---------------------------------------------------------------------------------->



  //Métodos para el cliente----------------------------------------------------------->

  selectTrainingOfUser(form:any){
    return this.http.post(`${this.URL}/routines/selectTrainingOfUser`,form);
  }

  validatePlanUser(form:any){
    return this.http.post(`${this.URL}/routines/validatePlanUser`,form);
  }

  searchOneTraining(form:any){
    return this.http.post(`${this.URL}/routines/searchOneTraining`,form);
  }

  createPlanPersonalUser(form:any){
    return this.http.post(`${this.URL}/routines/createPlanPersonalUser`,form);
  }


  //--- Plan de entrenamiento personalizado---





  //---------------------------------------------------------------------------------->





}
