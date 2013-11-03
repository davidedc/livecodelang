
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
[a-zA-Z]\b            return 'IDENTIFIER'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
"%"                   return '%'
"("                   return '('
")"                   return ')'
"="                   return '='
";"                   return ';'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%right '%'
%left UMINUS

%start program

%% /* language grammar */

program
    : e EOF
        { return $1; }
    | e ';' program
        { return [$1, $2]; }
    ;

assignment
    : IDENTIFIER '=' e
        { $$ = ['=', $1, $2]; }
    ;

expr
    : e
    | assignment
    ;

e
    : e '+' e
        { $$ = ['+', $1, $3]; }
    | e '-' e
        { $$ = ['-', $1, $3]; }
    | e '*' e
        { $$ = ['*', $1, $3]; }
    | e '/' e
        { $$ = ['/', $1, $3]; }
    | e '^' e
        { $$ = ['^', $1, $3]; }
    | e '%'
        { $$ = ['%', $1, $3]; }
    | '-' e %prec UMINUS
        { $$ = ['*', -1, $2]; }
    | '(' e ')'
        { $$ = $2; }
    | NUMBER
        { $$ = Number(yytext); }
    | IDENTIFIER
        { $$ = yytext; }
    ;


