import Navigo from 'navigo';

import ApplicationController from '../application-controller';

import HomeRoute from '../routes/home-route';
import TimerRoute from '../routes/timer-route';

export default class extends ApplicationController {
  connect() {
    this.router = new Navigo('http://localhost:5000/', true, '#');

    this.router
      .on({
        timer: this.handleTimer,
        '*': this.handleHome,
      })
      .resolve();
  }

  get routeElement() {
    return this.element.querySelector('[data-route]');
  }

  unmountRoute() {
    return new Promise((resolve) => {
      if (this.routeElement) {
        this.routeElement.classList.add('out');

        this.later(() => {
          this.element.removeChild(this.routeElement);
          resolve();
        }, 800);
      } else {
        resolve();
      }
    });
  }

  renderRoute(route, { params, query }) {
    const domParser = new DOMParser();
    const html = new route({ params, query }).render();

    const doc = domParser.parseFromString(html, 'text/html');

    return doc.querySelector('[data-route]');
  }

  mountRoute(route, { params, query }) {
    this.unmountRoute()
      .then(() => {
        const routeElement = this.renderRoute(route, { params, query });

        routeElement.classList.add('in');

        this.element.appendChild(routeElement);
        this.router.updatePageLinks();

        this.later(() => {
          routeElement.classList.remove('in');
        }, 10);
      })
      .catch((error) => {
        console.error('Unable to navigate away from route:', error);
      });
  }

  handleHome = (params, query) => {
    this.mountRoute(HomeRoute, { params, query });
  };

  handleTimer = (params, query) => {
    this.mountRoute(TimerRoute, { params, query });
  };
}
