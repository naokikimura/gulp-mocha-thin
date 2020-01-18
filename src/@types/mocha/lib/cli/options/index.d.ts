declare module 'mocha/lib/cli/options' {
  import Mocha from 'mocha';
  export default class MochaOptions {
    public static loadOptions(argv: string | string[]): Mocha.MochaOptions | undefined;
  }
}
