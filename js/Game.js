class Game {
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
        //text("MouseX:"+mouseX,displayWidth/2-350,displayHeight/2-300);
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      car1 = createSprite(100,200);
      car1.addImage(car1img);
      car2 = createSprite(300,200);
      car2.addImage(car2img);
      car3 = createSprite(500,200);
      car3.addImage(car3img);
      car4 = createSprite(700,200);
      car4.addImage(car4img);
      cars = [car1,car2,car3,car4];
      passedfinish=false;
    }
  
    play(){
      form.hide();
      textSize(30);
      text("Game Start", 120, 100)
      Player.getPlayerInfo();
      player.getfinishedplayer();
  
      if(allPlayers !== undefined){
        background(groundimg);
        image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*5);
        //var display_position = 130;
        var index = 0;
        var x = 175;
        var y;
        for(var plr in allPlayers){
          index = index+1;
          x = x+200;
          y = displayHeight-allPlayers[plr].distance;
          cars[index-1].x=x
          cars[index-1].y=y;
          if(index === player.index){
            stroke(10);
            fill("red");
            ellipse(x,y,60);
            cars[index-1].shapeColor="red";
            camera.position.x=displayWidth/2;
            camera.position.y=cars[index-1].y
          }
          textAlign(CENTER);
          fill("gray");
          textSize(20);
          text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y+75);
        }
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=50
        player.update();
      }  
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        cars[index-1].x -=10
      }  
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        cars[index-1].x +=10
      }

      if(player.distance>3650 && passedfinish===false){
        gameState=2;
        player.rank=finishedplayer;
        Player.updatefinishedplayer();
        player.update();
        passedfinish=true;
      }
      
      drawSprites();

    }

      displayRanks(){
        camera.position.x=0;
        camera.position.y=0;
        imageMode(CENTER);
        Player.getPlayerInfo();
        image(bronzeimg,displayWidth/-4,-100+displayHeight/9,200,240);
        image(silverimg,displayWidth/4,-100+displayHeight/10,225,270);
        image(goldimg,0,-100,250,300);
        textAlign(CENTER);
        fill("black");
        for(var plr in allPlayers){
          if(allPlayers[plr].rank===0){
            textSize(30);
            text("1st:"+allPlayers[plr].name,0,85);
          }else
          if(allPlayers[plr].rank===1){
            textSize(30);
            text("2nd:"+allPlayers[plr].name,displayWidth/4,displayHeight/9+73);
          }else
          if(allPlayers[plr].rank===2){
            textSize(30);
            text("3rd:"+allPlayers[plr].name,displayWidth/-4,displayHeight/10+76);
          }else{
            textSize(50);
            text("Honorable Mention:"+allPlayers[plr].name,0,225);
          }
        }
    }

  }
 