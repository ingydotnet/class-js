.PHONY: all clean tests

SOURCE=pod/Class.pod

all: README tests

README: doc/pod/Class.pod
	pod2text $< > $@

tests:
	@make -C $@

clean:
	@make -C tests $@
