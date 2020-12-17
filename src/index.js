let addToy = false;

const newToyForm = document.querySelector("form.add-toy-form");
const listings = document.querySelector("#toy-collection")

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

function renderOneToy(toyObject) {
/****************** DOM Elements ******************/

const cardDiv = document.createElement("div");
const newH2 = document.createElement("h2");
const img = document.createElement("img");
const numOfLikesPtag = document.createElement("p");
const likeButton = document.createElement("button");
let divCollect = document.querySelector('#toy-collection')

/****************** DOM attributes ******************/
cardDiv.setAttribute('class', 'card')
img.setAttribute('class', 'toy-avator')
likeButton.setAttribute('class', 'like-btn')
newH2.textContent = toyObject.name;
img.src = toyObject.image;
likeButton.dataset.buttonType = "upvote";
likeButton.textContent = "👍";
likeButton.dataset.id = toyObject.id;
numOfLikesPtag.textContent = toyObject.likes



cardDiv.append(newH2, img, numOfLikesPtag, likeButton)
divCollect.append(cardDiv);
}

/******************* Fetch Array  ******************/
function getToysList() {
  return fetch('http://localhost:3000/toys')
  .then(res => res.json())
}

getToysList().then(toys => {
  toys.forEach(toy => {
  renderOneToy(toy)
  })
})



/******************* Add a New Toy  ******************/

newToyForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const newToyObject = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0,
  };

  // make a POST /posts request
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newToyObject),
  })
    .then((response) => response.json())
    .then((actualNewToyFromTheServer) => {
      console.log("Success:", actualNewToyFromTheServer);
      // and slap the new post on the DOM
      renderOneToy(actualNewToyFromTheServer);
    });

  event.target.reset();
});

/******************* Increase Toy's Likes ******************/


listings.addEventListener("click", function(event){
  // event.target.dataset.buttonType === "upvote"
  if (event.target.matches(".like-btn")){ 
    //increase the likes

    // make PATCH /posts/100 fetch request
    const likesPtag = event.target.previousElementSibling.innerText
    //console.log(likesPtag);
    // const likesPtag = postDiv.querySelector(".like-btn");
    const numOfLikes = parseInt(likesPtag) + 1;

    const id = event.target.dataset.id;

    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: numOfLikes,
      }),
    })
      .then((res) => res.json())
      .then((updatedPost) => {
        console.log(updatedPost);
        // pessimists!
        // e.target.previousElementSibling.innerText = `${more} likes`;
        likesPtag = updatedPost.likes;
      });

  }

})