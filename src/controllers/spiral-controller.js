import Regl from 'regl';

import ApplicationController from '../application-controller';

import ScreenSurface from '../shaders/screen-surface.vert';
import Spiral from '../shaders/spiral.frag';

export default class extends ApplicationController {
  connect() {
    this.regl = Regl({ canvas: this.canvas });

    if (this.regl) {
      this.init();
    }
  }

  disconnect() {
    super.disconnect();

    if (this.regl) {
      this.regl.destroy();
    }
  }

  get canvas() {
    return this.element;
  }

  init() {
    this.drawSpiral = this.regl({
      vert: ScreenSurface,
      frag: Spiral,

      attributes: {
        position: [
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, -1],
          [1, 1],
          [-1, 1],
        ],
      },

      uniforms: {
        uTime: this.regl.prop('uTime'),
        uResolution: this.regl.prop('uResolution'),
      },

      count: 6,
    });

    this.regl.frame(({ time }) => {
      const { innerWidth, innerHeight } = window;

      this.canvas.width = innerWidth;
      this.canvas.height = innerHeight;

      this.regl.clear({
        color: [0, 0, 0, 0],
        depth: 1,
      });

      this.drawSpiral({
        uTime: time,
        uResolution: [innerWidth, innerHeight],
      });
    });
  }
}
