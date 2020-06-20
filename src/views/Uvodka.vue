<template>

<div class = "pozadi">

<!--<img v-bind:src="require(`./../assets/MISTNOSTI/mistnost.png`)" alt='pozadi'> -->


<img id = "nazev" v-bind:src="require(`./../assets/nazev.png`)" alt='nazev'> 
<img id= "hrat" v-bind:src="require(`./../assets/tlacitko.png`)" alt='tlacitko'> 


</div>
</template>

<script>
export default {

}
</script>

<style>

.nazev {
    position: absolute;
    

}

.hrat {
   position: absolute;
   top: 200;
    

}

.pozadi {
    position: relative;
    left:50px;
    background-image:url("./../assets/MISTNOSTI/mistnost.png");
    background-repeat: no-repeat;
    width: 1080px;
    height: 720px;
}


</style>