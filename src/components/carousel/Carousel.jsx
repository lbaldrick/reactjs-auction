import React from 'react';
import style from './Carousel.scss';

const BTN_TYPES = {
  NEXT: 'NEXT',
  PREV: 'PREV',
};

const LEFT_HIDDEN_CLASS = '--hidden-left';

const RIGHT_HIDDEN_CLASS = '--hidden-right';

const HIDDEN_CLASS = '--hidden';

export default class Carousel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      images: props.images || [],
    };
    
    this.selectedImageIndex = 0;
  }

  handleNavBtnClick(btnType) {
    const previousImageIndex = this.selectedImageIndex;
    this.selectedImageIndex = btnType === BTN_TYPES.PREV ? this.selectedImageIndex - 1 : this.selectedImageIndex + 1;
    this.changeImageClass(this.selectedImageIndex, previousImageIndex);
    this.changeBtnClass(this.selectedImageIndex, previousImageIndex);
  }

  onPrevious() {
    this.handleNavBtnClick(BTN_TYPES.PREV);
  }

  onNext() {
    this.handleNavBtnClick(BTN_TYPES.NEXT);
  }

  changeImageClass(selectedImageIndex, previousImageIndex) {
    const currentClass = selectedImageIndex > previousImageIndex ? LEFT_HIDDEN_CLASS : RIGHT_HIDDEN_CLASS;
    const previousClass = selectedImageIndex > previousImageIndex ? RIGHT_HIDDEN_CLASS : LEFT_HIDDEN_CLASS;

    this.refs[`image-${selectedImageIndex}`].classList.remove(currentClass);
    this.refs[`image-${previousImageIndex}`].classList.add(previousClass);
  }

  changeBtnClass(selectedImageIndex, previousImageIndex) {
    const nextBtn = this.refs['next-btn'];
    const prevBtn = this.refs['prev-btn'];

    if (selectedImageIndex === 1) {
      prevBtn.classList.remove(HIDDEN_CLASS);
    } else if (selectedImageIndex === 0) {
      prevBtn.classList.add(HIDDEN_CLASS);
    }

    if (selectedImageIndex === this.state.images.length - 1) {
      nextBtn.classList.add(HIDDEN_CLASS);
    }

    if (selectedImageIndex === this.state.images.length - 2 && previousImageIndex === this.state.images.length - 1) {
      nextBtn.classList.remove(HIDDEN_CLASS);
    }
  }

  render() { 
    const nextBtn = <button ref="next-btn" className="carousel_next" onClick={ this.onNext.bind(this) }></button>;
    const prevBtn = <button ref="prev-btn" className="carousel_previous --hidden" onClick={ this.onPrevious.bind(this) }></button>; 
    const btns = [prevBtn, nextBtn];
    const selectedImageIndex = this.selectedImageIndex;
    const images = this.state.images;
    const carouselImages = [];

    images.forEach((image, index) => {
      const imageRef = `image-${index}`;
      const hiddenClass = index > 0 ? LEFT_HIDDEN_CLASS : '';

      carouselImages.push(<li ref={ imageRef } className={ hiddenClass }><img src={ image }/></li>);
    });

    return <div className="carousel">
          { btns }
      <div className="carousel_image-container">
        <ul className="carousel_image-list" ref={ (imgHolder) => this.imgHolder = imgHolder }>
          { carouselImages }  
        </ul>
      </div>
    </div>
  }
}
