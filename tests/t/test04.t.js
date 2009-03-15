var t = new Test.Base();
t.plan(4);

this.jQuery = function() { 'fake jQuery' };

Class('Foo.Bar -inc=jQuery,this,proto', function($, klass, proto, dummy) {

t.is($, jQuery, '$ is jQuery');
t.is(klass, this, 'class variable is correct');
t.is(proto, this.prototype, 'proto variable is correct');
t.is(typeof(dummy), 'undefined', 'dummy has no value');

});
