import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenCrudService } from '../token-crud.service';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { UserCrudService } from 'app/users/user-crud.service';
import { UserModel } from 'app/users/model/user.model';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'fjwt-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  newToken: FormGroup;
  users: Observable<UserModel[]>;

  constructor(
    private fb: FormBuilder,
    private service: TokenCrudService,
    private dialogRef: MatDialogRef<NewComponent>,
    private userService: UserCrudService
  ) { }

  ngOnInit() {
    this.newToken = this.fb.group({
      user_id: ['', Validators.required]
    })

    this.users = this.userService.list()
      .pipe(catchError(() => {
        this.dialogRef.close({action: false,  err: 'An error occured while fetching data'})
        return []
      }))

  }


  create() {
    this.service.add({
      _id: null,
      user_id: this.newToken.controls['user_id'].value
    })
    .subscribe(
      () => this.dialogRef.close({action: true, err: null}),
      err => this.dialogRef.close({action: false,  err: 'An error occured while adding new token'})
    )
  }

}
