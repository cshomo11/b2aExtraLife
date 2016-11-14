(function() {
    'use strict';
    init();

    function init() {
      var blockRep = nodecg.Replicant('blockGame');
      var colorRep = nodecg.Replicant('colorMode');
      blockRep.on("change", function(newVal, oldVal){
        if (oldVal !== undefined){
          if (newVal){
            $('#blockGame').css({display:"block"}).velocity({translateX:"0", opacity:1}, 800, "ease-out");
          }
          else{
            $('#blockGame').velocity({translateX:"-100%", opacity:0}, 800, "ease-out", function(){$('#blockGame').css("display", "none")});
          }
        }
      });
      colorRep.on("change", function(newVal, oldVal){
          var streamWrap = document.getElementById("divStreamWrapper");
          if (newVal === "dark"){
              streamWrap.className = "stream-wrapper dark";
          }
          else{
              streamWrap.className = "stream-wrapper";
          }
      });
    }
})();
