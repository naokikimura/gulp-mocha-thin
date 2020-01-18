/// <reference types="../src/@types/mocha/lib/cli/options" />

import { expect } from 'chai';
import stream from 'stream';
import mocha from '../src/index';

describe('Plugin', () => {
  it('it should return Transform instance', () => {
    expect(mocha()).to.be.an.instanceof(stream.Transform);
  });
});
