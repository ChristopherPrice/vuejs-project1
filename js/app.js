new Vue({
    el: '#app',
    data: {
        player1Health: 100,
        player2Health: 100,
        turnLock: false,
        actionLog: [],
        actions: {
            ATTACK: 0,
            SPECIAL_ATTACK: 1,
            HEAL: 2,
            GIVE_UP: 3
        }
    },
    methods: {
        startNewGame: function () {
            this.player1Health = 100;
            this.player2Health = 100;
            this.actionLog = [];
        },
        player1Turn: function (action) {
            var vm = this;

            this.turnLock = true;
            this.takeTurn(action, true);
            
            setTimeout(() => {
                vm.player2Turn();
                vm.turnLock = false;
            }, 2000);
        },
        player2Turn: function () {
            var actions = Object.keys(this.actions),
                randomAction = actions[Math.floor(Math.random() * (actions.length - 1))];

            this.takeTurn(this.actions[randomAction], false);
        },
        takeTurn: function (action, currentTurnIsPlayer1) {
            switch(action) {
                case this.actions.ATTACK:
                    this.attack(currentTurnIsPlayer1);
                    break;
                case this.actions.SPECIAL_ATTACK:
                    this.specialAttack(currentTurnIsPlayer1);
                    break;
                case this.actions.HEAL:
                    this.heal(currentTurnIsPlayer1);
                    break;
                case this.actions.GIVE_UP:
                    this.giveUp();
                    break;
                default:
                    console.warn('No action provided');
                    break;
            }
        },
        attack: function (currentTurnIsPlayer1) {
            var attackImpact = Math.floor(Math.random() * 10 + 1),
                source = null,
                target = null;

            if (currentTurnIsPlayer1 == true) {
                this.player2Health = Math.max(this.player2Health - attackImpact, 0);
                source = 'PLAYER';
                target = 'MONSTER';
            } else {
                this.player1Health = Math.max(this.player1Health - attackImpact, 0);
                source = 'MONSTER';
                target = 'PLAYER';
            }

            this.addToLog('ATTACKS', attackImpact, source, target, currentTurnIsPlayer1);
        },
        specialAttack: function (currentTurnIsPlayer1) {
            var attackImpact = Math.floor(Math.random() * 10 + 1),
                source = null,
                target = null;

            if (currentTurnIsPlayer1 == true) {
                this.player2Health = Math.max(this.player2Health - attackImpact, 0);
                source = 'PLAYER';
                target = 'MONSTER';
            } else {
                this.player1Health = Math.max(this.player1Health - attackImpact, 0);
                source = 'MONSTER';
                target = 'PLAYER';
            }

            this.addToLog('SPECIAL ATTACKS', attackImpact, source, target, currentTurnIsPlayer1);
        },
        heal: function (currentTurnIsPlayer1) {
            var healImpact = Math.floor(Math.random() * 5 + 1);
            if (currentTurnIsPlayer1 == true) {
                this.player1Health = Math.min(this.player1Health + healImpact, 100);
            } else {
                this.player2Health = Math.min(this.player2Health + healImpact, 100);
            }

            this.addToLog('HEALS', healImpact, currentTurnIsPlayer1 == true ? 'PLAYER' : 'MONSTER', 'SELF', currentTurnIsPlayer1);
        },
        addToLog: function (action, impact, source, target, currentTurnIsPlayer1) {
            this.actionLog.unshift({
                source: source,
                target: target,
                class: currentTurnIsPlayer1 === true ? 'player-turn' : 'monster-turn',
                action: action,
                impact: impact
            });
        }
    }
});