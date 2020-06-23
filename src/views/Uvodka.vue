<template>
    <div class="pozadi">
        <img ref="nazev" class="nazev" v-bind:src="require(`@/assets/nazev.png`)" v-on:dblclick="mentor">

        <router-link to = '/mistnost'>
            <img class="hrat" v-bind:src="require(`@/assets/tlacitko.png`)" alt='tlacitko' type="button">
        </router-link>
    </div>
</template>


<script>
export default {
    mounted() {
        console.log('%c Něco se skrývá pod Kobkou vědění', 'background: #000; color: #FFD902')
    },

    methods: {
        mentor() {
            this.$refs.nazev.src = require(`@/assets/easteregg_my.png`);
            this.$refs.nazev.style.height = "324px";
            this.$refs.nazev.style.width = "540px";
            this.$refs.nazev.style.border = "outset 8px #c27d58";
            this.$refs.nazev.style.justify = "center";
            this.$refs.nazev.style.position = "absolute";
    this.$refs.nazev.style.left = "262px";
    this.$refs.nazev.style.top = "154px";

            console.log('%c Náš mentor Zdeněk s okurkou', 'background: #000; color: #FFD902')
        }
    }
}
</script>


<style scoped>
.nazev {
    position: absolute;
    left: 324px;
    top: 180px;
    width: 432px;
    height: 288px;
}

.hrat {
   position: absolute;
   bottom: 36px;
   left: 468px;
   width: 144px;
   height: 73px;
}

.pozadi {
    position: relative;
    margin: 0 auto;
    background-image: url("./../assets/mistnosti/uvodka.png");
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
