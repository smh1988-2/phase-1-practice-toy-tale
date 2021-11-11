let addToy = false;
const BASE_URL = "http://localhost:3000/toys";

fetch(BASE_URL)
  .then((resp) => resp.json())
  .then((toys) => toys.forEach(renderToys));

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderToys(toy) {
  const toyCollection = document.getElementById("toy-collection");
  const toyCard = document.createElement("div");
  toyCard.className = "card";

  const toyName = document.createElement("h2");
  const toyImage = document.createElement("img");
  const toyButton = document.createElement("button");
  const toyLikes = document.createElement("p");

  toyName.textContent = `${toy.name}`;
  toyImage.src = `${toy.image}`;
  toyImage.className = "toy-avatar";
  toyButton.textContent = `Like <3`;
  toyButton.className = "like-btn";
  toyLikes.textContent = `${toy.likes} Likes`;

  toyButton.addEventListener("click", (e) => likesUpdater());

  toyCard.append(toyName, toyImage, toyButton, toyLikes);
  toyCollection.appendChild(toyCard);

  function likesUpdater() {
    console.log(toy.likes);
    toy.likes = toy.likes + 1;
    console.log(toy.likes);

    fetch(BASE_URL + `/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toy),
    });
    toyLikes.textContent = `${toy.likes} Likes`;
  }
}

let form = document.getElementById("add-toy-form");
form.addEventListener("submit", (e) => addNewToy(e));

function addNewToy(e) {
  e.preventDefault();
  newToyName = e.target[0].value;
  newToyImg = e.target[1].value;
  form.reset();

  let newToyObject = {
    name: `${newToyName}`,
    image: `${newToyImg}`,
    likes: 0,
  };
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${newToyName}`,
      image: `${newToyImg}`,
      likes: 0,
    }),
  });
  console.log(e);
  renderToys(newToyObject);
}
