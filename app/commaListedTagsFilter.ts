/// <reference path="./typings/tsd.d.ts"/>
'use strict';

var _ = require('underscore');

// for a list of words, return a comma-delimeted list with 'and' before the final one
// includes the Oxford comma because it is logically necessary for proper communication; even the succinctness of the code points to this
export = (): Function => {
    return (tags: number[], labels: string[]): string => {
        var words: string[] = _.map(tags, (idx: number): string => {
            return labels[idx];
        });
        if(words.length>1){
            words[words.length-1] = 'and '+words[words.length-1];
        }
        return words.join(', ');
    };
};
