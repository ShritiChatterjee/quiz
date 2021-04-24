class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    Question.hide();

    //write code to change the background color here
    if (gameState===1){
    background("yellow");
    }
    //write code to show a heading for showing the result of Quiz
    textSize(20);
    text("Result of the Quiz",150,80);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();


    //write condition to check if contestantInfor is not undefined
    if(allContestants!==undefined){
      fill("blue");
      textSize(20);
      //write code to add a note here
     text("*NOTE:Contestant who answered correct are highlighted in green color",130,230);
      for(var plr in allContestants){
        var correctAns = "2";
        //write code to highlight contest who answered correctly
        if(correctAns === allContestants[plr].answer)
        fill ("green");
        else
        fill ("red");
      }
    
    }
  }

}
