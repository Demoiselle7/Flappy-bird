class Scene extends GuaScene {
    constructor(game) {
        super(game)
        // var label = Gualabel.new(game, 'hello')
        // this.addElement(label)
        //bg
        var background = GuaImage.new(game,'bg')
        this.addElement(background)
        //加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 20; i++) {
            var g = GuaImage.new(game,'ground')
            g.x = i * 19
            g.y = 460
            this.addElement(g)
            this.grounds.push(g)
        }

        this.skipCount = 4
        //bird
        this.birdSpeed = 2
        var b = GuaAnimation.new(game)
        b.x = 100
        b.y = 200
        this.b = b
        this.addElement(b)
        // 分数
        // var s = String(config.score)
        // for (var i = 0; i < s.length; i++) {
        //     let score = GuaImage.new(game,`score${s[i]}`)
        //     score.x = 130 + (i * 20)
        //     score.y = 130
        //     this.addElement(score)
        // }
        this.setupInputs()

    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }

    update() {
        super.update()
        //地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 20; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
        var ps = this.pipe.pipes
        for (var i = 0; i < ps.length; i++) {
            var o = this.b
            var a = ps[i]
            if (aInb(a.x, o.x, o.x + o.w) || aInb(o.x, a.x, a.x + a.w)) {
                if (aInb(a.y, o.y, o.y + o.h) || aInb(o.y, a.y, a.y + a.h)) {
                    this.b.y = 427
                }
            }
        }
        //更新分数

        if (this.b.y === 427) {
            // 跳转到 游戏结束 的场景
            // var end = SceneEnd.new(this.game)
            // this.game.replaceScene(end)
            log('结束!')

        }
    }
    setupInputs() {
        //这里的回调不能用 this
        var self = this
        var b = this.bird
        self.game.registerAction('a',function() {
            self.b.move(-self.birdSpeed)
        })
        self.game.registerAction('d',function() {
            self.b.move(self.birdSpeed)
        })
        self.game.registerAction('j',function() {
            self.b.jump()
        })
    }
}
