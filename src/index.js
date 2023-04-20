const dogBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")

const createNewDog = dogObj => {
    const newDogSpan = document.createElement("span")
    newDogSpan.textContent = dogObj.name
    newDogSpan.addEventListener("click", () => {
        renderDog(dogObj)
    })
    dogBar.append(newDogSpan)
}

const dogToggle = (event, dogObj) => {
    event.target.textContent === "Good Dog!" ? event.target.textContent = "Bad Dog!":event.target.textContent = "Good Dog!"

    fetch(`http://localhost:3000/pups/${dogObj.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"isGoodDog": event.target.textContent})
    })
}

const renderDog = dogObj => {
    const dogButton = document.createElement("button")
    dogInfo.innerHTML = `<img src=${dogObj.image}>
    <h2>${dogObj.name}</h2>`
    dogObj.isGoodDog ? dogButton.textContent = "Good Dog!": dogButton.textContent = "Bad Dog!"

    dogButton.addEventListener("click", (event) => dogToggle(event, dogObj))
    dogInfo.appendChild(dogButton)
}

fetch("http://localhost:3000/pups")
.then(resp => resp.json())
.then(dogs => {
    dogs.forEach(dog => {
        createNewDog(dog)
    });
    renderDog(dogs[0])
})