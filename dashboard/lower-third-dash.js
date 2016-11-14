(function() {
  'use strict'
  var toastLT = document.getElementById('lowerThirdToast');
  var messageCtrl = document.getElementById('messageCtrl');
  var updateLT = document.getElementById('updateLT');
  var list = nodecg.Replicant('lowerThird');

  list.on("change", function(newValue, oldValue){
    messageCtrl.messages = newValue.messages;
    messageCtrl.games = newValue.games;
    toastLT.text = "Lower Third Bar data has been updated";
    toastLT.show();
  });
  updateLT.addEventListener("click", function(){
    updateLT.setAttribute('disabled', 'true');
    nodecg.sendMessage('updateLowerThird', "update", function (result) {
        updateLT.removeAttribute('disabled');
        if (!result) {
            console.log(err.message);
            toastLT.text = 'Error updating the lower third data. Check console.';
            toastLT.show();
            return;
        }
        else {
            toastLT.text = 'Successfully updated the lower third.';
            toastLT.show();
        }
    });
  });
})();
