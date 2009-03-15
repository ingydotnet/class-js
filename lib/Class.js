(function() {

Class = function(name, func) {
    if (!name) throw("Class requires a class definition string as its first argument");
    if (!func) throw("Class requires a class wrapper function as its second argument");

    var parts = name.split('.');
    var klass = Class.global;
    for (var i = 0; i < parts.length; i++) {
        if (! klass[parts[i]])
            klass[parts[i]] = function() {
                try { this.init() } catch(e) {}
            };
        klass = klass[parts[i]];
    }

    klass.name = name;
    klass.isa = function(base) {
        klass.base = base;
        klass.prototype = eval('new ' + base + '()');
    };

    klass.global = Class.global;

    klass.new_global = function() {
        globals++;
        return Class.global;
    }

    var args = [];
    var globals = 0;

    for (var k in Class.global) {
        globals++;
    }
    if (Class.global.jQuery)
        args.push(Class.global.jQuery);

    func.apply(klass, args);

    var globals_after = 0;
    for (var k in Class.global) {
        globals_after++;
    }

    if (globals != globals_after) {
        throw("Class '" + name + "' defines new global " + (globals_after - globals) + " JavaScript variables without using this.new_global()");
    }
}

})();

Class.global = this;
