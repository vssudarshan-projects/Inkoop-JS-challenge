//wait for document to load
$(document).ready(()=>{

  //only mouse action
  $('#start').on('mousedown',()=>{

    var gameData = {
      pumps: [],
      road: 0,
      petrol: 30,
      iPump: 0
    }

    $('.result-wrapper').empty(); //empty the results from previous game
    $('.start-msg-wrapper').empty();

   printMessage('.start-msg-wrapper', "Starting Game...");

    for(let i = 0; i < 5; i++){  //generate 5 ramdom numbers
      gameData.pumps.push(Math.floor(Math.random() * 101));
    }

    gameData.pumps = gameData.pumps.sort((a,b)=>{ //sort numerically instead of alphabetically
      return a-b;
    });

    printMessage('.start-msg-wrapper', "Generating pumps at: " + gameData.pumps.join(", ") + ".");

    let i = 0;
    let num = 1;
    let count = 0
    let ele = 'result' + num;
    $(".result-wrapper").append("<div class=" + ele + "></div>");
    $('.' + ele).addClass("col-m column");

   while(gameData.road < 100 && gameData.petrol > 0){ // win/lose conditions
      moveStep(gameData);
      printMessage('.' + ele, "Move " + ++i + " - Car at " + gameData.road + ", petrol remaining " + gameData.petrol);
      if(++count > 10){
        ele = 'result' + ++num;
        count = 0
        $(".result-wrapper").append("<div class=" + ele + "></div>");
        $('.' + ele).addClass("col-m column");
      }
  }

    if(gameData.road < 100)
    printMessage('.' + ele, "Game Over.");
    else {
      printMessage('.' + ele, "Destination reached.");
    }
  });


  function moveStep(gameData){

    let steps = Math.floor(Math.random() * 7);

    if(gameData.petrol >= steps){
      gameData.petrol -= steps;
      gameData.road += steps;
    }else{
      gameData.road += gameData.petrol;
      gameData.petrol = 0;
    }

    while(gameData.pumps[gameData.iPump] <= gameData.road){
      gameData.petrol += 20;
      gameData.iPump++;
    }

  }


  function printMessage(ele, message){
    $(ele).append("<p>" + message + "</p>");
  }

});
