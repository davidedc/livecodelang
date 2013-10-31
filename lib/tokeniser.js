/* global exports, require */

var ProgramData = require('./programdata.js').ProgramData;
var t = require('./tokens.js').tokens;

(function (exports) {

    'use strict';


    var Tokeniser = function () {
    };

    Tokeniser.prototype.tokenise = function (data) {
        var program, c, output, tokenising;

        program = new ProgramData(data);
        output = [t.sof];
        tokenising = true;

        while (tokenising) {
            c = program.peek();

            switch (c) {
            case ' ':
                program.pop();
                break;
            default:
                tokenising = false;
                output.push(t.eof);
                break;
            }


        }

        return output;
    };


    exports.Tokeniser = Tokeniser;


}(typeof exports === 'object' && (exports || this)));

