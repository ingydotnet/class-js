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

    subclass.global = Class.global;
    subclass.name = name;
    subclass.isa = function(base) {
        subclass.base = base;
        var baseclass = eval('new ' + base + '()');
        subclass.prototype = baseclass;
    };

    var args = [];
    if (jQuery)
        args.push(jQuery);

    func.apply(subclass, args);
}

Class.global = this;
