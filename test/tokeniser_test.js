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

    'parse identifier': function (test) {
        var tokeniser, p, result, expected;

        tokeniser = new Tokeniser();
        p = new ProgramData("identify   ");

        result = tokeniser.parseIdentifier(p);
        expected = t.identifier('identify');

        test.deepEqual(result, expected, 'should return p');
        test.done();
    },

    'parse simple number': function (test) {
        var tokeniser, p, result, expected;

        tokeniser = new Tokeniser();
        p = new ProgramData("2352   ");

        result = tokeniser.parseNumber(p);
        expected = t.number('2352');

        test.deepEqual(result, expected, 'should return p');
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
};

