<template>
  <div class="pozadi">
 <img id= "panacek" v-bind:src="require(`./../assets/charaktery/char1P.png`)" alt="panacek">
  </div>
</template>


<script>
export default {
  data() {
    return {
      panacek: {
        x: 0,
        y: 0,
        sirka: 70,
        vyska: 70,
        element: null,
        pocetZivotu:5,
        krok: 18
      },
      mapy: {
        odsazeniX: 0, 
        odsazeniY: 0, 
        velikostCtverecku: 72, 
        mistnost: 0, 
        poleMapy: [
          [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
          ]
        ]
      }
    }
  },

  mounted() {
    document.addEventListener("keydown", this.posunPanacka);
    this.panacek.element = document.querySelector("#panacek")

    this.panacek.x = 1 * this.mapy.velikostCtverecku;
    this.panacek.y = 1 * this.mapy.velikostCtverecku;

    this.umisti(this.panacek)
  },

  methods: {
    umisti(objekt){
      objekt.element.style.left =`${this.mapy.odsazeniX + objekt.x}px`; 
      objekt.element.style.top =`${this.mapy.odsazeniY + objekt.y}px`;
    },

    posunPanacka(event) {
      if(event.code === "ArrowLeft"){
        this.panacek.x -= this.panacek.krok; 
        let indexSloupce = Math.floor(this.panacek.x / this.mapy.velikostCtverecku); 
        let indexRadku = Math.floor(this.panacek.y / this.mapy.velikostCtverecku); 

        if(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 1) {
          this.panacek.x += this.panacek.krok
          console.log("Došlo ke srazka");
        }  
      } 

      if(event.code === "ArrowUp") {
        this.panacek.y -= this.panacek.krok;
        let indexSloupce = Math.floor(this.panacek.x / this.mapy.velikostCtverecku);
        let indexRadku = Math.floor(this.panacek.y / this.mapy.velikostCtverecku);
        if(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce]=== 1) {
          this.panacek.y += this.panacek.krok
        }
      } 

      if(event.code === "ArrowDown") {
        this.panacek.y += this.panacek.krok;
        let indexSloupce = Math.floor (this.panacek.x / this.mapy.velikostCtverecku);
        let indexRadku = Math.floor ((this.panacek.y + this.panacek.vyska) / this.mapy.velikostCtverecku);

        if(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce]=== 1) {
            this.panacek.y -= this.panacek.krok
            console.log("Došlo ke srazka");
        }
      }  

      if(event.code === "ArrowRight") {
        this.panacek.x += this.panacek.krok;
        let indexSloupce = Math.floor((this.panacek.x + this.panacek.sirka) / this.mapy.velikostCtverecku);
        let indexRadku = Math.floor (this.panacek.y / this.mapy.velikostCtverecku);
        if (this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 1) {
            this.panacek.x -= this.panacek.krok
            console.log("Došlo ke srazka");
        } 
      }

      this.umisti(this.panacek); 
    }
  }
}
</script>


<style scoped>


#panacek {
    position: absolute;
}

.pozadi {
  position: relative;
    margin: 0 auto;
    background-image:url("./../assets/mistnosti/pravidla.png");
    background-repeat: no-repeat;
    width: 1080px;
    height: 720px;
}


</style>