import {
  getElements,
  getGeneration,
  getCategory,
  getCelebrities,
} from "./main.js";
import celebrities from "../data/celebrities.js";

// Filter data by zodiac or generation
function filterData(data, condition) {
  console.log("Data:" + data);
  let valid = true;
  if (condition === "element") {
    getElements(data);
  } else if (condition === "generation") {
    getGeneration();
  } else if (condition === "celebrities") {
    getCategory(data);
  } else {
    valid = false;
  }
  return valid;
}



let namesFilter = [];
// Sort data by celebrity type (singer or actor) and in ascending/descendig order.
function sortData(data, sortBy, sortOrder) {
  const names = [];
  let namesArray = []

  celebrities["celebrities"].forEach((dictionary) => {
    if (data.slice(0, 5) === dictionary["sign"].slice(0, 5)) {
      if (sortBy === dictionary["category"]) {
        names.push(dictionary["name"]);
        namesFilter = names.filter(
          (item, index) => names.indexOf(item) === index
        );
        namesArray = names;
      }
    }
  });
  if (sortOrder === "A-Z") {
    namesFilter = namesFilter.sort();
    namesArray = namesFilter;
  } else if (sortOrder === "Z-A") {
    namesFilter = namesFilter.sort().reverse();
    namesArray = namesFilter;
  }
  // Algo que contenga los dos names por separado  
  getCelebrities(namesArray);
}



// Show any chart just because.
function computeStats(data, select, sign) {
  let categoriesList = [];
  const categoriesListElement = [];

  data.forEach(dictionary => {
    if (select === "signStat") {
      if (sign.slice(0, 5) === dictionary["sign"].slice(0, 5)) {
        categoriesList.push(dictionary["category"]);
      }
    }
    if (select === "elementStat") {
      if (sign === "Capricorn" || sign === "Virgo" || sign === "Taurus") {
        if (dictionary["element"] === "earth") {
          categoriesListElement.push(dictionary["category"]);
          categoriesList = categoriesListElement;
        }
      } else if (sign === "Libra" || sign === "Gemini" || sign === "Aquarius") {
        if (dictionary["element"] === "air") {
          categoriesListElement.push(dictionary["category"]);
          categoriesList = categoriesListElement;
        }
      } else if (sign === "Cancer" || sign === "Pisces" || sign === "Scorpio") {
        if (dictionary["element"] === "water") {
          categoriesListElement.push(dictionary["category"]);
          categoriesList = categoriesListElement;
        }
      } else if (sign === "Aries" || sign === "Leo" || sign === "Sagittarius") {
        if (dictionary["element"] === "fire") {
          categoriesListElement.push(dictionary["category"]);
          categoriesList = categoriesListElement;
        }
      }
    }
  })

  const count = {};

  for (const element of categoriesList) {
    count[element] = (count[element] || 0) + 1;
  }

  const arr = Object.values(count);
  const keyArr = Object.keys(count);
  const sum = arr.reduce((a, b) => a + b, 0);

  let percent;

  for (let i = 0; i < arr.length; i++) {
    percent = Number(arr[i]) * 100 / sum;
    count[keyArr[i]] = percent.toFixed(1); 
  }
  
  return count; 
}


export { filterData, sortData, computeStats };
