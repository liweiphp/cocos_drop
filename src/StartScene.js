
var StartSceneLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;
        //add background image
        this.sprite = new cc.Sprite(res.BackGround_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);
        //add start button
        var startItem = new cc.MenuItemImage(
                res.Start_N_png,
                res.Start_S_png,
                function(){
                    cc.log("menu is clicked");
                    cc.log(cc.director);
                    cc.director.runScene(cc.TransitionFade.create(1,new PlayScene(),false));//TransitionPageTurn
                },this);
        startItem.attr({
            x:size.width/2,
            y:size.height/2,
            anchorX:0.5,
            anchorY:0.5
        });
        
        var menu = new cc.Menu(startItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu,1)

        return true;
    }
});

var StartScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new StartSceneLayer();
        this.addChild(layer);
    }
});

