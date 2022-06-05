const url =
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';

let app = document.querySelector('#results');

const addDrinkToDOM = (drink) => {
  let element = document.createElement('div');
  let drinkName = document.createElement('h2');
  let drinkThumbnail = document.createElement('img');

  element.className = 'figure';
  drinkName.textContent = drink.strDrink;
  drinkThumbnail.width = '200';
  drinkThumbnail.height = '200';
  drinkThumbnail.src = drink.strDrinkThumb;
  drinkThumbnail.alt = "A picture of " + drinkName.textContent;

  element.append(drinkThumbnail);
  element.append(drinkName);
  
  element.style.display = 'flex';
  element.style.flexDirection = 'column';
  element.style.alignItems = 'center';
  element.style.margin = '10px';
  element.style.width = 'auto';
  element.style.height = 'auto';
  drinkName.style.margin = '10%';
  
  app.append(element);
};

const fetchData = (url) => {
  // Add your code here
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.drinks);

      data.drinks.forEach((drink) => {
        console.log(drink.strDrink, drink.strDrinkThumb);

        addDrinkToDOM(drink);
      });
    })
    .catch((error) => {
      console.error(error);
      
      let element = document.createElement('div');
      element.textContent = 'An error occured. Please try again.';
      element.className = 'error';
      app.append(element);
    })
    .finally(() => {
      let loader = document.querySelector('#loading');
      app.removeChild(loader);
    });
};

fetchData(url);
