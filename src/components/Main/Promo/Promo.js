import promoImage from '../../../images/promo_image.svg';

function Promo() {
  return (
    <section className="promo">
      <h2 className="promo__header">Учебный проект студента факультета Веб&#8209;разработки.</h2>
      <div className='promo__image-wrapper'>
        <img className="promo__image" src={promoImage} alt="Промо" />
      </div>
    </section>
  )
}

export default Promo;
