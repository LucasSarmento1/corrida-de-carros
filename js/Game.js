class Game {
  constructor(){
  this.resettitle=createElement("h2");
  this.resetbutton=createButton("");
  this.placartittle=createElement("h2");
  this.leader1=createElement("h2");
  this.leader2=createElement("h2");
  this.playermove=false;
  this.leftkeyactive=false; 
  this.blast=false;
  }

  handleelements(){
    form.hideelements();
    
    this.resettitle.html("reiniciar jogo");
    this.resettitle.class("resetText");
    this.resettitle.position(width/2+200,40);

    this.resetbutton.class("resetButton");
    this.resetbutton.position(width/2+230,100);

    this.placartittle.html("placar");
    this.placartittle.class("resetText");
    this.placartittle.position(width/3-60,40);

    this.leader1.class("leadersText");
    this.leader1.position(width/3-50,80);

    this.leader2.class("leadersText");
    this.leader2.position(width/3-50,130);

  }
  showplacar(){
    var leader1,leader2;
    var players=Object.values(allplayers);
    if(
      (players[0].rank===0 && players[1].rank===0)||
      players[0].rank===1
    ){
      leader1=players[0].rank+"&emsp;"+players[0].nome+"&emsp;"+players[0].score;
      leader2=players[1].rank+"&emsp;"+players[1].nome+"&emsp;"+players[1].score;
    }
    if(players[1].rank===1){
      leader2=players[0].rank+"&emsp;"+players[0].nome+"&emsp;"+players[0].score;
      leader1=players[1].rank+"&emsp;"+players[1].nome+"&emsp;"+players[1].score;
    }
    this.leader1.html(leader1);
    this.leader2.html(leader2);
  }


 lerEstado(){
  var gamestateref=database.ref("gameState");
  gamestateref.on("value",function(data){
    gamestate=data.val();
  })
  
 }

 atualizarestado(state){
  database.ref("/").update({
    gameState:state 
  })
 }

  start(){
    player=new Player();
    player.lerJogadores();   
      form=new Form();
      form.display();

      car1=createSprite(width/2-50, height-100);
      car1.addImage("carro1",car1img);
      car1.addImage("blast",blastimg);
      car1.scale=0.07;

      car2=createSprite(width/2+100, height-100);
      car2.addImage("carro2",car2img);
      car2.addImage("blast",blastimg);
      car2.scale=0.07;

      cars=[car1,car2]

      //gerar moedas, gerar obstáculos, gerar  gasolinas

      fuels= new Group()
      coins= new Group()
      obs= new Group()

      
      //posições dos obstáculos
      var obstaclesPositions = [
         { x: width / 2 + 250, y: height - 800, image: obs2img },
          { x: width / 2 - 150, y: height - 1300, image: obs1img }, 
          { x: width / 2 + 250, y: height - 1800, image: obs1img }, 
          { x: width / 2 - 180, y: height - 2300, image: obs2img }, 
          { x: width / 2, y: height - 2800, image: obs2img }, 
          { x: width / 2 - 180, y: height - 3300, image: obs1img }, 
          { x: width / 2 + 180, y: height - 3300, image: obs2img }, 
          { x: width / 2 + 250, y: height - 3800, image: obs2img }, 
          { x: width / 2 - 150, y: height - 4300, image: obs1img }, 
          { x: width / 2 + 250, y: height - 4800, image: obs2img }, 
          { x: width / 2, y: height - 5300, image: obs1img }, 
          { x: width / 2 - 180, y: height - 5500, image: obs2img } 
        ];

        this.addSprites(fuels,4,fuelimg,0.02);
        this.addSprites(coins,18,coinimg,0.09);
        this.addSprites(obs,obstaclesPositions.length,obs1img,0.04,obstaclesPositions);  
  }

    addSprites(spritegroup,numofsprites,spriteimg,scalesprite,positions=[]){
      for(var i=0;i<numofsprites;i=i+1){
        var x,  y;

        if(positions.length>0){
          x=positions[i].x;
          y=positions[i].y;
          spriteimg=positions[i].image;
        }
        else{
        x=random(width/2+200,width/2-200);
        y=random(-height*4.5,height-400);
        }

        var sprite=createSprite(x,y);
        sprite.addImage("imagem", spriteimg);
        sprite.scale= scalesprite;
        spritegroup.add(sprite);
      }
    }

    pegarfuel(index){
      cars[index-1].overlap(fuels,function(collector,collected){
        player.fuel=185;
        collected.remove();
      });

      if(player.fuel>0 && this.playermove===true){
        player.fuel=player.fuel-0.3
      }

      if(player.fuel<=0){
        gamestate =2;
        this.gameover();
      }
    }

    pegarcoins(index){
      cars[index-1].overlap(coins,function(collector,collected){
        player.score=player.score+21;
        player.atualizardistancia();
        collected.remove();
      })
    }

  play(){
    this.handleelements();
    this.handleresetbutton();


    Player.lertodososjogadores();
    player.lercarsatend();
    

    if(allplayers!==undefined){
      image(pistaimg, 0, -height*5, width, height*6);
      

      this.showplacar();
      this.showlife();
      this.showfuel();
      

      var index=0;
      for(var plr in allplayers){
        index=index+1;
        var x=allplayers[plr].positionx;
        var y=height-allplayers[plr].positiony;
        
        var vidaatual=allplayers[plr].life;
        if(vidaatual<=0){
          cars[index-1].changeImage("blast");
          cars[index-1].scale=0.3;

        }

        cars[index-1].position.x=x;
        cars[index-1].position.y=y;

        if(index===player.index){
          stroke(10)
          fill("red");
          ellipse(x,y,60,60);

          this.pegarfuel(index);
          this.pegarcoins(index);
          this.obstaclescollision(index);
          this.carscollision(index);

          if(player.life<=0){
            this.blast=true;
            this.playermove=false;
          }
          camera.position.y=cars[index-1].position.y;
        }

      }
      if(this.playermove==true){
        player.positiony=player.positiony+5;
        player.atualizardistancia();
      }
      this.playercontrol();
      
      const finishline=height*6-100;
      if(player.positiony>finishline){
        gamestate=2;
        player.rank=player.rank+1;
        Player.updatecarsAtEnd(player.rank);
        player.atualizardistancia();
        console.log("VOCÊ CHEGOU EM "+player.rank+"º LUGAR!")
        this.showrank();
        
        
      }
      
      drawSprites();
    }

  }

  playercontrol(){
    if(this.blast === false){
    if(keyIsDown(UP_ARROW)){
       this.playermove=true;
      player.positiony=player.positiony+10;
      player.atualizardistancia();
    }
    if(keyIsDown(RIGHT_ARROW) && player.positionx<width/2+300){
      this.leftkeyactive=false;
      player.positionx=player.positionx+5;
      player.atualizardistancia();
    }
    if(keyIsDown(LEFT_ARROW) && player.positionx>width/2-300){
      this.leftkeyactive=true;
      player.positionx=player.positionx-5;
      player.atualizardistancia();
    }
  }
  }

  handleresetbutton(){
    this.resetbutton.mousePressed(()=>{
      database.ref("/").set({
        playerCount:0,gameState:0,
        players:{},carsAtEnd:0
      });
      window.location.reload();
    })
  }

  showrank(){
    swal({
      title:`PARABÉNS!!${"\n"}${player.rank}ºlugar`,
      text:"VOCÊ PASSOU PELA LINHA DE CHEGADA",
      imageUrl:"https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize:"100x100",
      confirmButtonText:"LEGAL!"
    })
  }

  gameover(){
    swal({
      title:`FIM DE JOGO :(`,
      text:"QUE PENA,VOCÊ PERDEU",
      imageUrl:"https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize:"100x100",
      confirmButtonText:"MAIS SORTE NA PRÓXIMA VEZ!!"
    })
  }
  showlife(){
    push();
    image(lifeimg,width/2-130,height-player.positiony-200,20,20);
    fill("white");
    rect(width/2-100,height-player.positiony-200,185,20);
    fill("#f50057");
    rect(width/2-100,height-player.positiony-200,player.life,20);
    noStroke();
    pop(); 
  }
 
  showfuel(){
    push();
    image(fuelimg,width/2-130,height-player.positiony-100,20,20);
    fill("white");
    rect(width/2-100,height-player.positiony-100,185,20);
    fill("#ffc400");
    rect(width/2-100,height-player.positiony-100,player.fuel,20);
    noStroke();
    pop(); 
  }

  obstaclescollision(index){
    if(cars[index-1].collide(obs)){

      if(this.leftkeyactive === true){
        player.positionx = player.positionx+100;
      }
         else{
          player.positionx = player.positionx-100;
              }

      if(player.life>0){
        player.life=player.life-(185/4)
      }
      player.atualizardistancia();
    }
    
  }
  carscollision(index){
    if(index === 1){
      if(cars[index-1].collide(cars[1])){
        if(this.leftkeyactive === true){
          player.positionx = player.positionx+100;
        }
           else{
            player.positionx = player.positionx-100;
                }
  
        if(player.life>0){
          player.life=player.life-(185/4)
        }
        player.atualizardistancia();
      

      }
    }
    if(index===2){
      if(cars[index-1].collide(cars[0])){
        if(this.leftkeyactive === true){
          player.positionx = player.positionx+100;
        }
           else{
            player.positionx = player.positionx-100;
                }
  
        if(player.life>0){
          player.life=player.life-(185/4)
        }
        player.atualizardistancia();
      }
    }
  }

  end(){
    console.log("FIM DE JOGO!")
  }
       
   
}
