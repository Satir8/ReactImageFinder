import axios from "axios";

// FETCHER
const BASE_URL = `${process.env.REACT_APP_DEFAULT_URL}`;
const PRIVATE_KEY = `${process.env.REACT_APP_PRIVATE_KEY}`;

export const fetcher = async (param, page) => {
  try {
    const data = await axios.get(
      `${BASE_URL}?q=${param}&page=${page}&key=${PRIVATE_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return data.data.hits;
  } catch (er) {
    console.log(er);
  }
};
