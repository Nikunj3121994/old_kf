/// <reference path="node.d.ts" />
/// <reference path="esprima.d.ts" />

import fs = require('fs');
import esprima = require('esprima');
import Node = require('./converter/Node');
import Program = require('./converter/Program');

import Syntax = esprima.Syntax;
import Program = Syntax.Program;


var test1 = fs.readFileSync('../../assets/RotatingCube.js', 'utf-8');
var test2 = fs.readFileSync('../../assets/test2.js', 'utf-8');
var syntax = esprima.parse(test2);

var node = new Node(syntax);
var data = node.getObjectByType(syntax);

console.log(data.toString());

