class Player{
    constructor(){
        this.index=null;
        this.distance=0;
        this.name=null;
        this.rank=null;
        this.time=0;
    }
    getCount(){
        var databaseRef=database.ref("playerCount");
        databaseRef.on("value",function(data){
            playerCount=data.val();
        })
       
    }
    updateCount(count){
        database.ref("/").update({
            playerCount:count
        })
    
    }

    updatePlayerInfo(){
       var playerIndex="Players/player"+player.index;
       database.ref(playerIndex).set({
           name:this.name,
           distance:this.distance,
           rank:this.rank,
           time:this.time
       })

    }

    static getPlayerInfo(){
        var getPlayerInfoRef=database.ref("Players");
        getPlayerInfoRef.on("value",(data)=>{
            allPlayers=data.val();
        })
    }

    getPlayersAtEnd(){
        var getPlayersAtEndRef=database.ref("PlayersAtEnd");
        getPlayersAtEndRef.on("value",(data)=>{
            this.rank=data.val();
        })

    }

    static updatePlayersAtEnd(count){
        database.ref("/").update({
            PlayersAtEnd:count
        })

    }
    WinMessage(){ 
        fill("green");
        textSize(30);
        text("Well Done! You finished the Race",camera.position.x-100,120);
    };

    displayTime(){
        fill(0);
        textSize(40);
        text("Time : " + this.time + " Seconds",camera.position.x,50);
    }
    
}