import { Component } from '@angular/core'
import { ServerService } from './server.service'
import { MatSnackBar } from '@angular/material/snack-bar'

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

  selectedTabIndex = 0

  allUsers: Array<{id: number, data: IUser}> = []
  allIds: Array<number> = []

  data: IUser = {
    name: '',
    lastname: '',
    civilState: 'Soltero',
    CUI: ''
  }

  constructor (public server: ServerService, private _snackBar: MatSnackBar) {
    this.loadData()
  }

  async loadData() {
    const data = await this.server.getUsers()
    for (let i = 0; i < data.length; i++) {
      data[i].data = JSON.parse(data[i].data)
      this.allIds.push(data[i].id)
    }

    console.log(data)

    this.allUsers = data
  }

  async submitData(data: IUser) {
    const response = await this.server.insertUser(data);

    if (response.status){
      this.openSnackBar('Usuario exitosamente subido')
      this.data = {
        name: '',
        lastname: '',
        civilState: 'Soltero',
        CUI: ''
      }

      this.loadData()

    } else {
      console.log(response)
    }
  }

  uploadClick() {
    this.submitData(this.data)
  }

  openSnackBar(message: string) {
    this._snackBar.open(message);
  }

  logInfo() {
    console.log(this.data)
  }
}

interface IUser { name: string, lastname: string, civilState: string, CUI: string }
