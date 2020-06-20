const panacek = { // objekt panáček
	x: 0,
	y: 0,
	sirka: 70,
	vyska: 70,
	element: document.querySelector("#panacek"),
	pocetZivotu:5,
	dx: 18,
	dy: 18,
};



let mapy = {
    odsazeniX: 0, // kvůli tomu, že mapa může být kdekoliv v prostoru
    odsazeniY: 0, // kvůli tomu, že mapa může být kdekoliv v prostoru
    velikostCtvereckuX: 72, // velikost jednoho čtverečku na šířku
    velikostCtvereckuY :72, // velikost jednoho čtverečku na šířku
    mistnosti: 0, // daná místnost
    poleMapy: [
      
        [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[2,0,0,0,0,0,0,0,0,1,1,1,1,1,1],
			[1,1,1,0,0,1,0,0,1,1,1,1,1,1,1],
			[1,0,0,0,0,1,0,0,0,0,1,1,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
			[1,1,1,0,0,0,0,0,0,0,0,0,2,1,1],
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
	objekt.element.style.left = `${mapy.odsazeniX + objekt.x}px`; // odsazení - zajistí změnu souřadného systému
	objekt.element.style.top = `${mapy.odsazeniY + objekt.y}px`;
}


function ulozDoXY(objekt, x, y) // umístnění panáču na dané mapě 
{

	const pole_mapy = mapy.pole_mapy[mapy.mistnosti];
	for (let index_Radku = y; index_Radku < pole_mapy.length; index_Radku++)
	{
	    for (let index_Sloupce = x; index_Sloupce < pole_mapy[index_Radku].length; index_Sloupce++)
		{
			if (pole_mapy[index_Radku][index_Sloupce] == 0) {
				objekt.x = index_Radku * mapy.velikost_ctverecku_x + 1; // aby nebyl na hraně(1)
				objekt.y = index_Sloupce * mapy.velikost_ctverecku_y + 1;
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
    if (event.code === "ArrowLeft") {
        panacek.x -= panacek.dx; // o kolik se panáček pohne 
        let index_Sloupce = Math.floor(panacek.x / mapy.velikost_ctverecku_x); // index sloupce se rovná = výpočet pozice panáčka X / mapy- veliksot jednoho čtverečku na šířku (x)
        let index_Radku = Math.floor(panacek.y / mapy.velikost_ctverecku_y); // math.floor - "opatření" kdyby se velikost políčka x,y změnila (kdyby to nebyla 72px)
        if (mapy.pole_mapy[mapy.mistnosti] [index_Radku] [index_Sloupce] === 1) {
            panacek.x = (index_Sloupce + 1) * mapy.velikost_ctverecku_x + 1;  // jednička je tam proto - aby se o px posunul - a nebyl uplně u zdi
            console.log("Došlo ke srazka");
             //doraz ke steně - narazili jsme na stěnu  // sloupce +1 (protože se indexuje od 0 - aby tam bylo fyzicky 1)   -- > 
           
            } else {
            index_Radku = Math.floor((panacek.y + panacek.vyska) / mapy.velikost_ctverecku_y);
            if (mapy.pole_mapy[mapy.mistnosti] [index_Radku] [index_Sloupce] === 1)  {
                panacek.x += panacek.dx;
            }
        }
     } else if (event.code === "ArrowUp") {
        panacek.y -= panacek.dy;
        let index_Sloupce = Math.floor(panacek.x / mapy.velikost_ctverecku_x);
        let index_Radku = Math.floor(panacek.y / mapy.velikost_ctverecku_y);
        if (mapy.pole_mapy[mapy.mistnosti] [index_Radku] [index_Sloupce] === 1) 
            panacek.y = (index_Radku +1 ) * mapy.velikost_ctverecku_y + 1;
        else {
            index_Sloupce = Math.floor((panacek.x + panacek.sirka) / mapy.velikost_ctverecku_x);
            if (mapy.pole_mapy[mapy.mistnosti] [index_Radku] [index_Sloupce] === 1) {
                panacek.y += panacek.dy;
            }
        }
    
    } else if (event.code === "ArrowDown") {
        panacek.y += panacek.dy;
        let index_Sloupce = Math.floor (panacek.x / mapy.velikost_ctverecku_x);
        let index_Radku = Math.floor ((panacek.y + panacek.vyska) / mapy.velikost_ctverecku_y);

        if (mapy.pole_mapy[mapy.mistnosti][index_Radku] [index_Sloupce] === 1) {
            panacek.y = index_Radku * mapy.velikost_ctverecku_y - panacek.vyska - 1;
            console.log("Došlo ke srazka");
        } else {
            index_Sloupce = Math.floor ((panacek.x + panacek.sirka) / mapy.velikost_ctverecku_x);
            if (mapy.pole_mapy[mapy.mistnosti] [index_Radku] [index_Sloupce] === 1) {
                panacek.y -= panacek.dy;
            }
        }
    } else if (event.code === "ArrowRight") {
            panacek.x += panacek.dx;
            let index_Sloupce = Math.floor((panacek.x + panacek.sirka) / mapy.velikost_ctverecku_x);
            let index_Radku = Math.floor (panacek.y / mapy.velikost_ctverecku_y);
            if (mapy.pole_mapy [mapy.mistnosti] [index_Radku] [index_Sloupce] === 1) {
                panacek.x = index_Sloupce * mapy.velikost_ctverecku_x - panacek.sirka - 1;
                console.log("Došlo ke srazka");
            } else { 
                index_Radku = Math.floor((panacek.y + panacek.vyska) / mapy.velikost_ctverecku_y);
                if (mapy.pole_mapy[mapy.mistnosti][index_Radku][index_Sloupce] === 1) {
                    panacek.x -= panacek.dx;
                }
            }
    }
    umisti(panacek); // umístní toho panáčka do té stránky
}

    

ulozDoXY(panacek,1,1); // nastavíme si panáčka na určitou pozici 
document.addEventListener("keydown", posunPanacka);