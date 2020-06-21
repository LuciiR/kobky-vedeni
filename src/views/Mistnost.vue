<template>
 <div id="pozadi" v-bind:style ="pozadiUrl">
 <img id= "panacek" v-bind:src="require(`./../assets/charaktery/char1P.png`)" alt="panacek">
 <img id= "pruvodce" v-bind:src="require(`./../assets/charaktery/satyrL.png`)" alt="pruvodce">


  <div class = "navod" v-show="navod.viditelne" v-html= "navod.text"> 
   

  </div>
  <!--<div class = "otazka" v-show="otazka.viditelne"> </div> -->

  </div>
</template>


<script>
import Otazky from "@/hra/otazky.js"
import Mistnosti from "@/hra/mistnost.js"

export default {
  data() {
    return {
      panacek: {
        x: 0,
        y: 0,
        sirka: 70,
        vyska: 70,
        element: null,
        pocetZivotu: 5,
        pocetBodu: 0,
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
        viditelne : false,
        text:Otazky.otazky [15].uvitani

      },

     pozadi: 'pravidla',

     aktualniMistnost: {
      mistnostIndex: Mistnosti.mistnost



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
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 1],
            [2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 1, 3, 0, 2],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 1],
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
    this.panacek.y = 4 * this.mapy.velikostCtverecku;

    this.pruvodce.x = 11 * this.mapy.velikostCtverecku;
    this.pruvodce.y = 4 * this.mapy.velikostCtverecku;

    this.umisti(this.panacek)
    this.umisti(this.pruvodce)
  },

  computed: {
    pozadiUrl () {
      const image = require(`@/assets/mistnosti/${this.pozadi}.png`);
      return {
        backgroundImage : `url(${image})`
      }
    }
  
  },

  methods: {
    umisti(objekt){
      objekt.element.style.left =`${this.mapy.odsazeniX + objekt.x}px`; 
      objekt.element.style.top =`${this.mapy.odsazeniY + objekt.y}px`;
    },

    zmenMistnost(){
      this.aktualniMistnost++;
      this.aktualniMistnost = Mistnosti[this.aktualniMistnost];

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
        } else if (this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 2) {
         
          //this.pozadi.style.backgroundImage = `url(src/assets/mistnosti/kuchyne_box.png)`

            console.log("prošel si dvěřmi")
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
        } else if (this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 2) {
         // this.pozadi.style.backgroundImage = `url(src/assets/mistnosti/kuchyne_box.png)`
          console.log("prošel si dvěřmi")
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
        } else if (this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 2) {
          //this.pozadi.style.backgroundImage = `url(src/assets/mistnosti/kuchyne_box.png)`
          console.log("prošel si dvěřmi")
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
        } else if (this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 2) {
          this.pozadi ='kuchyne_box'
          zmenMistnost();

          console.log("prošel si dvěřmi")
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

#pozadi {
  position: relative;
    margin: 0 auto;
    background-image:url("./../assets/mistnosti/pravidla.png");
    background-repeat: no-repeat;
    width: 1080px;
    height: 720px;
}

.navod {
    position: absolute;
    left: 102px;
    top: 102px;
    width: 432px;
    min-height: 432px;
    background-color: sandybrown;
    /*background: #8B4513 linear-gradient(to bottom, #fdce68, rgb(170, 126, 43));*/
    border:#8B4513 8px solid;
    border-radius: 10px;
    box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.5);

}

 .navod >>> p {
    padding: 5px 25px;
    font-size: 18px;
    font-family: 'Balsamiq Sans', cursive;
    /*font-family:'Courier New', Courier, monospace;*/
    text-align: justify;

}

</style>