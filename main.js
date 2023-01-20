





// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    const BASE_URL = "https://resource-ghibli-api.onrender.com/films"
    fetch(BASE_URL)
        .then((response) => response.json())
        .then((json) => {
            // Adds movie titles to select element
            json.forEach(element => {
                // create option element
                const option = document.createElement("option");
                // add title to option text
                option.innerText = element.title;
                option.setAttribute("value", element.title);
                option.setAttribute("id", element.id)
                const select = document.querySelector("select");
                select.append(option);
                // console.log(element);
            
                // console.log(element.title);
                // end adding movies to select element
                
            });
            // This content should change each time the user choose a new option in the dropdown list. 
            const select = document.querySelector("select")
                // console.log(select)
           
            // An h3 with the movie's title 
            const pYear = document.createElement("p");
      
            // A p with the movie's release year. 
            const pDesc = document.createElement("p");
            // A p with the description of the movie.
          
            const h3 = document.createElement("h3");
            
           console.log(h3.textContent.length)
            // display info section
            select.addEventListener("change", (event) => {
                event.preventDefault();
                  const displayInfo = document.querySelector("#display-info");
                // console.log(event.target.value) 
                h3.innerText = event.target.value;
                /** 
Loop through select.
Element of select
Return the id of the element whose id matches the target value.
 */let urlId = "";

for (const el of select) {
    if (h3.innerText === el.value) {
       urlId = el.id
    //    console.log(urlId)
}
}
console.log(urlId)


                displayInfo.append(h3);
                // movie title
                displayInfo.appendChild(pYear);
                displayInfo.appendChild(pDesc)
                console.log(h3);
                //using the id, we can perform fetch  using base_url + id and display the year within pYear and the description within pDesc.
                fetch(`${BASE_URL}/${urlId}`)
                .then((response) => response.json())
                .then((json) => {
                    pYear.textContent = json.release_date
                    pDesc.textContent = json.description
                    
                    
                })


            })
            

            // console.log(json);
        })
        .catch((error) => {
         
            console.log(error)
        })



// function getTitle(id) {
//     let result = "";
// fetch(`${BASE_URL}/${id}`)
// .then((response) => response.json())
// .then((json) => {
//     // return json.title;
//     result = json.title;
//     // console.log(result);
// })
//  return result;
// }
const reviewSubmitButton = document.querySelector(".submit")
console.log(reviewSubmitButton)


reviewSubmitButton.addEventListener("click", (event) => { 
    // Error handling:  If the user tries to make a review when no movie is selected
    const select = document.querySelector("select")
    event.preventDefault();
   if (!select.value) {
    alert("Please select a movie first")
   } else {
    const reviewLi = document.createElement("li")
    const userInput = document.querySelector("form input[type='text']").value
    console.log(userInput)
    reviewLi.innerHTML = `<strong>${document.querySelector("#display-info h3").textContent}: </strong>${userInput}`;
    console.log(reviewLi)
    const ul = document.querySelector("ul");
    ul.append(reviewLi);
    const form = document.querySelector("form")
    form.reset();
} 

})
// when clicked should empty the ul where the reviews were being populated.
const resetReviewsButton = document.querySelector("#reset-reviews");

console.log(resetReviewsButton)
resetReviewsButton.addEventListener("click", (event) => {
const ul = document.querySelector("ul")
ul.innerHTML = "";

})
// getTitle("2baf70d1-42bb-4437-b551-e5fed5a87abe")

// function linkFriendly(string) {
//     return string.replaceAll(" ","%20")
// }

const showPeopleButton = document.querySelector("button#show-people")
console.log(showPeopleButton)
showPeopleButton.addEventListener("click", (event) => {
  

    let urlId = "";
    const select = document.querySelector("select")
    const h3 = document.querySelector("h3")
for (const el of select) {
    if (h3.innerText === el.value) {
       urlId = el.id
    //    console.log(urlId)
} 
}


// I believe the reason the last test isn't passing is because of a scope issue I haven't figured out yet 

//fetch("https://resource-ghibli-api.onrender.com/films/2baf70d1-42bb-4437-b551-e5fed5a87abe/people", requestOptions)
//.then(response => response.text())
//.then(result => console.log(result))
//.catch(error => console.log('error', error));
const ol = document.querySelector("ol")
fetch(`https://resource-ghibli-api.onrender.com/films/${urlId}/people/`)
.then((response) => response.json())
.then((json) => {
   for (const element of json) {
    console.log(element)
    const select = document.querySelector("select") 
    const li = document.createElement("li");
    li.textContent = element.name;
    ol.append(li)
    // for (const option of select) {

    // }
   
   }


   

    // 
    // for (let i = 0; i < json[0].length; i++) {
    //     if (json[0[i]].id == urlId) {
    //         return json[0[i]].id
    //     }
    //     //[0]
    // }

console.log(json.length)
    
}).catch(error => console.log(error))

}) 


 // Add code you want to run on page load here
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
