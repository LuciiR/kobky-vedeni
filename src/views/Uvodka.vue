<template>

<div class = "pozadi">

<!--<img v-bind:src="require(`./../assets/MISTNOSTI/mistnost.png`)" alt='pozadi'> -->


<img class="nazev" v-bind:src="require(`./../assets/nazev.png`)" alt='nazev'> 
<img class="hrat" v-bind:src="require(`./../assets/tlacitko.png`)" alt='tlacitko'> 


</div>
</template>

<script>
export default {

}
</script>

<style>

.nazev {
    position: absolute;
     left:340px;
     top: 150px;
    width: 429px;
    height: 250px;
    

}

.hrat {
   position: absolute;
   top: 580px;
   left:430px;
   
    

}

.pozadi {
    position: relative;
    left:130px;
    background-image:url("./../assets/MISTNOSTI/mistnost.png");
    background-repeat: no-repeat;
    width: 1080px;
    height: 720px;
}


</style>