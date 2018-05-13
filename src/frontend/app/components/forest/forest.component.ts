import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { DrawTreeService, state, logger } from '../../services';

const log = logger('ForestComponent', 'component');

@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.scss']
})
export class ForestComponent implements OnInit, OnChanges {
  @Input() repoList: any[] = [];
  @ViewChild('canvas') canvas: ElementRef;
  canvasHeight = 500;
  canvasWidth = 1500;

  constructor(private drawTreeSrv: DrawTreeService) { }

  ngOnInit() {
    this.drawForest();
  }

  ngOnChanges(changes) {
    this.drawForest();
  }

  drawForest() {
    log('drawForest');
    if (!this.repoList || !this.repoList || !this.canvas || !this.canvas.nativeElement) {
      return;
    }

    log('drawForest', 'continue');

    const canvas = this.canvas.nativeElement;
    const repoCount = this.repoList.length;
    const ctx = canvas.getContext('2d');
    this.drawTreeSrv.draw(ctx, this.canvasHeight, this.canvasWidth, this.repoList);

    state['PRELOADER'].setValue(false);
  }
}
