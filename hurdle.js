class Hurdle{
    constructor(){

    }
    createHurdle(){
        hurdleGroup=new Group();
        for(var i=900; i<displayWidth*5-200;i=i+880){
            for(var j=185; j<900;j=j+200){
                hurdle=createSprite(i,j);
                hurdle.addImage("hurdle",hurdleImg);
                hurdle.scale=0.5;
                hurdleGroup.add(hurdle);
                hurdle.setCollider("rectangle",0,10,30,80);
            }
        }
    }
}