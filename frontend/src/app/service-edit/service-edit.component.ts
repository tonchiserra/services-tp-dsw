import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ServicesService } from '../services/services.service';
import { UserService } from '../services/user.service'

@Component({
  selector: 'service-edit',
  templateUrl: './service-edit.component.html'
})
export class ServiceEditComponent {
  showList = true
  showServiceForm = false
  userLogged: any
  serviceList:any[] = []
  selectedService: any

  constructor(
    private authService: AuthService,
    private servicesService: ServicesService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.getUserLogged()
  }

  getUserLogged() {
    this.authService.getUserLogged()
    .subscribe(
      (res: any) => {
        this.userLogged = res.data
        this.getServicesToShow()
      },
      (err: any) => {
        console.log(err)
      }
    )
  }

  getServicesToShow(){
    this.userLogged.services.forEach(async (service: any) =>{
      await fetch('http://localhost:3000/api/services/'+  service)
      .then(res => res.json())
      .then(async response => {
        this.serviceList.push(await response.data);
      })
    })
  }

  handleEdit(service:any){
    this.selectedService = service
    this.showList = false
    this.showServiceForm = true
  }

  handleDelete(service:any){
    let index = this.userLogged.services.indexOf(service._id)
    
    this.userLogged.services.splice(index,1)
    this.serviceList.splice(index,1)

    console.log(this.userLogged)
    this.userService.update(this.userLogged).subscribe(
      (res: any)=>{
      },
      (err: any) => {
        console.log(err)
      } 
    )

    console.log(service._id)
    this.servicesService.delete(service._id).subscribe(
      (res: any) => {
        console.log(res)
      },
      (err: any) => {
        console.log(err)
      }
    )
  }
}
