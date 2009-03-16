var t = new Test.Base();
t.plan(2);

Class('Foo', function() {

this.extend({
    greet: function(name) {
        return "hello, " + name + '.';
    },
    dismiss: function(name) {
        return "goodbye, " + name + '.';
    }
})

});

Class('Bar(Foo)', function() {

this.extend({
    greet: function(name) {
        return this.superFunc('greet').apply(this, arguments) + " how are you, " + name + '?';
    }
})

});

Class('Baz(Bar)', function() {

this.extend({
    dismiss: function(name) {
        return this.superFunc('dismiss').apply(this, arguments) + " nice to see you, " + name + '?';
    }
})

});

var bar = new Bar();
t.is(bar.greet('Ingy'), "hello, Ingy. how are you, Ingy?", 'super works');
var baz = new Baz();
t.is(baz.dismiss('Ingy'), "goodbye, Ingy. nice to see you, Ingy?", 'super works more than one level above');
