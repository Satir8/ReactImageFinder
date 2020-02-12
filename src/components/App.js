import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./App.module.css";
import { fetcher } from "./fetcher";
import SeartchBar from "./seartchBar/SeartchBar";
import ImageGallery from "./imageGallery/ImageGallery";
import Button from "./button/Button";

class App extends Component {
  state = {
    pictures: [],
    query: "",
    page: 1,
    isLoading: false,
    isModalOpen: false,
    modalImageUrl: ""
  };

  handleOpenModal = e => {
    const imgId = Number(e.target.id);
    this.setState(prev => {
      const targetImg = prev.pictures.filter(item => item.id === imgId);
      return {
        isModalOpen: true,
        modalImageUrl: targetImg[0].largeImageURL
      };
    });
  };

  handleCloseModal = e => {
    this.setState({ isModalOpen: false });
  };

  async componentDidMount() {
    const persistedPictures = localStorage.getItem("pictures");
    const persistedQuery = localStorage.getItem("query");
    const persistedPage = localStorage.getItem("page");
    if (persistedPictures) {
      this.setState({
        pictures: JSON.parse(persistedPictures),
        query: JSON.parse(persistedQuery),
        page: JSON.parse(persistedPage)
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { pictures, query, page } = this.state;
    if (prevState !== this.state) {
      localStorage.setItem("pictures", JSON.stringify(pictures));
      localStorage.setItem("query", JSON.stringify(query));
      localStorage.setItem("page", JSON.stringify(page));
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const input = e.target.elements[1];

    try {
      this.setState({ isLoading: true });
      const data = await fetcher(input.value, 1);
      this.setState({
        pictures: data,
        query: input.value,
        page: 1,
        isLoading: false
      });
    } catch (er) {
      console.log(er);
      this.setState({ isLoading: false });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLoadMore = async () => {
    const { query } = this.state;
    try {
      this.setState({ isLoading: true });
      const data = await fetcher(query, this.state.page + 1);
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...data],
        query: this.state.query,
        page: prevState.page + 1,
        isLoading: false
      }));
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      });
    } catch (er) {
      console.log(er);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { pictures, query, isLoading } = this.state;
    return (
      <div className={styles.App}>
        <SeartchBar
          onChange={this.handleChange}
          value={query}
          onSubmit={this.handleSubmit}
        />
        {pictures.length > 0 && (
          <ImageGallery
            data={this.state}
            onOpenModal={this.handleOpenModal}
            onCloseModal={this.handleCloseModal}
          />
        )}

        {isLoading ? (
          <div className={styles.loaderBox}>
            <Loader
              type="BallTriangle"
              color="#ffc400"
              height={90}
              width={90}
            />
          </div>
        ) : (
          pictures.length > 0 && (
            <>
              <Button onLoadMore={this.handleLoadMore} />
            </>
          )
        )}
      </div>
    );
  }
}

export default App;
