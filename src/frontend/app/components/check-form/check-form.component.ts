import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logger } from '../../services';

const log = logger('CheckFormComponent', 'component');

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss']
})
export class CheckFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  checkUser(checkForm) {
    log('checkUser', checkForm.value.userId);
    checkForm.controls['userId'].setErrors(null);
    const userId = checkForm.value.userId;

    if (!userId) {
      checkForm.controls['userId'].setErrors({'incorrect': true});
      return;
    }

    checkForm.reset({
      userId: ''
    });

    this.router.navigate(['/home', userId]);
  }
}
