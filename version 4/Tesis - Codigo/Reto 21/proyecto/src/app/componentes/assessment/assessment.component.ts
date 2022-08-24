import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AssessmentService } from 'src/app/servicios/assessment/assessment.service';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  encryptMode: boolean|any;
  textToConvert: string|any;
  password: string = 'gKB&uH0MZQVfJA1fE%aW';
  conversionOutput: string|any;


  filtro_nuevos:any = '';
  filtro_antiguos:any = '';


  p:any = 1;
  page:any = 1;
  page_edit:any = 1;

  listAuxiliar:any;

  listNewUser:any;

  listOldUserFirst:any;
  listOldUserSecond:any;

  documento_valoracion:any;
  tipo_valoracion:any;
  listAssessmentDate:any;

  documento:any;
  id_valoracion:any;

  alergia:any = 'Seleccione';
  enfermedades:any = 'Seleccione';
  medicamentos:any = 'Seleccione';

  alergias_temp:any = 0;
  medicamentos_temp:any = 0;
  enfermedades_temp:any = 0;

  alergiasTemp:any = '';
  medicamentosTemp:any = '';
  enfermedadesTemp:any = '';

  formFirstAssessment = new FormGroup({
    id_general: new FormControl('',Validators.required),
    id_info: new FormControl('',Validators.required),
    id_valoracion: new FormControl('',Validators.required),
    documento: new FormControl('',Validators.required),
    estatura: new FormControl('',Validators.required),
    peso: new FormControl('',Validators.required),
    fuma: new FormControl('',Validators.required),
    alcohol: new FormControl('',Validators.required),
    cafe:new FormControl('',Validators.required),
    ejercicio: new FormControl('',Validators.required),
    cirugias: new FormControl('',Validators.required),
    alergias: new FormControl('',Validators.required),
    medicamentos: new FormControl('',Validators.required),
    enfermedades: new FormControl('',Validators.required)
  });

  constructor(
    private router:Router,
    private assessment:AssessmentService,
    private auth:AuthUsersService
  ) {

    this.updateData();

  }

  ngOnInit(): void {
  }

  updateData(){

    this.auth.selectNewUsers().subscribe(res => {

      this.listNewUser = res;


    });

    this.auth.selectOldUsersFirstPart().subscribe(res => {

      this.listOldUserFirst = res;

    });

    this.auth.selectOldUsersSecondtPart().subscribe(res => {

      this.listOldUserSecond = res;

    });

  }

  getDocumentFirst(documento:any,id_valoracion:any){


    Swal.fire({
      icon: 'warning',
      title: 'Recuerda que:',
      text: 'Para iniciar con el registro de la primera valoración primero debe responder una encuesta'
    }).then(response => {
      this.documento = documento;
      this.id_valoracion = id_valoracion;
    });

  }

  changueAlergia(alergia:any){

    if(alergia == 'Si'){
      this.alergias_temp = '1';
    }else{
      this.alergias_temp = '';
    }

  }

  changueEnfermedades(enfermedades:any){

    if(enfermedades == 'Si'){
      this.enfermedades_temp = '1';
    }else{
      this.enfermedades_temp = '';
    }

  }

  changueMedicamentos(medicamentos:any){

    if(medicamentos == 'Si'){
      this.medicamentos_temp = '1';
    }else{
      this.medicamentos_temp = '';
    }

  }

  createFirstAssessment(form:any){

    if(form.estatura == '' || form.peso == ''){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Debe llenar todos los campos con datos'
      })

    }else{

      if(form.fuma == 'Seleccione' || form.alcohol=='Seleccione' || form.cafe == 'Seleccione' || form.ejercicio == 'Seleccione' || form.cirugias == 'Seleccione' || form.alergias == 'Seleccione' || form.medicamentos == 'Seleccione' || form.enfermedades == 'Seleccione'){

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'Debe seleccionar una opción en todos los campos'
        })

      }else{

        if(form.alergias == 'Si'){
          form.alergias = this.alergiasTemp;
        }else if(form.alergias == 'No'){
          form.alergias = 'No padece';
        }

        if(form.enfermedades == 'Si'){
          form.enfermedades = this.enfermedadesTemp;
        }else if(form.enfermedades == 'No'){
          form.enfermedades = 'No padece';
        }

        if(form.medicamentos == 'Si'){
          form.medicamentos = this.medicamentosTemp;
        }else if(form.medicamentos == 'No'){
          form.medicamentos = 'No consume';
        }

        const id_info = Math.floor((Math.random() * (99999999-10000000))+10000000);
        form.id_info = id_info;
        const id_general = Math.floor((Math.random() * (99999999-10000000))+10000000);

        const id_alergias= id_general;
        const alergia = form.alergias;

        let forms = {};
        forms = {id_alergias,alergia};
        console.log(forms);

        this.assessment.createAlergiaNewUser(forms).subscribe(res => {

          if(res == 'Alergia registrada con exito'){

            const id_enfermedad = id_general;
            const enfermedad = form.enfermedades;

            let forms = {};
            forms = {id_enfermedad, enfermedad};

            this.assessment.createEnfermedadNewUser(forms).subscribe(res => {

              if(res == 'Enfermedad registrada con exito'){

                const id_medicamentos = id_general;
                const medicamento = form.medicamentos;

                let forms = {};
                forms = {id_medicamentos, medicamento};

                this.assessment.createMedicamentosNewUser(forms).subscribe(res => {

                  if(res == 'Medicamento registrado'){

                    const fuma = form.fuma;
                    const alcohol = form.alcohol;
                    const cafe = form.cafe;
                    const ejercicio = form.ejercicio;
                    const cirugias = form.cirugias;
                    const alergias = id_general;
                    const medicamentos = id_general;
                    const enfermedades = id_general;

                    let forms = {};
                    forms = {id_info,fuma,alcohol,cafe,ejercicio,cirugias,alergias,medicamentos,enfermedades};

                    this.assessment.createInfoGeneral(forms).subscribe(res => {

                      if(res == 'Info_general registrado con exito'){

                        const documento_tipo = form.documento;
                        const info_general = id_info;


                        let forms = {};
                        forms = {documento_tipo,info_general};


                        this.assessment.updateTipUsers(forms).subscribe(res => {

                          if(res == 'Users actualizados'){

                            if(this.id_valoracion == 1){
                              //Valoración básica

                              const id_medidas = Math.floor((Math.random() * (99999999-10000000))+10000000);

                              let forms = {};
                              forms = {id_medidas};

                              this.assessment.createMeasures(forms).subscribe(res => {

                                if(res == 'Registro de medidas creado'){

                                  const peso = form.peso;
                                  const estatura = form.estatura;

                                  const documento_valoracion = form.documento;
                                  const id_medidas_valoracion = id_medidas;

                                  const altura_al_cuadrado =  Math.pow(form.estatura,2);
                                  const imc = form.peso/altura_al_cuadrado;

                                  let forms = {};
                                  forms = {documento_valoracion,id_medidas_valoracion,imc,peso,estatura};

                                  this.assessment.createAssessmentBasic(forms).subscribe(res => {

                                    if(res == 'Valoracion creada con exito'){

                                      Swal.fire({
                                        icon: 'success',
                                        title: 'Proceso Completado',
                                        text: 'A continuación debe ingresar los datos pertenecientes a la valoración'
                                      }).then(response => {

                                        this.formFirstAssessment.reset();

                                        this.alergia = 'Seleccione';
                                        this.enfermedades = 'Seleccione';
                                        this.medicamentos = 'Seleccione';

                                        this.alergias_temp = 0;
                                        this.medicamentos_temp = 0;
                                        this.enfermedades_temp = 0;

                                        this.alergiasTemp = '';
                                        this.enfermedadesTemp = '';
                                        this.medicamentosTemp = '';

                                        this.router.navigateByUrl('assessment-basic/'+id_medidas_valoracion);

                                      });

                                    }else{

                                      Swal.fire({
                                        icon: 'error',
                                        title: 'Proceso Fallido',
                                        text: 'No es posible realizar el proceso actualmente, intente nuevamente'
                                      })

                                    }


                                  });


                                }else{

                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Proceso Fallido',
                                    text: 'No es posible realizar el proceso actualmente, intente nuevamente'
                                  })

                                }



                              });




                            }else{
                              //Valoración avanzada---------------------------------------------------------------------------->

                              const id_generalis = Math.floor((Math.random() * (99999999-10000000))+10000000);


                              const id_medidas = id_generalis;

                              let forms = {};
                              forms = {id_medidas};

                              this.assessment.createMeasures(forms).subscribe(res => {

                                  if(res == 'Registro de medidas creado'){

                                    const id_generales = id_generalis;

                                    const peso = form.peso;
                                    const estatura = form.estatura;

                                    const altura_al_cuadrado =  Math.pow(form.estatura,2);
                                    const imc = form.peso/altura_al_cuadrado;

                                    let forms = {};
                                    forms = {id_generales,peso,imc,estatura};

                                    this.assessment.createGenerales(forms).subscribe(res => {

                                      if(res == 'Generales registrado con exito'){

                                        const id_masa = id_generalis;

                                        let forms = {};
                                        forms = {id_masa};

                                        this.assessment.createMasa(forms).subscribe(res => {

                                          if(res == 'Masa registrada con exito'){

                                            const id_grasa = id_generalis;

                                            let forms = {};
                                            forms = {id_grasa};

                                            this.assessment.createGrasa(forms).subscribe(res => {

                                              if(res == 'Grasa creada con exito'){

                                                const id_grasa_valoracion = id_generalis;
                                                const id_generales_valoracion = id_generalis;
                                                const id_masa_valoracion = id_generalis;
                                                const id_medidas_valoracion = id_generalis;
                                                const documento_valoracion = form.documento;

                                                let forms = {};
                                                forms = { documento_valoracion, id_medidas_valoracion, id_generales_valoracion, id_masa_valoracion, id_grasa_valoracion };

                                                this.assessment.createAssessmentAdvanced(forms).subscribe(res => {

                                                  if(res == 'Valoracion creada con exito'){

                                                    Swal.fire({
                                                      icon: 'success',
                                                      title: 'Proceso Completado',
                                                      text: 'A continuación debe ingresar los datos pertenecientes a la valoración'
                                                    }).then(response => {

                                                      this.formFirstAssessment.reset();

                                                      this.alergia = 'Seleccione';
                                                      this.enfermedades = 'Seleccione';
                                                      this.medicamentos = 'Seleccione';

                                                      this.alergias_temp = 0;
                                                      this.medicamentos_temp = 0;
                                                      this.enfermedades_temp = 0;

                                                      this.alergiasTemp = '';
                                                      this.enfermedadesTemp = '';
                                                      this.medicamentosTemp = '';

                                                      this.router.navigateByUrl('assessment-advanced/'+id_generalis);

                                                    });



                                                  }else{

                                                    Swal.fire({
                                                      icon: 'error',
                                                      title: 'Proceso Fallido',
                                                      text: 'No es posible realizar el proceso actualmente, intente nuevamente'
                                                    })

                                                  }

                                                });

                                              }else{

                                                Swal.fire({
                                                  icon: 'error',
                                                  title: 'Proceso Fallido',
                                                  text: 'No es posible realizar el proceso actualmente, intente nuevamente'
                                                })

                                              }

                                            });


                                          }else{

                                            Swal.fire({
                                              icon: 'error',
                                              title: 'Proceso Fallido',
                                              text: 'No es posible realizar el proceso actualmente, intente nuevamente'
                                            })

                                          }


                                        });


                                      }else{

                                        Swal.fire({
                                          icon: 'error',
                                          title: 'Proceso Fallido',
                                          text: 'No es posible realizar el proceso actualmente, intente nuevamente'
                                        })

                                      }

                                    });


                                  }else{

                                    Swal.fire({
                                      icon: 'error',
                                      title: 'Proceso Fallido',
                                      text: 'No es posible realizar el proceso actualmente, intente nuevamente'
                                    })

                                  }

                              });




                            }

                          }else{

                            Swal.fire({
                              icon: 'error',
                              title: 'Proceso Fallido',
                              text: 'No es posible realizar el proceso actualmente, intente nuevamente'
                            })

                          }

                        });


                      }else{

                        Swal.fire({
                          icon: 'error',
                          title: 'Proceso Fallido',
                          text: 'No es posible realizar el proceso actualmente, intente nuevamente'
                        })

                      }

                    });



                  }else{

                    Swal.fire({
                      icon: 'error',
                      title: 'Proceso Fallido',
                      text: 'No es posible realizar el proceso actualmente, intente nuevamente'
                    })

                  }

                });


              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'No es posible realizar el proceso actualmente, intente nuevamente'
                })

              }

            });


          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar el proceso actualmente, intente nuevamente'
            })

          }


        });


      }


    }



  }


  searchAssessment(documento:any,tipo_valoracion:any){

    this.documento_valoracion = documento;
    const documento_valoracion = documento;
    const tipoValoracion = tipo_valoracion;
    this.tipo_valoracion = tipo_valoracion;

    let form = {};
    form = {documento_valoracion};

    if(tipoValoracion == 'Básico'){

      this.assessment.searchAssessmentBasic(form).subscribe(res => {

        this.listAssessmentDate = res;

      });

    }else if(tipoValoracion == 'Avanzado'){

      this.assessment.searchAssessmentAdvanced(form).subscribe(res => {

        this.listAssessmentDate = res;

      });


    }



  }


  fromEditAssessment(id_medidas_valoracion:any){

    Swal.fire({
      icon: 'warning',
      title: 'Actualización de información',
      text: 'A continuación podrá realizar la actualización de la información perteneciente a dicha valoracion'
    }).then(response => {

      if(this.tipo_valoracion == 'Básico'){

        this.router.navigateByUrl('assessment-basic-update/'+id_medidas_valoracion);

      }else if(this.tipo_valoracion == 'Avanzado'){

        this.router.navigateByUrl('assessment-advanced-update/'+id_medidas_valoracion);

      }

    });


  }


  createOldAssessment(documento_valoracion:any,tipo_valoracion:any){

    if(tipo_valoracion == 'Básico'){

      const id_medidas = Math.floor((Math.random() * (99999999-10000000))+10000000);
      let form = { id_medidas };

      this.assessment.createMeasures(form).subscribe(res => {

        if(res == 'Registro de medidas creado'){

          let form = {documento_valoracion};

          this.assessment.getHeight(form).subscribe(res => {

            this.listAuxiliar = res;
            let estatura:any = '';

            for(let x of this.listAuxiliar){
              estatura = x.estatura;
            }
            const id_medidas_valoracion = id_medidas;
            let form = {documento_valoracion,id_medidas_valoracion,estatura};
            console.log(form);
            this.assessment.createAssessmentBasicOld(form).subscribe(res => {

              if(res == 'Valoracion creada con exito'){

                Swal.fire({
                  icon: 'warning',
                  text: 'A continuación deberá llenar los datos requeridos para completar el proceso de valoración'
                }).then(response => {

                  this.router.navigateByUrl('assessment-basic-create-new/'+id_medidas_valoracion);

                });


              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible realizar la petición realizada, intente nuevamente'
                })

              }

            });


          });

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Actualmente no es posible realizar la petición realizada, intente nuevamente'
          })

        }


      });






    }else if(tipo_valoracion == 'Avanzado'){
      //Valoración avanzada

      const id_general = Math.floor((Math.random() * (99999999-10000000))+10000000);

      const id_medidas = id_general;
      let form = { id_medidas };
      this.assessment.createMeasures(form).subscribe(res => {

        if(res == 'Registro de medidas creado'){


          const documento = documento_valoracion;
          let form = {documento};

          this.assessment.selectEstatura(form).subscribe(res => {

            this.listAuxiliar = res;
            let estatura:any = '';
            for(let x of this.listAuxiliar){
              estatura = x.estatura;
            }

            const id_generales = id_general;
            let form = {id_generales,estatura};

            this.assessment.createGeneralesOld(form).subscribe(res => {

              if(res == 'Generales creados con exito'){

                const id_masa = id_general;
                let form = {id_masa};
                this.assessment.createMasa(form).subscribe(res => {

                  if(res == 'Masa registrada con exito'){

                    const id_grasa = id_general;
                    let form = {id_grasa};

                    this.assessment.createGrasa(form).subscribe(res => {

                      if(res == 'Grasa creada con exito'){

                        const id_medidas_valoracion = id_medidas;
                        const id_generales_valoracion = id_generales;
                        const id_masa_valoracion = id_masa;
                        const id_grasa_valoracion = id_grasa;

                        let form = {documento_valoracion,id_medidas_valoracion,id_generales_valoracion,id_masa_valoracion,id_grasa_valoracion};

                        this.assessment.createAssessmentAdvanced(form).subscribe(res => {

                          if(res == 'Valoracion creada con exito'){

                            Swal.fire({
                              icon: 'warning',
                              text: 'A continuación podrá realizar la actualización de la información perteneciente a dicha valoracion'
                            }).then(response => {

                              this.router.navigateByUrl('assessment-advanced-create-new/'+id_generales);

                            });

                          }else{

                            Swal.fire({
                              icon: 'error',
                              title: 'Proceso Fallido',
                              text: 'Actualmente no es posible realizar la petición realizada, intente nuevamente'
                            })

                          }

                        });

                      }else{

                        Swal.fire({
                          icon: 'error',
                          title: 'Proceso Fallido',
                          text: 'Actualmente no es posible realizar la petición realizada, intente nuevamente'
                        })

                      }

                    });

                  }else{

                    Swal.fire({
                      icon: 'error',
                      title: 'Proceso Fallido',
                      text: 'Actualmente no es posible realizar la petición realizada, intente nuevamente'
                    })

                  }

                });

              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible realizar la petición realizada, intente nuevamente'
                })

              }


            });




          });


        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Actualmente no es posible realizar la petición realizada, intente nuevamente'
          })

        }


      });


    }

  }


  goToDashboard(documento:any,tipo_valoracion:any){

    if(tipo_valoracion == 'Básico'){
      //Valoración básica-----------------------------------

      this.textToConvert = documento;
      this.encrypt();

      localStorage.setItem('assessment',this.conversionOutput);

      this.router.navigateByUrl('dashboard-basic');


    }else if(tipo_valoracion == 'Avanzado'){
      //Valoración avanzada---------------------------------

      this.textToConvert = documento;
      this.encrypt();

      localStorage.setItem('assessment',this.conversionOutput);

      this.router.navigateByUrl('dashboard-advanced');

    }

  }


  encrypt() {
    this.conversionOutput = CryptoJS.AES.encrypt(this.textToConvert.trim(), this.password.trim()).toString();
  }

  decrypt(){
    this.conversionOutput = CryptoJS.AES.decrypt(this.textToConvert.trim(), this.password.trim()).toString(CryptoJS.enc.Utf8);
  }





    //Botón del paginador ----------------------
    handlePageChange(event:any) {
        this.p = event;
    }

    change_page(event:any) {
      this.page = event;
    }

    change_page_edit(event:any) {
      this.page_edit = event;
    }

    //..........................................
}
