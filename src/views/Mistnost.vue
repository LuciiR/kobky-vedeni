<template>
  <div class="pozadi">
 <img id= "panacek" v-bind:src="require(`./../assets/charaktery/char1P.png`)" alt="panacek">
  </div>
</template>


<script>
export default {

  created() {
    function umisti(objekt)  {
      objekt.element.style.left =`${mapy.odsazeniX + objekt.x}px`; 
      objekt.element.style.top =`${mapy.odsazeniY + objekt.y}px`;
}
    function ulozDoXY(objekt, x, y) {
      const poleMapy = mapy.poleMapy[mapy.mistnost];
      for(let indexRadku = y; indexRadku < poleMapy.length; indexRadku++){
	    for(let indexSloupce = x; indexSloupce < poleMapy[indexRadku].length; indexSloupce++){
        if(poleMapy[indexRadku][indexSloupce] == 0) {
          objekt.x = indexRadku * mapy.velikostCtverecku + 1; 
          objekt.y = indexSloupce * mapy.velikostCtverecku + 1;
          umisti(objekt);
          return; 	
        }  
		}
	}
	  ulozDoXY(objekt, 0, 0); 
}

      function posunPanacka(event) {
        if(event.code === "ArrowLeft"){
          panacek.x -= panacek.krok; 
          let indexSloupce = Math.floor(panacek.x / mapy.velikostCtverecku); 
          let indexRadku = Math.floor(panacek.y / mapy.velikostCtverecku); 

        if(mapy.poleMapy[mapy.mistnost][indexRadku][indexSloupce] === 1) {
            panacek.x += panacek.krok
            console.log("Došlo ke srazka");
             
           
            } else{ 
               /* indexRadku = Math.floor((panacek.y + panacek.vyska) / mapy.velikostCtverecku);
                if(mapy.poleMapy[mapy.mistnost][indexRadku][indexSloupce] === 1){
                    panacek.x += panacek.krok;
                } */ 
            } 
     } 
        if(event.code === "ArrowUp") {
          panacek.y -= panacek.krok;
          let indexSloupce = Math.floor(panacek.x / mapy.velikostCtverecku);
          let indexRadku = Math.floor(panacek.y / mapy.velikostCtverecku);
          if(mapy.poleMapy[mapy.mistnost][indexRadku][indexSloupce]=== 1) 
            panacek.y += panacek.krok
          else { /*
            indexSloupce = Math.floor((panacek.x + panacek.sirka)/mapy.velikostCtverecku);
            if(mapy.poleMapy[mapy.mistnost][indexRadku][indexSloupce]=== 1) {
                panacek.y += panacek.krok;
            } */
        }
    
    } 
      if(event.code === "ArrowDown") {
        panacek.y += panacek.krok;
        let indexSloupce = Math.floor (panacek.x / mapy.velikostCtverecku);
        let indexRadku = Math.floor ((panacek.y + panacek.vyska) / mapy.velikostCtverecku);

        if(mapy.poleMapy[mapy.mistnost][indexRadku][indexSloupce]=== 1) {
           // panacek.y = indexRadku * mapy.velikostCtverecku - panacek.vyska - 1;
            panacek.y -= panacek.krok
            console.log("Došlo ke srazka");
        }else{
            /*indexSloupce = Math.floor ((panacek.x + panacek.sirka) / mapy.velikostCtverecku);
            if (mapy.poleMapy[mapy.mistnost][indexRadku][indexSloupce] === 1) {
                panacek.y -= panacek.krok;
                } */
            }
    }  
        if(event.code === "ArrowRight") {
            panacek.x += panacek.krok;
            let indexSloupce = Math.floor((panacek.x + panacek.sirka) / mapy.velikostCtverecku);
            let indexRadku = Math.floor (panacek.y / mapy.velikostCtverecku);
            if (mapy.poleMapy[mapy.mistnost][indexRadku][indexSloupce] === 1) {
                //panacek.x = indexSloupce * mapy.velikostCtverecku - panacek.sirka - 1;
                panacek.x -= panacek.krok
                console.log("Došlo ke srazka");
            } else { /*
                indexRadku = Math.floor((panacek.y + panacek.vyska) / mapy.velikostCtverecku);
                if (mapy.poleMapy[mapy.mistnost][indexRadku][indexSloupce] === 1) {
                    panacek.x -= panacek.krok;
                } */
            }
    }
    umisti(panacek); 
}


    ulozDoXY(panacek,6,1); 
    document.addEventListener("keydown", posunPanacka);



  },

  data() {
    return {
    panacek: { 
      x: 0,
      y: 0,
      sirka: 70,
      vyska: 70,
      element: document.querySelector("#panacek"),
      pocetZivotu:5,
      krok: 18

	
},

      
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
    left:130px;
    background-image:url("./../assets/mistnosti/pravidla.png");
    background-repeat: no-repeat;
    width: 1080px;
    height: 720px;
}


</style>