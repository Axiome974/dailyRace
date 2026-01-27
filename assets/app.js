const player = (name, avatar, character, points) => ({
    name,
    character,
    avatar,
    points
})

const characters = [
    'cocci',
    'jockey',
    'orc',
    'princess',
    'skull',
    'soccerman',
    'turtle',
    'wolf',
    'zen'
]

const DEFAULT_CONFIG = {
    players: [
        player('Damien',
            'data:image/png;base64,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',
            'skull',
            0
            ),
        player('Ines',
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEX///9UWV1PVFmBhYdKUFS1t7hDSU5ARktFS09RVlpITlJNUlc+RElESk5MUVbGx8j4+PiipKbe39+LjpBZXmKusLLu7++8vr/P0NHY2dnl5uZiZmqTlpioqqz09PR3e35scHN8gIKPkpRfZGecnqBpbXBB8wY2AAAGRElEQVR4nO2dW3uqOhBAC4RcQEWhgHdqtf//Lx5S6/bstlYDM8zQnfXQvrq+JJNkQiZPTx6Px+PxeDwezx/meRYvtkUURcV2EWf5nPoHgbIqo1DpRMzS0JLORKJVeChX1D8MhCpupBYm+IoRWjVxRf0De1K/qG/trpbqpab+kd2pTjL5Se9DMplux9mQ60ild/XOpCpaU/9cZ/aFCh/0s4Sq2FP/ZDd2Tn5nxx31j3ZgFQhHP4sIRjN7nCb348t3mMmJ+qc/RLXp0oAfzbgZQVRdTrs14EczyiW1wD3iSQ8/y6SkVviZk+wpGART1oPxVfcWDAJdUGvcpkgABIMgYau4hRFsFbfUKt+z6z8GL0iW65tMgQkGgcqodb6yhhRsFfltNoI+E/1XTEAt9Jno0b3go6QRtdLfZHBR5oJkNRTnEDP9ZzSnhCN4H7Vw6qcr2Dh6QfHZEW9g4+gFs6EWu5BhjEKL5hJsnnGasG3EZ2q1M2hNyKYR37CasG3EN2o5Sw4/2V+RObVeyyvGXHghfaXWa8FswrYRqfXaOAO1sf+ehD7WRK4HFG6E9Es33E7KoJsu8SbDM5o6Cb7AjKSWdEFs+II33Z8xL8SG2MOQfCDm2MOwHYi0yxrk2dBCPCMuZuiGM9pQU+DO95aQ9pwGPZSSB1N0Pwup4XQAQdrpAieN+DeKUnCOP+G3bUiZ+94PYkj5xdvvb8Pfb/j7I80T/rK0XZiSGqIl9K8Qp/abAQwbUsPXAVbetEnhsvu3pI8iaD9W/P074PUAeRrib4cGyNPQCuIHU3MgNiyxEzUz6q+iUc9HLfRnpNhtmFILPm1xDy5S+s+FV7jRVDP4Lgr5hJRa7wk57U2c8D5TYe6CFYt7UIgn+QxO8S05XiMq8snwDNrKjXjzewWtEbk0IdpIZDIKLUjhlEcgPbPDSGYkrC4/HeGDjTlSS/3Fuu/l2K9MmN182kEvwDWrPmppYONpyGUqvDI3kEPRGE5Xgj4AvYDI8PphyxIu2kyoP7m8QQalOKH/9PkGNYzihHFdJRBFzoLtWOwfbriOwQv5j6W97mMEmx3TLfY9ytPYAjVjKBe17d5TFX3+9yGWolsePBXMh+CVeaHcR6NRBcOV2k1WR9e9hj4yyN87UYcPVBT8035JyHoSvEEd6Md2VEYHY/SzZHcqX77rzdQL22XoA1S7Zzm7LWlm0+cdy42SC+uyUVqEnzVNKLR6KUev98Eqft1oqXUiLInWUm5e47EFz7vs82VWx3FcZ8t8DGszj8fj8Xg8nn+SeVWt1+s8z9u/VTWmhMUP7NfLujwVzVsgpkpKOZXt6lu//5dqKoK3pjiV9ShXqftVvYg2rcf7qx03TxaNCVO71ZDyGC3q1UhE19miEVKL9MuO8MedvkmFlqJZZLw3jKvyoGWSds/rmzSRmuvrLLndyv+QsHDQtK+zlMyOL5bbcApidyGcTdMtmwz4spAapbqnlgUDyXybPJgV7UKoky1td62PU/QqSvIYU+lVJ9nzOPQxjJAniq8UHZ4C6g/BY0Lrg/NTOf0I1WFIxyoa2M9iVDRYXz1NhvezhAO9tJMJ/NvNtxAz/GOqqhmiFMZtZIPcVeMOB/SwGIU5Pc4b/IvN99ENWoJgJWgizGfCGdL2qoT/Wr0rOI9CRRx66AWNcJ3mDb9+oAsCutL3/pnHELwSPoMmriqntNIwmBBwZqxAMxRQmBmY4p5hC1pMCNRR58APHcFhApi5/41bkLkSgkTUiG4rcR8BMC+WnCb6r+jeq5ucz1LteyZ9s42gN9IwMKafIMpTVbD0e/gK4AoMPqpP6p/vPPF/elR4WXCeKK6IziVe9mPooxbVdfWG+goQJF1fFEItrQNLx/oSyFW8IOlWEWw+niZsG7HLJmOA0qRwdCpyOkCJYDi6FBtGL4gIS4fyiujPHMHS4dGkUXXSLt10gPK5sDgX463HFEktwvUK42hWbBecJ32kJ37xcH48eEwLmjOOTyiMLtA4hxrkyrIYOFarHaCaPDSO1elHN1k4TxfxCA3dvkLxhgzxht6QP97QG/LHG3pD/nhDb8gfb+gN+eMNvSF/vKE35I839Ib88YbekD/e0Bvyx9VQh2NDuxlmh2hsHMZc99zj8Xg8Ho/nn+c/deyMTxGEYaMAAAAASUVORK5CYII=',
            'cocci',
            0
        ),
        player('Aurelien',
            'data:image/png;base64,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',
            'wolf',
            0
        ),
        player('François',
            'data:image/png;base64,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',
            'zen',
            0
        ),
        player('Matthieu',
            'data:image/png;base64,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',
            'soccerman',
            0
        ),
    ],
    goal: 5
}

const playerScoreTemplate = document.getElementById("player-score-template")
const playerCardTemplate = document.getElementById("player-card-template")
const playerScoreList = document.getElementById("player-score-list")
const raceZone = document.getElementById("race-zone")
const resultChoices = document.getElementById("result-choices")
const animationOverlay = document.getElementById("animation-overlay")
const victoryOverlay = document.getElementById("victory-overlay")

// ----- Buttons -----
const notThisTimeButton = document.getElementById("not-this-time-button")
const addScoreButton = document.getElementById("add-score-button")
const goButton = document.getElementById("go-button")
const victoryButton = document.getElementById("victory-button")

const menuReset = document.getElementById("menu-btn-reset")
const menuAddUser = document.getElementById("menu-btn-add-user")
const menuShare = document.getElementById("menu-btn-share")
const menuSettings = document.getElementById("menu-btn-settings")


const sound = new Audio('./assets/sounds/drum-roll.mp3')
const horseSound = new Audio('./assets/sounds/horse.mp3')
const victorySound = new Audio('./assets/sounds/win.mp3')

const game = {
    config: {},
    playerCards: [],
    pickedPlayer: null,


    init() {
        this.loadFromLocalStorage()
        this.initPlayerScores()
        this.initPlayerCards()
        this.initEventListeners()
        this.saveInLocalStorage()
    },

    initEventListeners() {
        goButton.addEventListener("click", this.playRandomPick.bind(this))
        addScoreButton.addEventListener("click", this.onAddPoint.bind(this))
        notThisTimeButton.addEventListener("click", this.onNotThisTime.bind(this))
        menuReset.addEventListener("click", this.onReset.bind(this) )
        victoryButton.addEventListener("click", this.onReset.bind(this) )
    },

    initPlayerScores() {
        this.config.players.forEach((player) => {
            this.addPlayerScore(player)
        })
    },

    initPlayerCards() {
        this.config.players.forEach((player, index) => {
            this.addPlayerCard(player, index)
        })
    },

    playRandomPick() {
        animationOverlay.classList.remove("d-none")
        sound.currentTime = 0
        sound.play()
        setTimeout(() => {
            this.playConfettiAnimation(6)
        }, 4700)
        this.playRandomPickAnimation(4500 / 50, this.config.players)
    },

    playConfettiAnimation(times) {
        if (times === 0) {
            return
        }
        confetti()
        setTimeout(() => this.playConfettiAnimation(times - 1), 200)
    },

    playRandomPickAnimation(times, players) {

        const player = this.getRandomPlayer(players)
        animationOverlay.querySelector(".player-animation-card").style.backgroundImage = `url("./assets/images/${player.character}.png")`
        animationOverlay.querySelector(".player-animation-name").textContent = `${player.name}`
        if (times === 0) {
            this.pickedPlayer = player
            this.showScoreResultChoice()
            return
        }
        setTimeout(() => this.playRandomPickAnimation(times - 1, this.config.players.filter(p => p.name !== player.name)), 50)
    },

    updatePlayerPosition(player){
        const playerCardElement = raceZone.querySelector("#player_card_"+player.name.toLowerCase().replace(' ', '_'))
        console.log("#player_card_"+player.name.toLowerCase().replace(' ', '_'))
        console.log(playerCardElement)
        if( !playerCardElement ){
            return
        }
        playerCardElement.classList.add("walk-animation")
        playerCardElement.style.bottom = `calc( 10px + ${player.points / this.config.goal * 100}%)`
        setTimeout(() => {
            playerCardElement.classList.remove("walk-animation")
        }, 2000)
    },

    updatePlayerScore(player){
        playerScoreList.querySelector("#player_score_"+player.name.toLowerCase().replace(' ', '_')+" .points").textContent =`${player.points}`
    },

    showScoreResultChoice() {
        resultChoices.classList.remove("d-none")
    },

    hideScoreResultChoice() {
        resultChoices.classList.add("d-none")
    },

    getRandomPlayer(players) {
        const randomIndex = Math.floor(Math.random() * players.length)
        return players[randomIndex]
    },

    addPlayerScore(player) {
        const playerScore = playerScoreTemplate.content.cloneNode(true)
        playerScore.querySelector('.list-group-item').id = 'player_score_' + player.name.toLowerCase().replace(' ', '_')
        playerScore.querySelector('.player-name').textContent = player.name
        playerScore.querySelector('.avatar').style.backgroundImage = 'url(' + player.avatar + ')'
        playerScore.querySelector('.points').textContent = `${player.points}`
        playerScoreList.append(playerScore)
    },

    addPlayerCard(player, position) {
        const playerCard = playerCardTemplate.content.cloneNode(true)
        const playerElement = playerCard.querySelector('.player-card')
        playerElement.id = 'player_card_' + player.name.toLowerCase().replace(' ', '_')
        playerElement.style.left = `${position * 100}px`
        playerElement.style.bottom = `calc( 10px + ${player.points / this.config.goal * 100}%)`
        playerCard.querySelector('.character').style.backgroundImage = `url("./assets/images/${player.character}.png")`
        playerCard.querySelector('.player-name').textContent = player.name
        raceZone.appendChild(playerCard)
    },

    saveInLocalStorage() {
        localStorage.setItem('config', JSON.stringify(this.config))
    },

    loadFromLocalStorage() {
        const data = localStorage.getItem('config')
        if (data) {
            this.config = JSON.parse(data)
            return
        }
        this.config = DEFAULT_CONFIG
    },

    onNotThisTime() {
        animationOverlay.classList.add("d-none")
        this.hideScoreResultChoice()
    },

    onReset(){
        console.log('local state restored')
        this.config = DEFAULT_CONFIG
        this.saveInLocalStorage()
        window.location.reload()
    },

    showVictory(){
        victoryOverlay.classList.remove("d-none")
    },

    hideVictory(){
        victoryOverlay.classList.add("d-none")
    },

    onAddPoint() {
        this.hideScoreResultChoice()
        animationOverlay.classList.add("d-none")

        if (!this.pickedPlayer) {
            return false
        }
        this.pickedPlayer.points++
        this.config.players = this.config.players.map(
            (player) => {
                if (player.name === this.pickedPlayer.name) {
                    return this.pickedPlayer
                }
                return player;
            }
        )
        this.saveInLocalStorage()
        horseSound.currentTime = 0;
        horseSound.play()
        setTimeout(() => {
            horseSound.stop()
        }, 1200)
        this.updatePlayerPosition(this.pickedPlayer)
        this.updatePlayerScore(this.pickedPlayer)
        if( this.pickedPlayer.points >= this.config.goal ){
            setTimeout(() => {
                this.showVictory()
                victorySound.play()
                this.playConfettiAnimation(15)
            }, 2500)
        }

        this.pickedPlayer = null
    },
}

game.init()