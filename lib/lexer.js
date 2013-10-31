/* global exports, require */

var ProgramData = require('./programdata.js').ProgramData;
var t = require('./tokens.js').tokens;

(function (exports) {

    'use strict';


    var Lexer = function () {
    };

    Lexer.prototype.tokenise = function (data) {
        var program, c, output, tokenising;

        program = new ProgramData(data);
        output = [t.sof];
        tokenising = true;

        while (tokenising) {
            c = program.peek();

            switch (c) {
            case null:
                tokenising = false;
                output.push(t.eof);
                break;
            }


        }

        return output;
    };


    exports.Lexer = Lexer;


}(typeof exports === 'object' && (exports || this)));

