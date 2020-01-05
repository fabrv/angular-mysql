import { Component } from '@angular/core';
import { ServerService } from './server.service'

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
    lastnames: '',
    civilState: 'Soltero',
    CUI: ''
  }

  constructor (private server: ServerService) {
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
}

interface IUser { name: string, lastnames: string, civilState: string, CUI: string }
