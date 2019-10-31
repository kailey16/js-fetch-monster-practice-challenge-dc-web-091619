document.addEventListener("DOMContentLoaded", () => {
  // add submit event listener to the form
  const form = document.getElementById("monster-form")
  form.addEventListener("submit", submittedMonster)

  // add left arrow button listner
  document.querySelector("#back").addEventListener("click", pageDown);
  // add right arrow button listner
  document.querySelector("#forward").addEventListener("click", pageUp);

  // loads monsters
  eachPage(page)
})


const apiurl = "http://localhost:3000/monsters";
let page = 1;

function eachPage(pagenum) {
  fetch(apiurl + `/?_limit=50&_page=${pagenum}`)
  .then(response => response.json())
  .then(data => {
    container().innerHTML = "";
    data.forEach((monster) => addMonster(monster))
  })
}


function container() {
  return document.getElementById("monster-container")
}


// make div for each monster with h2,h4,p
function addMonster(monster) {
  // create div for monster and append to conatainer
  const monsterDiv = document.createElement("div")
  monsterDiv.classList.add("each-monster")
  container().append(monsterDiv)
  // add tags
  const h2Tag = document.createElement("h2")
  const h4Tag = document.createElement("h4")
  const pTag = document.createElement("p")
  // append childs
  monsterDiv.append(h2Tag, h4Tag, pTag)
  // adding values into the tags
  h2Tag.innerText = `Name: ${monster.name}`
  h4Tag.innerText = `Age: ${monster.age}`
  pTag.innerText = `Description: ${monster.description}`
}


function submittedMonster(event) {
  event.preventDefault()
  const formTag = event.target
  // grabbing values from the form
  const nameInput = document.getElementsByClassName("name-input")[0].value
  const ageInput = document.getElementsByClassName("age-input")[0].value
  const descriptionInput = document.getElementsByClassName("description-input")[0].value
  formTag.reset()

  // fetch post request
  fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: nameInput,
      age: ageInput,
      description: descriptionInput
    })
  })
  .then(response => response.json())
  .then(data => addMonster(data))
}


function pageDown() {
  if (page <= 1) {
    alert("You are on the first page.")
  } else {
  page--;
  eachPage(page);}
}

var monsterArray;
fetch(apiurl)
.then(response => response.json())
.then(data => {
  monsterArray = Array.prototype.slice.call(data)})

function pageUp() {
  const pagenumTotal = Math.floor(monsterArray.length/50) + 1
  if (page >= pagenumTotal) {
    alert("You are on the last page.")
  } else {
  page++;
  eachPage(page);}
}