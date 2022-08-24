import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  URL = 'http://localhost:9000';

  constructor(
    private http: HttpClient
  ) { }

  createAlergiaNewUser(form:any){
    return this.http.post(`${this.URL}/assessment/createAlergiaNewUser`,form);
  }

  createEnfermedadNewUser(form:any){
    return this.http.post(`${this.URL}/assessment/createEnfermedadNewUser`,form);
  }

  createMedicamentosNewUser(form:any){
    return this.http.post(`${this.URL}/assessment/createMedicamentosNewUser`,form);
  }

  createInfoGeneral(form:any){
    return this.http.post(`${this.URL}/assessment/createInfoGeneral`,form);
  }

  updateTipUsers(form:any){
    return this.http.post(`${this.URL}/assessment/updateTipUsers`,form);
  }

  createMeasures(form:any){
    return this.http.post(`${this.URL}/assessment/createMeasures`,form);
  }

  createAssessmentBasic(form:any){
    return this.http.post(`${this.URL}/assessment/createAssessmentBasic`,form);
  }

  createMeasuresBasic(form:any){
    return this.http.post(`${this.URL}/assessment/createMeasuresBasic`,form);
  }

  getDocument(form:any){
    return this.http.post(`${this.URL}/assessment/getDocument`,form);
  }

  cancellAssessmentBasic(form:any){
    return this.http.post(`${this.URL}/assessment/cancellAssessmentBasic`,form);
  }

  deleteMeasures(form:any){
    return this.http.post(`${this.URL}/assessment/deleteMeasures`,form);
  }







  createGenerales(form:any){
    return this.http.post(`${this.URL}/assessment/createGenerales`,form);
  }

  createMasa(form:any){
    return this.http.post(`${this.URL}/assessment/createMasa`,form);
  }

  createGrasa(form:any){
    return this.http.post(`${this.URL}/assessment/createGrasa`,form);
  }

  createAssessmentAdvanced(form:any){
    return this.http.post(`${this.URL}/assessment/createAssessmentAdvanced`,form);
  }




  //Valoraciones avanzadas create for new users-------------------------------------------------------------------------->

  updateGenerales(form:any){
    return this.http.post(`${this.URL}/assessment/updateGenerales`,form);
  }

  getAssessmentPhy(){
    return this.http.get(`${this.URL}/assessment/selectAssessmentPhy`);
  }

  updateMasaCorporal(form:any){
    return this.http.post(`${this.URL}/assessment/updateMasaCorporal`,form);
  }

  updateGrasaCorporal(form:any){
    return this.http.post(`${this.URL}/assessment/updateGrasaCorporal`,form);
  }

  getDocumentAdvanced(form:any){
    return this.http.post(`${this.URL}/assessment/getDocumentAdvanced`,form);
  }

  deleteAssessmentAdvanced(form:any){
    return this.http.post(`${this.URL}/assessment/deleteAssessmentAdvanced`,form);
  }

  deleteGenerales(form:any){
    return this.http.post(`${this.URL}/assessment/deleteGenerales`, form);
  }

  deleteMasa(form:any){
    return this.http.post(`${this.URL}/assessment/deleteMasa`,form);
  }

  deleteGrasa(form:any){
    return this.http.post(`${this.URL}/assessment/deleteGrasa`,form);
  }


  //---------------------------------------------------------------------------------------------------------------->



  //Update Assessment for assessment-------------------------------------------------------------------------------->

  searchAssessmentBasic(form:any){
    return this.http.post(`${this.URL}/assessment/searchAssessmentBasic`,form);
   }

   searchAssessmentAdvanced(form:any){
    return this.http.post(`${this.URL}/assessment/searchAssessmentAdvanced`,form);
   }

   selectAssessmentBasic(form:any){
    return this.http.post(`${this.URL}/assessment/selectAssessmentBasic`,form);
   }

   updateWeight(form:any){
    return this.http.post(`${this.URL}/assessment/updateWeight`,form);
   }


   selectAssessmentAdvanced(form:any){
    return this.http.post(`${this.URL}/assessment/selectAssessmentAdvanced`,form);
   }

   selectGenerales(form:any){
    return this.http.post(`${this.URL}/assessment/selectGenerales`,form);
   }

   updategeneralesTwo(form:any){
    return this.http.post(`${this.URL}/assessment/updategeneralesTwo`, form);
   }

   selectMasa(form:any){
    return this.http.post(`${this.URL}/assessment/selectMasa`,form);
   }

   selectGrasa(form:any){
    return this.http.post(`${this.URL}/assessment/selectGrasa`,form);
   }

   selectMeasures(form:any){
    return this.http.post(`${this.URL}/assessment/selectMeasures`,form);
   }

   getHeight(form:any){
    return this.http.post(`${this.URL}/assessment/getHeight`,form);
   }

   createAssessmentBasicOld(form:any){
    return this.http.post(`${this.URL}/assessment/createAssessmentBasicOld`,form);
   }


   createGeneralesOld(form:any){
    return this.http.post(`${this.URL}/assessment/createGeneralesOld`,form);
   }

   selectEstatura(form:any){
    return this.http.post(`${this.URL}/assessment/selectEstatura`,form);
   }



   //Method for dashboard-------------------------------------------------------------->

   selectMeasuresOfUser(form:any){
    return this.http.post(`${this.URL}/assessment/selectMeasuresOfUser`,form);
   }

   selectImc(form:any){
    return this.http.post(`${this.URL}/assessment/selectImc`,form);
   }

   selectMeasuresUserAdvanced(form:any){
    return this.http.post(`${this.URL}/assessment/selectMeasuresUserAdvanced`,form);
   }

   selecGeneralesAdvanced(form:any){
    return this.http.post(`${this.URL}/assessment/selecGeneralesAdvanced`,form);
   }

   selectMasaMuscular(form:any){
    return this.http.post(`${this.URL}/assessment/selectMasaMuscular`,form);
   }

   selectGrasaCorporalAdvanced(form:any){
    return this.http.post(`${this.URL}/assessment/selectGrasaCorporalAdvanced`,form);
   }




   //Quotes------------------------------------------------------------------------------

   selectQuotes(){
    return this.http.get(`${this.URL}/assessment/selectQuotes`);
   }

   selectViewQuotes(form:any){
    return this.http.post(`${this.URL}/assessment/selectViewQuotes`,form);
   }

   selectOneQuotes(form:any){
    return this.http.post(`${this.URL}/assessment/selectOneQuotes`,form);
   }


   //Quotes------------------------------------------------------------------------------



   //Métodos del cliente-----------------------------------------------------------------

   searchTypeAssessmentclient(form:any){
    return this.http.post(`${this.URL}/assessment/searchTypeAssessmentclient`,form);
   }

   searchAssessmentExt(form:any){
    return this.http.post(`${this.URL}/assessment/searchAssessmentExt`,form);
   }






   searchStateQuotes(form:any){
    return this.http.post(`${this.URL}/assessment/searchStateQuotes`,form);
   }

   selectAllReservacion(){
    return this.http.get(`${this.URL}/assessment/selectAllReservacion`);
   }


   CreateSolicitadAssessment(form:any){
    return this.http.post(`${this.URL}/assessment/CreateSolicitadAssessment`,form);
   }

   cancellQuoteAssessment(form:any){
    return this.http.post(`${this.URL}/assessment/cancellQuoteAssessment`,form);
   }

   selectAllQuotesOneUser(form:any){
    return this.http.post(`${this.URL}/assessment/selectAllQuotesOneUser`,form);
   }







   //------------------------------------------------------------------------------------


   //Métodos de recepcion----------------------------------------------------------------

   selectTypeQuote(){
    return this.http.get(`${this.URL}/assessment/selectTypeQuote`);
   }

   selectUserQuotes(){
    return this.http.get(`${this.URL}/assessment/selectUserQuotes`);
   }

   assingQuote(form:any){
    return this.http.post(`${this.URL}/assessment/assingQuote`,form);
   }

   selectTimeQuote(form:any){
    return this.http.post(`${this.URL}/assessment/selectTimeQuote`,form);
   }

   createNotificationQuote(form:any){
    return this.http.post(`${this.URL}/assessment/createNotificationQuote`,form);
   }

   selectAllTimeConfirm(form:any){
    return this.http.post(`${this.URL}/assessment/selectAllTimeConfirm`,form);
   }

   updateStateTemp(form:any){
    return this.http.post(`${this.URL}/assessment/updateStateTemp`,form);
   }

   selectAllState(){
    return this.http.get(`${this.URL}/assessment/selectAllState`);
   }

   updateQuoteAssing(form:any){
    return this.http.post(`${this.URL}/assessment/updateQuoteAssing`,form);
   }

   //------------------------------------------------------------------------------------


}
