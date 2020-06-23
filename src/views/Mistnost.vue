<template>
 <div id="pozadi" v-bind:style ="pozadiUrl">

    <img id= "panacek" v-bind:src="require(`./../assets/charaktery/char1P.png`)" alt="panacek">
    <img id= "pruvodce" v-bind:src="require(`./../assets/charaktery/satyrL.png`)" alt="pruvodce">  
    <img id= "zivoty" v-bind:src="require(`./../assets/skore/zivot3.png`)" alt="zivoty"> 
    <img id= "bodiky" v-bind:src="require(`./../assets/skore/bod0.png`)" alt="bodiky">  

    <div 
        class = "navod" v-if="navod.viditelne" v-html= "navod.text"> 
    </div>
    
    <div class = "otazka" v-if="otazka.viditelne" > 
      <p> {{otazka.data.uvitani}} {{otazka.data.otazka}}</p>

      <p> {{otazka.data.nazev}} <br> {{otazka.data.hodnoceni}} </p>

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
        text: Otazky.otazky[0].uvitani
      },

      otazka: {
        viditelne: false,
        data:null,
        odpoved: null,

      },
      zivoty: {
         x:144,
         y:612,
         sirka: 216,
         vyska:72,
         element:null
      },

      bodiky: {
         x:720,
         y:612,
         sirka: 216,
         vyska:72,
         element:null
      },


     pozadi: 'pravidla',
     

     aktualniMistnost: null,
     aktualniMistnostIndex: 0,

    };
  },

  mounted() {
    document.addEventListener("keydown", this.posunPanacka);
    this.panacek.element = document.querySelector("#panacek");
    this.pruvodce.element = document.querySelector("#pruvodce");
    this.zivoty.element = document.querySelector("#zivoty");
    this.bodiky.element = document.querySelector("#bodiky");

    
    this.aktualniMistnost = Mistnosti.mistnost[this.aktualniMistnostIndex];
    this.pozadi = this.aktualniMistnost.pozadi;


    
    

    this.panacek.x = this.aktualniMistnost.pozicePanacka.x * Mistnosti.velikostCtverecku;
    this.panacek.y = this.aktualniMistnost.pozicePanacka.y * Mistnosti.velikostCtverecku;

    this.pruvodce.x = this.aktualniMistnost.poziceNPC.x * Mistnosti.velikostCtverecku;
    this.pruvodce.y = this.aktualniMistnost.poziceNPC.y * Mistnosti.velikostCtverecku;


    this.umisti(this.panacek);
    this.umisti(this.pruvodce);
    this.umisti(this.zivoty);
    this.umisti(this.bodiky);
    
  },

  computed: {
    pozadiUrl () {
      const image = require(`@/assets/mistnosti/${this.pozadi}.png`);
      return {
        backgroundImage: `url(${image})`
      }
    }, 
  },

  methods: {
    umisti(objekt){
      objekt.element.style.left = `${objekt.x}px`; 
      objekt.element.style.top = `${objekt.y}px`;
    },

    klik(index) {
        if (this.otazka.odpoved)
          return;
        if (index === this.otazka.data.spravna) {
            console.log('yes');
            this.panacek.pocetBodu++;
            this.otazka.odpoved = this.otazka.data.reakceYes;

       

        } else {
            console.log('no');
            this.otazka.odpoved = this.otazka.data.reakceNo;
            this.panacek.pocetZivotu--;

           
        }

        this.zivoty.element.src = require(`./../assets/skore/zivot${this.panacek.pocetZivotu}.png`);
        this.bodiky.element.src = require(`./../assets/skore/bod${this.panacek.pocetBodu}.png`);
    },


    zmenMistnost() {
      if (this.aktualniMistnostIndex === 0) {
        this.navod.viditelne = false; 
        } else {
          this.otazka.viditelne = false;
        }

      if (Mistnosti.mistnost[this.aktualniMistnostIndex + 1]) {
        this.aktualniMistnostIndex++; 
        } else {
          return false;
        }

      this.aktualniMistnost = Mistnosti.mistnost[this.aktualniMistnostIndex];
      this.pozadi = this.aktualniMistnost.pozadi; 
      this.pruvodce.element.src = require(`./../assets/charaktery/${this.aktualniMistnost.imgPruvodce}.png`);
      
             
              

      this.panacek.x = this.aktualniMistnost.pozicePanacka.x * Mistnosti.velikostCtverecku;
      this.panacek.y = this.aktualniMistnost.pozicePanacka.y * Mistnosti.velikostCtverecku;

      this.pruvodce.x = this.aktualniMistnost.poziceNPC.x * Mistnosti.velikostCtverecku;
      this.pruvodce.y = this.aktualniMistnost.poziceNPC.y * Mistnosti.velikostCtverecku;
      
      let nahodneCislo = this.aktualniMistnost.cisloMin;

      
      if(Mistnosti.mistnost[this.aktualniMistnostIndex + 1]) {
         nahodneCislo += Math.floor(Math.random() * (this.aktualniMistnost.cisloMax - this.aktualniMistnost.cisloMin)+1);
         this.otazka.odpoved = null;
      } else {
         nahodneCislo += this.panacek.pocetBodu;
         this.otazka.odpoved = Otazky.otazky[nahodneCislo].popis;
      }
      this.otazka.data = Otazky.otazky[nahodneCislo];
    

      this.umisti(this.panacek);
      this.umisti(this.pruvodce);
      this.umisti(this.zivoty);
      this.umisti(this.bodiky);

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
          

          if(this.aktualniMistnostIndex === 0) {
            this.navod.viditelne = true;
          } else {
            this.otazka.viditelne = true;
          }
          
          console.log("došel si k pruvodci")
        } else if (this.aktualniMistnost.matice[indexRadku][indexSloupce] === 2) {
            if(this.zmenMistnost())  {
              // zvukDvere.play();
              console.log("prošel si dvěřmi")
            } else {
                console.log("Konec hry")
            }
        }
        this.panacek.element.src = require(`./../assets/charaktery/char1L.png`);

      } 

      if(event.code === "ArrowUp") {
        this.panacek.y -= this.panacek.krok;
        let indexSloupce = Math.floor(this.panacek.x / Mistnosti.velikostCtverecku);
        let indexRadku = Math.floor(this.panacek.y / Mistnosti.velikostCtverecku);
        if(this.aktualniMistnost.matice[indexRadku][indexSloupce]=== 1) {
          this.panacek.y += this.panacek.krok;
        } else if(this.aktualniMistnost.matice[indexRadku][indexSloupce] === 3) {
          
          if(this.aktualniMistnostIndex === 0) {
            this.navod.viditelne = true;
          } else {
            this.otazka.viditelne = true;
          }
          
          console.log("došel si k pruvodci")
        } else if (this.aktualniMistnost.matice[indexRadku][indexSloupce] === 2) {
          if(this.zmenMistnost()) {
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
        } else if(this.aktualniMistnost.matice[indexRadku][indexSloupce] === 3) {
           
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
        this.panacek.element.src = require(`./../assets/charaktery/char1P.png`);
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

#zivoty {
    position: absolute;
}

#bodiky {
  position: absolute;
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
    border: #c27d58 8px outset;
    border-radius: 10px;
    box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.5);
}
.navod >>> p {
    padding: 5px 25px;
    font-size: 18px;
    font-family: 'Balsamiq Sans', cursive;
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
  
    border: #c27d58 8px outset;
    border-radius: 10px;
    box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.5);
    padding: 5px 25px;
    font-size: 18px;
    font-family: 'Balsamiq Sans', cursive;

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
  list-style-type: none;
  color: #c27d58;
  font-size: 24px;
}

li {
  text-decoration: none;
  list-style-type: none;
  color: #c27d58
}

.hrat {
   position: absolute;
   bottom: 36px;
   left:468px;
   width: 144px;
   height: 72px;
}

</style>