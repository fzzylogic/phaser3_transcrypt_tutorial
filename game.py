def preload():
    this.load.image('sky', '../assets/sky.png')
    this.load.image('ground', '../assets/platform.png')
    this.load.image('star', '../assets/star.png')
    this.load.image('bomb', '../assets/bomb.png')
    this.load.spritesheet('dude', '../assets/dude.png', { 'frameWidth': 32, 'frameHeight': 48 })


def create():
    global player, stars, bombs, platforms, cursors, scoreText
    #  A simple background for our game
    this.add.image(400, 300, 'sky')

    #  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup()

    #  Here we create the ground.
    #  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody()

    #  Now let's create some ledges
    platforms.create(600, 400, 'ground')
    platforms.create(50, 250, 'ground')
    platforms.create(750, 220, 'ground')

    # The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude')

    #  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2)
    player.setCollideWorldBounds(True)

    #  Our player animations, turning, walking left and walking right.
    this.anims.create({
        'key': 'left',
        'frames': this.anims.generateFrameNumbers('dude', { 'start': 0, 'end': 3 }),
        'frameRate': 10,
        'repeat': -1
    })

    this.anims.create({
        'key': 'turn',
        'frames': [ { 'key': 'dude', 'frame': 4 } ],
        'frameRate': 20
    })

    this.anims.create({
        'key': 'right',
        'frames': this.anims.generateFrameNumbers('dude', { 'start': 5, 'end': 8 }),
        'frameRate': 10,
        'repeat': -1
    })

    #  Input Events
    cursors = this.input.keyboard.createCursorKeys()

    #  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
        'key': 'star',
        'repeat': 11,
        'setXY': { 'x': 12, 'y': 0, 'stepX': 70 }
    })

    #  Give each star a slightly different bounce
    stars.children.iterate(lambda child: child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)))

    bombs = this.physics.add.group()

    #  The score
    scoreText = this.add.text(16, 16, 'score: 0', { 'fontSize': '32px', 'fill': '#000' })

    #  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms)
    this.physics.add.collider(stars, platforms)
    this.physics.add.collider(bombs, platforms)

    #  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this)

    this.physics.add.collider(player, bombs, hitBomb, null, this)


def update():
    
    if (gameOver):
        return
    
    if cursors.left.isDown:
        player.setVelocityX(-160)
        player.anims.play('left', True)
    
    elif cursors.right.isDown:
        player.setVelocityX(160)
        player.anims.play('right', True)
    
    else:
        player.setVelocityX(0)
        player.anims.play('turn')
    
    if cursors.up.isDown and player.body.touching.down:
        player.setVelocityY(-330)


def collectStar(player, star):
    
    star.disableBody(True, True)

    #  Add and update the score
    score += 10
    scoreText.setText('Score: ' + score)

    if stars.countActive(True) == 0:

        #  A new batch of stars to collect
        stars.children.iterate(lambda child: child.enableBody(True, child.x, 0, True, True))

        x = Phaser.Math.Between(400, 800) if player.x < 400 else Phaser.Math.Between(0, 400)

        bomb = bombs.create(x, 16, 'bomb')
        bomb.setBounce(1)
        bomb.setCollideWorldBounds(True)
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
        bomb.allowGravity = False


def hitBomb(player, bomb):

    this.physics.pause()

    player.setTint(0xff0000)

    player.anims.play('turn')

    gameOver = True


config = {
    'type': Phaser.AUTO,
    'width': 800,
    'height': 600,
    'physics': {
        'default': 'arcade',
        'arcade': {
            'gravity': { 'y': 300 },
            'debug': False
        }
    },
    'scene': {
        'preload': preload,
        'create': create,
        'update': update
    }
}

# 
player = None
stars = None
bombs = None
platforms = None
cursors = None
score = None
gameOver = False
scoreText = None

game = __new__(Phaser.Game(config))
