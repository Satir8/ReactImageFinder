import React from "react";
import styles from "./ImageGalleryItem.module.css";
import Modal from "./modal/Modal";

const ImageGalleryItem = ({
  item,
  isModalOpen,
  onCloseModal,
  onOpenModal,
  modalImageUrl
}) => {
  const { webformatURL, id } = item;

  return (
    <>
      <li className={styles.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt=""
          className={styles.ImageGalleryItemImage}
          id={id}
          onClick={onOpenModal}
        />
        {isModalOpen && (
          <Modal imgUrl={modalImageUrl} onCloseModal={onCloseModal} />
        )}
      </li>
    </>
  );
};

export default ImageGalleryItem;
