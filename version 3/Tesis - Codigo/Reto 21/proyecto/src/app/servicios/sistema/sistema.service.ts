import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  URL = 'http://localhost:9000';

  constructor(
    private http: HttpClient
  ) { }

    getMision(){
      return this.http.get(`${this.URL}/system/selectMision`);
    }

    putMision(form:any){
      return this.http.put(`${this.URL}/system/updateMision`,form);
    }



    getVision(){
      return this.http.get(`${this.URL}/system/selectVision`);
    }

    putVision(form:any){
      return this.http.put(`${this.URL}/system/updateVision`,form);
    }



    getObjetivo(){
      return this.http.get(`${this.URL}/system/selectObjetivo`);
    }

    putObjetivo(form:any){
      return this.http.put(`${this.URL}/system/updateObjetivo`,form);
    }



    getValues(){
      return this.http.get(`${this.URL}/system/selectValues`);
    }

    putValues(form:any){
      const logo = form;
      return this.http.put(`${this.URL}/system/updateValues`,logo);
    }

    updateLogoImg(body:FormData){
      return this.http.post(`${this.URL}/logo/updateLogoImg`,body);
    }

    getImg(){
      return this.http.get(`${this.URL}/system/selectLogoImg`);
    }

    //Métodos de los planes

    getPlans(){
      return this.http.get(`${this.URL}/plans/selectPlans`);
    }

    getOnePlan(form:any){
      return this.http.post(`${this.URL}/plans/selectOnePlan`, form);
    }

    createPlans(form:any){
      return this.http.post(`${this.URL}/plans/createPlans`,form);
    }

    putPlan(form:any){
      return this.http.put(`${this.URL}/plans/updatePlan`,form);
    }

}
