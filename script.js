import RECIPES from "./data.js"

// console.log(RECIPES)
// MAIN
window.addEventListener('DOMContentLoaded', main)

function main() {
  console.log('everything is ready')

  // Sidenav
  handleSidenav()

  // Slideshow
  handleSlideshow()

  // How it works: accordion
  handleAccordion()
  
  // Generate cards from data
  generateData()
  
  // search
  handleSearch()

  // Detail Modal
  handleModal()


}

function handleSearch() {
  const searchBar = document.querySelector('.search-bar')
  searchBar.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(e.target.children.recipe.value)
    const searchRecipe = e.target.children.recipe.value.toLowerCase()

    const recipe = RECIPES.find((rec) => rec.title.toLowerCase() == searchRecipe)
    // console.log(recipe)

    const recipesWrapper = document.querySelector('.recipes-wrapper')
    if (recipe) {
      recipesWrapper.innerHTML = `
      <div class="recipe">
        <div class="recipe-thumbnail">
          <img src="${recipe.image}" alt="">
          <a href="#" class="link category">${recipe.category}</a>
        </div>
  
        <div class="recipe-detail">
          <div class="rating">
            ${getRating(recipe.rating)}
          </div>
          <h4 class="recipe-name">${recipe.title}</h4>
          <button class="btn" id="detailBtn" data-index="${recipe.id}">Show Detail</button>
  
        </div>
      </div>
      `
  
      handleModal()

    } else {
      recipesWrapper.innerHTML = `<p>No recipe found</p>`
    }
  })
}



function handleSidenav() {
  const menuBtn = document.querySelector('#menuBtn')
  menuBtn.addEventListener('click', () => {
    menuBtn.firstElementChild.classList.toggle('rotate')
    document.querySelector('#sidenav').classList.toggle('showSidenav')
  })
}


let index = 0
function handleSlideshow() {
  const slides = document.querySelectorAll('.slide')
  const dots = document.querySelectorAll('.dot')


  slides.forEach((slide) => {
    slide.style.display = 'none'
  })

  dots.forEach((dot) => {
    dot.classList.remove('dot-active')
  })


  index = index + 1
  if (index > slides.length) {
    index = 1
  }
  // console.log(index)

  slides[index - 1].style.display = "block"
  dots[index - 1].classList.add('dot-active')
  setTimeout(handleSlideshow, 2000)
}




function handleAccordion() {
  const accItemHeads = document.querySelectorAll('.accordion-head')
  accItemHeads.forEach((acc) => {
    acc.addEventListener('click', () => {
      acc.nextElementSibling.classList.toggle('show-accordion-body')
      acc.lastElementChild.classList.toggle('rotate')
    })
  })
}


function getRating(stars) {
  let ratingTextContent = ""
  let remainedStars = 5 - stars

  let counter = 0
  do {
    counter < stars ? (ratingTextContent += '<ion-icon name="star"></ion-icon>') : (ratingTextContent += '<ion-icon name="star-outline"></ion-icon>') 
    counter = counter + 1
  } while (counter < 5)

  // for (let i = 0; i < 5; i++) {
  //   if (i >= stars && i < 5) {
  //     ratingTextContent = ratingTextContent + '<ion-icon name="star-outline"></ion-icon>'
  //   }
  // }
  // for (let i = 0; i < remainedStars; i++) {
  // }

  return ratingTextContent

}


function generateData() {
  const recipeCards = RECIPES.map((recipe) => {
    return `
    <div class="recipe">
        <div class="recipe-thumbnail">
          <img src="${recipe.image}" alt="">
          <a href="#" class="link category">${recipe.category}</a>
        </div>

        <div class="recipe-detail">
          <div class="rating">
            ${getRating(recipe.rating)}
          </div>
          <h4 class="recipe-name">${recipe.title}</h4>
          <button class="btn" id="detailBtn" data-index="${recipe.id}">Show Detail</button>

        </div>
      </div>
    `
    
  })
  const recipeCardsText = recipeCards.join("")
  const recipesWrapper = document.querySelector('.recipes-wrapper')
  recipesWrapper.innerHTML = recipeCardsText
  // console.log(recipeCards)
}






function handleModal() {
  const detailBtns = document.querySelectorAll('#detailBtn')
  // console.log(detailBtns)
  detailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const modal = document.querySelector('.modal-wrapper')
      modal.classList.remove('hide')
      

      // console.log(btn.dataset.index)
      const index = parseInt(btn.dataset.index)

      modal.innerHTML = handleRecipeDetail(index)
      // modal.firstElementChild.classList.toggle('show-modal-container')
      handleTabbar()
      
      const closeBtn = document.querySelector('#closeBtn')
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hide')
      })
    })
  })
}


function getIngredients(ingredients) {
  let ingredientsTextContent = ""
  for (let i = 0; i < ingredients.length; i++) {
    ingredientsTextContent = ingredientsTextContent + `<li>${ingredients[i]}</li>`
  }
  return ingredientsTextContent
}




function handleRecipeDetail(index) {
  const recipe = RECIPES.find((rec) => rec.id == index)
  // console.log(recipe)
  return `
    <div class="modal-container">
      <div class="modal-overlay">
        <div class="modal-head">
          <h4>${recipe.title}</h4>

          <a href="#" class="link" id="closeBtn">
            <ion-icon name="close-circle"></ion-icon>
          </a>
        </div>

        <div class="modal-body">
          <div class="tabbar">
            <button class="btn tabbtn btn-active" data-tabid="description">Description</button>
            <button class="btn tabbtn" data-tabid="ingredient">Ingredients</button>
            <button class="btn tabbtn" data-tabid="direction">Directions</button>
          </div>

          <div class="tabbar-body">
            <section class="tab tab-active" id="description">
              <h3>Description</h3>
              <p>${recipe.descriptions}</p>
            </section>

            <section class="tab" id="ingredient">
              <h3>Ingredients</h3>
              <ul>
                ${getIngredients(recipe.ingredients)}
              </ul>
            </section>


            <section class="tab" id="direction">
              <h3>Directions</h3>
              <p>${recipe.directions}</p>
            </section>
          </div>

        </div>
      </div>
    </div>
  `

}





function handleTabbar() {
  const tabbar = document.querySelector('.tabbar')
  const tabbtns = document.querySelectorAll('.tabbtn')
  const tabs = document.querySelectorAll('.tab')
  

  tabbar.addEventListener('click', (e) => {
    const tabId = e.target.dataset.tabid
    
    tabs.forEach((tab) => {
      tab.classList.remove('tab-active')
    })

    document.getElementById(tabId).classList.add('tab-active')

    tabbtns.forEach((tabbtn) => {
      tabbtn.classList.remove('btn-active')
    })

    const tabbtn = e.target
    tabbtn.classList.add('btn-active')
  })

}