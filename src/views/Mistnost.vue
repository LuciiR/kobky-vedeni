<template>
 <div id="pozadi" v-bind:style ="pozadiUrl">

    <img id= "panacek" v-bind:src="require(`./../assets/charaktery/char1P.png`)" alt="panacek">
    <img id= "pruvodce" v-bind:src="require(`./../assets/charaktery/satyrL.png`)" alt="pruvodce">
  <!--  <img id= "pruvodce" v-bind:style="pruvodceUrl" alt="pruvodce">  -->

    <div 
        class = "navod" v-if="navod.viditelne" v-html= "navod.text"> 
    </div>
    
    <div class = "otazka" v-if="otazka.viditelne" > 
      <p> {{otazka.data.uvitani}} {{otazka.data.otazka}}</p>

      <ul class="odpovedi" v-for="(odpoved, index) in otazka.data.odpovedi" v-bind:key="index">
			<li> 
			   <a v-on:click="klik(index)" href="#"> {{odpoved}} </a>
			</li>
		</ul>

    <p> {{otazka.odpoved}} </p>

      </div> 

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
        pocetZivotu: 3,
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
        text: Otazky.otazky[15].uvitani
      },

      otazka: {
        viditelne: false,
        data:null,
        odpoved: null,
      },

     pozadi: 'pravidla',
     /* pruvodce: 'satyrL', */

     aktualniMistnost: null,
     aktualniMistnostIndex: 0,
    
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
    

    this.aktualniMistnost = Mistnosti.mistnost[this.aktualniMistnostIndex];
    this.pozadi = this.aktualniMistnost.pozadi;
    /* this.pruvodce = this.aktualniMistnost.pruvodce; */

    this.panacek.x = this.aktualniMistnost.pozicePanacka.x * Mistnosti.velikostCtverecku;
    this.panacek.y = this.aktualniMistnost.pozicePanacka.y * Mistnosti.velikostCtverecku;

    this.pruvodce.x = this.aktualniMistnost.poziceNPC.x * Mistnosti.velikostCtverecku;
    this.pruvodce.y = this.aktualniMistnost.poziceNPC.y * Mistnosti.velikostCtverecku;

    


    this.umisti(this.panacek)
    this.umisti(this.pruvodce)
  },

  computed: {
    pozadiUrl () {
      const image = require(`@/assets/mistnosti/${this.pozadi}.png`);
      return {
        backgroundImage: `url(${image})`
      }
    }, 
    /*
    pruvodceUrl () {
      const npcimage = require(`@/assets/charaktery/${this.pruvodce}.png`);
      return {
        backgroundImage: `url(${npcimage})`
      }
    }
    */
  
  },

  methods: {
    umisti(objekt){
      objekt.element.style.left =`${this.mapy.odsazeniX + objekt.x}px`; 
      objekt.element.style.top =`${this.mapy.odsazeniY + objekt.y}px`;
    },

    klik(index) {
        if (index === this.otazka.data.spravna) {
            console.log('yes');
            this.panacek.pocetBodu++;
            this.otazka.odpoved = this.otazka.data.reakceYes;
        } else {
            console.log('no');
            this.otazka.odpoved = this.otazka.data.reakceNo;
            this.panacek.pocetZivotu--;
        }
        
    },

    zmenMistnost(){
      if (this.aktualniMistnostIndex === 0) {
        this.navod.viditelne = false; 
      } else {
        this.otazka.viditelne = false;
      }

      if(Mistnosti.mistnost[this.aktualniMistnostIndex + 1]) {
        this.aktualniMistnostIndex++; 
        } else {
          return false;
        }
      this.aktualniMistnost = Mistnosti.mistnost[this.aktualniMistnostIndex];
      this.pozadi = this.aktualniMistnost.pozadi; 
      /* this.pruvodce = this.aktualniMistnost.pruvodce; */

      this.panacek.x = this.aktualniMistnost.pozicePanacka.x * Mistnosti.velikostCtverecku;
      this.panacek.y = this.aktualniMistnost.pozicePanacka.y * Mistnosti.velikostCtverecku;

      this.pruvodce.x = this.aktualniMistnost.poziceNPC.x * Mistnosti.velikostCtverecku;
      this.pruvodce.y = this.aktualniMistnost.poziceNPC.y * Mistnosti.velikostCtverecku;
      
      let nahodneCislo = this.aktualniMistnost.cisloMin;
      if(Mistnosti.mistnost[this.aktualniMistnostIndex + 1]) {
         nahodneCislo += Math.floor(Math.random() * (this.aktualniMistnost.cisloMax - this.aktualniMistnost.cisloMin));
         this.otazka.odpoved = null;
      } else {
         nahodneCislo += this.panacek.pocetBodu;
         this.otazka.odpoved = Otazky.otazky[nahodneCislo].popis;
      }
      this.otazka.data = Otazky.otazky[nahodneCislo];
    

      this.umisti(this.panacek)
      this.umisti(this.pruvodce)

      return true;
    },
    
    posunPanacka(event) {
      if(event.code === "ArrowLeft"){
        this.panacek.x -= this.panacek.krok; 
        let indexSloupce = Math.floor(this.panacek.x / Mistnosti.velikostCtverecku); 
        let indexRadku = Math.floor(this.panacek.y / Mistnosti.velikostCtverecku); 

        if(this.aktualniMistnost.matice[indexRadku][indexSloupce] === 1) {
          this.panacek.x += this.panacek.krok
          console.log("Došlo ke srazka");
        } else if(this.aktualniMistnost.matice[indexRadku][indexSloupce] === 3) {
          //this.navod.viditelne = true;

          if(this.aktualniMistnostIndex === 0) {
            this.navod.viditelne = true;
          } else {
            this.otazka.viditelne = true;
          }
          
          console.log("došel si k pruvodci")
        } else if (this.aktualniMistnost.matice[indexRadku][indexSloupce] === 2) {
          if(this.zmenMistnost())  {
             console.log("prošel si dvěřmi")
           } else {
              console.log("Konec hry")
          }

       
          }
        } 

      if(event.code === "ArrowUp") {
        this.panacek.y -= this.panacek.krok;
        let indexSloupce = Math.floor(this.panacek.x / Mistnosti.velikostCtverecku);
        let indexRadku = Math.floor(this.panacek.y / Mistnosti.velikostCtverecku);
        if(this.aktualniMistnost.matice[indexRadku][indexSloupce]=== 1) {
          this.panacek.y += this.panacek.krok
        }
        else if(this.aktualniMistnost.matice[indexRadku][indexSloupce] === 3) {
          
          if(this.aktualniMistnostIndex === 0) {
            this.navod.viditelne = true;
          } else {
            this.otazka.viditelne = true;
          }
          
          console.log("došel si k pruvodci")
        } else if (this.aktualniMistnost.matice[indexRadku][indexSloupce] === 2) {
         if(this.zmenMistnost())  {
             console.log("prošel si dvěřmi")
           } else {
              console.log("Konec hry")
          }

      } 
      }

      if(event.code === "ArrowDown") {
        this.panacek.y += this.panacek.krok;
        let indexSloupce = Math.floor (this.panacek.x /Mistnosti.velikostCtverecku);
        let indexRadku = Math.floor ((this.panacek.y + this.panacek.vyska) / Mistnosti.velikostCtverecku);

        if(this.aktualniMistnost.matice[indexRadku][indexSloupce]=== 1) {
            this.panacek.y -= this.panacek.krok
            console.log("Došlo ke srazka");
        }
        else if(this.aktualniMistnost.matice[indexRadku][indexSloupce] === 3) {
           
           if(this.aktualniMistnostIndex === 0) {
            this.navod.viditelne = true;
          } else {
            this.otazka.viditelne = true;
          }
          
          console.log("došel si k pruvodci")
        } else if (this.aktualniMistnost.matice[indexRadku][indexSloupce] === 2) {
           if(this.zmenMistnost())  {
             console.log("prošel si dvěřmi")
           } else {
              console.log("Konec hry")
          }
        }  
        }

      if(event.code === "ArrowRight") {
        this.panacek.x += this.panacek.krok;
        let indexSloupce = Math.floor((this.panacek.x + this.panacek.sirka) / Mistnosti.velikostCtverecku);
        let indexRadku = Math.floor (this.panacek.y / Mistnosti.velikostCtverecku);
        if (this.aktualniMistnost.matice[indexRadku][indexSloupce] === 1) {
            this.panacek.x -= this.panacek.krok
            console.log("Došlo ke srazka");
        } 
        else if(this.aktualniMistnost.matice[indexRadku][indexSloupce] === 3) {
          
          if(this.aktualniMistnostIndex === 0) {
            this.navod.viditelne = true;
          } else {
            this.otazka.viditelne = true;
          }
          
          console.log("došel si k pruvodci")
        } else if (this.aktualniMistnost.matice[indexRadku][indexSloupce] === 2) {
        if(this.zmenMistnost())  {
             console.log("prošel si dvěřmi")
           } else {
              console.log("Konec hry")
          }

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
    background-image: url("./../assets/charaktery/satyrL.png");
}

#pozadi {
    position: relative;
    margin: 0 auto;
    background-image: url("./../assets/mistnosti/pravidla.png");
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
    background-color: #ffe6cc;
    /*background: #8B4513 linear-gradient(to bottom, #fdce68, rgb(170, 126, 43));*/
    border: #c27d58 8px solid;
    border-radius: 10px;
    box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.5);
}
.navod >>> p {
    padding: 5px 25px;
    font-size: 18px;
    font-family: 'Balsamiq Sans', cursive;
    /*font-family:'Courier New', Courier, monospace;*/
    text-align: justify;
    color: #663300;
}

.otazka {
    position: absolute;
    left: 102px;
    top: 102px;
    width: 432px;
    min-height: 432px;
    background-color: #ffe6cc;
    /*background: #8B4513 linear-gradient(to bottom, #fdce68, rgb(170, 126, 43));*/
    border: #c27d58 8px solid;
    border-radius: 10px;
    box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.5);
    padding: 5px 25px;
    font-size: 18px;
    font-family: 'Balsamiq Sans', cursive;
    /*font-family:'Courier New', Courier, monospace;*/
    text-align: justify;
    color: #663300;
}

.odpovedi {
    padding: 5px 25px;
    font-size: 18px;
    font-family: 'Balsamiq Sans', cursive;
    /*font-family:'Courier New', Courier, monospace;*/
    text-align: center;
    color: #663300;
}
.odpovedi >>> a {
    text-decoration: none;
}



</style>