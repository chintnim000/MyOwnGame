class Game{
    constructor(){}

    getState(){
        var gameStateRef=database.ref("gameState");
        gameStateRef.on("value",((data)=>{
            gameState=data.val();
        }))
       
    }
    update(state){
        database.ref("/").update({
            gameState:state
        })
    }

    async start(){
        if(gameState===0){
            player=new Player();
            var playerCountRef=await database.ref("playerCount").once("value");
            if(playerCountRef.exists()){
                playerCount=playerCountRef.val();
                player.getCount();
            }
            form=new Form();
            form.display();
            hurdle=new Hurdle();
            hurdle.createHurdle()

        }  
        player1=createSprite(10,displayHeight*0.25-90,40,100);
        player2=createSprite(10,displayHeight*0.5-100,40,100);
        player3=createSprite(10,displayHeight*0.75-130,40,100);
        player4=createSprite(10,displayHeight-170,40,100);

        player1.setCollider("rectangle",0,0,20,70);
        player2.setCollider("rectangle",0,0,20,70);
        player3.setCollider("rectangle",0,0,20,70);
        player4.setCollider("rectangle",0,0,20,70);

        player1.addAnimation("waiting1",player1_img);
        player1.addAnimation("running1",player1_running);
        player1.addAnimation("jumping1",player1_jumping);
        player1.addAnimation("notrunning1",player1_notrunning);
    
        player2.addAnimation("waiting2",player2_img);
        player2.addAnimation("running2",player2_running);
        player2.addAnimation("jumping2",player2_jumping);
        player2.addAnimation("notrunning2",player2_notrunning);
    
        player3.addAnimation("waiting3",player3_img);
        player3.addAnimation("running3",player3_running);
        player3.addAnimation("jumping3",player3_jumping);
        player3.addAnimation("notrunning3",player3_notrunning);
    
        player4.addAnimation("waiting4",player4_img);
        player4.addAnimation("running4",player4_running);
        player4.addAnimation("jumping4",player4_jumping);
        player4.addAnimation("notrunning4",player4_notrunning);
    
        players=[player1,player2,player3,player4];  

        divider1=createSprite(displayWidth/2,displayHeight/4+5,displayWidth,10);
        divider2=createSprite(displayWidth/2,displayHeight/2-20,displayWidth,10);
        divider3=createSprite(displayWidth/2,3*displayHeight/4-50,displayWidth,10);
        divider4=createSprite(displayWidth/2,displayHeight-80,displayWidth,10);

        divider1.visible=false;
        divider2.visible=false;
        divider3.visible=false;
        divider4.visible=false;

        
    }
    play(){
        
        if(gameState===1){
            form.hide();
            background(214,117,98);
            image(track,0,-20,displayWidth*5,displayHeight);

            Player.getPlayerInfo();
            player.getPlayersAtEnd();
      
            var index=0;
            var x=20;
            var y=-50;
            
            if(allPlayers!==undefined){
    
                for(var plr in allPlayers){
                    index=index+1;
                
                    x=20+allPlayers[plr].distance;
                 
                    y=y+200;
                    players[index-1].x=x
                    players[index-1].y=y;

                    if(index===player.index){
                       camera.position.x=x;
                       camera.position.y=displayHeight/2;
                      
                    } 
                }
            }
            if(keyIsDown(RIGHT_ARROW) && player.index !== null){
                player.distance+=20;
                player.updatePlayerInfo();
                switch(player.index){
                    case 1: player1.changeAnimation("running1",player1_running);
                    break;
                    case 2: player2.changeAnimation("running2",player2_running);
                    break;
                    case 3: player3.changeAnimation("running3",player3_running);
                    break;
                    case 4: player4.changeAnimation("running4",player4_running);
                    break;
                    default: break;
                }  
               
            }
            if(keyWentUp(RIGHT_ARROW)){
                switch(player.index){
                    case 1: player1.changeAnimation("notrunning1",player1_notrunning);
                    break;
                    case 2: player2.changeAnimation("notrunning2",player2_notrunning);
                    break;
                    case 3: player3.changeAnimation("notrunning3",player3_notrunning);
                    break;
                    case 4: player4.changeAnimation("notrunning4",player4_notrunning);
                    break;
                    default: break;
                } 
            }
            if(keyDown("space") && player.index !== null){
                switch(player.index){
                    case 1: player1.changeAnimation("jumping1",player1_jumping);
                    player1.y-=60;
                    break;
                    case 2: player2.changeAnimation("jumping2",player2_jumping);
                    player2.y-=60;
                    break;
                    case 3: player3.changeAnimation("jumping3",player3_jumping);
                    player3.y-=60;
                    break;
                    case 4: player4.changeAnimation("jumping4",player4_jumping);
                    player4.y-=60;
                    break;
                    default: break;
                } 
                player.distance+=20;
                player.updatePlayerInfo();
                jumpingSound.play();
            }
           
        
            if(keyWentUp("space")){
                switch(player.index){
                    case 1: player1.changeAnimation("notrunning1",player1_notrunning);
                    player1.y+=60
                    break;
                    case 2: player2.changeAnimation("notrunning2",player2_notrunning);
                    player2.y+=60
                    break;
                    case 3: player3.changeAnimation("notrunning3",player3_notrunning);
                    player3.y+=60
                    break;
                    case 4: player4.changeAnimation("notrunning4",player4_notrunning);
                    player4.y+=60
                    break;
                    default: break;
                }
        
            }
            player1.collide(divider1);
            player2.collide(divider2);
            player3.collide(divider3);
            player4.collide(divider4);
            drawSprites();
           
        }
        fill(0);
        textSize(20);
       text("If you touch any hurdle, your time will get increased by 5",80,50);
        if(player.distance>7019 && gameState===1){
            player.rank+=1;
            Player.updatePlayersAtEnd(player.rank);
            player.WinMessage();
            player.updatePlayerInfo();
            gameState=2;
            end();
        }
        for(var i=0;i<hurdleGroup.length;i++){
            for(var j=0;j<4;j++){
                if(players[j].isTouching(hurdleGroup.get(i))){
                    hurdleGroup.get(i).rotation=90;
                    player.time=player.time+5;
                    player.updatePlayerInfo();
                    hurdleTouchSound.play();
                }
            }
        } 
       
    }
}
function end(){
    Player.getPlayerInfo();
    var timeTaken=0;
    var i=0
    if(allPlayers!==undefined){
       for(var plr in allPlayers){
            i=i+1;
            timeTaken=allPlayers[plr].time
            players[i-1].time=timeTaken;
          
            textSize(25);
            fill("green");
            text("Player"+ i +": " + players[i-1].time + " seconds", 7020,200+50*i);
              
       }
    }


}


