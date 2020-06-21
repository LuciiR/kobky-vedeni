<template>
  <div>

    <div class = "kuchyneOT" v-show="kuchyneOT.viditelne" v-html= "kuchyneOT.text"></div>

  </div>
</template>

<script>
import Hra from "@/hra/hra.js"

export default {

  data() {
      return {
          kuchyneOT: {
            viditelne: true,
            text: Hra.otazky[0].uvitani,
            },
      },
  },

  methods: {
      this.kuchyneOT.viditelne = true;
  },
      /*pokus o otázku -> počítání bodů*/

    //aktualniIndex: 0,
    //odpovediHrace: [],

    const zivotyEl = document.querySelector('#zivoty');
    const pocitaniSkore = document.querySelector('#score');
    let skore = 0;
    const mince = {
        x: 10,
        y: 10,
        sirka: 36,
        vyska: 36,
        element: document.querySelector('#mince')
    };

    function odpovedHrace (panacek, odpoved) {
		// změníme obrázek počtu srdíček -> pomocí backticků měníme číslo dle počtu aktuálních životů, odebereme živůtek a přehrajeme zvuk 
        
        if ()
		zivotyEl.src = `images/srdce-${panacek.pocetZivotu}.png`;
        panacek.pocetZivotu--;
        // zvukZivot.play();

		if (panacek.pocetZivotu === 0) {
			console.log('konec hry');


    computed: {

		pocetSpravnychOdpovedi() {
			let pocet = 0;
			for (let index=0; index < this.otazky.length; index++) {
				if (this.otazky[index].spravna === this.odpovediUzivatele[index] ) {
					pocet++;
				}
			}
			return pocet;
		},

	},

	methods: {

		odpovedNaOtazku(odpoved) {
			this.odpovediUzivatele.push( odpoved );
			this.aktualniIndex++;
			// console.log(this.odpovediUzivatele)
		}

    }

}
</script>

<style>

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

 .navod >>> p {
 padding: 20px;
 font-size: 17px;
 font-family:'Courier New', Courier, monospace;
 text-align: justify;
}

</style>


