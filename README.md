jquery.abbreviate
=================

Use it like this:

    $('.abbreviate_me').abbreviate({
        length : 15,
        moreText : "more",
        lessText : "less",
        findWhiteSpaceLimit : 15 
    });
    
It uses jquery's `.text()` method and therefore the abbreviated text will not contain any html tags. 

The text will be abbreviated at the first whitespace between `length` and `findWhiteSpaceLimit`. If there is no whitespace then the text is simply abbreviated after `length`.

If the option `lessText` is `false` or `""` then no link is appended to hide the full text.

Demo: http://dmaicher.de/jquery.abbreviate/