import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from '../service/common.service';

declare var $: any;

interface UserDetails {
  name: string;
  age: number;
  email: string;
  number: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  userForm: FormGroup;
  users: any;
  selectedUserId: any;

  constructor(public fb: FormBuilder, private service: CommonService) {
    this.userForm = this.fb.group({
      name: [""],
      email: [""],
      age: [null],
      number: [null]
    });
  }

  ngOnInit(): void {
    this.Getallusers();
  }

  submitForm() {
    var type = this.selectedUserId ? 'update' : 'add';
    this.service.Addupdateuser(this.userForm.value, type, this.selectedUserId);
    this.Getallusers();
    this.userForm.reset();
    alert("Data " + (type == 'add' ? "added" : "updated"));
  }

  Getallusers() {
    this.service.Getallusers().subscribe(users => {
      this.users = users;
    });
  }

  deleteuserbyid(id: any) {
    this.service.deleteuserbyid(id).subscribe(() => {
      this.Getallusers();
      alert("User deleted");
    });
  }

  getuserbyid(id: any) {
    this.service.getuserbyid(id).subscribe(data => {
      const userData = data as UserDetails;
      this.selectedUserId = id;
      $("#home").addClass('show').addClass('active');
      $("#profile").removeClass('show').removeClass('active');
      this.userForm.patchValue({
        name: userData.name,
        email: userData.email,
        number: userData.number,
        age: userData.age,
      });
    });
  }
}
















