// class Test
var newTest = (function() {

	// static property
	var sharedVar = "I am shared. But any of you can change me";

	// private static methods
	var privateStaticMethod1 = function() {
		var sharedVar = "I am shared as well";
		return sharedVar;
	};

	var privateStaticMethod2 = function() {
		var sharedVar = "I am also shared. But any of you can change me";
		 return {
		 	getSharedVar: function() {
		 		return sharedVar;
		 	},
		 	setSharedVar: function(newVal) {
		 		sharedVar = newVal;
		 	}
		 };
	};

	var changeSharedVal = function(newVal) {
		sharedVar = newVal;
	};

	var getSharedVar = function() {
		return sharedVar;
	};

	var _newTest = function(initialName, initialPublicProp) {
		var _constructor = (function() {
			
			// private fields of a class
			var private = 'private';
			var privateName = '';

			// private methods of class
			var privateMethod = function() {
				console.log('I am private. If I am not mistaken, you are ' + privateName);
			};

			// class constructor
			function Test(initialName, initialPublicProp) {
				"use strict"; // important to make properties and methods static
				
				// class public fields via Object.defineProperty
				// or Object.defineProperties
				Object.defineProperty(this, 'name', {
					get() {
						return privateName;
					},
					set(newName) {
						privateName = newName;
					}
				});

				// static field declaration
				Object.defineProperty(this, 'staticProp', {
				  value: 'static value',
				  writable: false
				});

				// we can access private fields
				// anywhere inside the class
				privateName = initialName;

				// define public fields via this.property
				this.publicProp = initialPublicProp;

				// define public method via this.methodName
				this.publicMethod = function () {
					console.log("I am public method, and your name is " + privateName);
				}

				// working with static mehtods
				this.getValFromStaticMethod = function () {
					return privateStaticMethod1();
				};

				this.changeSharedVal = function(newVal) {
					changeSharedVal(newVal);
				};

				this.getSharedVar = function () {
					return getSharedVar();
				}
			}

			// class public methods via ClassName.prototype.methodName
			Test.prototype.getPrivate = function () {
				return private;
			};

			Test.prototype.setPrivate = function(newPrivate) {
				private = newPrivate;
			}

			Test.prototype.invokePrivateMethod = function () {
				console.log("I am a public method that calls a private method");
				privateMethod();
			}

			return Test;
		})();

		return new _constructor(initialName, initialPublicProp);
	};

	return _newTest;
})();

// instantiate the class
var test1 = newTest('Rakhymbek', 'public1');

console.log(test1.name);
console.log('...');

test1.setPrivate('private1');
console.log(test1.getPrivate());
console.log('...');

console.log(test1.publicProp);
console.log('...');

test1.publicMethod();
console.log('...');

test1.invokePrivateMethod();
console.log('...');

console.log('private property1', test1.private);
console.log('...');

console.log('private property1', test1.privateName);
console.log('...');

try {
	test1.privateMethod();
} catch(e) {
	console.log("no access1");
}

console.log('...');

console.log('static property1', test1.staticProp);
console.log('...');

try {
	console.log("trying to change the value of the static property1");
	test1.staticProp = "new value for the static property1";
} catch(e) {
	console.log('can not change the value of the static property1')
}

console.log('static property1', test1.staticProp);
console.log('...');

console.log('-----static methods-----');
console.log('...');

console.log('get val from static method1');
console.log(test1.getValFromStaticMethod());
console.log('...');

console.log('get the shared value1');
console.log(test1.getSharedVar());
console.log('...');

console.log('change the shared value1');
test1.changeSharedVal('new value for shared variable1');

console.log('check if the shared val has changed1');
console.log(test1.getSharedVar());

console.log('............');

// instantiate one more time
var test2 = newTest('Saltanat', 'public2');

console.log(test2.name);
console.log('...');

console.log("check if it overrides");
console.log(test1.name);
console.log('...');

test2.setPrivate('private2');
console.log('...');

console.log(test2.getPrivate());
console.log('...');

console.log("check if it overrides");
console.log(test1.getPrivate());
console.log('...');

console.log(test2.publicProp);
console.log('...');

console.log("check if it overrides");
console.log(test1.publicProp);
console.log('...');

test2.invokePrivateMethod();
console.log('...');

console.log("check if it overrides");
test1.invokePrivateMethod();
console.log('...');

test2.publicMethod();
console.log('...');

console.log("check if it overrides");
test1.publicMethod();
console.log('...');

console.log('private property2', test2.private);
console.log('...');

console.log('private property2', test2.privateName);
console.log('...');

try {
	test2.privateMethod();
} catch(e) {
	console.log("no access2");
}

console.log('...');

console.log('static property2', test2.staticProp);
console.log('...');

try {
	console.log("trying to change the value of the static property2");
	test2.staticProp = "new value for the static property2";
} catch(e) {
	console.log('can not change the value of the static property2')
}

console.log('static property2', test2.staticProp);
console.log('...');

console.log('...');

console.log('-----static methods-----');
console.log('...');

console.log('get val from static method2');
console.log(test2.getValFromStaticMethod());
console.log('...');

console.log('get the shared value2');
console.log(test2.getSharedVar());
console.log('...');

console.log('change the shared value2');
test2.changeSharedVal('new value for shared variable2');
console.log('...');

console.log('check if the shared val has changed2');
console.log(test2.getSharedVar());
console.log('...');

console.log('final time make sure it is shared');
console.log(test1.getSharedVar());