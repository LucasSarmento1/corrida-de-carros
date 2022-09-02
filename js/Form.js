class Form {
constructor(){
    this.input= createInput("").attribute("placeholder","digite o seu nome!");
    this.button= createButton("JOGAR");
    this.titleimg= createImg("./assets/TITULO.png","Nome do jogo");
    this.mensagem= createElement("h2");

}
setelementsposition(){
    this.titleimg.position(120,160);
    this.input.position(width/2-110,height/2-80);
    this.button.position(width/2-90,height/2-20);
    this.mensagem.position(width/2-300,height/2-100);
}
setelementsstyle(){
    this.titleimg.class("gameTitle");
    this.input.class("customInput");
    this.button.class("customButton");
    this.mensagem.class("greeting");
}
handlemousepressed(){
    this.button.mousePressed(()=>{
        this.input.hide();
        this.button.hide();
        var nome=this.input.value();
        var msg=`Olá, ${nome}</br>espere o outro jogador entrar!`;
        this.mensagem.html(msg);
        playercount=playercount+1;
    player.nome=this.input.value();
    player.index=playercount;
    player.addjogadores();
    player.atualizarjogadores(playercount);   
    player.lerdistancia();
    })
}

display(){
    this.setelementsposition();
    this.setelementsstyle();
    this.handlemousepressed();
}
hideelements(){
    this.button.hide();
    this.mensagem.hide();
    this.input.hide();
    this.titleimg.position(40,50);
    this.titleimg.class("gameTitleAfterEffect");
}
} 
