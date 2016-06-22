/*
 * abbreviate - jQuery plugin for abbreviating text
 *
 * Copyright (c) 2014 David Maicher (https://github.com/dmaicher)
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
(function ($) {
    $.fn.abbreviate = function (options) {

        options = $.extend({
            length: 15,
            moreText: "more",
            lessText: "less",
            ellipsis: ".."
        }, options);

        /**
         * traverses node tree recursively and shortens/removes nodes
         */
        var abbreviateNode = function (node, acc) {

            //limit already reached?
            if(acc.length >= options.length) {
                node.remove();
                return;
            }

            //is textnode?
            if (node[0].nodeType == 3) {
                acc.length = acc.length + node[0].nodeValue.length;
                if(acc.length > options.length) {
                    var endIndex = node[0].nodeValue.length - (acc.length - options.length);
                    node[0].nodeValue = node[0].nodeValue.slice(0, endIndex);
                }
                return;
            }

            //work on copy of array
            var children = node.contents().slice();
            for (var i = 0; i < children.length; i++) {
                abbreviateNode($(children[i]), acc);
            }
        };

        var getValue = function(value) {
            return $.isFunction(value) ? value() : value;
        };

        return this.each(function () {
            var node = $(this);

            //no abbreviation necessary?
            if($.trim(node.text()).length <= options.length) {
                return;
            }

            var fullContent = node.html();
            var lessText = getValue(options.lessText);
            if(lessText.length){
                fullContent += " <a href='#' class='abbreviate-less'>"+lessText+"</a>";
            }

            abbreviateNode(node, {'length' : 0});

            var shortContent = node.html();
            var moreText = getValue(options.moreText);
            shortContent += options.ellipsis+"<a href='#' class='abbreviate-more'>"+moreText+"</a>";

            node.html(shortContent);
            node.on('click', '.abbreviate-less', function(){ node.html(shortContent); return false; });
            node.on('click', '.abbreviate-more', function(){ node.html(fullContent); return false; });
        });
    }
})(jQuery);
