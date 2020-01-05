import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'Usuarios';
  civilStates: Array<string> = ['Soltero', 'Casado', 'Divorciado']
  mask: Array<any> = [/[1-9]/, /\d/, /\d/, /\d/, ' ' , /\d/, /\d/, /\d/, /\d/, /\d/, ' ' , /\d/, /\d/, /\d/, /\d/]
  civilState: string = 'Soltero'

  data: { name: string, lastnames: string, civilState: string, cui: string } = {
    name: '',
    lastnames: '',
    civilState: 'Soltero',
    cui: ''
  }
}
