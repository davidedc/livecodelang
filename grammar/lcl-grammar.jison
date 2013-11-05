
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */

[0-9]+("."[0-9]+)?\b  return 'NUMBER'
[a-zA-Z]+\b           return 'IDENTIFIER'

/* math operators */
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"%"                   return '%'

/* boolean operators */
"!"                   return '!'
">"                   return '>'
"<"                   return '<'
">="                  return '>='
"<="                  return '<='
"=="                  return '=='
"&&"                  return '&&'
"||"                  return '||'

/* brackets */
"("                   return '('
")"                   return ')'
"{"                   return 'BLOCKSTART'
"}"                   return 'BLOCKEND'

/* assignment */
"="                   return '='

/* function creation */
"->"                  return '->'

/* control structures */
"if"                  return 'IF'
"elif"                return 'ELIF'
"else"                return 'ELSE'

/* misc */
","                   return ','
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '&&' '||'
%left '>' '<' '>=' '<=' '=='
%left '!'
%left '+' '-'
%left '*' '/' '%'
%left '^'
%left UMINUS

%start Program

%% /* language grammar */

Program
    :
    | SourceElements
    ;

SourceElements
    : Statement
        { $$ = $1; }
    | SourceElements ';' Statements
        { $$ = [$1, $3]; }
    ;

Block
    : BLOCKSTART SourceElements BLOCKEND
        {$$ = ['BLOCK', $1]; }
    ;

Statement
    : Assignment
    | FunctionCall
    | IfStructure
    | TimesLoop
    ;

Assignment
    : IDENTIFIER '=' Expression
        { $$ = ['=', $1, $3]; }
    ;

FunctionCall
    : IDENTIFIER FunctionArgs
        { $$ = ['FUNCTIONCALL', $1, $2]; }
    ;

FunctionArgs
    :
    | Expression
    | FunctionArgs ',' Expression
        { $$ = [$1, $2]; }
    ;

IfStructure
    : IF Expression Block
        { $$ = [$1, $2, $3]; }
    | IF Expression Block ELSE Block
        { $$ = [$1, $2, $3, $4]; }
    ;

FunctionDef
    : Identifier '->' '(' FunctionArgNames ')' '->' Expression
        { $$ = ['FUNC', $2, $5]; }
    | Identifier '->' '(' FunctionArgNames ')' '->' Block
        { $$ = ['FUNC', $2, $5]; }
    ;

FunctionArgNames
    :
    | IDENTIFIER
    | FunctionArgNames ',' IDENTIFIER
    ;

TimesLoop
    : NUMBER 'times' '->' Block
        { $$ = ['times', $1, $4]; }
    ;

Expression
    : Expression '+' Expression
        { $$ = ['+', $1, $3]; }
    | Expression '-' Expression
        { $$ = ['-', $1, $3]; }
    | Expression '*' Expression
        { $$ = ['*', $1, $3]; }
    | Expression '/' Expression
        { $$ = ['/', $1, $3]; }
    | Expression '^' Expression
        { $$ = ['^', $1, $3]; }
    | Expression '%' Expression
        { $$ = ['%', $1, $3]; }

    | Expression '>' Expression
        { $$ = ['>', $1, $3]; }
    | Expression '<' Expression
        { $$ = ['<', $1, $3]; }
    | Expression '>=' Expression
        { $$ = ['>=', $1, $3]; }
    | Expression '<=' Expression
        { $$ = ['<=', $1, $3]; }
    | Expression '==' Expression
        { $$ = ['==', $1, $3]; }
    | Expression '&&' Expression
        { $$ = ['&&', $1, $3]; }
    | Expression '||' Expression
        { $$ = ['||', $1, $3]; }

    | '-' Expression %prec UMINUS
        { $$ = ['*', -1, $2]; }
    | '(' Expression ')'
        { $$ = $2; }
    | NUMBER
        { $$ = Number(yytext); }
    | IDENTIFIER
        { $$ = yytext; }
    ;


