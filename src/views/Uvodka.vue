<template>

<div class = "pozadi">

    <!--<img v-bind:src="require(`./../assets/mistnosti/uvodka.png`)" alt='pozadi'> -->


    <img class="nazev" v-bind:src="require(`./../assets/nazev.png`)" alt='nazev'> 

    
        <router-link to = '/mistnost'>
        <img class="hrat" v-bind:src="require(`./../assets/tlacitko.png`)" alt='tlacitko' v-on:click="play" type="button">
        <!-- <button v-on:click="play" type="button">Click Me to Play Sound</button> 
        <audio ref="audioElm" src="./../assets/sound/tlacitko.wav"></audio>-->
        </router-link>
    


</div>
</template>

<script>
/*
export default {

    methods: {
    play: function(event) {
      this.$refs.audioElm.play();
    }
  } 

}
*/
</script>

<style scoped>

.nazev {
    position: absolute;
    left:324px;
    top: 180px;
    width: 432px;
    height: 288px;
}

.hrat {
   position: absolute;
   bottom: 36px;
   left:468px;
   width: 144px;
   height: 72px;
}

.pozadi {
    position: relative;
    margin: 0 auto;
    background-image:url("./../assets/mistnosti/uvodka.png");
    background-repeat: no-repeat;
    width: 1080px;
    height: 720px;
}

.hrat:hover {
    transform: scale(1.2);
    box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
}


</style>