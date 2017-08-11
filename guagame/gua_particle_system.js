class GuaParticle extends GuaImage {
    constructor(game) {
        super(game,'spark')
        this.setup()
    }
    setup() {
        this.life = 20
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vy = vy
        this.vx = vx
    }
    update() {
        this.life--
        this.x += this.vx
        this.y += this.vy
        var factor = 0.01
        this.vx += factor * this.vx
        this.vy += factor * this.vy
    }
}

class GuaParticleSystem {
    constructor(game) {
        this.game = game
        this.setup(game)
    }
    static new(game) {
        return new this(game)
    }
    setup(game) {
        // log('看这里',this.game)
        // for (var e of this.game.scene.enemies) {
        //     if (e.alive == false) {
        //         this.x = e.x
        //         this.y = e.y
        //     }
        // }
        this.duration = 70
        this.x = 150
        this.y = 200
        this.numberOfParticles = 50
        this.particles = []
    }
    update() {
        this.duration--
        // 添加 小火花
        if (this.particles.length < this.numberOfParticles) {
            var p = GuaParticle.new(this.game)
            //设置初始化坐标
            var s = 2
            var vx = randomBetween(-s, s)
            var vy = randomBetween(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
        // 更新所有的小火花
        for(var p of this.particles) {
            p.update()
        }
        // for (var e of this.game.scene.enemies) {
        //     if (e.alive == false) {
        //         for(var p of this.particles) {
        //             log('看看这里有没',this)
        //             this.x = e.x
        //              this.y = e.y
        //             p.update()
        //         }
        //     }
        // }
        //删除死掉的小火花
        this.particles = this.particles.filter(p => p.life > 0)
    }
    draw() {
        // for (var e of this.game.scene.enemies) {
        //     if (!e.alive && this.duration >= 0) {
        //         for(var p of this.particles) {
        //             p.draw()
        //         }
        //     }
        // }
        if (this.duration < 0) {
            log('删掉',this.game.scene.elements)
            //Todo 删掉小火花
            //在数组中找到并且splice掉它
            //应该从scene删除
            return
        }
        for(var p of this.particles) {
            p.draw()
        }
    }
}
