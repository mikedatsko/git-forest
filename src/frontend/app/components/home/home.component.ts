import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpService, state, logger } from '../../services';

const log = logger('HomeComponent', 'component');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userId = '';
  repoList: any[] = [];
  place = 0;
  placePhrase = '';
  placePhraseList: any = {
    1: 'Congratulations! You are the winner',
    2: 'Congratulations! You are thinking like the winner',
    3: 'Congratulations! You are almost the best',
    4: 'Congratulations! You are almost almost the best',
    5: 'Congratulations! You are very close',
    6: 'Congratulations! You are on the right path',
    7: 'Congratulations! Your score is very lucky!',
    8: 'Congratulations! This is very awesome!',
    9: 'Congratulations! Not bad, really not bad',
    10: 'Congratulations! You are the last of the top!',
    else: 'Universe will never forget you'
  };
  userTopList: any[] = [];
  userRepoCount = 0;
  userRepoListError = false;

  constructor(private http: HttpService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getTop();

    this.route
      .paramMap
      .pipe(map(params => params.get('userId') || ''))
      .subscribe(userId => {
        log('userId', userId);

        if (!userId) {
          state['PRELOADER'].setValue(false);
          return;
        }

        this.getForest(userId);
      });
  }

  getForest(userId) {
    state['PRELOADER'].setValue(true);
    this.userRepoListError = false;

    this.http
      .get(`/api/get-tree/${userId}`)
      .subscribe((response: any) => {
        this.repoList = response.repo_list;
        this.userRepoCount = response.user_repo_count;
        this.place = response.user_place;
        this.placePhrase = this.placePhraseList[this.place] || this.placePhraseList.else;

        this.getTop();
      },
    err => {
      state['PRELOADER'].setValue(false);
      this.userRepoListError = true;
    });
  }

  getTop() {
    this.http
      .get('/api/get-top')
      .subscribe((response: any) => {
        this.userTopList = response.user_top_list;
      });
  }
}
