const URL = "http://localhost:3000/anuncios";


export const postAnuncioAsyncFetch = async (anuncio) => {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(anuncio),
    });
    if (!res.ok) {
      throw new Error(`${res.status}-${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const updateAnuncioAsyncFetch = async (anuncio) => {
  try {
    const res = await fetch(URL + `/${anuncio.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(anuncio),
    });
    if (!res.ok) {
      throw new Error(`${res.status}-${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

