/* global exports, require */

var ProgramData = require('./programdata.js').ProgramData;
var t = require('./tokens.js').tokens;

(function (exports) {

    'use strict';


    var Tokeniser, regexps;

    regexps = {
        isalpha: /[a-zA-Z]/,
        isnumber: /[0-9]/
    };

    Tokeniser = function () {
    };

    Tokeniser.prototype.tokenise = function (data) {
        var program, c, output, tokenising;

        program = new ProgramData(data);
        output = [t.sof];
        tokenising = true;

        while (tokenising) {
            c = program.peek();

            switch (c) {
            case " ":
                program.pop();
                break;
            case "\n":
                program.pop();
                output.push(t.newline);
                break;
            case "\t":
                program.pop();
                output.push(t.newline);
                break;
            case ",":
                program.pop();
                output.push(t.comma);
                break;
            case "(":
                program.pop();
                output.push(t.openparen);
                break;
            case ")":
                program.pop();
                output.push(t.closeparen);
                break;
            default:
                tokenising = false;
                output.push(t.eof);
                break;
            }


        }

        return output;
    };

    Tokeniser.prototype.parseIdentifier = function (program) {
        var identifying, output, c;

        output = "";
        identifying = true;
        while (identifying) {
            c = program.pop();
            if (c.match(regexps.isalpha)) {
                output += c;
            } else {
                program.unpop();
                identifying = false;
            }
        }

        return t.identifier(output);
    };

    Tokeniser.prototype.parseNumber = function (program) {
        var identifying, output, c;

        output = "";
        identifying = true;

        if (program.peek() === '-') {
            output += program.pop();
        }

        while (identifying) {
            c = program.pop();
            if (c.match(regexps.isnumber)) {
                output += c;
            } else {
                program.unpop();
                identifying = false;
            }
        }

        return t.number(output);
    };

    exports.Tokeniser = Tokeniser;


}(typeof exports === 'object' && (exports || this)));

