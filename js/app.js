new Vue({
    el: '#app',
    data: {
        player1Stats: {
            health: 100
        },
        player2Stats: {
            health: 100
        },
        currentPlayerIsPlayer1: true,
        actionLog: []
    },
    methods: {
        startNewGame: function () {
            this.player1Stats.health = 100;
            this.player2Stats.health = 100;
        },
        attack: function () {
            var attackImpact = Math.floor(Math.random() * 10 + 1);
            
            if (this.currentPlayerIsPlayer1) {
                this.player2Stats.health -= attackImpact;
            } else {
                this.player1Stats.health -= attackImpact;
            }

            this.actionLog.push({
                source: this.currentPlayerIsPlayer1 === true ? 'PLAYER' : 'MONSTER',
                target: this.currentPlayerIsPlayer1 === false ? 'PLAYER' : 'MONSTER',
                action: 'ATTACKS',
                impact: attackImpact
            });
        }
    }
});