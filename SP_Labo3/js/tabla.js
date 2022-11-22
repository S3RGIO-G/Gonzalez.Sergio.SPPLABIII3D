function CrearBody(dataArray) {
  const tbody = document.createElement("tbody");

  dataArray.forEach((element) => {
    const tr = document.createElement("tr");
    for (const key in element) {
      if (key == "id") {
        tr.setAttribute("data-id", element[key]);
        continue;
      }

      const td = document.createElement("td");

      td.textContent = element[key];
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  });
  return tbody;
}

function CrearHead(dataItem) {
  const thead = document.createElement("thead");
  thead.classList.add('table-dark');
  const tr = document.createElement("tr");

  for (const key in dataItem) {

    if (key == "id") continue;

    const th = document.createElement("th");
    th.textContent = key.toUpperCase();
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  return thead;
}

export function CrearTabla(dataArray) {
  if (dataArray.isArray) return null;

  const tabla = document.createElement("table");
  tabla.classList.add("table", "table-bordered", "table-striped", "table-hover", "text-center");
  tabla.appendChild(CrearHead(dataArray[0]));
  tabla.appendChild(CrearBody(dataArray));
  return tabla;
}















