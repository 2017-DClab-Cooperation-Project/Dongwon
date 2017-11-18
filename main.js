/*var game;
var gameOptions = {
    gameWidth: 800,
    gameHeight: 600,
    circleColors: [0xff0099, 0xf3f315, 0x83f52c, 0x630dd0],
}
 //	make game instance 
game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.AUTO, '');
   
 //	init game instance, add state 

game.state.add('Game', Game); 
game.state.add('GameTitle', gameTitle); 
   
game.state.start('GameTitle');  
*/
var game;
var gameOptions = {
    gameWidth: 750,
    gameHeight: 1334,
    circleColors: [0xff0099, 0xf3f315, 0x83f52c, 0x630dd0],
}
window.onload = function() {
    game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight);
    game.state.add("GameTitle", gameTitle);
    game.state.add("Game", Game); 
    game.state.start("GameTitle");
}
var gameTitle = function(game){}
gameTitle.prototype = {
    preload: function(){
        game.load.image("gametitle", "./assets/title/gametitle.png");
        game.load.image("playbutton", "./assets/title/playbutton.png");
        game.load.image("particle", "./assets/title/particle.png");
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.disableVisibilityChange = true;        
    },
    create: function(){
        var emitter = game.add.emitter(game.width / 2, 0, 100);
        emitter.width = game.width;
        emitter.makeParticles("particle");
        emitter.minParticleScale = 0.1;
        emitter.maxParticleScale = 0.2;
        emitter.setYSpeed(150, 250);
        emitter.setXSpeed(0, 0);
        emitter.setAlpha(1, 1);
        emitter.minRotation = 0;
        emitter.maxRotation = 0;
        emitter.start(false, 4000, 50, 0);
        emitter.forEach(function(particle){
            particle.tint = Phaser.ArrayUtils.getRandomItem(gameOptions.circleColors);
        });
        this.titleBack = game.add.sprite(game.width / 2, 300, "gametitle");
        this.titleBack.anchor.set(0.5);
        this.titleBack.tint = Phaser.ArrayUtils.getRandomItem(gameOptions.circleColors);
        var title = game.add.sprite(game.width / 2, 300, "gametitle");
        title.anchor.set(0.5);
        title.tint = Phaser.ArrayUtils.getRandomItem(gameOptions.circleColors);
        this.buttonBack = game.add.sprite(game.width / 2, game.height / 2 + 200, "playbutton");
        this.buttonBack.anchor.set(0.5);
        this.buttonBack.tint = Phaser.ArrayUtils.getRandomItem(gameOptions.circleColors);
        var playButton = game.add.button(game.width / 2, game.height / 2 + 200, "playbutton", function(){
            game.state.start("GameTitle");
        }, this);
        playButton.anchor.set(0.5);
        playButton.tint = Phaser.ArrayUtils.getRandomItem(gameOptions.circleColors);
    },
    update: function(){
        this.titleBack.position.set(game.width / 2 + game.rnd.integerInRange(-8, 8), 300 + game.rnd.integerInRange(-8, 8));
        this.buttonBack.position.set(game.width / 2 + game.rnd.integerInRange(-8, 8), game.height / 2 + 200 + game.rnd.integerInRange(-8, 8));  
    }
}