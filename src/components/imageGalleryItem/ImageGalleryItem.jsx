import React from "react";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ images, query, onOpenModal }) => {
  return images.map(({ id, webformatURL, largeImageURL }) => (
    <li
      key={id}
      onClick={() => onOpenModal(largeImageURL)}
      className="ImageGalleryItem"
    >
      <img
        src={webformatURL}
        alt={query}
        data-largelink={largeImageURL}
        className="ImageGalleryItem-image"
      />
    </li>
  ));
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  onOpenModal: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
