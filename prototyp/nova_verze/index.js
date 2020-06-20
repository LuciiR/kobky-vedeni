let panacek = { // objekt panáček
	x: 0,
	y: 0,
	sirka: 70,
	vyska: 70,
	element: document.querySelector("#panacek"),
	pocetZivotu:5,
    krok: 18
    
	
};



let mapy = {
    odsazeniX: 0, // kvůli tomu, že mapa může být kdekoliv v prostoru
    odsazeniY: 0, // kvůli tomu, že mapa může být kdekoliv v prostoru
    velikostCtverecku: 72, // velikost jednoho čtverečku na šířku
     // velikost jednoho čtverečku na výšku
    mistnost: 0, // daná místnost
    poleMapy: [
      
        [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[2,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
			[1,1,1,0,0,1,0,0,1,1,1,1,1,1,1],
			[1,0,0,0,0,1,0,0,0,0,1,1,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
			[1,1,1,0,0,0,0,0,0,0,1,1,2,1,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

        ], /*
        [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,1,0,0,2],
			[1,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
			[1,0,0,1,1,1,0,0,0,1,0,0,0,0,1],
			[1,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
			[2,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],

        ],
        [
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		],*/
    ]
};

function umisti(objekt) // umistit objekt(panáčky) na pozici stránky 
{
	objekt.element.style.left =`${mapy.odsazeniX + objekt.x}px`; // odsazení - zajistí změnu souřadného systému
	objekt.element.style.top =`${mapy.odsazeniY + objekt.y}px`;
}


function ulozDoXY(objekt, x, y) // umístnění panáču na dané mapě 
{

	const poleMapy = mapy.poleMapy[mapy.mistnost];
    for(let indexRadku = y; indexRadku < poleMapy.length; indexRadku++)
	{
	    for(let indexSloupce = x; indexSloupce < poleMapy[indexRadku].length; indexSloupce++)
		{
			if(poleMapy[indexRadku][indexSloupce] == 0) {
				objekt.x = indexRadku * mapy.velikostCtverecku + 1; // aby nebyl na hraně(1)
				objekt.y = indexSloupce * mapy.velikostCtverecku + 1;
				umisti(objekt);
				return; 	
			}  
		}
	}
	ulozDoXY(objekt, 0, 0); //zavolá sám sebe, když vybereme špatné pozice na uložení- spustí se znovu od začátku
}

// je to kvůli souřadnému systému - když je to UP + left ==> tak je to souřadnice (O,O) - levý horní roh a když je to down + right (72,72) - pravej dolní roh

function posunPanacka(event) 
{
    if(event.code === "ArrowLeft"){
        panacek.x -= panacek.krok; // o kolik se panáček pohne 
        let indexSloupce = Math.floor(panacek.x / mapy.velikostCtverecku); // index sloupce se rovná = výpočet pozice panáčka X / mapy- veliksot jednoho čtverečku na šířku (x)
        let indexRadku = Math.floor(panacek.y / mapy.velikostCtverecku); // math.floor - "opatření" kdyby se velikost políčka x,y změnila (kdyby to nebyla 72px)
        if(mapy.poleMapy[mapy.mistnost][indexRadku][indexSloupce] === 1) {
            //panacek.x =(indexSloupce + 1)* mapy.velikostCtverecku + 1;  // jednička je tam proto - aby se o px posunul - a nebyl uplně u zdi
            panacek.x += panacek.krok
            console.log("Došlo ke srazka");
             //doraz ke steně - narazili jsme na stěnu  // sloupce +1 (protože se indexuje od 0 - aby tam bylo fyzicky 1)   -- > 
           
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
        if (mapy.poleMapy[mapy.mistnost][indexRadku][indexSloupce]=== 1) 
            //panacek.y =(indexRadku +1) * mapy.velikostCtverecku + 1;
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
           pohyb("x", "+") 
           /* panacek.x += panacek.krok;
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
                } 
            }*/
    }
    umisti(panacek); // umístní toho panáčka do té stránky
}

    

ulozDoXY(panacek,6,1); // nastavíme si panáčka na určitou pozici 
document.addEventListener("keydown", posunPanacka);


function pohyb (osa, smer) {

    //panacek[osa] = panacek[osa] - panacek.krok; // nahoru, vlevo
    //panacek[osa] = panacek[osa] + panacek.krok; // dolu, doprava

    if(smer === "-") {
        panacek[osa] = panacek[osa] - panacek.krok;
    } else if(smer === "+") {
        panacek[osa] = panacek[osa] + panacek.krok;
    } else {
        console.log("Zadané špatné znaménko (+-)")
    }

    let indexSloupce = Math.floor(panacek.x / mapy.velikostCtverecku);
    let indexRadku = Math.floor(panacek.y / mapy.velikostCtverecku);

    if (mapy.poleMapy[mapy.mistnost][indexRadku][indexSloupce] === 1) {
        if(smer === "-") {
            panacek[osa] = panacek[osa] + panacek.krok;
        } else if(smer === "+") {
            panacek[osa] = panacek[osa] - panacek.krok;
        } else {
            console.log("Zadané špatné znaménko (+-)")
        }
        console.log("Došlo ke srazka");
    }
    //umisti(panacek);
}

