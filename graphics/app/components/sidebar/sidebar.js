/*global requirejs */
(function() {
  Polymer({
        is: 'donor-sidebar',
        properties: {
            donors:{
              avatarImageURL : String,
              createdOn : Date,
              donationAmount : String,
              donorName : String,
              message : String
            }
        },
        ready: function() {
          var self = this;
          var donorsRep = nodecg.Replicant('donorsRep');
          var showDonorsRep = nodecg.Replicant('showDonors');
          donorsRep.on("change", function(newVal, oldVal){
            if (!oldVal){
              $('#ulDonors').velocity({opacity: 0}, 900, "ease-out", function(){self.donors = newVal;})
                .velocity({opacity: 1}, 900, "ease-out");
            }
            else if (newVal[0].createdOn != oldVal[0].createdOn) {
              $('#ulDonors').velocity({opacity: 0}, 900, "ease-out", function(){self.donors = newVal;})
                .velocity({opacity: 1}, 900, "ease-out");
            }
          });
          showDonorsRep.on("change", function(newVal, oldVal){
            if (newVal === "show"){
              $('#divInnerSidebar').velocity({opacity: 1}, 400, "ease-out");
              $('#divBlockedSidebar').velocity({translateX:"100%"}, 400, "ease-out", function(){$('#divBlockedSidebar').css("display", "none")});
            }
            else{
              $('#divInnerSidebar').velocity({opacity: 0}, 400, "ease-out");
              $('#divBlockedSidebar').css({display:"block"}).velocity({translateX:"0"}, 400, "ease-out");
            }
          });
        }
  });
})();
