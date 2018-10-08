import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { VJAPI } from '../../../services/vj.services';
import { User } from '../../../models/user.model';
import { API_BASE_URL } from '../../../models/constants';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: User[];
  userToEdit: User;
  baseUrl: string;

  editUser: boolean = false;
  userId: number;

  selectedItem: number;

  constructor(private vjApi: VJAPI) { 
    this.users = new Array<User>(new User());
    this.baseUrl = API_BASE_URL;
    this.userToEdit = new User();
  }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.vjApi.getAllUsers().subscribe((u) => {
      console.log(u);
      if(u.length > 0) {
        this.users = u;
      }
    })    
  }

  edit(index) {   
    this.userId = this.users[index].id;
    this.userToEdit = this.users[index];
    console.log(this.userId);
    this.editUser = true;
  }

  delete(index) {
    this.selectedItem = index;
  }

  deleteConfirmed() {
    this.vjApi.deleteUserById(this.users[this.selectedItem].id).subscribe((resp)=> {
      console.log(resp);
      this.getAllUsers();
    });
  }

  onCancel(event) {
    if(event == 1) {
      this.editUser = false;
    }

    if(event == 2) {
      this.editUser = false;
      this.getAllUsers();
    }
  }
}
