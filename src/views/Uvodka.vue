<template>

<div class = "pozadi">

<!--<img v-bind:src="require(`./../assets/mistnosti/mistnost.png`)" alt='pozadi'> -->


<img class="nazev" v-bind:src="require(`./../assets/nazev.png`)" alt='nazev'> 

<router-link to = '/mistnost'>
<img class="hrat" v-bind:src="require(`./../assets/tlacitko.png`)" alt='tlacitko'> 
</router-link>


</div>
</template>

<script>
export default {

}
</script>

<style scoped>

.nazev {
    position: absolute;
     left:340px;
     top: 144px;
    width: 429px;
    height: 250px;
    

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
    left:130px;
    background-image:url("./../assets/mistnosti/mistnost.png");
    background-repeat: no-repeat;
    width: 1080px;
    height: 720px;
}


</style>