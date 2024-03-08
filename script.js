const navbar = document.querySelector(".Navbar");
const currUser = localStorage.getItem("currUser");

if (!currUser) {
  window.location.href = "/home.html";
}
console.log(currUser);
navbar.innerHTML = `
            <h1>Recipe App</h1>
            <form>
                <input type="text" placeholder="Enter ingrediants or recipe name" class="searchBox">
                <button type="submit" class="searchBtn"  id="searchByIngredBtn"><i class="fa-solid fa-magnifying-glass"></i></button>
               
            </form>
            <div class="anchorTag"><a href="/home.html">Logout</a></div>
            <button type="button" class="Favbtn" onclick="showRecipe()">FavRecipe</button>
             <h4>${currUser}</h4>
          `;

const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");

const imgurl = "/3814348.jpg";

const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const NameAPI = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const CategoryAPI = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const IngredientAPI = "https://www.themealdb.com/api/json/v1/1/list.php?i=";
const FirstAPI = "https://www.themealdb.com/api/json/v1/1/search.php?f=";

recipeContainer.innerHTML = `<h2>Search your Recipe by Ingredient</h2><h2>Search by Name</h2><h2>Search by Category or FirstChar</h2> `;
const displayData = async (item) => {
  recipeContainer.innerHTML = `<h2> Your Recipe is being fetched by Name</h2>`;
  try {
    let data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
    );
    //if(data) console.log("name");
    if (!data) {
      console.log("name");
      data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=${item}`
      );
    }
    // if(data) console.log("ingred");
    if (!data) {
      console.log("ing");
      data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`
      );
      //console.log("ingred");
    }
    // if(data) console.log("Cate");
    if (!data) {
      console.log("categ");
      data = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${item[0]}`
      );
    }

    const jsondata = await data.json();
    let html = "";
    console.log(jsondata);
    formCartOfRecipe(jsondata.meals, 0);
  } catch (error) {
    recipeContainer.innerHTML = `<img src="${imgurl}" alt="notfound" height="400px" width="400px">`;
  }
};
const formCartOfRecipe = (data, flag) => {
  try {
    recipeContainer.innerHTML = "";
    data.map((item, ind) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `<img src="${item.strMealThumb}" >
    <h3>${item.strMeal}</h3>
    <p><span>${item.strArea}</span></p>
    <p>Belongs to <span>${item.strCategory}</span> Category</p>
    `;
      const button = document.createElement("button");
      const favRecipeBtn = document.createElement("button");
      favRecipeBtn.classList.add("favBtn");
      button.textContent = "view Recipe";
      recipeDiv.appendChild(button);
      button.addEventListener("click", () => {
        openRecipePopup(item);
      });
      if (flag == 0) {
        favRecipeBtn.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        recipeDiv.appendChild(favRecipeBtn);
        favRecipeBtn.addEventListener("click", (e) => {
          storeFavRecipe(item);
        });
      }
      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = `<img src="${imgurl}" alt="notfound" height="400px" width="400px">`;
  }
};
const fetchIngredents = (meal) => {
  let IngredintsList = "";
  for (let i = 1; i <= 20; i++) {
    const Ingredient = meal[`strIngredient${i}`];
    if (Ingredient) {
      const measure = meal[`strMeasure${i}`];
      IngredintsList += `<li>${measure} ${Ingredient}</li>`;
    } else break;
  }
  return IngredintsList;
};
const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
      <h2 class="recipeName">${meal.strMeal}</h2>
      <h3>Ingredients:</h3>
      <ul class="IngredientList">${fetchIngredents(meal)}</ul>
      <div>
       <h3>Instructions:</h3>
       <p class="recipeInstructions">${meal.strInstructions}</p>
      `;
  recipeDetailsContent.parentElement.style.display = "block";
};
recipeCloseBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  if (searchInput) displayData(searchInput);
  else recipeContainer.innerHTML = `<h2> Type the Recipe Name</h2>`;
});

const showRecipe = () => {
  const user = localStorage.getItem("currUser");
  console.log(user);
  const UserFavRecipe = JSON.parse(localStorage.getItem("UserFavRecipe"));
  const favRecipe = UserFavRecipe[user];
  console.log(favRecipe);
  formCartOfRecipe(favRecipe, 1);
};
const storeFavRecipe = (recipe) => {
  const name = localStorage.getItem("currUser");
  let UserFavRecipe = JSON.parse(localStorage.getItem("UserFavRecipe")) || {};
  // Ensure UserFavRecipe[name] is an array
  UserFavRecipe[name] = UserFavRecipe[name] || [];
  UserFavRecipe[name].push(recipe);
  localStorage.setItem("UserFavRecipe", JSON.stringify(UserFavRecipe));
};
