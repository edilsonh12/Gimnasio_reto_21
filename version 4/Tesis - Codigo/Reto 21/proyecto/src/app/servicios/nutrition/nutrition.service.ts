import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NutritionService {

  URL = 'http://localhost:9000';

  constructor(
    private http:HttpClient
  ) { }

  selectNewUsers(){
    return this.http.get(`${this.URL}/nutrition/selectNewUsers`);
  }

  selectOldUsers(){
    return this.http.get(`${this.URL}/nutrition/selectOldUsers`);
  }










  selectNutritionGeneral(){
    return this.http.get(`${this.URL}/nutrition/selectNutritionGeneral`);
  }

  searchOnePlanNutrition(form:any){
    return this.http.post(`${this.URL}/nutrition/searchOnePlanNutrition`,form);
  }

  assingNutritionForOldUser(form:any){
    return this.http.post(`${this.URL}/nutrition/assingNutritionForOldUser`,form);
  }







  assingNutritionForNewUser(form:any){
    return this.http.post(`${this.URL}/nutrition/assingNutritionForNewUser`,form);
  }


  selectNameNutrition(form:any){
    return this.http.post(`${this.URL}/nutrition/selectNameNutrition`,form);
  }

  selectDateNutrition(form:any){
    return this.http.post(`${this.URL}/nutrition/selectDateNutrition`,form);
  }

  updateNutrition(form:any){
    return this.http.post(`${this.URL}/nutrition/updateNutrition`,form);
  }





  //Métodos para la nutricionista---------------------------------------------------------------------

  createPlanNutrition(form:any){
    return this.http.post(`${this.URL}/nutrition/createPlanNutrition`,form);
  }

  createPlanNutritionPersonal(form:any){
    return this.http.post(`${this.URL}/nutrition/createPlanNutritionPersonal`,form);
  }



  selectAlimento(){
    return this.http.get(`${this.URL}/nutrition/selectAlimento`);
  }

  selectIngredientes(form:any){
    return this.http.post(`${this.URL}/nutrition/selectIngredientes`,form);
  }

  createAlimento(form:any){
    return this.http.post(`${this.URL}/nutrition/createAlimento`,form);
  }

  validateBreakfast(form:any){
    return this.http.post(`${this.URL}/nutrition/validateBreakfast`,form);
  }

  cancellPocess(form:any){
    return this.http.post(`${this.URL}/nutrition/cancellPocess`,form);
  }

  cancellPocessPersonal(form:any){
    return this.http.post(`${this.URL}/nutrition/cancellPocessPersonal`,form);
  }





  assingNutritionOldUser(form:any){
    return this.http.post(`${this.URL}/nutrition/assingNutritionOldUser`,form);
  }

  selectRegisteredNutrition(form:any){
    return this.http.post(`${this.URL}/nutrition/selectRegisteredNutrition`,form);
  }



  selectOneRegisteredNutrition(form:any){
    return this.http.post(`${this.URL}/nutrition/selectOneRegisteredNutrition`,form);
  }

  deleteDataNutrition(form:any){
    return this.http.post(`${this.URL}/nutrition/updateDataNutrition`,form);
  }









  searchNameNutrition(form:any){
    return this.http.post(`${this.URL}/nutrition/searchNameNutrition`,form);
  }

  selectDataNutritionPersonal(form:any){
    return this.http.post(`${this.URL}/nutrition/selectDataNutritionPersonal`,form);
  }

  selectInfoGeneralUser(form:any){
    return this.http.post(`${this.URL}/nutrition/selectInfoGeneralUser`,form);
  }

  selectRegisteredAlimentoUsers(form:any){
    return this.http.post(`${this.URL}/nutrition/selectRegisteredAlimentoUsers`,form);
  }






  //Métodos del cliente----------------------------------------------------------------------

  searchIDNutrition(form:any){
    return this.http.post(`${this.URL}/nutrition/searchIDNutrition`,form);
  }


}
