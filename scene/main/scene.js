class Bullet extends GuaImage {
    constructor(game) {
        super(game, 'bullet')
        this.setup()
    }
    setup(game) {
        this.speed = config.bullet_speed
    }
    update(game) {
        this.x += this.speed
        // log('子弹',this.x,this.y)
        var b = this
        var enemies = this.game.scene.enemies
        for (var i = 0; i < enemies.length; i++) {
            let e = enemies[i]
            if (b.collide(e)) {
                b.kill()
                e.kill(game)
                // break
            }
        }

    }
    kill() {
        this.x = 900
    }

    collide(ball){
        var aInb = function(x, x1, x2) {
            return x >= x1 && x <= x2
        }
        var a = this
        var b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
}

class Player extends GuaImage {
    constructor(game) {
        super(game,'player')
        this.setup()
    }
    setup() {
        this.speed = 5
        this.cooldown = 0
    }
    update() {
        this.speed = config.player_speed
        if (this.cooldown > 0) {
            this.cooldown--
        }
    }
    fire() {
        if (this.cooldown == 0) {
            this.cooldown = config.fire_cooldown
            var x = this.x + this.w / 2
            var y = this.y
            var b = Bullet.new(this.game)
            b.x = x
            b.y = y
            this.scene.addElement(b)
        }
    }
    moveLeft() {
        this.x -= this.speed
    }
    moveRight() {
        this.x += this.speed
    }
    moveUp() {
        this.y -= this.speed
    }
    moveDown() {
        this.y += this.speed
    }


}
const randomBetween = function(start, end) {
    var n = Math.random() * (end - start + 1)
    return Math.floor(n + start)

}
class Enemy extends GuaImage {
    constructor(game) {
        var type = randomBetween(0, 2)
        var name = 'enemy' + type
        super(game,name)
        this.setup()
        this.alive = true
    }
    setup(){
        this.speed = randomBetween(2, 5)
        this.x = randomBetween(0, 600)
        this.y = -randomBetween(0, 200)
    }
    update(game) {
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }


    }
    kill(game) {
        //显示粒子动画然后消失
        log('拿到了carrot')
        this.x = 1000
        this.alive = false
        config.score += 1
        // log(config.score)
    }



}

class Cloud extends GuaImage {
    constructor(game) {
        super(game,'cloud')
        this.setup()
    }
    setup(){
        this.speed = 1
        this.x = randomBetween(0, 350)
        this.y = -randomBetween(0, 200)
    }
    update() {
        this.speed = config.cloud_speed
        this.y += this.speed
        if (this.y > 600) {
            this.setup()
        }
    }
    debug() {
        this.speed = config.cloud_speed
    }
}


class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
        var label = Gualabel.new(game,'X ' + config.score)
        this.addElement(label)

    }
    setup() {
            var game = this.game
            this.numberOfEnemies = 3
            this.bg = GuaImage.new(game, 'sky')
            this.carrot = GuaImage.new(game, 'carrot')
            this.cloud = Cloud.new(game, 'cloud')
            this.player = Player.new(game)

            this.addElement(this.bg)
            this.addElement(this.cloud)
            this.player.x = 0
            this.player.y = 150
            this.addElement(this.player)
            this.carrot.x = 600
            this.carrot.y = 250
            this.addElement(this.carrot)

            //
            this.addEnemies()
            var ps = GuaParticleSystem.new(this.game)
            this.addElement(ps)

     }
     addEnemies() {
         var es = []
         for (var i = 0; i < this.numberOfEnemies ; i++) {
             var e = Enemy.new(this.game)
             es.push(e)
             this.addElement(e)
         }
         this.enemies = es

     }
     setupInputs() {
         var g = this.game
         var s = this
         g.registerAction('a', function(){
             s.player.moveLeft()
         })
         g.registerAction('d', function(){
             s.player.moveRight()
         })
         g.registerAction('w', function(){
             s.player.moveUp()
         })
         g.registerAction('s', function(){
             s.player.moveDown()
         })
         g.registerAction('j', function(){
             s.player.fire()
         })
     }

     update() {
         super.update()
         this.cloud.y += 1
         this.cloud.x += 1


     }
}


// var Scene = function(game) {
//     var s = {
//         game: game,
//     }
//     // 初始化
//     var paddle = Paddle(game)
//     var ball = Ball(game)
//
//     var score = 0
//
//     var blocks = loadLevel(game, 1)
//
//     game.registerAction('a', function(){
//         paddle.moveLeft()
//     })
//     game.registerAction('d', function(){
//         paddle.moveRight()
//     })
//     game.registerAction('f', function(){
//         ball.fire()
//     })
//
//     s.draw = function() {
//         // draw 背景
//         game.context.fillStyle = "#554"
//         game.context.fillRect(0, 0, 400, 300)
//         // draw
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         // draw blocks
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//         // draw labels
//         game.context.fillText('分数: ' + score, 10, 290)
//     }
//     s.update = function() {
//         if (window.paused) {
//             return
//         }
//
//         ball.move()
//         // 判断游戏结束
//         if (ball.y > paddle.y) {
//             // 跳转到 游戏结束 的场景
//             var end = SceneEnd.new(game)
//             game.replaceScene(end)
//         }
//         // 判断相撞
//         if (paddle.collide(ball)) {
//             // 这里应该调用一个 ball.反弹() 来实现
//             ball.反弹()
//         }
//         // 判断 ball 和 blocks 相撞
//         for (var i = 0; i < blocks.length; i++) {
//             var block = blocks[i]
//             if (block.collide(ball)) {
//                 // log('block 相撞')
//                 block.kill()
//                 ball.反弹()
//                 // 更新分数
//                 score += 100
//             }
//         }
//     }
//
//     // mouse event
//     var enableDrag = false
//     game.canvas.addEventListener('mousedown', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, event)
//         // 检查是否点中了 ball
//         if (ball.hasPoint(x, y)) {
//             // 设置拖拽状态
//             enableDrag = true
//         }
//     })
//     game.canvas.addEventListener('mousemove', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         // log(x, y, 'move')
//         if (enableDrag) {
//             log(x, y, 'drag')
//             ball.x = x
//             ball.y = y
//         }
//     })
//     game.canvas.addEventListener('mouseup', function(event) {
//         var x = event.offsetX
//         var y = event.offsetY
//         log(x, y, 'up')
//         enableDrag = false
//     })
//
//     return s
// }
