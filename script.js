// URL de la API de GitHub para obtener los repositorios del usuario
const apiUrl = 'https://api.github.com/users/cerotre/repos';

// Repositorios a excluir
const excludedRepositories = ['cerotre', 'cerotre.github.io'];

// Obtener el contenedor de proyectos
const projectsContainer = document.getElementById('projects');

// Realizar la solicitud a la API de GitHub
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Manipular los datos obtenidos y excluir los repositorios específicos
    const repositories = data
      .filter(repo => !excludedRepositories.includes(repo.name))
      .map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url
      }));

    // Generar el HTML para mostrar los repositorios
    const projectsHTML = repositories.map(repo => `
      <div class="project">
        <h2>${repo.name}</h2>
        <p>${repo.description || 'No hay descripción disponible.'}</p>
        <a href="${repo.url}" target="_blank">Ver en GitHub</a>
      </div>
    `).join('');

    // Agregar el HTML generado al contenedor de proyectos
    projectsContainer.innerHTML = projectsHTML;
  })
  .catch(error => {
    console.error(error);
    projectsContainer.innerHTML = 'Ha ocurrido un error al cargar los proyectos.';
  });
