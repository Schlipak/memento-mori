import { parse } from 'qs';

export default class Route {
  #queryHash;

  constructor({ query }) {
    this.query = query;
    this.#queryHash = parse(query);
  }

  param(name) {
    return this.#queryHash[name];
  }

  render() {}
}
