/* global exports, require */

'use strict';

var ProgramData = require('../lib/programdata.js').ProgramData;
var Tokeniser = require('../lib/tokeniser.js').Tokeniser;
var t = require('../lib/tokens.js').tokens;

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.tokeniser = {

    'creation': function (test) {
        var t = new Tokeniser();

        test.ok(t, 'should be created');
        test.done();
    },

    'empty program': function (test) {
        var tokeniser, p, output, expected;

        tokeniser = new Tokeniser();
        p = new ProgramData("");

        output = tokeniser.tokenise(p);
        expected = [
            t.sof,
            t.eof
        ];

        test.deepEqual(output, expected, 'should return p');
        test.done();
    },

    'just spaces': function (test) {
        var tokeniser, p, output, expected;

        tokeniser = new Tokeniser();
        p = new ProgramData("    ");

        output = tokeniser.tokenise(p);
        expected = [
            t.sof,
            t.eof
        ];

        test.deepEqual(output, expected, 'should return p');
        test.done();
    },

    'simple tokenise': function (test) {
        var tokeniser, p, output, expected;

        tokeniser = new Tokeniser();
        p = new ProgramData("ab cd\n5\ngh ij kl");

        output = tokeniser.tokenise(p);
        expected = [
            t.sof,
            t.identifier('ab'),
            t.identifier('cd'),
            t.newline,
            t.number('5'),
            t.newline,
            t.identifier('gh'),
            t.identifier('ij'),
            t.identifier('kl'),
            t.eof
        ];

        test.deepEqual(output, expected, 'should return p');
        test.done();
    }

};

