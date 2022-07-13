const fs = require("fs");
const path = require("path");

const pathJSON = path.join(__dirname, "services/");

const readJSON = () => {
  const data = fs.readFileSync(pathJSON + "json.json", "utf-8");
  return JSON.parse(data);
};

const readValues = () => {
  const data = fs.readFileSync(pathJSON + "values.json", "utf-8");
  return JSON.parse(data);
};

function obtenerNewArray(arr) {
  let nums = arr.map(({ limit }) => limit);
  const max = Math.max(...nums);
  const index = nums.indexOf(max);

  return arr[index];
}

function index() {
  let diccionario = [];
  Object.entries(readJSON()).forEach((valor) => {
    diccionario.push({
      key: valor[0],
      value: valor[1],
    });
  });

  for (i = 0; i < diccionario.length; i++) {
    diccionario[i].value = obtenerNewArray(diccionario[i].value);
    diccionario[i].value["over_carrier_service_id"] =
      readValues()[diccionario[i].value["over_carrier_service_id"]];
    diccionario[i].value["under_carrier_service_id"] =
      readValues()[diccionario[i].value["under_carrier_service_id"]];
  }

  return diccionario;
}
console.log(index(), "");
