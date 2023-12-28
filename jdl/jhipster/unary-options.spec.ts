/**
 * Copyright 2013-2023 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see https://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-new, no-unused-expressions */
import { before, it, describe, expect as jestExpect } from 'esmocha';
import { expect } from 'chai';
import { unaryOptions } from '../jhipster/index.js';

describe('jdl - UnaryOptions', () => {
  describe('exists', () => {
    describe('when checking for a valid unary option', () => {
      it('should return true', () => {
        expect(unaryOptions.exists(unaryOptions.SKIP_CLIENT)).to.be.true;
      });
    });
    describe('when checking for an invalid unary option', () => {
      it('should return false', () => {
        expect(unaryOptions.exists('NOTHING')).to.be.false;
      });
    });
  });
  describe('forEach', () => {
    describe('when not passing a function', () => {
      it('should fail', () => {
        expect(() => unaryOptions.forEach()).to.throw(/^A function has to be passed to loop over the unary options\.$/);
      });
    });
    describe('when passing a function', () => {
      let result;

      before(() => {
        result = [];
        unaryOptions.forEach(option => result.push(option));
      });

      it('should loop over the unary options', () => {
        jestExpect(result).toMatchInlineSnapshot(`
[
  "skipClient",
  "skipServer",
  "noFluentMethod",
  "readOnly",
  "filter",
  "embedded",
  "secure",
]
`);
      });
    });
  });
});
