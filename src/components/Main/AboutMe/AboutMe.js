import studentImage from '../../../images/student.png';

function AboutMe() {
  return (
    <section className='student'>
      <h3 className='student__header'>Студент</h3>
      <div className='student__info'>
        <div className='student__text'>
          <h4 className='student__name'>Егор</h4>
          <h5 className='student__title'>Фронтенд-разработчик, 28 лет</h5>
          <p className='student__about'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora porro quidem ratione qui officiis quae laboriosam officia harum molestiae cum quisquam repellendus ullam quis, et voluptatum odio nesciunt libero doloribus?</p>
          <a className='student__link' href='https://github.com/Skavr666'>GitHub</a>
        </div>
        <img className='student__image' src={studentImage} alt='Фото' />
      </div>
    </section>
  )
}

export default AboutMe;