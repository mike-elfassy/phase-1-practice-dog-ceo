const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

const imgContainerNode = document.querySelector('div#dog-image-container')
const ulContainerNode = document.querySelector('ul#dog-breeds')

// Print images
fetch(imgUrl)
    .then(resp => resp.json())
    .then(json => json.message.forEach(element =>
            {
                let imgNode = document.createElement('img')
                imgNode.setAttribute('src', element)
                imgNode.height = '100'
                imgContainerNode.appendChild(imgNode)
            }
    ))

// Pring all dog breeds
fetch(breedUrl)
    .then(resp => resp.json())
    .then(json => {

        for (const key in json.message) {
            // Add breed name to list
            let breedItem = document.createElement('li')
            breedItem.id = key
            breedItem.textContent = key
            breedItem.style.color = 'black'
            breedItem.setAttribute('onClick','event.target.style.color = "red"')
            breedItem.setAttribute('taxa','parent')

            // breedItem.hidden = true
            
            // Check for sub-breed
            if (json.message[key].length !== 0) {
                for (const item in json.message[key]) {
                    let subList = document.createElement('ul')
                    let subBreedItem = document.createElement('li')

                    subBreedItem.id = json.message[key][item]
                    subBreedItem.textContent = json.message[key][item]
                    subBreedItem.style.color = 'black'

                    subList.appendChild(subBreedItem)
                    breedItem.appendChild(subList)
                }
            }
            ulContainerNode.appendChild(breedItem)
        }   
    })

    // Add event listeners
    const selectBox = document.querySelector('body select#breed-dropdown')
    selectBox.addEventListener('change', (event) => filterBreeds(event.target.value))

    // Filter list
    function filterBreeds(firstletter) {
        let allBreeds = document.querySelectorAll('body ul#dog-breeds li[taxa=parent]')
        allBreeds.forEach((element) => {
            if (firstletter === '') {element.hidden = false}
            else if (element.textContent[0] === firstletter) {element.hidden = false}
            else (element.hidden = true)
        })
    }