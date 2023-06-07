class MovieDisplay {
    constructor(apiUrl, containerId) {
      this.apiUrl = apiUrl;
      this.container = document.getElementById(containerId);
    }
  
    // Méthode pour récupérer les données de l'API
    fetchData() {
      fetch(this.apiUrl)
        .then(response => response.json())
        .then(data => this.displayMovies(data.results))
        .catch(error => console.error(error));
    }
  
    // Méthode pour afficher les films dans le conteneur spécifié
    displayMovies(movies) {
      movies.forEach(movie => {
          const description = movie.overview;
          const image = movie.poster_path;
          const title = movie.original_title;
            if (description!= '') {
                
            
          // Créer le conteneur du film
          const movieContainer = document.createElement('div');
          movieContainer.classList.add('container');
  
          // Créer l'élément de l'image
          const imageElement = document.createElement('img');
          imageElement.crossOrigin = 'anonymous';
          imageElement.src = 'https://image.tmdb.org/t/p/w400' + image;
          imageElement.alt = title;
          
          imageElement.classList.add('affiche');

          // crea de la ramdom colors
           const color = new ColorThief();
          	imageElement.addEventListener('load', () => {
            const dominant = color.getColor(imageElement);
            movieContainer.style.backgroundColor = `rgb(${dominant[0]}, ${dominant[1]}, ${dominant[2]})`;

  
          // Créer la div de description
          const descriptionDiv = document.createElement('div');
          descriptionDiv.classList.add('description');
  
          // Créer le titre
          const titleElement = document.createElement('h1');
          titleElement.classList.add('title');
          titleElement.textContent = title;
  
          // Créer le paragraphe de description
          const texteElement = document.createElement('p');
          texteElement.classList.add('texte');
          texteElement.textContent = description;
  
          // Ajouter le titre et le paragraphe à la div de description
          descriptionDiv.appendChild(titleElement);
          descriptionDiv.appendChild(texteElement);
  
          // Ajouter l'image et la div de description au conteneur du film
          movieContainer.appendChild(imageElement);
          movieContainer.appendChild(descriptionDiv);
  
          // Ajouter le conteneur du film au conteneur principal
          //this.container.appendChild(movieContainer);
          this.container.appendChild(movieContainer);
          });
        }
        }
      );
    }
  }
  
  // URL de l'API
  const apiUrl = 'https://api.themoviedb.org/3/movie/upcoming?language=fr-FR&api_key=2e118d87fb352fb0fd2dc73f8959b280';
  // ID du conteneur principal dans le HTML
  const containerId ='film';
  
  // Création de l'instance de la classe MovieDisplay
  const movieDisplay = new MovieDisplay(apiUrl, containerId);
  // Appel de la méthode pour récupérer et afficher les données
  movieDisplay.fetchData();