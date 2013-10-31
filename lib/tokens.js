/* global exports */

(function (exports) {

    'use strict';

    var tokens = {};

    tokens.number = function (num) {
        return {
            type: 'number',
            value: num
        };
    };

    tokens.identifier = function (ident) {
        return {
            type: 'identifier',
            value: ident
        };
    };

    tokens.symbol = function (sym) {
        return {
            type: 'symbol',
            value: sym
        };
    };

    tokens.ifblock = {
        type: 'ifblock',
        value: 'if'
    };

    tokens.elseblock = {
        type: 'elseblock',
        value: 'else'
    };

    tokens.funcarrow = {
        type: 'funcarrow',
        value: '->'
    };

    tokens.openparen = {
        type: 'openparen',
        value: '('
    };

    tokens.closeparen = {
        type: 'closeparen',
        value: ')'
    };

    tokens.openblock = {
        type: 'openblock',
        value: '{'
    };

    tokens.closeblock = {
        type: 'closeblock',
        value: '}'
    };

    tokens.sof = {
        type: 'sof',
        value: 'sof'
    };

    tokens.eof = {
        type: 'eof',
        value: 'eof'
    };

    tokens.newline = {
        type: 'newline',
        value: '\n'
    };

    tokens.comma = {
        type: 'comma',
        value: ','
    };

    tokens.tab = {
        type: 'tab',
        value: '\t'
    };

    exports.tokens = tokens;

}(typeof exports === 'object' && (exports || this)));

