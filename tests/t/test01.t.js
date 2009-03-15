Class('Foo.Bar', function() {
});

var t = new Test.Base();

t.plan(4);

t.ok(Foo.Bar, 'Foo.Bar exists');
t.is(Foo.Bar.global, this, 'Global pointer is good');
t.ok((typeof(Foo.Bar.base) == 'undefined'), 'Foo.Bar has no base class defined');
t.ok((typeof(Foo.Bar.prototype) != 'undefined'), 'Foo.Bar has a prototype object');
