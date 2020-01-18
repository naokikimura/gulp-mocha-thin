import Mocha from 'mocha';
import MochaOptions from 'mocha/lib/cli/options';
import stream from 'stream';

function isMochaOptions(options: string | string[] | Mocha.MochaOptions): options is Mocha.MochaOptions {
  return !(options instanceof String || Array.isArray(options));
}

function requireModule(modules: string | string[]): void {
  (Array.isArray(modules) ? modules : [modules]).filter(id => id).forEach(require);
}

export = (options: string | string[] | Mocha.MochaOptions = {}) => {
  const mochaOptions = isMochaOptions(options) ? options : MochaOptions.loadOptions(options);
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
