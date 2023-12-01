import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup = this.fb.group({
    nombre: ['',   [Validators.required, Validators.minLength (5)]],  // Validators.required para que el campo sea deligenciado obligatoriamente 
    apellido: ['', [Validators.required, Validators.minLength (5)]],  //Validators.minLength (5) Para colocar un requisito de cuantos caracteres debe colocaer para que pueda  deligenciar el formulario
    correo: ['',   [Validators.required, Validators.pattern ('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    
    direccion: this.fb.group({
      distrito:['',Validators.required],
      ciudad:['',Validators.required]
    })
  });

  constructor(private fb: FormBuilder) {

  this.cargarDataAlFormulario();
  }

  ngOnInit(): void {}

  get nombreNoValido(){
    return this.forma.get ('nombre')?.invalid && this.forma.get('nombre')?.touched // para qeu el campo se ponga en rojo cuando no llena el campo
  }
   
  get apellidoNoValido(){
  return this.forma.get ('apellido')?.invalid && this.forma.get('apellido')?.touched
  }
   
  get correoNoValido(){
  return this.forma.get ('correo')?.invalid && this.forma.get('correo')?.touched
  }
  get distritoNoValido(){
    return this.forma.get ('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched
  }
  get ciudadNoValido(){
    return this.forma.get ('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched
  }

 
  //cargarDataAlFormulario sirve para colocar valor por defecto
 cargarDataAlFormulario() {
  this.forma.setValue({
    nombre: '',
    apellido: '',
    correo: '',
    direccion: {
      distrito: '',
      ciudad: ''
    }  
  });
}

 
 
  guardar() {
    console.log(this.forma);
  
    if (this.forma.invalid) {     
      Object.values(this.forma.controls).forEach(control => {
        control.markAsTouched();
        control.setErrors({ 'invalid': true });
      });
    }
    this.forma.reset();  // sirve para que el contenido que queda sea renovado y aparezca para volverlo a llenar
    
  }
 
   
      
  } //if ( this.forma.invalid ) {     

  //return Object.values( this.forma.controls ).forEach( control => {
    // control.markAsUntouche ()
  // se utiliza para cuando uno le da guardar y no se a deligeciado nada se pongan todod los campos en rojo
  
