import { Plugin } from '../Mod';

export default class WatchMissingNodeModulesPlugin extends Plugin {
  mod = 'react-dev-utils/WatchMissingNodeModulesPlugin';

  constructor(opts = {}){
    super(opts);
    this.init();
  }
};