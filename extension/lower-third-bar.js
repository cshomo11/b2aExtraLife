'use strict';

const fs = require('fs');
const path = require('path');

module.exports = function (nodecg) {
  let titleRep = nodecg.Replicant('titleRep');
  let subtitleRep = nodecg.Replicant('subtitleRep');
  let list = nodecg.Replicant('lowerThird');
  let activeGame = nodecg.Replicant('activeIndex');
  let nextGame = nodecg.Replicant('nextIndex');
  let LOCAL_DATA = path.resolve(__dirname, "../lower-third-data");
  list.value = JSON.parse(fs.readFileSync((LOCAL_DATA + "/lower-third.json"), 'utf8'));

  //Start the lower third loop
  let itr = 0;
  let actGame = list.value.games.filter(function (game) {
    return game.isActive;
  });
  let nxtGame = list.value.games.filter(function (game) {
    return game.isNext;
  });
  if (actGame.length > 0) {
    activeGame.value = list.value.games.indexOf(actGame[0]);
  }
  if (nxtGame.length > 0) {
    nextGame.value = list.value.games.indexOf(nxtGame[0]);
  }

  activeGame.on("change", function (newVal, oldVal) {
    if (oldVal !== undefined) {
      let newList = {
        "messages": [],
        "games": []
      };
      newList.messages = list.value.messages.slice(0);
      newList.games = list.value.games.slice(0);
      newList.games[oldVal].isActive = false;
      newList.games[newVal].isActive = true;
      try {
        //Writes a new JSON file then updates the list Replicant
        fs.writeFileSync((LOCAL_DATA + "/lower-third.json"), JSON.stringify(list.value, null, 3), {});
        list.value = newList;
      } 
      catch (e) {
        nodecg.log.error(e);
      }
    }
  });
  nextGame.on("change", function (newVal, oldVal) {
    if (oldVal !== undefined) {
      let newList = {
        "messages": [],
        "games": []
      };
      newList.messages = list.value.messages.slice(0);
      newList.games = list.value.games.slice(0);
      newList.games[oldVal].isNext = false;
      newList.games[newVal].isNext = true;
      try {
        //Writes a new JSON file then updates the list Replicant
        fs.writeFileSync((LOCAL_DATA + "/lower-third.json"), JSON.stringify(list.value, null, 3), {});
        list.value = newList;
      } 
      catch (e) {
        nodecg.log.error(e);
      }
    }
  });
  lowerThirdStart(list.value, "message");

  function lowerThirdStart(barData, current) {
    if (barData) {
      if (current === "message") {
        let messagesList = list.value.messages.filter(function (mess) {
          return mess.showMessage;
        });
        setTimeout(function () {
          titleRep.value = messagesList[itr].title;
          subtitleRep.value = messagesList[itr].subtitle;
          itr++;
          if (itr < messagesList.length) {
            lowerThirdStart(list.value, "message");
          } 
          else {
            itr = 0;
            (list.value.games) ? lowerThirdStart(list.value, "active-game") : lowerThirdStart(list.value, "message");
          }
        }, 10000);
      } else if (current === "active-game") {
        let activeGame = list.value.games.filter(function (game) {
          return game.isActive;
        });
        let nextGame = list.value.games.filter(function (game) {
          return game.isNext;
        });
        setTimeout(function () {
          if (activeGame.length > 0) {
            titleRep.value = "Now Playing: " + activeGame[0].title;
            subtitleRep.value = "Developer: " + activeGame[0].developer + "  -  Publisher: " + activeGame[0].publisher;
          }
          if (nextGame.length > 0) {
            lowerThirdStart(list.value, "next-game");
          } 
          else {
            itr = 0;
            lowerThirdStart(list.value, "message");
          }
        }, 10000);
      } else if (current === "next-game") {
        let nextGame = list.value.games.filter(function (game) {
          return game.isNext;
        });
        setTimeout(function () {
          if (nextGame.length > 0) {
            titleRep.value = "Up Next: " + nextGame[0].title;
            subtitleRep.value = "Developer: " + nextGame[0].developer + "  -  Publisher: " + nextGame[0].publisher;
          }
          itr = 0;
          lowerThirdStart(list.value, "message");
        }, 10000);
      }
    }
  }

  nodecg.listenFor('updateLowerThird', function (value, callback) {
    nodecg.log.debug(value);
    try {
      list.value = JSON.parse(fs.readFileSync((LOCAL_DATA + "/lower-third.json"), 'utf8'));
      callback(true);
    } catch (e) {
      callback(false);
    }
  });

  nodecg.listenFor('addNewMessage', function (message, callback) {
    let newList = {
      "messages": [],
      "games": []
    };
    newList.messages = list.value.messages.slice(0);
    newList.games = list.value.games.slice(0);
    message.position = newList.messages.length;
    newList.messages.push(message);
    try {
      //Writes a new JSON file then updates the list Replicant
      fs.writeFileSync((LOCAL_DATA + "/lower-third.json"), JSON.stringify(newList, null, 3), {});
      list.value = newList
      callback(true);
    } catch (e) {
      callback(false);
    }
  });

  nodecg.listenFor('editExistingMessage', function (message, callback) {
    let newList = {
      "messages": [],
      "games": []
    };
    newList.messages = list.value.messages.slice(0);
    newList.games = list.value.games.slice(0);
    newList.messages[message.position].title = message.title;
    newList.messages[message.position].subtitle = message.subtitle;
    newList.messages[message.position].showMessage = message.showMessage;
    try {
      //Writes a new JSON file then updates the list Replicant
      fs.writeFileSync((LOCAL_DATA + "/lower-third.json"), JSON.stringify(newList, null, 3), {});
      list.value = newList;
      callback(true);
    } catch (e) {
      callback(false);
    }
  });

  nodecg.listenFor('deleteMessage', function (position, callback) {
    let newList = {
      "messages": [],
      "games": []
    };
    newList.messages = list.value.messages.slice(0);
    newList.games = list.value.games.slice(0);
    newList.messages.splice(position, 1);
    try {
      //Writes a new JSON file then updates the list Replicant
      fs.writeFileSync((LOCAL_DATA + "/lower-third.json"), JSON.stringify(newList, null, 3), {});
      list.value = newList;
      callback(true);
    } catch (e) {
      callback(false);
    }
  });

  nodecg.listenFor('addNewGame', function (game, callback) {
    let newList = {
      "messages": [],
      "games": []
    };
    newList.messages = list.value.messages.slice(0);
    newList.games = list.value.games.slice(0);
    newList.games.push(game);
    try {
      //Writes a new JSON file then updates the list Replicant
      fs.writeFileSync((LOCAL_DATA + "/lower-third.json"), JSON.stringify(newList, null, 3), {});
      list.value = newList;
      callback(true);
    } catch (e) {
      callback(false);
    }
  });

  nodecg.listenFor('editExistingGame', function (game, callback) {
    let newList = {
      "messages": [],
      "games": []
    };
    newList.messages = list.value.messages.slice(0);
    newList.games = list.value.games.slice(0);
    var ind = game.position;
    nodecg.log.debug("Position: " + ind);
    newList.games[ind].title = game.title;
    newList.games[ind].developer = game.developer;
    newList.games[ind].publisher = game.publisher;
    try {
      //Writes a new JSON file then updates the list Replicant
      fs.writeFileSync((LOCAL_DATA + "/lower-third.json"), JSON.stringify(newList, null, 3), {});
      list.value = newList;
      callback(true);
    } catch (e) {
      callback(false);
    }
  });
  
  nodecg.listenFor('deleteGame', function (position, callback) {
    let newList = {
      "messages": [],
      "games": []
    };
    newList.messages = list.value.messages.slice(0);
    newList.games = list.value.games.slice(0);
    newList.games.splice(position, 1);
    try {
      //Writes a new JSON file then updates the list Replicant
      fs.writeFileSync((LOCAL_DATA + "/lower-third.json"), JSON.stringify(newList, null, 3), {});
      list.value = newList;
      callback(true);
    } catch (e) {
      callback(false);
    }
  });
}