import { Component, OnInit } from '@angular/core';
import { state } from '../../services';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {
  isShowPreloader = true;

  constructor() {
    state['PRELOADER'].subscribe(isShowPreloader => this.isShowPreloader = isShowPreloader);
  }

  ngOnInit() {
  }

}
