import { Subject } from 'rxjs/Subject';
import { logger } from '../log';

const log = logger('StateService', 'service');

class StateService {
  state: any = {};
  private store: any = {};
  private stateTypes: any = {
    string: '',
    number: 0,
    object: {},
    any: {},
    array: [],
    boolean: false
  };

  constructor() {
    window['GET_STATE'] = this.getState();
  }

  setInitialState(initialState) {
    Object.keys(initialState).forEach(key => {
      this[key] = new Subject();
      this[key].setValue = value => this.setValue(key, value);
      this[key].getValue = () => this.getValue(key);
      this.store[key] = this.stateTypes[initialState[key]];
    });

    log('setInitialState', this.state, this.store);
  }

  setValue(key, value) {
    log('setValue', key, value);
    this.store[key] = value;
    this[key].next(value);
  }

  getValue(key) {
    log('getValue', key);
    return this.store[key];
  }

  getState() {
    return this.store;
  }
}

export const state = new StateService();
