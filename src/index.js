const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const form = document.querySelector(".add-toy-form")
let addToy = false
let divCollect = document.querySelector('#toy-collection')

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}




function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.innerText = "like"
  
  let deleteBtn = document.createElement('button')
  deleteBtn.setAttribute('class', 'delete-btn')
  deleteBtn.innerText = "Delete"
  

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(deleteBtn,h2, img, p, btn )
  divCollect.append(divCard)



  btn.addEventListener('click', (e) => {
    const data = { likes:  toy.likes += 1 };

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(newtoy => {
  
    p.innerText = `${newtoy.likes} Likes`
  })
  })



  deleteBtn.addEventListener('click', (event) => {
    console.log(toy.name)
    fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'DELETE',
      
    })
    .then(response => response.json())
    .then((params) => {
      divCard.remove()
    })
  })
};





getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  })
})


form.addEventListener("submit", (e) => {
  e.preventDefault();
  debugger

  let toyName = e.target.name.value 
  let toyImage = e.target.image.value
  
  console.log(toyName,toyImage)
  let data = {
    name: toyName,
    image: toyImage,
    likes: 0,
  }

  fetch(`http://localhost:3000/toys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then( (toyObject) => {
    renderToys(toyObject)
  })
})



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