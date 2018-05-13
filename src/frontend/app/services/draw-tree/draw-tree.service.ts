import { Injectable } from '@angular/core';
import { logger } from '../log';

const log = logger('DrawTreeService', 'service');

@Injectable()
export class DrawTreeService {

  constructor() { }

  draw(ctx, height, width, repoList) {
    log('draw', repoList);
    /*

    Algorithmic Tree - 1.0.0
    drawing trees algorithmically on the HTML5 canvas

    License       : GPL
    Developer     : Sameer Borate: http://codediesel.com
    Web Site      : http://codediesel.com

    */

    const tree = {

      canvas:     '',
      ctx:        '',
      height:     0,
      width:      0,
      spread:     0.6,
      drawLeaves: true,
      leavesColor: '#3bdd46',
      leaveType:  200,

      MAX_BRANCH_WIDTH:   10,
      SMALL_LEAVES:       10,
      MEDIUM_LEAVES:      200,
      BIG_LEAVES:         500,
      THIN_LEAVES:        900,

      /**
       * @member draw
       * tree.draw() initializes tthe tree structure
       *
       * @param {object} ctx      the canvas context
       * @param {integer} h       height of the canvas
       * @param {integer} w       width of the canvas
       * @param {float} spread    how much the tree branches are spread
       *                          Ranges from 0.3 - 1.
       * @param {boolean} leaves  draw leaves if set to true
       *
       */
      draw : function(ctx, h, w, spread, leaves, leaveType, xDiff) {
        // Set how much the tree branches are spread
        if (spread >= 0.3 && spread <= 1) {
          this.spread = spread;
        } else {
          this.spread = 0.6;
        }

        if (leaves === true || leaves === false) {
          this.drawLeaves = leaves;
        } else {
          this.leaves = true;
        }

        if (leaveType == this.SMALL_LEAVES ||
          leaveType == this.MEDIUM_LEAVES ||
          leaveType == this.BIG_LEAVES ||
          leaveType == this.THIN_LEAVES) {
          this.leaveType = leaveType;
        } else {
          this.leaveType = this.MEDIUM_LEAVES;
        }

        this.ctx = ctx;
        this.height = h;
        this.width = w;

        // this.ctx.clearRect(0,0,this.width,this.height);
        // Center the tree in the window
        this.ctx.translate(1500/2 + xDiff, 1000);
        // Set the leaves to a random color
        // this.leavesColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        // Set branch thickness
        this.ctx.lineWidth = 1 + (Math.random() * this.MAX_BRANCH_WIDTH);
        this.ctx.lineJoin = 'round';

        this.branch(0);
        this.ctx.closePath();
        this.ctx.resetTransform();
      },

      /**
       * @member branch
       * tree.branch() main tree drawing function
       *
       * @param {String} depth the maimum depth the tree can branch,
       *        Keep this value near 12, larger value take linger to render.
       *
       */
      branch : function(depth) {
        if (depth < 12) {
          this.ctx.beginPath();
          this.ctx.moveTo(0, 0);
          this.ctx.lineTo(0, -(this.height)/10);

          this.ctx.stroke();

          this.ctx.translate(0, -this.height/10);
          // Random integer from -0.1 to 0.1
          const randomN = -(Math.random() * 0.1) + 0.1;

          this.ctx.rotate(randomN);

          if ((Math.random() * 1) < this.spread) {
            // Draw the left branches
            this.ctx.rotate(-0.35);
            this.ctx.scale(0.7,0.7);
            this.ctx.save();
            this.branch(depth + 1);
            // Draw the right branches
            this.ctx.restore();
            this.ctx.rotate(0.6);
            this.ctx.save();
            this.branch(depth + 1);
            this.ctx.restore();
          } else {
            this.branch(depth);
          }

        } else {
          // Now that we have done drawing branches, draw the leaves
          if(this.drawLeaves) {
            let lengthFactor = 100;
            if(this.leaveType === this.THIN_LEAVES) {
              lengthFactor = 10;
            }
            this.ctx.fillStyle = this.leavesColor;
            this.ctx.fillRect(0, 0, this.leaveType, lengthFactor);
            this.ctx.stroke();
          }
        }
      }
    };

    const diff = 1000 / repoList.length;
    let j = 1;
    let xDiff = 0;

    const repoListLeft = repoList.splice(0, Math.floor(repoList.length / 2));

    repoList.forEach((repo, index) => {
      const xDiff = diff * index;
      tree.draw(ctx, height, width, 0.7, true, 50, xDiff);
    });

    repoListLeft.forEach((repo, index) => {
      const xDiff = diff * (index + 1) * -1;
      tree.draw(ctx, height, width, 0.7, true, 50, xDiff);
    });
  }
}
