(function() {

Class = function(classDefinition, classWrapper) {
    if (!classDefinition) throw("Class requires a class definition string as its first argument");
    if (!classWrapper) throw("Class requires a class wrapper function as its second argument");

    // XXX Parse definition
    var className = classDefinition;
    var baseClassName = '';
    var incValues = [];

    var parts = className.split('.');
    var klass = Class.global;
    for (var i = 0; i < parts.length; i++) {
        if (! klass[parts[i]]) {
            klass[parts[i]] = function() {
                try { this.init() } catch(e) {}
            };
        }
        klass = klass[parts[i]];
    }
    klass.className = className;

    klass.isa = function(baseName) {
        klass.baseClassName = baseName;
        if (baseName)
            klass.prototype = eval('new ' + baseName + '()');
    };
    klass.isa(baseClassName);

    klass.global = Class.global;

    // XXX Implement this
    klass.addGlobal = function() {
        // globals++;
        // return Class.global;
    }

    // XXX Implement this
    klass.extend = function() {
    }

    classWrapper.apply(klass, incValues);
}

})();

Class.global = this;

// XXX Implement this for real.
Class.eval_strict = function(func, args) {
    var globals = 0;

    for (var k in Class.global) {
        globals++;
    }

    func.apply(klass, args);

    if (globals != globals_after) {
        throw("Class '" + name + "' defines new global " + (globals_after - globals) + " JavaScript variables without using this.new_global()");
    }

    var globals_after = 0;
    for (var k in Class.global) {
        globals_after++;
    }
}
