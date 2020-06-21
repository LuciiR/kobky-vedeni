<template>
  <div class="pozadi">
 <img id= "panacek" v-bind:src="require(`./../assets/charaktery/char1P.png`)" alt="panacek">
  </div>
</template>


<script>
import Metody from '@/hra/metody.js'

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
      },

      kolizeData: [
        {
          sirka: 72,
          vyska: 72,
          x: 504,
          y: 288 // 216
        },
        {
          sirka: 1080,
          vyska: 10,
          x: 0,
          y: 0 // 216
        },
        {
          sirka: 10,
          vyska: 600,
          x: 0,
          y: 0 // 216
        },
        {
          sirka: 1080,
          vyska: 10,
          x: 1080,
          y: 300 // 216
        }
      ]
    }
  },

  mounted() {


    document.addEventListener("keydown", this.posunPanacka);
    this.panacek.element = document.querySelector("#panacek")

    this.panacek.x = 1 * this.mapy.velikostCtverecku;
    this.panacek.y = 1 * this.mapy.velikostCtverecku;

    this.umisti(this.panacek)

    this.testMetodyOdjinud()

    const pozadi = document.querySelector('.pozadi')
    for (const kolizniObjekt of this.kolizeData) {
      console.log(kolizniObjekt)
      let mujDiv = document.createElement('div')
      mujDiv.style.position = "absolute";
      mujDiv.style.width = kolizniObjekt.sirka + "px";
      mujDiv.style.height = kolizniObjekt.vyska + "px";
      mujDiv.style.left = kolizniObjekt.x + "px";
      mujDiv.style.top = kolizniObjekt.y + "px";
      mujDiv.innerHTML = "&nbsp;";

      console.log(mujDiv)

      pozadi.appendChild(mujDiv)
    }
  },

  methods: {
    ...Metody,
    kolize(a, b) { //když se střetne mince s panáčkem
      //console.log("a.x + a.sirka < ", a.x + a.sirka, a.x + a.sirka < b.x, b.x)
      //console.log("b.x + b.sirka < ", b.x + b.sirka, b.x + b.sirka < a.x, a.x)
      //console.log("a.y + a.vyska < ", a.y + a.vyska, a.y + a.vyska < b.y, b.y)
      //console.log("b.y + b.vyska < ", b.y + b.vyska, b.y + b.vyska < a.y, a.y)
      return (!( a.x + a.sirka < b.x
          || b.x + b.sirka < a.x
          || a.y + a.vyska < b.y
          || b.y + b.vyska < a.y));
    },

    umisti(objekt){
      objekt.element.style.left =`${this.mapy.odsazeniX + objekt.x}px`; 
      objekt.element.style.top =`${this.mapy.odsazeniY + objekt.y}px`;
    },

    posunPanacka(event) {
      if(event.code === "ArrowLeft"){
        this.panacek.x -= this.panacek.krok; 
        let indexSloupce = Math.floor(this.panacek.x / this.mapy.velikostCtverecku); 
        let indexRadku = Math.floor(this.panacek.y / this.mapy.velikostCtverecku); 

        /*if(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 1) {
          this.panacek.x += this.panacek.krok
          console.log("Došlo ke srazka");
        }  */
                for (const kolizniObjekt of this.kolizeData) {
          //console.log(this.panacek.x, this.panacek.y)
          //console.log(kolizniObjekt)
          //console.log(this.kolize(this.panacek, kolizniObjekt))
          if (this.kolize(this.panacek, kolizniObjekt)) {
            this.panacek.x += this.panacek.krok
            console.log("Došlo ke srazka");
          }
        }
      } 

      if(event.code === "ArrowUp") {
        this.panacek.y -= this.panacek.krok;
        let indexSloupce = Math.floor(this.panacek.x / this.mapy.velikostCtverecku);
        let indexRadku = Math.floor(this.panacek.y / this.mapy.velikostCtverecku);
        /*if(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce]=== 1) {
          this.panacek.y += this.panacek.krok
        }*/
                for (const kolizniObjekt of this.kolizeData) {
          //console.log(this.panacek.x, this.panacek.y)
          //console.log(kolizniObjekt)
          //console.log(this.kolize(this.panacek, kolizniObjekt))
          if (this.kolize(this.panacek, kolizniObjekt)) {
            this.panacek.y += this.panacek.krok
            console.log("Došlo ke srazka");
          }
        }
      } 

      if(event.code === "ArrowDown") {
        this.panacek.y += this.panacek.krok;
        let indexSloupce = Math.floor (this.panacek.x / this.mapy.velikostCtverecku);
        let indexRadku = Math.floor ((this.panacek.y + this.panacek.vyska) / this.mapy.velikostCtverecku);

        /*if(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce]=== 1) {
            this.panacek.y -= this.panacek.krok
            console.log("Došlo ke srazka");
        }*/
        for (const kolizniObjekt of this.kolizeData) {
          //console.log(this.panacek.x, this.panacek.y)
          //console.log(kolizniObjekt)
          //console.log(this.kolize(this.panacek, kolizniObjekt))
          if (this.kolize(this.panacek, kolizniObjekt)) {
            this.panacek.y -= this.panacek.krok
            console.log("Došlo ke srazka");
          }
        }
      }  

      if(event.code === "ArrowRight") {
        //console.log("pred", this.panacek.x, this.panacek.y)

        this.panacek.x += this.panacek.krok;
        //console.log("po", this.panacek.x, this.panacek.y)

        let indexSloupce = Math.floor((this.panacek.x + this.panacek.sirka) / this.mapy.velikostCtverecku);
        let indexRadku = Math.floor (this.panacek.y / this.mapy.velikostCtverecku);
        //console.log("indexSloupce", indexSloupce)
        //console.log("indexRadku", indexRadku)
        //console.log(this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce])

/*
        if (this.mapy.poleMapy[this.mapy.mistnost][indexRadku][indexSloupce] === 1) {
            this.panacek.x -= this.panacek.krok
            console.log("Došlo ke srazka");
        }
        */

        for (const kolizniObjekt of this.kolizeData) {
          //console.log(this.panacek.x, this.panacek.y)
          //console.log(kolizniObjekt)
          //console.log(this.kolize(this.panacek, kolizniObjekt))
          if (this.kolize(this.panacek, kolizniObjekt)) {
            this.panacek.x -= this.panacek.krok
            console.log("Došlo ke srazka");
          }
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