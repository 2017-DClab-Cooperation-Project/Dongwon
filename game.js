var game;
var gameOptions = {
    gameWidth: 500,
    gameHeight: 500,
    circleColors: [0xfe153a, 0x36dffa, 0xec9f10, 0x27f118],
    circlePositions: [new Phaser.Point(-125, -125), new Phaser.Point(125, -125), new Phaser.Point(125, 125), new Phaser.Point(-125, 125)]
}
var SWIPEUP = 0;
var SWIPEDOWN = 1;
var SWIPELEFT = 2;
var SWIPERIGHT = 3;
window.onload = function() {
    game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight);
    game.state.add("PlayGame", playGame);
    game.state.start("PlayGame");
}
var playGame = function(game){}
playGame.prototype = {
    preload: function(){
        game.load.image("circle", "circle.png");
    },
    create: function(){
        game.stage.backgroundColor = 0x444444;
        this.circleGroup = game.add.group();
        this.circleGroup.position.set(game.width / 2, game.height / 2);
        this.circlesArray = [];
        for(var i = 0; i < 4; i++){
            var circle = game.add.sprite(gameOptions.circlePositions[i].x, gameOptions.circlePositions[i].y, "circle");
            circle.anchor.set(0.5);
            circle.tint = gameOptions.circleColors[i];
            this.circlesArray.push(circle);
            this.circleGroup.add(circle);
        }
        game.input.onTap.add(this.handleTap, this);
        game.input.onDown.add(this.beginSwipe, this);
    },
    handleTap: function(pointer, doubleTap){
        if(doubleTap){
            var tweenRight = game.add.tween(this.circlesArray[0]).to({
                x: this.circlesArray[0].x + 250 
            }, 200, Phaser.Easing.Cubic.Out, true);
            var tweenLeft = game.add.tween(this.circlesArray[1]).to({
                x: this.circlesArray[1].x - 250 
            }, 200, Phaser.Easing.Cubic.Out, true);
            var tempSprite = this.circlesArray[0];
            this.circlesArray[0] = this.circlesArray[1];
            this.circlesArray[1] = tempSprite;
        }
    },
    beginSwipe: function(e) {
        game.input.onDown.remove(this.beginSwipe, this);
        game.input.onUp.add(this.endSwipe, this);
    },
    endSwipe: function(e) {
        game.input.onUp.remove(this.endSwipe, this);
        var swipeTime = e.timeUp - e.timeDown;
        var swipeDistance = Phaser.Point.subtract(e.position, e.positionDown);
        var swipeMagnitude = swipeDistance.getMagnitude();
        var swipeNormal = Phaser.Point.normalize(swipeDistance);
        if(swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)) {
            if(swipeNormal.x > 0.8) {
                this.handleSwipe(SWIPERIGHT, e.position);
            }
            if(swipeNormal.x < -0.8) {
                this.handleSwipe(SWIPELEFT, e.position);
            }
            if(swipeNormal.y > 0.8) {
                this.handleSwipe(SWIPEDOWN, e.position);
            }
            if(swipeNormal.y < -0.8) {
                this.handleSwipe(SWIPEUP, e.position);
            }
        } else {
            game.input.onDown.add(this.beginSwipe, this);
        }
    },
    handleSwipe: function(dir, startPoint) {
        var degrees = ((dir == SWIPERIGHT) || (dir == SWIPEUP && startPoint.x < game.width / 2) || (dir == SWIPEDOWN && startPoint.x > game.width / 2)) ? 90 : -90;
        var rotateTween = game.add.tween(this.circleGroup).to({
            angle: degrees 
        }, 200, Phaser.Easing.Cubic.Out, true);
        rotateTween.onComplete.add(function(){
            if(degrees == 90){
                Phaser.ArrayUtils.rotateRight(this.circlesArray);    
            }
            else{
                Phaser.ArrayUtils.rotateLeft(this.circlesArray);             
            }
            this.circleGroup.angle = 0;
            for(var i = 0; i < 4; i++){
                this.circlesArray[i].position.set(gameOptions.circlePositions[i].x, gameOptions.circlePositions[i].y);
            }                
        }, this);
        game.input.onDown.add(this.beginSwipe, this);
    }
}