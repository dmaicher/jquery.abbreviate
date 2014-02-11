/*
 * abbreviate 2.0 - jQuery plugin for abbreviating text
 *
 * Copyright (c) 2014 David Maicher (http://blog.dmaicher.de)
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
         * traverse node tree recursively and shorten/remove nodes
         *
         * @param node
         * @param acc
         * @returns {boolean}
         */
        var abbreviateNode = function (node, acc) {

            //limit already reached?
            if(acc.length >= options.length) {
                node.remove();
                return;
            }

            //is textnode?
            if (node[0].nodeType == 3) {
                acc.length = acc.length + node[0].textContent.length;
                if(acc.length > options.length) {
                    var endIndex = node[0].textContent.length - (acc.length - options.length);
                    node[0].textContent = node[0].textContent.slice(0, endIndex);
                }
                return;
            }

            //work on copy of array
            var children = node.contents().slice();
            for (var i = 0; i < children.length; i++) {
                abbreviateNode($(children[i]), acc);
            }
        };

        return this.each(function () {
            var node = $(this);

            //no abbreviation necessary?
            if(node.text().length <= options.length) {
                return;
            }

            var fullContent = node.html();
            if(typeof options.lessText == "string" && options.lessText.length > 0){
                fullContent += " <a href='#' class='abbreviate_less_link'>"+options.lessText+"</a>";
            }

            abbreviateNode(node, {'length' : 0});

            var shortContent = node.html();
            shortContent += options.ellipsis+"<a href='#' class='abbreviate_more_link'>"+options.moreText+"</a>";

            node.html(shortContent);
            node.on('click', '.abbreviate_less_link', function(){ node.html(shortContent); return false; });
            node.on('click', '.abbreviate_more_link', function(){ node.html(fullContent); return false; });
        });
    }
})(jQuery);