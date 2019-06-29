import { Component, OnInit } from '@angular/core';
import { UserCrudService } from 'app/users/user-crud.service';
import { FormGroup } from '@angular/forms';
import { UserModel } from 'app/users/model/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'fjwt-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accountForm: FormGroup
  account: Observable<UserModel>
  fields = ['firstname', 'lastname']
  

  constructor(
    private userService: UserCrudService
  ) { }

  ngOnInit() {
    
  }

}
