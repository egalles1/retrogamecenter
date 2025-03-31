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
              {
                  id: 1,
                  nom: "Super Mario Bros",
                  consola: "NES",
                  any: 1985,
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
                  consola: "Arcade",
                  any: 1991,
                  descripcio: "Famosíssim joc de lluita.",
                  url: "https://exemple.com/streetfighter",
                  categoria: "lluita",
                  monedes: "100",
                  dificultat: "facil",
                  vegadesJugat: "20",
              }
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





