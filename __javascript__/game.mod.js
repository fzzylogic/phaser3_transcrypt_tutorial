	(function () {
		var __name__ = '__main__';
		var preload = function () {
			this.load.image ('sky', '../assets/sky.png');
			this.load.image ('ground', '../assets/platform.png');
			this.load.image ('star', '../assets/star.png');
			this.load.image ('bomb', '../assets/bomb.png');
			this.load.spritesheet ('dude', '../assets/dude.png', dict ({'frameWidth': 32, 'frameHeight': 48}));
		};
		var create = function () {
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
			this.anims.create (dict ({'key': 'turn', 'frames': list ([dict ({'key': 'dude', 'frame': 4})]), 'frameRate': 20}));
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
		var py_update = function () {
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
		var collectStar = function (player, star) {
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
		var hitBomb = function (player, bomb) {
			this.physics.pause ();
			player.setTint (16711680);
			player.anims.play ('turn');
			var gameOver = true;
		};
		var config = dict ({'type': Phaser.AUTO, 'width': 800, 'height': 600, 'physics': dict ({'default': 'arcade', 'arcade': dict ({'gravity': dict ({'y': 300}), 'debug': false})}), 'scene': dict ({'preload': preload, 'create': create, 'update': py_update})});
		var player = null;
		var stars = null;
		var bombs = null;
		var platforms = null;
		var cursors = null;
		var score = null;
		var gameOver = false;
		var scoreText = null;
		var game = new Phaser.Game (config);
		__pragma__ ('<all>')
			__all__.__name__ = __name__;
			__all__.bombs = bombs;
			__all__.collectStar = collectStar;
			__all__.config = config;
			__all__.create = create;
			__all__.cursors = cursors;
			__all__.game = game;
			__all__.gameOver = gameOver;
			__all__.hitBomb = hitBomb;
			__all__.platforms = platforms;
			__all__.player = player;
			__all__.preload = preload;
			__all__.score = score;
			__all__.scoreText = scoreText;
			__all__.stars = stars;
			__all__.py_update = py_update;
		__pragma__ ('</all>')
	}) ();
