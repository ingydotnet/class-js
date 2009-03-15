.PHONY: all clean

SOURCE=pod/Class.pod

all: html/Class.html text/Class.text

html/Class.html: $(SOURCE) html
        pod2html $< > $@
        rm pod2htm*.tmp

txt/Class.text: $(SOURCE) text
        pod2text $< > $@

html text:
	mkdir -p $@

clean:
	rm -fr html text

