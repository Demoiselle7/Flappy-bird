var enableDebugMode = function(game, enable) {
    if(!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            // 暂停功能
            window.paused = !window.paused
        } else if ('1234567'.includes(k)) {
            // 为了 debug 临时加的载入关卡功能
            blocks = loadLevel(game, Nupmber(k))
        }
    })
    // 控制速度
    document.querySelector('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}

var __main = function() {
    var images = {
        bird0: 'img/bird0_0.png',
        bird1: 'img/bird0_1.png',
        bird2: 'img/bird0_2.png',
        bg: 'img/bg_day.png',
        ground:'img/land.png',
        pipe:'img/pipe_up.png',
        begin:'img/text_ready.png',
        beginLogo:'img/button_play.png',
        score0:'img/score_0.png',
        score1:'img/score_1.png',
        score2:'img/score_2.png',
        score3:'img/score_3.png',
        score4:'img/score_4.png',
        score5:'img/score_5.png',
        score6:'img/score_6.png',
        score7:'img/score_7.png',
        score8:'img/score_8.png',
        score9:'img/score_9.png',

    }
    var game = GuaGame.instance(30, images, function(g){
        var s = Scene.new(g)
        // var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
    enableDebugMode(game, true)
}

__main()
