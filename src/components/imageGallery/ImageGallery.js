import React from "react";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "./imageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ data, onOpenModal, onCloseModal }) => {
  const { pictures, isModalOpen, modalImageUrl } = data;
  return (
    <ul className={styles.ImageGallery}>
      {pictures.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            item={item}
            modalImageUrl={modalImageUrl}
            isModalOpen={isModalOpen}
            onOpenModal={onOpenModal}
            onCloseModal={onCloseModal}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
