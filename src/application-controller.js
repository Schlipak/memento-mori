import { Controller } from 'stimulus';
import camelCase from 'lodash.camelcase';

class ApplicationController extends Controller {
  constructor(...args) {
    super(...args);

    this.__timeouts = [];
    this.__intervals = [];

    this.element[this.controllerName] = this;
  }

  /**
   * Don't forget to call `super.disconnect()` if you override the disconnect hook.
   */
  disconnect() {
    this.clearAllTimeouts();
    this.clearAllIntervals();

    this.element[this.controllerName] = null;
  }

  /**
   * The controller name in camel came
   */
  get camelCaseIdentifier() {
    return camelCase(this.identifier);
  }

  /**
   * The controller name formatted as {name}Controller.
   */
  get controllerName() {
    return `${this.camelCaseIdentifier}Controller`;
  }

  /**
   * Executes a callback function after some delay.\
   * Same as window.setTimeout, but timeouts are cancelled automatically on disconnect.
   * - Don't forget to call `super.disconnect()` if you override the disconnect hook.
   *
   * @param {function} callback
   * @param {number} [delay=0]
   */
  later(callback, delay = 0) {
    this.__timeouts.push(setTimeout(callback, delay));
  }

  /**
   * Clears all registered timeouts without waiting for controller disconnect.
   */
  clearAllTimeouts() {
    this.__timeouts.forEach((id) => clearTimeout(id));
    this.__timeouts = [];
  }

  /**
   * Execute a callback function at a specific interval.\
   * Same as window.setInterval, but intervals are cancelled automatically on disconnect.
   * - Don't forget to call `super.disconnect()` if you override the disconnect hook.*
   *
   * @param {function} callback
   * @param {number} [delay=1000]
   */
  every(callback, delay = 1000) {
    this.__intervals.push(setInterval(callback, delay));
  }

  /**
   * Clears all registered intervals without waiting for controller disconnect.
   */
  clearAllIntervals() {
    this.__intervals.forEach((id) => clearInterval(id));
    this.__intervals = [];
  }
}

export default ApplicationController;
