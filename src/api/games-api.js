const apiURL = 'https://www.mmobomb.com/api1/games'

fetch(apiURL)
        .then(response => response.json()) 
        .then(data => console.log(data))
        .catch(error => console.log('Error, error'))
