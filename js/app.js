const manufacturer = document.querySelector("#marca");
const year = document.querySelector("#year");
const priceMin = document.querySelector("#minimo");
const priceMax = document.querySelector("#maximo");
const doors = document.querySelector("#puertas");
const transmission = document.querySelector("#transmision");
const color = document.querySelector("#color");
const result = document.querySelector("#resultado");

const filterValues = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  transmision: "",
  puertas: "",
  color: "",
};

function getCars(cars) {
  cars.forEach((car) => {
    const { marca, modelo, color, precio, puertas, transmision, year } = car;
    const resultItem = document.createElement("p");

    resultItem.innerHTML = `
      ${marca} ${modelo} ${puertas} - ${year} - Transmision: ${transmision} - Color: ${color} - $${precio}
    `;

    result.appendChild(resultItem);
  });

  if (cars.length === 0) {
    const noResults = document.createElement("p");
    noResults.innerHTML = "Don't have results";
    noResults.classList.add("alerta", "error");
    result.appendChild(noResults);
  }
}

function generateYears() {
  const currentYear = new Date().getFullYear();

  for (let i = currentYear; i >= 2010; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    year.appendChild(option);
  }
}

function filterManufacturer(car) {
  const { marca } = filterValues;

  if (marca !== "") {
    return car.marca === marca;
  }
  return car;
}

function filterYears(car) {
  const { year } = filterValues;

  if (year !== "") {
    return car.year === parseInt(year);
  }
  return car;
}

function filterPriceMin(car) {
  const { minimo } = filterValues;

  if (minimo !== "") {
    return car.precio >= parseInt(minimo);
  }
  return car;
}

function filterPriceMax(car) {
  const { maximo } = filterValues;

  if (maximo !== "") {
    return car.precio <= parseInt(maximo);
  }
  return car;
}

function filterDoors(car) {
  const { puertas } = filterValues;

  if (puertas !== "") {
    return car.puertas === parseInt(puertas);
  }
  return car;
}

function filterTranmission(car) {
  const { transmision } = filterValues;

  if (transmision !== "") {
    return car.transmision === transmision;
  }
  return car;
}

function filterColor(car) {
  const { color } = filterValues;

  if (color !== "") {
    return car.color === color;
  }
  return car;
}

function filterResuts(e) {
  filterValues[e.target.id] = e.target.value;

  const newResult = autos
    .filter(filterManufacturer)
    .filter(filterYears)
    .filter(filterPriceMin)
    .filter(filterPriceMax)
    .filter(filterDoors)
    .filter(filterTranmission)
    .filter(filterColor);

  result.innerHTML = "";
  getCars(newResult);
}

document.addEventListener("DOMContentLoaded", () => {
  getCars(autos);
  generateYears();

  manufacturer.addEventListener("change", filterResuts);
  year.addEventListener("change", filterResuts);
  priceMin.addEventListener("change", filterResuts);
  priceMax.addEventListener("change", filterResuts);
  doors.addEventListener("change", filterResuts);
  transmission.addEventListener("change", filterResuts);
  color.addEventListener("change", filterResuts);
});
