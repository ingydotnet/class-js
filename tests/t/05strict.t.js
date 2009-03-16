var t = new Test.Base();
t.plan(3);

try {
    Class('Foo -strict', function() {
        something = 'is bad';
    });
}
catch(e) {
    var error = String(e);
    t.is(
        error,
        "Class 'Foo' defines 1 new global JavaScript variables without using this.addGlobal()",
        'Adding globals under -strict causes an error'
    );
}

Class('Bar -strict', function() {
    this.addGlobal().morestuff = 'is ok';
    this.addGlobal().morestuffy = 'is also ok';
});

t.is(this.morestuff, 'is ok', 'Added a new global safely');
t.is(this.morestuffy, 'is also ok', 'Added another new global safely');
