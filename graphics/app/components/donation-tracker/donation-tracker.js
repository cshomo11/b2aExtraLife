/*global requirejs */
  Polymer({
        is: 'donation-tracker',
        properties: {
            total: String,
            goal: String
        },
        ready: function() {
          var self = this;

          var totalRep = nodecg.Replicant('totalRep', {defaultValue: "$0"});
          var goalRep = nodecg.Replicant('goalRep', {defaultValue: "$0"});

          totalRep.on('change', function(newValue, oldValue) {
            if (oldValue != undefined){
              if(oldValue.raw != newValue.raw){
                $('#lblDonationTotal').velocity({opacity: 0}, 400, "ease-out")
                .velocity({opacity: 1}, 400, "ease-in")
                .velocity({opacity: 0}, 400, "ease-out", function(){self.total = newValue.formatted;})
                .velocity({opacity: 1}, 600, "ease-in");
              }
              else{
                self.total = newValue.formatted;
              }
            }
            else{
              self.total = newValue.formatted;
            }
          });
          goalRep.on('change', function(newValue, oldValue) {
              self.goal = newValue.formatted;
          });
        }
  });
