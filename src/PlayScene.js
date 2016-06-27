window.scoreLabel = null;
window.score = 0;
var PlayLayer = cc.Layer.extend({
	bgSprite:null,
	SushiSprites:null,
	timeout:60,
	ctor:function(){
		this._super();
		var size = cc.winSize;
		window.scoreLabel = new cc.LabelTTF("score : 0","Arial",20);
		window.scoreLabel.attr({
			x:size.width/2+100,
			y:size.height - 20
		});
		this.addChild(window.scoreLabel,5);
		this.timeoutLabel = new cc.LabelTTF.create(""+this.timeout,"Arial",30);
		this.timeoutLabel.x = 20;
		this.timeoutLabel.y = size.height - 20;
		this.addChild(this.timeoutLabel,5);
		this.SushiSprites = [];
		cc.spriteFrameCache.addSpriteFrame(res.Sushi_plist);
		this.bgSprite = new cc.Sprite(res.BackGround_png);
		this.bgSprite.attr({
			x:size.width/2,
			y:size.height/2,
			rotation:180
		});

		this.addChild(this.bgSprite,0);
		this.schedule(this.update,1,16*1024,1);
		this.schedule(this.timer,1,this.timeout,1);
		return true;
	},
	addSushi: function(){
		var sushi = new SushiSprite(res.Sushi_png);
		var size = cc.winSize;

		var x = sushi.width/2+size.width/2*cc.random0To1();
		sushi.attr({
			x:x,
			y:size.height-30
		});
		var dropAction = cc.MoveTo.create(4,cc.p(sushi.x,-30));
		sushi.runAction(dropAction);
		this.addChild(sushi,5);
		this.SushiSprites.push(sushi);
	},
	update:function (){
		this.addSushi();
		this.removeSushi();
	},
	removeSushi:function(){
		for (var i = 0; i <this.SushiSprites.length; i++) {
			if(this.SushiSprites[i].y<=0){
				this.SushiSprites[i].removeFromParent();
				this.SushiSprites[i] = undefined;
				this.SushiSprites.splice(i,1);
				i = i-1;
			}
		}
	},
	timer: function(){
		if(this.timeout == 0){
			var gameOver = new cc.LayerColor(cc.color(255,255,255,100));
			var size = cc.winSize;
			var titleLabel = new cc.LabelTTF("game over","Arial",38);
			titleLabel.attr({
				x:size.width/2,
				y:size.height/2
			});
			gameOver.addChild(titleLabel,5);
			var TryAgainItem = new cc.MenuItemFont(
					"try again",
					function(){
						var transition = cc.TransitionFade.create(1,new PlayScene(),cc.color(255,255,255,255));
						cc.director.runScene(transition);
					},this);
			TryAgainItem.attr({
				x:size.width/2,
				y:size.height/2-60,
				anchorX:0.5,
				anchorY:0.5
			});
			var menu = new cc.Menu(TryAgainItem);
			menu.x = 0;
			menu.y = 0;
			gameOver.addChild(menu,6);
			this.getParent().addChild(gameOver);
			this.unschedule(this.update);
			this.unschedule(this.timer);
			return ;
		}
		this.timeout -=1;
		this.timeoutLabel.setString(""+this.timeout);
	}

});

var PlayScene = cc.Scene.extend({
	onEnter:function (){
		this._super();
		var Layer = new PlayLayer();
		this.addChild(Layer);
	},
	addScore : function(){
		window.score += 1;
		window.scoreLabel.setString("score: "+window.score);	
		cc.log("score:"+window.scoreLabel.getString());
	},
	removeSushi:function(){
		// this._super();
		cc.log("remove1111");
	}
});