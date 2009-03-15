(function() {

Class = function(classDefinition, classWrapper) {
    if (!classDefinition) throw("Class requires a class definition string as its first argument");
    if (!classWrapper) throw("Class requires a class wrapper function as its second argument");

    if (! classDefinition.match(/^([\w\.]+)(?:\(\s*([\w\.]+)\s*\))?(?:\s+(.*?)\s*)?$/))
        throw("Can't parse Class Definition: '" + classDefinition + "'");
    var className = RegExp.$1;
    var baseClassName = RegExp.$2 || '';
    var options = [];
    if (RegExp.$3) {
        options = RegExp.$3.split(/\s+/);
    }
    var incValues = [];
    var strict = true;
    for (var i = 0, l = options.length; i < l; i++) {
        var option = options[i];
        if (option == '-nostrict') {
            strict = false;
        }
        if (option.match(/^-inc=(.+)$/)) {
            incValues = RegExp.$1.split(',');
        }
    }

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
        if (baseName) {
            klass.prototype = eval('new ' + baseName + '()');
        }
    };
    klass.isa(baseClassName);

    klass.global = Class.global;

    // XXX Implement this
    klass.addGlobal = function() {
        // globals++;
        // return Class.global;
    }

    klass.extend = function(pairs) {
        if (typeof pairs != 'object') {
            throw("extend requires an object of name:value pairs");
        }
        for (var name in pairs) {
            klass.prototype[name] = pairs[name];
        }
    }

    for (var ii = 0, ll = incValues.length; ii < ll; ii++) {
        var value = incValues[ii];
        if (value == 'proto') {
            incValues[ii] = klass.prototype;
        }
        else if (value == 'this') {
            incValues[ii] = klass;
        }
        else {
            incValues[ii] = Class.global[value];
        }
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
