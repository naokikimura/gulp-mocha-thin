import Mocha from 'mocha';
import MochaOptions from 'mocha/lib/cli/options';
import stream from 'stream';
import util from 'util';

const debug = util.debuglog('gulp-mocha-thin');

function isMochaOptions(options: string | string[] | Mocha.MochaOptions): options is Mocha.MochaOptions {
  return !(typeof options === 'string' || Array.isArray(options));
}

function requireModule(modules: string | string[]): void {
  (Array.isArray(modules) ? modules : [modules]).filter(id => id).forEach(require);
}

export = (options: string | string[] | Mocha.MochaOptions = '') => {
  const mochaOptions = isMochaOptions(options) ? options : MochaOptions.loadOptions(options);
  debug(`mochaOptions = ${util.inspect(mochaOptions)}`);
  requireModule(mochaOptions && (mochaOptions as any).require);
  const mocha = new Mocha(mochaOptions);
  return new stream.Transform({
    objectMode: true,
    transform(file, encoding, callback) {
      mocha.addFile(file.path);
      this.push(file);
      callback();
    },
    final(callback) {
      mocha.run(failures => {
        callback();
      });
    },
  });
};
