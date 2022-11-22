const URL = "http://localhost:3000/anuncios";


export const getAnuncioAsyncAxios = async (id) => {
  try {
    const { data } = await axios(URL + "/" + id);
    return data;
  } catch (err) {
    console.error(err.message);
  }
};


export const deleteAnuncioAsyncAxios = async (id) => {
  try {
    const { data } = await axios.delete(URL + `/${id}`);
    return data;
  } catch (err) {
    console.error(err.message);
  }
};

