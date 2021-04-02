//wait for document to load
$(document).ready(()=>{

      function printMessage(ele, message){
        $(ele).append("<p>" + message + "</p>");
      }

  //only mouse action
  $('#start').on('mousedown',()=>{

 var steps = [];
//generate 100 common steps for both algorithms
for(let i = 0; i < 100 ; i++)
 steps.push(Math.floor(Math.random() * 7));

    var gameData1 = {
      pumps: [],
      road: 100,
      petrol: 30,
      iPump: 0,
      steps: steps
    }
    var gameData2 = {
      pumps: [],
      road: 0,
      petrol: 30,
      iPump: 0,
      steps: steps
    }

    $('.result-wrapper1').empty(); //empty the results from previous game
    $('.result-wrapper2').empty();
    $('.title1').empty();
    $('.title2').empty();
    $('.start-msg-wrapper').empty();

    printMessage('.start-msg-wrapper', "Starting Game...");

let r = 0;
    for(let i = 0; i < 5; i++){  //generate 5 ramdom numbers
      r = Math.floor(Math.random() * 101);
      gameData1.pumps.push(r);
      gameData2.pumps.push(r);
    }

    gameData1.pumps = gameData1.pumps.sort((a,b)=>{ //sort numerically instead of alphabetically
      return a-b;
    });

    gameData2.pumps = gameData2.pumps.sort((a,b)=>{
      return a-b;
    });

    printMessage('.start-msg-wrapper', "Generating pumps at: " + gameData1.pumps.join(", ") + ".");

    algo1(gameData1);
    algo2(gameData2);
  });



  function algo1(gameData){
    let i = 0;
    let num = 1;
    let count = 0
    let ele = 'result1' + num;

    $(".title1").prepend("<h2>" + "AGLO 1" + "</h2>");
    $(".result-wrapper1").append("<div class=" + ele + "></div>");
    $('.' + ele).addClass("res-col");

    do{
      moveStep1(gameData, i);
      printMessage('.' + ele, "Move " + ++i + "[steps: "+ gameData.steps[i-1] + "]" + " - Car at " + (100 - gameData.road) + ", petrol remaining " + gameData.petrol);
      if(++count > 10){
        ele = 'result1' + ++num;
        count = 0
        $(".result-wrapper1").append("<div class=" + ele + "></div>");
        $('.' + ele).addClass("res-col");
      }
    }while(gameData.road > 0 && gameData.petrol > 0);

    if(gameData.road > 0)
    printMessage('.' + ele, "Game Over.");
    else {
      printMessage('.' + ele, "Destination reached.");
    }
  }


  function moveStep1(gameData, i){

  //  let steps = Math.floor(Math.random() * 7);

    gameData.petrol -= gameData.steps[i];
    gameData.road -= gameData.steps[i];

    if(gameData.petrol < 0){
      gameData.road -= gameData.petrol;
      gameData.petrol = 0;
    }

    while(gameData.pumps[gameData.iPump] <= (100 - gameData.road)){
      gameData.petrol += 20;
      gameData.iPump++;
    }

  }

  function algo2(gameData){
    let i = 0;
    let num = 1;
    let count = 0
    let ele = 'result2' + num;

    $(".title2").prepend("<h2>" + "AGLO 2" + "</h2>");
    $(".result-wrapper2").append("<div class=" + ele + "></div>");
    $('.' + ele).addClass("res-col");

    while(gameData.road < 100 && gameData.petrol > 0){ // win/lose conditions
      moveStep2(gameData, i);
      printMessage('.' + ele, "Move " + ++i + "[steps: "+ gameData.steps[i-1]+"]"+ " - Car at " + gameData.road + ", petrol remaining " + gameData.petrol);
      if(++count > 10){
        ele = 'result2' + ++num;
        count = 0
        $(".result-wrapper2").append("<div class=" + ele + "></div>");
        $('.' + ele).addClass("res-col");
      }
    }
    // $('.res-col').forEach(()=>{
    // $(this).addClass("col-" + num)
    //
    // });
      if(gameData.road < 100)
      printMessage('.' + ele, "Game Over.");
      else {
        printMessage('.' + ele, "Destination reached.");
      }
    }

    function moveStep2(gameData, i){

      //let steps = Math.floor(Math.random() * 7);

      if(gameData.petrol >= gameData.steps[i]){
        gameData.petrol -= gameData.steps[i];
        gameData.road += gameData.steps[i];
      }else{
        gameData.road += gameData.petrol;
        gameData.petrol = 0;
      }

      while(gameData.pumps[gameData.iPump] <= gameData.road){
        gameData.petrol += 20;
        gameData.iPump++;
      }
    }
  });
