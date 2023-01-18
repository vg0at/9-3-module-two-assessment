





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    const BASE_URL = "https://resource-ghibli-api.onrender.com/films"
    fetch(BASE_URL)
        .then((response) => response.json())
        .then((json) => {
            // Adds movie titles to select element
            json.forEach(element => {
                const option = document.createElement("option");
                option.textContent = element.title;
                option.setAttribute("value", element.id);
                const titles = document.querySelector("#titles");
                titles.append(option)
                console.log(element.title);
            });// end adding movies to select element
            
            console.log(json);
        })
        .catch((error) => {
            console.log(error)
        })
// .then((response) => {
//     response.json
// })
 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
