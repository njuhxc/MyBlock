(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.webFontTxtInst = {}; 
var loadedTypekitCount = 0;
var loadedGoogleCount = 0;
var gFontsUpdateCacheList = [];
var tFontsUpdateCacheList = [];
lib.ssMetadata = [
		{name:"jjmtc300x600h5_atlas_", frames: [[187,0,299,105],[488,0,13,19],[503,0,9,11],[0,0,185,199],[367,107,72,18],[0,201,159,69],[187,107,178,158]]}
];



lib.updateListCache = function (cacheList) {		
	for(var i = 0; i < cacheList.length; i++) {		
		if(cacheList[i].cacheCanvas)		
			cacheList[i].updateCache();		
	}		
};		

lib.addElementsToCache = function (textInst, cacheList) {		
	var cur = textInst;		
	while(cur != exportRoot) {		
		if(cacheList.indexOf(cur) != -1)		
			break;		
		cur = cur.parent;		
	}		
	if(cur != exportRoot) {		
		var cur2 = textInst;		
		var index = cacheList.indexOf(cur);		
		while(cur2 != cur) {		
			cacheList.splice(index, 0, cur2);		
			cur2 = cur2.parent;		
			index++;		
		}		
	}		
	else {		
		cur = textInst;		
		while(cur != exportRoot) {		
			cacheList.push(cur);		
			cur = cur.parent;		
		}		
	}		
};		

lib.gfontAvailable = function(family, totalGoogleCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], gFontsUpdateCacheList);		

	loadedGoogleCount++;		
	if(loadedGoogleCount == totalGoogleCount) {		
		lib.updateListCache(gFontsUpdateCacheList);		
	}		
};		

lib.tfontAvailable = function(family, totalTypekitCount) {		
	lib.properties.webfonts[family] = true;		
	var txtInst = lib.webFontTxtInst && lib.webFontTxtInst[family] || [];		
	for(var f = 0; f < txtInst.length; ++f)		
		lib.addElementsToCache(txtInst[f], tFontsUpdateCacheList);		

	loadedTypekitCount++;		
	if(loadedTypekitCount == totalTypekitCount) {		
		lib.updateListCache(tFontsUpdateCacheList);		
	}		
};
// symbols:



(lib.bg = function() {
	this.spriteSheet = ss["jjmtc300x600h5_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.image104 = function() {
	this.spriteSheet = ss["jjmtc300x600h5_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.image116 = function() {
	this.spriteSheet = ss["jjmtc300x600h5_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.image167 = function() {
	this.spriteSheet = ss["jjmtc300x600h5_atlas_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.image89 = function() {
	this.spriteSheet = ss["jjmtc300x600h5_atlas_"];
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.image99 = function() {
	this.spriteSheet = ss["jjmtc300x600h5_atlas_"];
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.mtc = function() {
	this.spriteSheet = ss["jjmtc300x600h5_atlas_"];
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.shape90 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.image89();
	this.instance.parent = this;
	this.instance.setTransform(230,583);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(230,583,72,18);


(lib.shape33 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AhGKJIBNhaIBKBbIgLABgAIlACIBbhIIACAKIgDCMgAqBg8IACgKIBbBIIhaBOgAhGqHICMgDIALACIhKBbg");
	this.shape.setTransform(64.2,65.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,128.3,130.2);


(lib._1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.shape176 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#990000").ss(1,0,0,3).p("AAhgWIgcAAIhcgCIAAAxIC0AA");
	this.shape.setTransform(8.8,2.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FD1C1C","rgba(236,2,2,0)"],[0.4,1],-6,0.2,0,-6,0.2,1.8).s().p("AiBAUIAAgmIBTgBIAcABICUAAIAAAmg");
	this.shape_1.setTransform(13.9,2.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,27.9,7);


(lib.shape175 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,3).p("AAuAuQgTATgbAAQgaAAgTgTQgTgTAAgbQAAgaATgTQATgTAaAAQAbAAATATQATATAAAaQAAAbgTATg");
	this.shape.setTransform(37.2,38.4);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#FD1C1C","rgba(236,2,2,0)"],[0.4,1],0,0,0,0,0,3.9).s().p("AgXAYQgKgKAAgOQAAgNAKgKQAKgKANAAQAOAAAKAKQAKAKAAANQAAAOgKAKQgKAKgOAAQgNAAgKgKg");
	this.shape_1.setTransform(37.1,38.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(29.7,30.9,15,15);


(lib.shape169 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#00CCFF","rgba(26,209,255,0)"],[0,1],2.8,-3.7,0,2.8,-3.7,23.7).s().p("ADvB3IgkhjIiOhkIi0gNIiCBXIAVguIBuhEIC8ALICLBoIApB+g");
	this.shape.setTransform(25,12.1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,50,24.2);


(lib.shape168 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.image167();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,185,199);


(lib.shape121 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],2), null, new cjs.Matrix2D(0.994,0,0,0.995,-4.5,-5.5)).s().p("AgsA3IAAhtIBZAAIAABtg");
	this.shape.setTransform(0.4,-5.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.1,-10.9,9,11);


(lib.shape120 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],2), null, new cjs.Matrix2D(0.994,0,0,0.995,-4.5,-5.5)).s().p("AgsA3IAAhtIBZAAIAABtg");
	this.shape.setTransform(0.4,-5.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],2), null, new cjs.Matrix2D(0.994,0,0,0.995,-4.5,-5.5)).s().p("AgsA3IAAhtIBZAAIAABtg");
	this.shape_1.setTransform(12.4,-5.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.1,-10.9,21,11);


(lib.shape119 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],2), null, new cjs.Matrix2D(0.994,0,0,0.995,-4.5,-5.5)).s().p("AgsA3IAAhtIBZAAIAABtg");
	this.shape.setTransform(0.4,-5.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],2), null, new cjs.Matrix2D(0.994,0,0,0.995,-4.5,-5.5)).s().p("AgsA3IAAhtIBZAAIAABtg");
	this.shape_1.setTransform(12.4,-5.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer 1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],2), null, new cjs.Matrix2D(0.994,0,0,0.995,-4.5,-5.5)).s().p("AgsA3IAAhtIBZAAIAABtg");
	this.shape_2.setTransform(24.3,-5.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.1,-10.9,32.9,11);


(lib.shape118 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],2), null, new cjs.Matrix2D(0.994,0,0,0.995,-4.5,-5.5)).s().p("AgsA3IAAhtIBZAAIAABtg");
	this.shape.setTransform(0.4,-5.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],2), null, new cjs.Matrix2D(0.994,0,0,0.995,-4.5,-5.5)).s().p("AgsA3IAAhtIBZAAIAABtg");
	this.shape_1.setTransform(12.4,-5.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer 2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],2), null, new cjs.Matrix2D(0.994,0,0,0.995,-4.5,-5.5)).s().p("AgsA3IAAhtIBZAAIAABtg");
	this.shape_2.setTransform(24.3,-5.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],2), null, new cjs.Matrix2D(0.994,0,0,0.995,-4.5,-5.5)).s().p("AgsA3IAAhtIBZAAIAABtg");
	this.shape_3.setTransform(36.4,-5.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4.1,-10.9,45,11);


(lib.shape117 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 5
	this.instance = new lib.image116();
	this.instance.parent = this;
	this.instance.setTransform(45,-11);

	this.instance_1 = new lib.image116();
	this.instance_1.parent = this;
	this.instance_1.setTransform(32,-11);

	this.instance_2 = new lib.image116();
	this.instance_2.parent = this;
	this.instance_2.setTransform(20,-11);

	this.instance_3 = new lib.image116();
	this.instance_3.parent = this;
	this.instance_3.setTransform(8,-11);

	this.instance_4 = new lib.image116();
	this.instance_4.parent = this;
	this.instance_4.setTransform(-4,-11);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-11,58,11);


(lib.shape114 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape.setTransform(0,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.4,-18.9,13,19);


(lib.shape113 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape.setTransform(8.8,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_1.setTransform(0,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.4,-18.9,21.7,19);


(lib.shape112 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 3
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape.setTransform(18,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_1.setTransform(8.8,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer 1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_2.setTransform(0,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.4,-18.9,30.9,19);


(lib.shape111 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape.setTransform(27,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_1.setTransform(18,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer 2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_2.setTransform(8.8,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_3.setTransform(0,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.4,-18.9,40,19);


(lib.shape110 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 5
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape.setTransform(36,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_1.setTransform(27,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer 3
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_2.setTransform(18,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer 2
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_3.setTransform(8.8,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer 1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_4.setTransform(0,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.4,-18.9,48.9,19);


(lib.shape109 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 6
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape.setTransform(45,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 5
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_1.setTransform(36,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer 4
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_2.setTransform(27,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer 3
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_3.setTransform(18,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer 2
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_4.setTransform(8.8,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer 1
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_5.setTransform(0,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.4,-18.9,58,19);


(lib.shape108 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 7
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape.setTransform(53.9,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 6
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_1.setTransform(45,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer 5
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_2.setTransform(36,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer 4
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_3.setTransform(27,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer 3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_4.setTransform(18,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer 2
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_5.setTransform(8.8,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer 1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_6.setTransform(0,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.4,-18.9,66.9,19);


(lib.shape107 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 8
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape.setTransform(63,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 7
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_1.setTransform(53.9,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer 6
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_2.setTransform(45,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer 5
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_3.setTransform(36,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer 4
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_4.setTransform(27,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer 3
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_5.setTransform(18,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer 2
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_6.setTransform(8.8,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	// Layer 1
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_7.setTransform(0,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.4,-18.9,75.9,19);


(lib.shape106 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 9
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape.setTransform(72.1,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer 8
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_1.setTransform(63,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer 7
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_2.setTransform(53.9,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1));

	// Layer 6
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_3.setTransform(45,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(1));

	// Layer 5
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_4.setTransform(36,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_4).wait(1));

	// Layer 4
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_5.setTransform(27,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_5).wait(1));

	// Layer 3
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_6.setTransform(18,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_6).wait(1));

	// Layer 2
	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_7.setTransform(8.8,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_7).wait(1));

	// Layer 1
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],1), null, new cjs.Matrix2D(0.996,0,0,0.997,-6.5,-9.5)).s().p("AhABfIAAi9ICBAAIAAC9g");
	this.shape_8.setTransform(0,-9.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_8).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6.4,-18.9,85,19);


(lib.shape105 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.image104();
	this.instance.parent = this;
	this.instance.setTransform(75,-19);

	this.instance_1 = new lib.image104();
	this.instance_1.parent = this;
	this.instance_1.setTransform(66,-19);

	this.instance_2 = new lib.image104();
	this.instance_2.parent = this;
	this.instance_2.setTransform(57,-19);

	this.instance_3 = new lib.image104();
	this.instance_3.parent = this;
	this.instance_3.setTransform(48,-19);

	this.instance_4 = new lib.image104();
	this.instance_4.parent = this;
	this.instance_4.setTransform(39,-19);

	this.instance_5 = new lib.image104();
	this.instance_5.parent = this;
	this.instance_5.setTransform(30,-19);

	this.instance_6 = new lib.image104();
	this.instance_6.parent = this;
	this.instance_6.setTransform(21,-19);

	this.instance_7 = new lib.image104();
	this.instance_7.parent = this;
	this.instance_7.setTransform(12,-19);

	this.instance_8 = new lib.image104();
	this.instance_8.parent = this;
	this.instance_8.setTransform(3,-19);

	this.instance_9 = new lib.image104();
	this.instance_9.parent = this;
	this.instance_9.setTransform(-6,-19);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6,-19,94,19);


(lib.shape101 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.bf(cjs.SpriteSheetUtils.extractFrame(ss["jjmtc300x600h5_atlas_"],5), null, new cjs.Matrix2D(1.045,0,0,1.045,-25.4,-42.1)).s().p("AiKCLQg5g6AAhRQAAhQA5g6QA6g5BQAAQBRAAA5A5QA6A6AABQQAABRg6A6Qg5A5hRAAQhQAAg6g5g");
	this.shape.setTransform(0.1,-19);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.5,-38.6,39.2,39.2);


(lib.shape100 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.image99();
	this.instance.parent = this;
	this.instance.setTransform(1,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1,0,159,69);


(lib.shape67Hit = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FF0000").ss(4,0,0,3).p("AG2BSQAHgoAAgqQAAgggEgfIgBgGQgUiMhphpQhmhliFgXIgLgBIhFgFQi4AAiCCCQhpBpgUCNIgCAMQgDAcAAAcQAAAnAGAlIAAAAIABAGQAXCEBkBkQBrBrCPAUIBAAEIBHgFQCLgVBphpQBkhkAXiEg");
	this.shape.setTransform(44.5,44.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FF0000").s().p("AhHG8IAIgJIA/AEIBHgFIhHAFIg/gEIBFhRIBBBQIAKAMgAFcgBIBchKIABAGIgDCRgAm1BGIABAGIgBAAgAm1BGIAAAAIgDiEIACgMIgCAMIgBgOIADACIBbBJIhZBNgAG5hFIgBgGIABgBIAAAHgAG4hLgAhHm7ICMgCIAMgBIgBACIgLgBIALABIhKBbg");
	this.shape_1.setTransform(44.5,45.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,93.3,93);


(lib.shape43Hit = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0066FF").s().p("AqzKzIAA1lIVnAAIAAVlg");
	this.shape.setTransform(51.6,25.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-17.5,-43.4,138.4,138.3);


(lib.shape30Hit = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF0000").s().p("AujOkQmCmCAAoiQAAohGCmCQGCmCIhAAQIiAAGCGCQGCGCAAIhQAAIimCGCQmCGCoiAAQohAAmCmCg");
	this.shape.setTransform(131.8,131.8);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,263.7,263.7);


(lib._7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.mtc();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._7, new cjs.Rectangle(0,0,178,158), null);


(lib._2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib.bg();
	this.instance.parent = this;
	this.instance.setTransform(-521,-259,1.683,1.586);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib._2, new cjs.Rectangle(-521,-259,503.1,166.6), null);


(lib.sprite177 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.shape176("synched",0);
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.sprite177, new cjs.Rectangle(-1,-1,27.9,7), null);


(lib.sprite170 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.shape169("synched",0);
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.sprite170, new cjs.Rectangle(0,0,50,24.2), null);


(lib.sprite122 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 5
	this.instance = new lib.shape117("synched",0);
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(4));

	// Layer 4
	this.instance_1 = new lib.shape118("synched",0);
	this.instance_1.parent = this;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).to({_off:true},1).wait(3));

	// Layer 3
	this.instance_2 = new lib.shape119("synched",0);
	this.instance_2.parent = this;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(2).to({_off:false},0).to({_off:true},1).wait(2));

	// Layer 2
	this.instance_3 = new lib.shape120("synched",0);
	this.instance_3.parent = this;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3).to({_off:false},0).to({_off:true},1).wait(1));

	// Layer 1
	this.instance_4 = new lib.shape121("synched",0);
	this.instance_4.parent = this;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(4).to({_off:false},0).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-4,-11,58,11);


(lib.sprite115 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 10
	this.instance = new lib.shape105("synched",0);
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},12).wait(50));

	// Layer 9
	this.instance_1 = new lib.shape106("synched",0);
	this.instance_1.parent = this;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(12).to({_off:false},0).to({_off:true},1).wait(49));

	// Layer 8
	this.instance_2 = new lib.shape107("synched",0);
	this.instance_2.parent = this;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(13).to({_off:false},0).to({_off:true},1).wait(48));

	// Layer 7
	this.instance_3 = new lib.shape108("synched",0);
	this.instance_3.parent = this;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(14).to({_off:false},0).to({_off:true},1).wait(47));

	// Layer 6
	this.instance_4 = new lib.shape109("synched",0);
	this.instance_4.parent = this;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(15).to({_off:false},0).to({_off:true},1).wait(46));

	// Layer 5
	this.instance_5 = new lib.shape110("synched",0);
	this.instance_5.parent = this;
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(16).to({_off:false},0).to({_off:true},1).wait(45));

	// Layer 4
	this.instance_6 = new lib.shape111("synched",0);
	this.instance_6.parent = this;
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(17).to({_off:false},0).to({_off:true},1).wait(44));

	// Layer 3
	this.instance_7 = new lib.shape112("synched",0);
	this.instance_7.parent = this;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(18).to({_off:false},0).to({_off:true},1).wait(43));

	// Layer 2
	this.instance_8 = new lib.shape113("synched",0);
	this.instance_8.parent = this;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(19).to({_off:false},0).to({_off:true},1).wait(42));

	// Layer 1
	this.instance_9 = new lib.shape114("synched",0);
	this.instance_9.parent = this;
	this.instance_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(20).to({_off:false},0).wait(42));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6,-19,94,19);


(lib.sprite102 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.shape101("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(0,18.9);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.sprite102, new cjs.Rectangle(-19.5,-19.7,39.2,39.2), null);


(lib.sprite70 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.shape67Hit("synched",0);
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.sprite70, new cjs.Rectangle(-2,-2,93.3,93), null);


(lib.sprite68 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.shape33("synched",0);
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},2).wait(2).to({_off:false},0).to({_off:true},2).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,128.3,130.2);


(lib.sprite66 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.shape30Hit("synched",0);
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.sprite66, new cjs.Rectangle(0,0,263.7,263.7), null);


(lib._11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._2();
	this.instance.parent = this;
	this.instance.setTransform(269.4,-448.4,0.607,0.607,0,0,0,175.9,170.2);

	this.instance_1 = new lib._2();
	this.instance_1.parent = this;
	this.instance_1.setTransform(269.4,-769.6,0.607,0.607,0,180,0,175.9,170.2);

	this.instance_2 = new lib._2();
	this.instance_2.parent = this;
	this.instance_2.setTransform(269.4,-647.8,0.607,0.607,0,0,0,175.9,170.2);

	this.instance_3 = new lib._2();
	this.instance_3.parent = this;
	this.instance_3.setTransform(269.4,-967.6,0.607,0.607,0,180,0,175.9,170.3);

	this.instance_4 = new lib._2();
	this.instance_4.parent = this;
	this.instance_4.setTransform(269.4,-848.8,0.607,0.607,0,0,0,175.9,170.2);

	this.instance_5 = new lib._2();
	this.instance_5.parent = this;
	this.instance_5.setTransform(269.4,-1168.5,0.607,0.607,0,180,0,175.9,170.2);

	this.instance_6 = new lib._2();
	this.instance_6.parent = this;
	this.instance_6.setTransform(269.4,-1048.7,0.607,0.607,0,0,0,175.9,170.1);

	this.instance_7 = new lib._2();
	this.instance_7.parent = this;
	this.instance_7.setTransform(269.4,-1368.8,0.607,0.607,0,180,0,175.9,170.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib._11, new cjs.Rectangle(-153.8,-1309.3,305.5,800.3), null);


(lib._6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._7();
	this.instance.parent = this;
	this.instance.setTransform(89,79,1,1,0,0,0,89,79);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({y:78},2).to({y:79},2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,178,158);


(lib.sprite71 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.sprite70();
	this.instance.parent = this;
	this.instance.setTransform(45.5,45,1,1,0,0,0,45.5,45);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:1800},24).to({rotation:3600},25).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2,93.3,93);


(lib.sprite69 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_20 = function() {
		/* stop ();
		*/
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(20).call(this.frame_20).wait(1));

	// Layer 2
	this.instance = new lib.sprite68();
	this.instance.parent = this;
	this.instance.setTransform(-19.8,-20.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20).to({_off:false},0).wait(1));

	// Layer 1
	this.instance_1 = new lib.shape67Hit("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(-200.5,-200.1,5.5,5.5);
	this.instance_1.alpha = 0.199;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(2).to({_off:false},0).to({scaleX:0.7,scaleY:0.7,x:13.4,y:13.3,alpha:1},3).to({startPosition:0},2).to({startPosition:0},2).to({scaleX:0.59,scaleY:0.59,rotation:60.1,x:54.2,y:8.6},1).to({scaleX:0.48,scaleY:0.48,rotation:119.9,x:77.7,y:37.5},1).to({scaleX:0.38,scaleY:0.38,rotation:180,x:58.5,y:56.4},1).to({scaleX:0.27,scaleY:0.27,rotation:240.1,x:40.3,y:59.1},1).to({scaleX:0.16,scaleY:0.16,rotation:299.9,x:35,y:47.1},1).to({scaleX:0.05,scaleY:0.05,rotation:360,x:42.3,y:42.3},1).to({scaleX:0.7,scaleY:0.7,x:13.4,y:13.3,alpha:0},5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.sprite178 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.sprite177();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:10.5},4).to({x:0},5).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,-0.5,27.4,6);


(lib.sprite171 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 22
	this.instance = new lib.sprite170();
	this.instance.parent = this;
	this.instance.setTransform(74.7,78.8,0.631,0.631);
	this.instance._off = true;
	this.instance.filters = [new cjs.ColorFilter(0.5, 0.5, 0.5, 1, 0, 0, 0, 0), new cjs.BlurFilter(2, 2, 1)];
	this.instance.cache(-2,-2,54,28);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).wait(4));

	// Layer 20
	this.instance_1 = new lib.sprite170();
	this.instance_1.parent = this;
	this.instance_1.setTransform(72.8,83.3,0.631,0.631);
	this.instance_1._off = true;
	this.instance_1.filters = [new cjs.BlurFilter(2, 2, 1)];
	this.instance_1.cache(-2,-2,54,28);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(10).to({_off:false},0).wait(6));

	// Layer 18
	this.instance_2 = new lib.sprite170();
	this.instance_2.parent = this;
	this.instance_2.setTransform(68.6,87.6,0.723,0.723);
	this.instance_2._off = true;
	this.instance_2.filters = [new cjs.BlurFilter(2, 2, 1)];
	this.instance_2.cache(-2,-2,54,28);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(9).to({_off:false},0).wait(7));

	// Layer 16
	this.instance_3 = new lib.sprite170();
	this.instance_3.parent = this;
	this.instance_3.setTransform(65.9,92.5,0.76,0.76);
	this.instance_3._off = true;
	this.instance_3.filters = [new cjs.BlurFilter(2, 2, 1)];
	this.instance_3.cache(-2,-2,54,28);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(8).to({_off:false},0).wait(8));

	// Layer 14
	this.instance_4 = new lib.sprite170();
	this.instance_4.parent = this;
	this.instance_4.setTransform(61.9,97.7,0.837,0.837);
	this.instance_4._off = true;
	this.instance_4.filters = [new cjs.BlurFilter(2, 2, 1)];
	this.instance_4.cache(-2,-2,54,28);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(7).to({_off:false},0).wait(9));

	// Layer 12
	this.instance_5 = new lib.sprite170();
	this.instance_5.parent = this;
	this.instance_5.setTransform(60.8,103.5,0.837,0.837);
	this.instance_5._off = true;
	this.instance_5.filters = [new cjs.BlurFilter(2, 2, 1)];
	this.instance_5.cache(-2,-2,54,28);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(6).to({_off:false},0).wait(10));

	// Layer 10
	this.instance_6 = new lib.sprite170();
	this.instance_6.parent = this;
	this.instance_6.setTransform(57.3,109.2,0.892,0.892);
	this.instance_6._off = true;
	this.instance_6.filters = [new cjs.BlurFilter(2, 2, 1)];
	this.instance_6.cache(-2,-2,54,28);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(5).to({_off:false},0).wait(11));

	// Layer 8
	this.instance_7 = new lib.sprite170();
	this.instance_7.parent = this;
	this.instance_7.setTransform(53.8,115,0.892,0.892);
	this.instance_7._off = true;
	this.instance_7.filters = [new cjs.BlurFilter(2, 2, 1)];
	this.instance_7.cache(-2,-2,54,28);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(4).to({_off:false},0).wait(12));

	// Layer 6
	this.instance_8 = new lib.sprite170();
	this.instance_8.parent = this;
	this.instance_8.setTransform(51,121.2,0.946,0.946);
	this.instance_8._off = true;
	this.instance_8.filters = [new cjs.BlurFilter(2, 2, 1)];
	this.instance_8.cache(-2,-2,54,28);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(3).to({_off:false},0).wait(13));

	// Layer 4
	this.instance_9 = new lib.sprite170();
	this.instance_9.parent = this;
	this.instance_9.setTransform(48.2,129.4,0.946,0.946);
	this.instance_9._off = true;
	this.instance_9.filters = [new cjs.BlurFilter(2, 2, 1)];
	this.instance_9.cache(-2,-2,54,28);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(2).to({_off:false},0).wait(14));

	// Layer 2
	this.instance_10 = new lib.sprite170();
	this.instance_10.parent = this;
	this.instance_10.setTransform(44.4,137.2);
	this.instance_10._off = true;
	this.instance_10.filters = [new cjs.BlurFilter(2, 2, 1)];
	this.instance_10.cache(-2,-2,54,28);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(1).to({_off:false},0).wait(15));

	// Layer 1
	this.instance_11 = new lib.shape168("synched",0);
	this.instance_11.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(16));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,185,199);


(lib.sprite103 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 2
	this.instance = new lib.sprite102();
	this.instance.parent = this;
	this.instance.setTransform(24.6,41.2);
	this.instance.shadow = new cjs.Shadow("#154B74",0,0,2);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer 1
	this.instance_1 = new lib.shape100("synched",0);
	this.instance_1.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.sprite103, new cjs.Rectangle(1,0,159,69), null);


(lib.sprite72OverDown = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 6
	this.instance = new lib.sprite71();
	this.instance.parent = this;
	this.instance.setTransform(200.6,200.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer 3
	this.instance_1 = new lib.sprite69();
	this.instance_1.parent = this;
	this.instance_1.setTransform(200.6,200.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer 1
	this.instance_2 = new lib.sprite66();
	this.instance_2.parent = this;
	this.instance_2.setTransform(191.1,190.5,0.399,0.399);
	this.instance_2.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

}).prototype = getMCSymbolPrototype(lib.sprite72OverDown, new cjs.Rectangle(191.1,190.5,105.3,105.3), null);


(lib.button76 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 4
	this.instance = new lib.shape43Hit("synched",0);
	this.instance.parent = this;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).wait(1));

	// Layer 3
	this.text = new cjs.Text("目标\n", "20px 'SimSun'", "#FFFF00");
	this.text.lineHeight = 20;
	this.text.lineWidth = 60;
	this.text.parent = this;
	this.text.setTransform(21,84);
	this.text._off = true;

	this.timeline.addTween(cjs.Tween.get(this.text).wait(3).to({_off:false},0).wait(1));

	// Layer 2
	this.instance_1 = new lib.shape67Hit("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(-0.7,-0.4,0.954,0.954);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(3).to({_off:false},0).wait(1));

	// Layer 1
	this.instance_2 = new lib.sprite72OverDown();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-192,-191.2,0.954,0.954);

	this.instance_3 = new lib.shape30Hit("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(-9.7,-9.5,0.381,0.381);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_2}]},1).to({state:[{t:this.instance_3}]},1).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib._1_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 2
	this.instance = new lib.button76();
	this.instance.parent = this;
	this.instance.setTransform(49.7,50.2,0.725,0.725);
	new cjs.ButtonHelper(this.instance, 0, 1, 2, false, new lib.button76(), 3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// 图层 1
	this.instance_1 = new lib._6();
	this.instance_1.parent = this;
	this.instance_1.setTransform(89,79,1,1,0,0,0,89,79);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = getMCSymbolPrototype(lib._1_1, new cjs.Rectangle(0,0,178,158), null);


(lib.sprite179 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 8
	this.instance = new lib.sprite178();
	this.instance.parent = this;
	this.instance.setTransform(-21.9,41.9,1,1,0,90,-90);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer 6
	this.instance_1 = new lib.sprite178();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-21.9,-34.5,1,1,90);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	// Layer 4
	this.instance_2 = new lib.sprite178();
	this.instance_2.parent = this;
	this.instance_2.setTransform(13.8,1.5,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1));

	// Layer 2
	this.instance_3 = new lib.sprite178();
	this.instance_3.parent = this;
	this.instance_3.setTransform(-61.1,1.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1));

	// Layer 1
	this.instance_4 = new lib.shape175("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(-61.1,-34.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(1));

}).prototype = getMCSymbolPrototype(lib.sprite179, new cjs.Rectangle(-61.6,-35,75.9,77.4), null);


(lib.sprite172 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 24
	this.instance = new lib.sprite171();
	this.instance.parent = this;
	this.instance.setTransform(279,0,1,1,0,0,180);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer 1
	this.instance_1 = new lib.sprite171();
	this.instance_1.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

}).prototype = getMCSymbolPrototype(lib.sprite172, new cjs.Rectangle(0,0,279,199), null);


(lib._14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._1_1();
	this.instance.parent = this;
	this.instance.setTransform(56.5,50.2,0.635,0.635,0,0,0,89,79);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(20).to({x:24.5,y:48.2},16).to({x:56.5,y:50.2},16).wait(49));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,113,100.3);


(lib._13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._1_1();
	this.instance.parent = this;
	this.instance.setTransform(0,0,0.635,0.635);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(17).to({y:60},21).to({y:0},19).wait(50));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,113,100.3);


(lib._12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._1_1();
	this.instance.parent = this;
	this.instance.setTransform(-13,-96,0.854,0.854,0,0,0,89,79);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1,scaleY:1,x:97.1,y:272.1},58).to({x:119,y:1165.6},99).wait(40));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-89,-163.5,152,134.9);


(lib._10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 图层 1
	this.instance = new lib._1_1();
	this.instance.parent = this;
	this.instance.setTransform(46.9,80,0.883,0.883,0,0,0,89,79);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(75).to({_off:false},0).to({scaleX:0.93,scaleY:0.93,x:22.4,y:370.8},31).to({scaleX:1,scaleY:1,x:122,y:1221.9},85).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.sprite173 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.sprite172();
	this.instance.parent = this;
	this.instance.setTransform(-139,0);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.sprite173, new cjs.Rectangle(-139,0,279,199), null);


(lib.sprite174 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.dib = new lib.sprite173();
	this.dib.parent = this;
	this.dib.setTransform(0.9,-7.8,0.376,0.376);

	this.timeline.addTween(cjs.Tween.get(this.dib).wait(10));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-51.3,-7.8,105,74.9);


// stage content:
(lib.jjmtc300x600h5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		/* 自定义鼠标光标
		用指定的元件实例替换默认的鼠标光标。
		*/
		stage.canvas.style.cursor = "none";
		this.mc.mouseEnabled = false;
		this.addEventListener("tick", fl_CustomMouseCursor.bind(this));
		
		function fl_CustomMouseCursor() {
			this.mc.x = stage.mouseX;
			
		}
		//要恢复默认鼠标指针，对下列行取消注释:
		//this.removeEventListener("tick", fl_CustomMouseCursor.bind(this));
		//stage.removeChild(mc);
		//stage.canvas.style.cursor = "default";
		
		
		
		/* 自定义鼠标光标
		用指定的元件实例替换默认的鼠标光标。
		*/
		stage.canvas.style.cursor = "none";
		this.mc01.mouseEnabled = false;
		this.addEventListener("tick", fl_CustomMouseCursor_2.bind(this));
		
		function fl_CustomMouseCursor_2() {
			this.mc01.x = stage.mouseX;
			this.mc01.y = stage.mouseY;
		}
		//要恢复默认鼠标指针，对下列行取消注释:
		//this.removeEventListener("tick", fl_CustomMouseCursor_2.bind(this));
		//stage.removeChild(mc01);
		//stage.canvas.style.cursor = "default";
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(33));

	// 图层 1
	this.instance = new lib.shape90("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(0.1,0.6);

	this.mc = new lib.sprite174();
	this.mc.parent = this;
	this.mc.setTransform(150.1,465.7,2.072,2.072);

	this.mc01 = new lib.sprite179();
	this.mc01.parent = this;
	this.mc01.setTransform(147.7,365.4,0.554,0.554);

	this.m_lv = new lib.sprite122();
	this.m_lv.parent = this;
	this.m_lv.setTransform(80.3,44.2,1.07,1.07);

	this.m_hp = new lib.sprite115();
	this.m_hp.parent = this;
	this.m_hp.setTransform(64.6,22.1,1.07,1.07);

	this.instance_1 = new lib.sprite103();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-0.4,-1.5,1.07,1.07);

	this.instance_2 = new lib._14();
	this.instance_2.parent = this;
	this.instance_2.setTransform(71.7,142.2,1,1,0,0,0,28.1,22.1);

	this.instance_3 = new lib._1_1();
	this.instance_3.parent = this;
	this.instance_3.setTransform(49.1,445.3,0.635,0.635,0,0,0,89,79);

	this.instance_4 = new lib._13();
	this.instance_4.parent = this;
	this.instance_4.setTransform(13.2,262.2,1,1,0,0,0,28.1,22.1);

	this.instance_5 = new lib._12();
	this.instance_5.parent = this;
	this.instance_5.setTransform(143.3,27.9,0.635,0.635,0,0,0,44.2,34.8);

	this.instance_6 = new lib._10();
	this.instance_6.parent = this;
	this.instance_6.setTransform(222.8,-33.6,0.635,0.635,0,0,0,89,79);

	this.instance_7 = new lib._1_1();
	this.instance_7.parent = this;
	this.instance_7.setTransform(259.4,197.6,0.635,0.635,0,0,0,89,79);

	this.instance_8 = new lib._1();
	this.instance_8.parent = this;
	this.instance_8.setTransform(437.8,284.7,0.635,0.635,0,0,0,176,170.3);
	this.instance_8.filters = [new cjs.ColorMatrixFilter(new cjs.ColorMatrix(0, 20, 0, 0))];

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.m_hp},{t:this.m_lv},{t:this.mc01},{t:this.mc},{t:this.instance}]}).wait(33));

	// 图层 2
	this.instance_9 = new lib._11();
	this.instance_9.parent = this;
	this.instance_9.setTransform(326,1636.2,1,1,0,0,0,176,329.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).to({y:1441.4},32).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(135.1,202.1,345,895.3);
// library properties:
lib.properties = {
	width: 300,
	height: 600,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	webfonts: {},
	manifest: [
		{src:"jjmtc300x600h5_atlas_.png", id:"jjmtc300x600h5_atlas_"}
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;