/* global exports, require */

'use strict';

var ProgramData = require('../lib/programdata.js').ProgramData;
var Lexer = require('../lib/lexer.js').Lexer;

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

exports.programdata = {

    'creation': function (test) {
        var l = new Lexer();

        test.ok(l, 'should be created');
        test.done();
    },

    'empty program': function (test) {
        var l, p;
        l = new Lexer();
        p = new ProgramData("");

        test.ok(l, 'should be created');
        test.done();
    }

};

