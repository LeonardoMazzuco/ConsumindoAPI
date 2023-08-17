document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchInput.addEventListener('input', handleAutocomplete);
    searchButton.addEventListener('click', searchCharacter);
});

async function handleAutocomplete() {
    const searchInput = document.getElementById('searchInput');
    const characterNamesList = document.getElementById('characterNames');
    const inputValue = searchInput.value.toLowerCase();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://hp-api.onrender.com/api/characters', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            const availableNames = data.map(character => character.name);

            const filteredNames = availableNames.filter(name =>
                name.toLowerCase().startsWith(inputValue)
            );

            characterNamesList.innerHTML = '';
            filteredNames.forEach(name => {
                const option = document.createElement('option');
                option.value = name;
                characterNamesList.appendChild(option);
            });
        } else {
            console.error('Error fetching character names:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
    };

    xhr.send();
}

function searchCharacter() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://hp-api.onrender.com/api/characters', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);

            const characterInfoContainer = document.getElementById('characterInfo');
            characterInfoContainer.style.display = 'none';

            const matchingCharacters = data.filter(character =>
                character.name.toLowerCase() === searchInput
            );

            if (matchingCharacters.length > 0) {
                const character = matchingCharacters[0];
                const characterName = document.getElementById('characterName');
                const characterImage = document.getElementById('characterImage');
                const characterHouse = document.getElementById('characterHouse');
                const characterSpecies = document.getElementById('characterSpecies');
                const characterGender = document.getElementById('characterGender');

                characterName.textContent = character.name;
                characterImage.src = character.image || '';
                characterHouse.textContent = `Casa: ${character.house}`;
                characterSpecies.textContent = `Espécie: ${character.species}`;
                characterGender.textContent = `Gênero: ${character.gender}`;

                characterInfoContainer.style.display = 'block';
            } else {
                console.log('Personagem não encontrado.');
            }
        } else {
            console.error('Erro ao buscar lista de personagens:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Request failed');
    };

    xhr.send();
}






