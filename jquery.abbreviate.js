/*
 * abbreviate 1.0 - jQuery plugin for abbreviating text
 *
 * Copyright (c) 2012 David Maicher (http://blog.dmaicher.de)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 */
(function($){
  $.fn.abbreviate = function(options){       
    options = $.extend({
      length : 15,
      moreText : "more",
      lessText : "less",
      findWhiteSpaceLimit : 15
    }, options);  
    return this.each(function(){
      var obj = $(this);
      var fullText = obj.text();
      if(fullText.length > options.length){         
        var shortText = fullText.substr(0, options.length+Math.max(0, fullText.substr(options.length, options.length + options.findWhiteSpaceLimit).indexOf(" ")));       
        var fullHandler = function(){
          obj.text(fullText+" ");
          if(typeof options.lessText == "string" && options.lessText.length > 0){
            lessLink = $("<a href='javascript:;' class='abbreviate_less_link'>"+options.lessText+"</a>");
            obj.append(lessLink);
            lessLink.click(shortHandler);
          }
        };
        var shortHandler = function(){
          obj.text(shortText+" ");
          moreLink = $("<a href='javascript:;' class='abbreviate_more_link'>"+options.moreText+"</a>");
          obj.append(moreLink);
          moreLink.click(fullHandler);          
        };
        shortHandler();
      }
    });
  }
})( jQuery ); 