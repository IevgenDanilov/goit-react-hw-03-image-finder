import axios from "axios";
import PropTypes from "prop-types";

const baseUrl = "https://pixabay.com/api/?q=";
const pageUrl = "&page=";
const keyUrl = "&key=23381165-23963a51c09328db6c17876e7";
const optionsUrl = "&image_type=photo&orientation=horizontal&per_page=12";

export const fetchImages = (query, page) => {
  return axios.get(baseUrl + query + pageUrl + page + keyUrl + optionsUrl);
};

fetchImages.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
