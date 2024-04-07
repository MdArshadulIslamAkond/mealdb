const searchFood = () => {
  const searchField = document.getElementById("Search-field");
  const searchText = searchField.value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  const noSearch = document.getElementById("no-search");
  const p = document.createElement("p");
  p.classList.add("text-center");
  p.style.color = "red";
  if (searchText == "") {
    p.innerText = "*Type food's name first!";
    noSearch.appendChild(p);
    console.log(noSearch);
  } else {
    // console.log(noSearch.lastElementChild.innerText);
    if (noSearch.lastElementChild.innerText == "*Type food's name first!") {
      noSearch.lastElementChild.innerText = "";
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => displaySearchResult(data.meals));
  }
};
const displaySearchResult = (meals) => {
  const searchResult = document.getElementById("search-result");
  //   searchResult.addEventListener("click", (event) => {
  //     const target = event.target;
  //     console.log(target);
  //   });
  searchResult.innerText = "";
  meals.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div onclick="loadMealDetail(${element.idMeal})" class="card">
        <img src="${element.strMealThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
         <h5 class="card-title">${element.strMeal}</h5>
         <p class="card-text">
            ${element.strInstructions.slice(0, 200)}
         </p>
        </div>
    </div>`;
    searchResult.appendChild(div);
    // console.log(element.strMeal);
  });
  console.log(meals);
};
const loadMealDetail = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  //   console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetail(data.meals[0]));
};
const displayMealDetail = (meal) => {
  console.log(meal);
  const mailDetail = document.getElementById("meal-detail");
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
        <div class="card-body">
         <h5 class="card-title">${meal.strMeal}</h5>
         <p class="card-text">
            ${meal.strInstructions}
         </p>
         <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>`;
  mailDetail.appendChild(div);
};
