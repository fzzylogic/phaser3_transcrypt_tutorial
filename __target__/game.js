// Transcrypt'ed from Python, 2019-09-01 18:41:58
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = '__main__';
export var preload = function () {
	this.load.image ('sky', '../assets/sky.png');
	this.load.image ('ground', '../assets/platform.png');
	this.load.image ('star', '../assets/star.png');
	this.load.image ('bomb', '../assets/bomb.png');
	this.load.spritesheet ('dude', '../assets/dude.png', dict ({'frameWidth': 32, 'frameHeight': 48}));
};
export var create = function () {
	this.add.image (400, 300, 'sky');
	platforms = this.physics.add.staticGroup ();
	platforms.create (400, 568, 'ground').setScale (2).refreshBody ();
	platforms.create (600, 400, 'ground');
	platforms.create (50, 250, 'ground');
	platforms.create (750, 220, 'ground');
	player = this.physics.add.sprite (100, 450, 'dude');
	player.setBounce (0.2);
	player.setCollideWorldBounds (true);
	this.anims.create (dict ({'key': 'left', 'frames': this.anims.generateFrameNumbers ('dude', dict ({'start': 0, 'end': 3})), 'frameRate': 10, 'repeat': -(1)}));
	this.anims.create (dict ({'key': 'turn', 'frames': [dict ({'key': 'dude', 'frame': 4})], 'frameRate': 20}));
	this.anims.create (dict ({'key': 'right', 'frames': this.anims.generateFrameNumbers ('dude', dict ({'start': 5, 'end': 8})), 'frameRate': 10, 'repeat': -(1)}));
	cursors = this.input.keyboard.createCursorKeys ();
	stars = this.physics.add.group (dict ({'key': 'star', 'repeat': 11, 'setXY': dict ({'x': 12, 'y': 0, 'stepX': 70})}));
	stars.children.iterate ((function __lambda__ (child) {
		return child.setBounceY (Phaser.Math.FloatBetween (0.4, 0.8));
	}));
	bombs = this.physics.add.group ();
	scoreText = this.add.text (16, 16, 'score: 0', dict ({'fontSize': '32px', 'fill': '#000'}));
	this.physics.add.collider (player, platforms);
	this.physics.add.collider (stars, platforms);
	this.physics.add.collider (bombs, platforms);
	this.physics.add.overlap (player, stars, collectStar, null, this);
	this.physics.add.collider (player, bombs, hitBomb, null, this);
};
export var py_update = function () {
	if (gameOver) {
		return ;
	}
	if (cursors.left.isDown) {
		player.setVelocityX (-(160));
		player.anims.play ('left', true);
	}
	else if (cursors.right.isDown) {
		player.setVelocityX (160);
		player.anims.play ('right', true);
	}
	else {
		player.setVelocityX (0);
		player.anims.play ('turn');
	}
	if (cursors.up.isDown && player.body.touching.down) {
		player.setVelocityY (-(330));
	}
};
export var collectStar = function (player, star) {
	star.disableBody (true, true);
	score += 10;
	scoreText.setText ('Score: ' + score);
	if (stars.countActive (true) == 0) {
		stars.children.iterate ((function __lambda__ (child) {
			return child.enableBody (true, child.x, 0, true, true);
		}));
		var x = (player.x < 400 ? Phaser.Math.Between (400, 800) : Phaser.Math.Between (0, 400));
		var bomb = bombs.create (x, 16, 'bomb');
		bomb.setBounce (1);
		bomb.setCollideWorldBounds (true);
		bomb.setVelocity (Phaser.Math.Between (-(200), 200), 20);
		bomb.allowGravity = false;
	}
};
export var hitBomb = function (player, bomb) {
	this.physics.pause ();
	player.setTint (16711680);
	player.anims.play ('turn');
	var gameOver = true;
};
export var config = dict ({'type': Phaser.AUTO, 'width': 800, 'height': 600, 'physics': dict ({'default': 'arcade', 'arcade': dict ({'gravity': dict ({'y': 300}), 'debug': false})}), 'scene': dict ({'preload': preload, 'create': create, 'update': py_update})});
export var player = null;
export var stars = null;
export var bombs = null;
export var platforms = null;
export var cursors = null;
export var score = null;
export var gameOver = false;
export var scoreText = null;
export var game = new Phaser.Game (config);

//# sourceMappingURL=game.map