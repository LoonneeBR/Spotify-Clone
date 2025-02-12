// Seleciona o input de pesquisa pelo ID 'search-input'
const searchInput = document.getElementById('search-input');

// Seleciona o elemento de resultados de artistas pelo ID 'result-artist'
const resultsArtist = document.getElementById('result-artist');

// Seleciona o elemento de resultados de playlists pelo ID 'result-playlists'
const resultPlaylist = document.getElementById('result-playlists');

// Função que faz a requisição para a API com o termo de busca (searchTerm)
function requestApi(searchTerm) {
    // Define a URL da API, usando o termo de busca para filtrar artistas pelo nome
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    
    // Faz a requisição para a URL definida
    fetch(url)
        // Converte a resposta para JSON
        .then((response) => response.json())
        // Chama a função que exibe os resultados, passando os dados da API
        .then((result) => displayResults(result));
}

// Função que exibe os resultados da busca
function displayResults(result) {
    // Oculta a seção de playlists
    resultPlaylist.classList.add('hidden');
    
    // Seleciona o nome do artista e a imagem pelo ID dos elementos
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');
    
    // Percorre os resultados recebidos da API
    result.forEach(element => {
        // Define o nome do artista e a URL da imagem do artista nos elementos de HTML
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    // Exibe a seção de resultados de artistas
    resultsArtist.classList.remove('hidden');
}

// Adiciona um evento que escuta mudanças no input de pesquisa (quando o usuário digita)
document.addEventListener('input', function() {
    // Obtém o valor digitado pelo usuário no input de pesquisa e converte para letras minúsculas
    const searchTerm = searchInput.value.toLowerCase();
    
    // Se o campo de pesquisa estiver vazio
    if (searchTerm === '') {
        // Oculta a seção de playlists
        resultPlaylist.classList.add('hidden');
        // Exibe a seção de resultados de artistas
        resultsArtist.classList.remove('hidden');
        return;
    }

    // Faz a requisição à API com o termo de pesquisa
    requestApi(searchTerm);
});
