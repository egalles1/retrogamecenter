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
                  monedes: 100 // Agregamos sistema de monedas
                  ultima_partida: "2025-03-28T12:30:00Z"
              }
          ],
          jocs: [
<<<<<<< HEAD
              {
                  id: 1,
                  nom: "Super Mario Bros",
                  descripcio: "Clàssic joc de plataformes de Nintendo.",
                  url: "https://exemple.com/mario",
                  categoria: "plataformes",
                  monedes: "2000",
                  dificultat: "facil",
                  vegadesJugat: "20",
              },
              {
                  id: 2,
                  nom: "Street Fighter II",
                  descripcio: "Famosíssim joc de lluita.",
                  url: "https://exemple.com/streetfighter",
                  categoria: "lluita",
                  monedes: "100",
                  dificultat: "facil",
                  vegadesJugat: "20",
              }
=======
            {
                id: 1,
                nom: "Penjat",
                creadors: "Alex, Alejandro",
                mini-descripcio:"El joc del penjat és un joc de paraules on un jugador ha d'endevinar una paraula lletra per lletra abans que es completi el dibuix d'un penjat." ,
                descripcio: "El joc del penjat és un clàssic joc de paraules on un jugador intenta endevinar una paraula secreta abans d'esgotar un nombre limitat d'intents. Un jugador escull una paraula i l'altre ha d'endevinar-la suggerint lletres. Si una lletra forma part de la paraula, es revela la seva posició; si no, es dibuixa una part del penjat. El joc acaba quan s'endevina la paraula o quan el dibuix del penjat es completa. És un joc senzill però entretingut que ajuda a millorar el vocabulari i la memòria.",
                url: "/Penjat/index.html",
                categoria: "trencaclosques"
              },
              {
                id: "2",
                nom: "NOM",
                creadors: "Creadors",
                mini-descripcio:"Descripcio de 1 linea o 2 aprox" ,
                Descripcio: "Descripcio completa del joc y mecaniques",
                url : "/nom del joc/index.html",
                categoria: "la categoria del joc"
              },
              {
                id: "3",
                nom: "NOM",
                creadors: "Creadors",
                mini-descripcio:"Descripcio de 1 linea o 2 aprox" ,
                Descripcio: "Descripcio completa del joc y mecaniques",
                url : "/nom del joc/index.html",
                categoria: "la categoria del joc"
              },
              {
                id: "4",
                nom: "NOM",
                creadors: "Creadors",
                mini-descripcio:"Descripcio de 1 linea o 2 aprox" ,
                Descripcio: "Descripcio completa del joc y mecaniques",
                url : "/nom del joc/index.html",
                categoria: "la categoria del joc"
              {
                id: "5",
                nom: "NOM",
                creadors: "Creadors",
                mini-descripcio:"Descripcio de 1 linea o 2 aprox" ,
                Descripcio: "Descripcio completa del joc y mecaniques",
                url : "/nom del joc/index.html",
                categoria: "la categoria del joc"
              },
>>>>>>> 278cedfd5b225c4be6f98cea7047c14f5b3d36d7
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





