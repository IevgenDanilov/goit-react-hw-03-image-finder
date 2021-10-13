import React, { Component } from "react";
import { fetchImages } from "./shared/services/postsGallery";
import LoaderComponent from "./components/loader/Loader.jsx";
import Searchbar from "./components/searchbar/Searchbar.jsx";
import ImageGallery from "./components/imageGallery/ImageGallery.jsx";
import ImageGalleryItem from "./components/imageGalleryItem/ImageGalleryItem.jsx";
import Button from "./components/button/Button.jsx";
import Modal from "./components/modal/Modal.jsx";
import "./Styles.css";

class App extends Component {
  // Оголошуємо стани
  state = {
    images: [],
    isLoading: false,
    isModal: false,
    error: null,
    query: "",
    page: 1,
    largeImageURL: "",
  };

  // Функція передачі введеного запиту в значення стану

  handleSubmit = (inputValue) => {
    this.setState({ isLoading: true, query: inputValue, images: [], page: 1 });
  };

  // Функція відправки запиту на сервер і отримання даних

  getDataImages = (query, page) => {
    fetchImages(query, page)
      .then(({ data }) => {
        const imagesDataArr = data.hits.map((image) => {
          const { id, webformatURL, largeImageURL } = image;
          return { id, webformatURL, largeImageURL };
        });
        this.setState((prevState) => ({
          images: [...prevState.images, ...imagesDataArr],
          page: prevState.page + 1,
          isLoading: false,
        }));
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => this.setState({ error, isLoading: false }));
  };

  // Завантаження даних з сервера

  componentDidUpdate() {
    const { query, page, isLoading } = this.state;
    if (isLoading) {
      this.getDataImages(query, page);
    }
  }

  onButtonClick = () => {
    this.setState({ isLoading: true });
  };

  onOpenModal = (image) => {
    console.log(image);
    this.setState({ largeImageURL: image, isModal: true });
  };
  onCloseModal = () => {
    this.setState({ isModal: false });
  };

  render() {
    const { isLoading, images, query, largeImageURL, isModal } = this.state;
    const { handleSubmit, onButtonClick, onOpenModal, onCloseModal } = this;

    return (
      <div className="App">
        <Searchbar onSubmit={handleSubmit} />
        {images.length > 0 && (
          <ImageGallery>
            {images.length > 0 && (
              <ImageGalleryItem
                images={images}
                query={query}
                onOpenModal={onOpenModal}
              />
            )}
          </ImageGallery>
        )}
        {isModal && (
          <Modal onClose={onCloseModal}>
            <img src={largeImageURL} alt={query} />
          </Modal>
        )}
        {isLoading && <LoaderComponent />}
        {images.length > 0 && <Button onClick={onButtonClick} />}
      </div>
    );
  }
}
export default App;
