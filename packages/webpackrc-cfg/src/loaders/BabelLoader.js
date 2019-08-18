import { Mod } from '../Mod';

class Babel_Preset_Plu extends Mod { 
  defaultOptions = {
    isBrowser: true,
    isTS: true,
    transformRuntime: true
  }

  constructor(opts = {}){
    super(opts);
    this.init();
  };
};

export default class BabelLoader extends Mod {
  defaultOptions = {
    // babelrc: false,// 置为 true 将忽略部分语法报错
    presets: [ 
      new Babel_Preset_Plu()
    ],
    // cacheDirectory: true// 缓存babel-loader编译结果。置为真值会导致 proposal-class-properties 不能编译装饰属性
  };

  constructor(opts = {}){
    super(opts);
    this.init();
  }

  get dependencies(){
    return ['@babel/core', this.mod];
  }; 

  transform(opts){
    const { presets = [], plugins = [], ...options } = opts;
    let _presets = [];
    let _plugins = [];

    presets.map(preset => {
      if ( !(preset instanceof Mod) ){
        _presets.push(preset);
        return;
      };

      const presetOptions = options[preset.mod];
      if ( !preset.options ){
        if ( !presetOptions ) _presets.push(preset.module);
        else _presets.push([preset.module, presetOptions]);
      } else if ( preset.mod && preset.options ){
        const options = {
          ...preset.options,
          ...(presetOptions || {})
        };
        _presets.push([
          preset.module, 
          options
        ]);
      };
      delete options[preset.mod];
    });

    plugins.map(plugin => {
      if ( !(plugin instanceof Mod) ){
        _plugins.push(plugin);
        return;
      };

      const pluginOptions = options[preset.mod];
      if ( !plugin.options ){
        if ( !pluginOptions ) _plugins.push(plugin.module);
        else _plugins.push([plugin.module, pluginOptions]);
        return;
      } else if ( plugin.mod && plugin.options ){
        const options = {
          ...plugin.options,
          ...(pluginOptions || {})
        };
        _plugins.push([
          plugin.module, 
          options
        ]);
      };
      delete options[plugin.mod];
    });

    return {
      ...this.opts,
      ...options,
      presets: _presets,
      plugins: _plugins
    };
  }

  getOptions(opts = {}){
    const { presets = [], plugins = [], plu = {} } = opts;
    const options = {
      ...opts,
      presets: [...(this.opts.presets || []), ...presets],
      plugins: [...(this.opts.plugins || []), ...plugins]
    };

    return this.transform(options);
  };
};