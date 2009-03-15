var t = new Test.Base();
t.plan(5);

Class('Foo.Bar', function() {
    t.is(this, Foo.Bar, 'this is a pointer to the new class');
    t.ok(this.addGlobal, 'this.addGlobal is defined');
    t.is(this.global, Class.global, 'this.global is correct');
    t.is(this.className, 'Foo.Bar', 'this.className is correct');
    t.is(this.baseClassName, '', 'this.baseClassName is empty');
});
