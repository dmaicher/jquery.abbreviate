jquery.abbreviate
=================

Abbreviates the text content of elements and adds "more" and "less" links at the end to toggle full/abbreviated content.

Use it like this:

    $('div').abbreviate({
        length : 15,
        moreText : "more",
        lessText : "less",
        ellipsis : ".."
    });
    
The plugin handles HTML tags inside the abbreviated nodes correctly. See an example here:



If the option `lessText` evaluates to false then no link is appended to hide the full text.

Demo: http://dmaicher.de/jquery.abbreviate/