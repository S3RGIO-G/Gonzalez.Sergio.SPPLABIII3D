const URL = "http://localhost:3000/anuncios";

export const getAnunciosXml = (callback) => {

  try {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", () => {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          callback(data);
        } else {
          console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
        }
      }
    });
    xhr.open("GET", URL);
    xhr.send();

  }
  catch (err) {
    console.error(err.message);
  }
};


