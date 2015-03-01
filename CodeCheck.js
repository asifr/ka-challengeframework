// API
// A whitelist of specific functionality. For example, the ability to say 
// "This program MUST use a 'for loop' and a 'variable declaration'."
// A blacklist of specific functionality. For example, the ability to say 
// "This program MUST NOT use a 'while loop' or an 'if statement'."
// Determine the rough structure of the program. For example, 
// "There should be a 'for loop' and inside of it there should be an 'if statement'."

var CodeCheck = (function() {
var CodeCheck = {};

inputEl = null;
requiredTypes = [];
blackListedTypes = [];
code = '';

successMessages = {
	'IfStatement': 'Great! you used an if statement',
	'ForStatement': 'Great! you used a for loop',
	'WhileStatement': 'Great! you used a while statement',
	'ExpressionStatement': 'Great! you used an expression statement',
	'ReturnStatement': 'Great! you used a return statement',
	'FunctionDeclaration': 'Great! you used a function declaration',
	'FunctionExpression': 'Great! you used a function expression'
};

blackListedMessages = {
	'IfStatement': 'If statement is not allowed',
	'ForStatement': 'For loop is not allowed',
	'WhileStatement': 'While statement is not allowed',
	'ExpressionStatement': 'Expression statement is not allowed',
	'ReturnStatement': 'Return statement is not allowed',
	'FunctionDeclaration': 'Function declaration is not allowed',
	'FunctionExpression': 'Function expression is not allowed'
};

requiredTypeMissingMessages = {
	'IfStatement': 'If statement missing',
	'ForStatement': 'For loop missing',
	'WhileStatement': 'While statement missing',
	'ExpressionStatement': 'Expression statement missing',
	'ReturnStatement': 'Return statement missing',
	'FunctionDeclaration': 'Function declaration missing',
	'FunctionExpression': 'Function expression missing'
};

CodeCheck.setInputEl = function (el) {
	inputEl = el;
	return CodeCheck;
};

CodeCheck.setCode = function (c) {
	code = c;
	return CodeCheck;
};

CodeCheck.setRequiredTypes = function (types) {
	requiredTypes = types;
	return CodeCheck;
};

CodeCheck.getRequiredTypes = function (types) {
	return requiredTypes;
};

CodeCheck.setBlackListedTypes = function(types) {
	blackListedTypes = types;
	return CodeCheck;
};

CodeCheck.getBlackListedTypes = function(types) {
	return blackListedTypes;
};

CodeCheck.getMessage = function(type, msgType) {
	if (msgType == 'success') { return successMessages[type]; };
	if (msgType == 'blacklisted') { return blackListedMessages[type]; };
	if (msgType == 'missing') { return requiredTypeMissingMessages[type]; };
};

// deep search through tree.body, returns a flattened array of all functionality types
CodeCheck.scan = function (body, arr) {
	for (var i = body.length - 1; i >= 0; i--) {
		arr[arr.length] = body[i].type;
		if (body[i].body != undefined) {
			arr = CodeCheck.scan(body[i].body.body, arr);
		};
	};
	return arr;
};

// nested in
// CodeCheck.nestedIn = function (body, arr, parents, level) {
// 	for (var i = 0; i < body.length; i++) {
// 		arr.push(body[i].type);
// 		if (body[i].body != undefined) {
// 			out = CodeCheck.nestedIn(body[i].body.body, arr, parents, level);
// 			arr = out[0];
// 			parents = out[1];
// 		};
// 		parents.push(level);
// 	};
// 	return [arr, parents];
// };

// Use regular expressions to quickly test code conditions
CodeCheck.regexText = function (re) {
	return new RegExp(re).test(code);
};

// console.log(scan([{'body':[{'body':[{'body':[],'type':'E'}, {'body':[],'type':'F'}],'type':'C'}, {'body':[],'type':'D'}],'type':'A'},{'body':[],'type':'B'}],[]));

return CodeCheck;
})();