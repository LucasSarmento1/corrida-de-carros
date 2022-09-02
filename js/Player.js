class Player {
 constructor(){
    this.nome=null;
    this.index=null;
    this.positionx=0;
    this.positiony=0;
    this.rank=0;
    this.score=0;  
    this.fuel=185;
    this.life=185;                   
 }

 addjogadores(){
    var playerindex="players/player"+this.index;

    if(this.index===1){this.positionx=width/2-100;}
    else{this.positionx=width/2+100;}

    database.ref(playerindex).set({
        nome:this.nome,
        positionx:this.positionx,
        positiony:this.positiony,
        rank:this.rank,
        score:this.score
    })
 }

 lerJogadores(){
    var playercountref=database.ref("playerCount");
    playercountref.on("value",function(data){
       playercount=data.val();
    })
 }

atualizarjogadores(count){
    database.ref("/").update({
        playerCount:count

    })
}

atualizardistancia(){
   var playerindex="players/player"+this.index;
   database.ref(playerindex).update({
      positionx:this.positionx,
      positiony:this.positiony,
      rank:this.rank,
      score:this.score,
      life:this.life
   })
}

lerdistancia(){
   var playerindex="players/player"+this.index;
   database.ref(playerindex).on("value",data=>{
      var dado=data.val();
      this.positionx=dado.positionx;
      this.positiony=dado.positiony;
   })

}

static lertodososjogadores(){
   var playersref=database.ref("players");
    playersref.on("value",function(data){
       allplayers=data.val();
    })
}


lercarsatend(){
   database.ref("carsAtEnd").on("value", data=>{
      this.rank=data.val();
   })
}

static updatecarsAtEnd(rank){
   database.ref("/").update({
      carsAtEnd:rank
   })
}
}
