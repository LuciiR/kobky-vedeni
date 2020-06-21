<template>
  <div class="pozadi">
 <img id= "panacek" v-bind:src="require(`./../assets/charaktery/char1P.png`)" alt="panacek">
 <img id= "pruvodce" v-bind:src="require(`./../assets/charaktery/satyrL.png`)" alt="pruvodce">


  <div class = "navod" v-show="navod.viditelne"> 
   

  </div>
  <!--<div class = "otazka" v-show="otazka.viditelne"> </div> -->

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
        krok: 72
      },
      pruvodce: {
        x:0,
        y:0,
        sirka:70,
        vyska:70,
        element:null,

      },

      navod: {
        viditelne : false

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
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 1, 3, 0, 2],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1],
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
    this.pruvodce.element = document.querySelector("#pruvodce")

    this.panacek.x = 1 * this.mapy.velikostCtverecku;
    this.panacek.y = 1 * this.mapy.velikostCtverecku;

    this.pruvodce.x = 11 * this.mapy.velikostCtverecku;
    this.pruvodce.y = 4 * this.mapy.velikostCtverecku;

    this.umisti(this.panacek)
    this.umisti(this.pruvodce)
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
        } else if(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 3) {
          this.navod.viditelne = true;
          
          console.log("došel si k pruvodci")
        }
      } 

      if(event.code === "ArrowUp") {
        this.panacek.y -= this.panacek.krok;
        let indexSloupce = Math.floor(this.panacek.x / this.mapy.velikostCtverecku);
        let indexRadku = Math.floor(this.panacek.y / this.mapy.velikostCtverecku);
        if(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce]=== 1) {
          this.panacek.y += this.panacek.krok
        }
        else if(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 3) {
          
          this.navod.viditelne = true;
          
          console.log("došel si k pruvodci")
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
        else if(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 3) {
           
           this.navod.viditelne = true;
          
          console.log("došel si k pruvodci")
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
        else if(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 3) {
          
          this.navod.viditelne = true;
          
          console.log("došel si k pruvodci")
        }
        
      }

      this.umisti(this.panacek); 
      this.umisti(this.pruvodce)
    }
  }
}
</script>


<style scoped>


#panacek {
    position: absolute;
}

#pruvodce {
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

.navod {
  position: absolute;
  left: 108px;
  top: 108px;
  width: 432px;
  min-height: 432px;
  background-color: sandybrown;
  /*background: #8B4513 linear-gradient(to bottom, #fdce68, rgb(170, 126, 43));*/
  border:#8B4513 8px solid;
  border-radius: 10px;
  box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.5);

}

</style>