Class = function(name, func) {
    if (!name) throw("Class requires a class name as its first argument");
    if (!func) throw("Class requires a function as its second argument");

    var parts = name.split('.');
    var subclass = Class.global;
    for (var i = 0; i < parts.length; i++) {
        if (! subclass[parts[i]])
            subclass[parts[i]] = function() {
                try { this.init() } catch(e) {}
            };
        subclass = subclass[parts[i]];
    }

    subclass.name = name;
    subclass.isa = function(base) {
        subclass.base = base;
        var baseclass = eval('new ' + base + '()');
        subclass.prototype = baseclass;
    };

    subclass.global = Class.global;

    subclass.new_global = function() {
        globals++;
        return Class.global;
    }

    var args = [];
    var globals = 0;

    for (var k in Class.global) {
        globals++;
    }
    if (jQuery)
        args.push(jQuery);

    func.apply(subclass, args);

    var globals_after = 0;
    for (var k in Class.global) {
        globals_after++;
    }

    if (globals != globals_after) {
        throw("Class '" + name + "' defines new global " + (globals_after - globals) + " JavaScript variables without using this.new_global()");
    }
}

Class.global = this;
