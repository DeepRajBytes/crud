import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
   readonly url = "http://localhost:3000/users/";
   users: any;

  constructor(private http: HttpClient) {}

  Addupdateuser(user: any, type: any, selectedUserId: any) {
    if (type == 'add'){
      return this.http.post(this.url, user).subscribe(() => {
        this.Getallusers().subscribe((users: any) => {
          this.users = users;
        });
      });
    }
    // {
    //   return 
    //   this.http.get<any[]>(this.url).subscribe(users => {
    //     const maxId = Math.max(...users.map(user => parseInt(user.id, 10)));
    //     user.id = maxId + 1; // Calculate the next ID
    //     this.http.post(this.url, user).subscribe(() => {
    //       this.Getallusers().subscribe((users: any) => {
    //         this.users = users;
    //       });
    //     });
    //   });
    // } 
     else {
      return this.http.put(this.url + selectedUserId, user).subscribe(() => {
        this.Getallusers().subscribe((users: any) => {
          this.users = users;
        });
      });
    }
  }

  Getallusers() {
    return this.http.get(this.url);
  }

  deleteuserbyid(id: any) {
    return this.http.delete(this.url + id);
  }

  getuserbyid(id: any) {
    return this.http.get(this.url + id);
  }
}














