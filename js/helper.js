export const fetchApi = async (url) => {
  try {
    const Api = await fetch(url);
    const data = await Api.json();
    if (!Api.ok) throw new Error(`${data.message} (${Api.status})`);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
