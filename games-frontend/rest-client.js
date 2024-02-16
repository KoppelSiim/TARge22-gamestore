const vue = Vue.createApp({
    data() {
        
        return { 
            games: [],
            gameInModal: {name: null}, 
            //influencers: [],
            //influencerInModal: {onlinename: null},
        }
},
async created() {
    this.games = await (await fetch('http://localhost:8080/games')).json();
    //this.influencers = await (await fetch('http://localhost:8080/influencers')).json();
},
methods: {
    getGame: async function(id) {
        this.gameInModal = await (await fetch(`http://localhost:8080/games/${id}`)).json();
        let gameInfoModal = new bootstrap.Modal(document.getElementById('gameInfoModal'), {})
        gameInfoModal.show();
    },
/*     getInfluencer: async function(id) {
        this.influencerInModal = await (await fetch(`http://localhost:8080/games/${id}`)).json();
        let influencerInModal = new bootstrap.Modal(document.getElementById ('influencerInfoModal'), {})
    } */
}
}).mount('#app')