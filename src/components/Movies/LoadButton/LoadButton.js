function LoadButton({onClick}) {
  return (
    <section className="load">
      <button className="load__button" onClick={onClick} type="button">Еще</button>
    </section>
  )
}

export default LoadButton;