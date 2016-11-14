(function() {
  Polymer({
        is: 'lower-third',
        properties: {
            title: String,
            subtitle: String
        },
        ready: function(){
          var self = this;
          var titleRep = nodecg.Replicant('titleRep');
          var subtitleRep = nodecg.Replicant('subtitleRep');

          titleRep.on('change', function(newValue, oldValue) {
            $('.headline-title').velocity({translateX:"-20%", opacity: 0}, 900, "ease-out")
            .velocity({translateX:"30%"}, 0, "ease-out", function(){self.title = newValue;})
            .velocity({translateX:"0", opacity: 1}, 1500, "ease-out");
          });
          subtitleRep.on('change', function(newValue, oldValue) {
            $('.headline-subtitle').velocity({translateX:"-20%", opacity: 0}, 900, "ease-out")
            .velocity({translateX:"30%"}, 0, "ease-out", function(){self.subtitle = newValue;})
            .velocity({translateX:"0", opacity: 1}, 1500, "ease-out");
          });
        }
      });
})();
