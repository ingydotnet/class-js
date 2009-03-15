var t = new Test.Base();
t.plan(2);

Class('Foo', function() {
    this.extend({
        method1: function() {
            t.pass("method1 called. Inheritance works.");
        }
    });
});

Class('Foo.Bar(Foo)', function() {
    t.is(this.baseClassName, 'Foo', '...(name) inheritance works');
});

var f = new Foo.Bar();
f.method1();
