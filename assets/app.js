const player = (name, character, points) => ({
    name,
    character,
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
            'skull',
            0
            ),
        player('Ines',
            'cocci',
            0
        ),
        player('Aurelien',
            'wolf',
            0
        ),
        player('François',
            'zen',
            0
        ),
        player('Matthieu',
            'soccerman',
            0
        ),
    ],
    goal: 10
}

const playerScoreTemplate = document.getElementById("player-score-template")
const playerCardTemplate = document.getElementById("player-card-template")
const playerScoreList = document.getElementById("player-score-list")
const raceZone = document.getElementById("race-zone")
const resultChoices = document.getElementById("result-choices")
const animationOverlay = document.getElementById("animation-overlay")
const victoryOverlay = document.getElementById("victory-overlay")
const victoryPicture = document.getElementById("victory-picture")

// ----- Forms ------
const shareArea = document.getElementById("player-share-area")


// ----- Buttons -----
const notThisTimeButton = document.getElementById("not-this-time-button")
const addScoreButton = document.getElementById("add-score-button")
const goButton = document.getElementById("go-button")
const victoryButton = document.getElementById("victory-button")
const importButton = document.getElementById("import-button")
const exportButton = document.getElementById("export-button")
const shareCancelButton = document.getElementById("share-cancel-button")

const menuReset = document.getElementById("menu-btn-reset")
const menuAddUser = document.getElementById("menu-btn-add-user")
const menuShare = document.getElementById("menu-btn-share")
const menuSettings = document.getElementById("menu-btn-settings")
const menuEdit = document.getElementById("menu-btn-edit")


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
        this.initActionTriggers()
        this.saveInLocalStorage()
        this.initShareZone()
    },

    initShareZone(){
        shareArea.value = JSON.stringify(this.config)
    },


    initActionTriggers(){
        const actionTriggers = Array.from(document.querySelectorAll('[data-action]'));
        actionTriggers.forEach( element => this.initAction(element) )
    },

    initAction(element){
        const params = element.dataset.action.split(':')
        if( params.length !== 2 ){
            console.error(`${element.dataset.action} is invalid`)
            return false
        }
        element.addEventListener(params[0], event => this[params[1]](event) )
    },

    initEventListeners() {
        goButton.addEventListener("click", this.playRandomPick.bind(this))
        addScoreButton.addEventListener("click", this.onAddPoint.bind(this))
        notThisTimeButton.addEventListener("click", this.onNotThisTime.bind(this))
        menuReset.addEventListener("click", this.onReset.bind(this) )
        victoryButton.addEventListener("click", this.onReset.bind(this) )
        menuEdit.addEventListener("click", this.toggleEditMode.bind(this) )
        importButton.addEventListener("click", this.importData.bind(this))
        exportButton.addEventListener("click", this.exportData.bind(this) )
        shareCancelButton.addEventListener('click', this.toggleShareMode.bind(this) )
        menuShare.addEventListener('click', this.toggleShareMode.bind(this) )
    },

    importData(){
        let data = null
        try{
            data = JSON.parse(shareArea.value)
        }catch(err){
            alert('Json Incorrect')
        }
        if( !data ){
            return
        }

        this.config = data
        this.saveInLocalStorage()
        location.reload()
    },

    exportData(){
        this.initShareZone()
        navigator.clipboard.writeText(shareArea.value);
        exportButton.textContent = "Copied"
        setTimeout(()=>{
            exportButton.textContent = "Export"
        }, 2000)
    },

    toggleShareMode(){
        document.querySelector('.score-view').classList.toggle('d-none')
        document.querySelector('.share-view').classList.toggle('d-none')
        this.initShareZone()
    },

    addPoint(event){
        const playerName = event.currentTarget.closest('.list-group-item').id.replace('player_score_', '')
        this.config.players = this.config.players.map(p => {
            if( p.name.toLowerCase() === playerName ){
                p.points++
                this.updatePlayerScore(p)
                this.updatePlayerPosition(p)
            }
            return p
        } )
        this.saveInLocalStorage()
    },

    removePoint(event){
        const playerName = event.currentTarget.closest('.list-group-item').id.replace('player_score_', '')
        this.config.players = this.config.players.map(p => {
            if( p.name.toLowerCase() === playerName ){
                p.points--
                this.updatePlayerScore(p)
                this.updatePlayerPosition(p)
            }
            return p
        } )
        this.saveInLocalStorage()
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
            this.pickedPlayer = this.getRandomPlayer( this.config.players)
            this.showScoreResultChoice()
            return
        }
        setTimeout(() => this.playRandomPickAnimation(times - 1, this.config.players.filter(p => p.name !== player.name)), 50)
    },

    updatePlayerPosition(player){
        const playerCardElement = raceZone.querySelector("#player_card_"+player.name.toLowerCase().replace(' ', '_'))
        if( !playerCardElement ){
            return
        }
        playerCardElement.classList.add("walk-animation")
        playerCardElement.style.bottom = `calc( 10px + ${player.points / this.config.goal * 87}%)`
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
        playerScore.querySelector('.avatar').style.backgroundImage = `url("./assets/images/${player.character}.png")`
        playerScore.querySelector('.points').textContent = `${player.points}`
        playerScoreList.append(playerScore)
    },

    addPlayerCard(player, position) {
        const playerCard = playerCardTemplate.content.cloneNode(true)
        const playerElement = playerCard.querySelector('.player-card')
        playerElement.id = 'player_card_' + player.name.toLowerCase().replace(' ', '_')
        playerElement.style.left = `${position * 100}px`
        playerElement.style.bottom = `calc( 10px + ${player.points / this.config.goal * 87}%)`
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
            try{
                this.config = JSON.parse(data)
                return

            }catch(error){
                alert('Bad data in localStorage, game reset')
            }
        }
        this.config = DEFAULT_CONFIG
    },

    onNotThisTime() {
        animationOverlay.classList.add("d-none")
        this.hideScoreResultChoice()
    },

    onReset(){
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

    toggleEditMode() {
        playerScoreList.classList.toggle('edit-mode')
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
        const character = this.pickedPlayer.character
        if( this.pickedPlayer.points >= this.config.goal ){
            setTimeout(() => {
                victoryPicture.src = victoryPicture.src.replace('__CHAR__', character)
                this.showVictory()
                victorySound.play()
                this.playConfettiAnimation(15)
            }, 2500)
        }

        this.pickedPlayer = null
    },

    test(times = 250){
        const results = {}
        const winner = {
            player: null,
            score: 0,
        }
        for( let i = 0; i < times; i++ ){
            const player = game.getRandomPlayer(game.config.players)
            if( !results[player.name] ){
                results[player.name] = 0;
            }
            results[player.name] ++
            if( results[player.name] > winner.score  ){
                winner.score = results[player.name]
                winner.player = player.name
            }

        }
        console.table(results)
        console.log(`Winner: ${winner.player} - ${winner.score} points`)
    }
}

game.init()

