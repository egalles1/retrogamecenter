const inicialitzarDades = () => {
  if (!localStorage.getItem("dades")) {
      const dadesInicials = {
          usuaris: [
              {
                  id: 1,
                  nom: "Joan",
                  email: "joan@example.com",
                  password: "hashed_password",
                  data_registre: "2025-03-28T12:00:00Z",
                  favorits: [2, 5],  
                  estat: "actiu",
                  monedes: 100, // Agregamos sistema de monedas
                  ultima_partida: "2025-03-28T12:30:00Z"
              }
          ],
          jocs: [
            {
                id: 1,
                nom: "Black Jack",
                creadors: "Enoch, Unai",
                minidescripcio:"El joc del penjat és un joc de paraules on un jugador ha d'endevinar una paraula lletra per lletra abans que es completi el dibuix d'un penjat." ,
                descripcio: "El joc del penjat és un clàssic joc de paraules on un jugador intenta endevinar una paraula secreta abans d'esgotar un nombre limitat d'intents. Un jugador escull una paraula i l'altre ha d'endevinar-la suggerint lletres. Si una lletra forma part de la paraula, es revela la seva posició; si no, es dibuixa una part del penjat. El joc acaba quan s'endevina la paraula o quan el dibuix del penjat es completa. És un joc senzill però entretingut que ajuda a millorar el vocabulari i la memòria.",
                url: "/Penjat/index.html",
                categoria: "trencaclosques"
              },
              {
                id: 2,
                nom: "Pedra Paper Tisores",
                creadors: "Hugo Poblaciones",
                minidescripcio:"Es un joc de fer pedra paper tissora contra la maquina." ,
                Descripcio: "En cada ronda, deurias  escogir la teva jugada (pedra, paper o tisora) y decidir cuántas monedes apostar.",
                url : "/pedrapapertisora.html",
                categoria: "joc de sort"
              },
              {
                id: 3,
                nom: "Penjat",
                creadors: "Alex, Alejandro",
                minidescripcio:"El joc del penjat és un joc de paraules on un jugador ha d'endevinar una paraula lletra per lletra abans que es completi el dibuix d'un penjat." ,
                Descripcio: "El joc del penjat és un clàssic joc de paraules on un jugador intenta endevinar una paraula secreta abans d'esgotar un nombre limitat d'intents. Un jugador escull una paraula i l'altre ha d'endevinar-la suggerint lletres. Si una lletra forma part de la paraula, es revela la seva posició; si no, es dibuixa una part del penjat. El joc acaba quan s'endevina la paraula o quan el dibuix del penjat es completa. És un joc senzill però entretingut que ajuda a millorar el vocabulari i la memòria.",
                url : "/nom del joc/index.html",
                categoria: "la categoria del joc"
              },
              {
                id: 4,
                nom: "Rompecabezas",
                creadors: "Albert MP",
                minidescripcio:"Zombie Apocalypse Clicker és un joc on mates zombis clicant. Cada clic gasta energia, però es regenera sola. Com més zombis elimines, més millores desbloqueges: armes, torres i fins i tot làsers. A vegades apareix un cap... si el vencis, guanyes més energia i continues rebentant-ho tot." ,
                Descripcio: "Un joc de clics frenètic on has d'eliminar zombis, millorar el teu arsenal i sobreviure a caps cada vegada més forts. Clica, millora i domina l'apocalipsi!",
                url : "/cliker/Index.html",
                categoria: "cliker"
              },
              {
                id: 5,
                nom: "Tres en ratlla",
                creadors: "Pol de la Viuda",
                minidescripcio:"Joc clasic de tres en ratlla" ,
                Descripcio: "Descripcio completa del joc y mecaniques",
                url : "/Tres en ratlla/index.html",
                categoria: "Joc de estrategia"
              },
              {
                id: 6,
                nom: "Camells",
                creadors: "Jordi",
                minidescripcio:"Descripcio de 1 linea o 2 aprox" ,
                Descripcio: "Descripcio completa del joc y mecaniques",
                url : "/nom del joc/index.html",
                categoria: "la categoria del joc"
              },
              {
                id: 7,
                nom: "Memory",
                creadors: "Pol",
                minidescripcio:"Descripcio de 1 linea o 2 aprox" ,
                Descripcio: "Descripcio completa del joc y mecaniques",
                url : "/nom del joc/index.html",
                categoria: "la categoria del joc"
              },
          ],
          partides: [
            {
                id: 1,
                idUsuari: 1,
                idJoc: 2,
                data: "2025-03-28T12:30:00Z",
                monedesApostades: 50,
                resultat: "victoria",
                tempsJugat: "10min",
                recompensa: 100, 
            }
          ]    
      };
      localStorage.setItem("dades", JSON.stringify(dadesInicials));
  }
  
};

// Llamamos a la función para inicializar
inicialitzarDades();





