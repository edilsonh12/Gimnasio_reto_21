import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  URL = 'http://localhost:9000';

  constructor(
    private http: HttpClient
  ) { }

  sendEmailActivatedAcount(form:any){
    return this.http.post(`${this.URL}/email/sendEmailActivatedAcount`,form);
  }

  sendEmailAssingQuote(form:any){
    return this.http.post(`${this.URL}/email/sendEmailAssingQuote`,form);
  }

  sendEmailUpdateQuote(form:any){
    return this.http.post(`${this.URL}/email/sendEmailUpdateQuote`,form);
  }

  sendEmailRegisteredAssessment(form:any){
    return this.http.post(`${this.URL}/email/sendEmailRegisteredAssessment`,form);
  }

  sendEmailUpdateAssessment(form:any){
    return this.http.post(`${this.URL}/email/sendEmailUpdateAssessment`,form);
  }

  sendEmailAssingPlanNutrition(form:any){
    return this.http.post(`${this.URL}/email/sendEmailAssingPlanNutrition`,form);
  }

  sendEmailAssingPlanTraining(form:any){
    return this.http.post(`${this.URL}/email/sendEmailAssingPlanTraining`,form);
  }

  sendEmailWelcome(form:any){
    return this.http.post(`${this.URL}/email/sendEmailWelcome`,form);
  }

  sendEmailUpdatePlans(form:any){
    return this.http.post(`${this.URL}/email/sendEmailUpdatePlans`,form);
  }

  sendEmailUpdateTypeAssessment(form:any){
    return this.http.post(`${this.URL}/email/sendEmailUpdateTypeAssessment`,form);
  }

  sendEmailUpdateInfoUser(form:any){
    return this.http.post(`${this.URL}/email/sendEmailUpdateInfoUser`,form);
  }

  sendEmailUpdateTimePago(form:any){
    return this.http.post(`${this.URL}/email/sendEmailUpdateTimePago`,form);
  }

  sendEmailUpdateStateActived(form:any){
    return this.http.post(`${this.URL}/email/sendEmailUpdateStateActived`,form);
  }

  sendEmailUpdateStateBlocked(form:any){
    return this.http.post(`${this.URL}/email/sendEmailUpdateStateBlocked`,form);
  }

  sendEmailCodeUpdatePassword(form:any){
    return this.http.post(`${this.URL}/email/sendEmailCodeUpdatePassword`,form);
  }

  sendEmailResetPassword(form:any){
    return this.http.post(`${this.URL}/email/sendEmailResetPassword`,form);
  }

  sendEmailChangePassword(form:any){
    return this.http.post(`${this.URL}/email/sendEmailChangePassword`,form);
  }






  sendEmailContact(form:any){
    return this.http.post(`${this.URL}/email/sendEmailContact`,form);
  }

  sendEmailBuzon(form:any){
    return this.http.post(`${this.URL}/email/sendEmailBuzon`,form);
  }


}
