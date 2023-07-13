function AboutProject() {
  return (
    <section className="project">
      <h3 className="project__header">О проекте</h3>
      <div className="project__columns">
        <div className="project__column">
          <h4 className="project__column-header">Дипломный проект включал 5&nbsp;этапов</h4>
          <p className="project__column-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
        </div>
        <div className="project__column">
          <h4 className="project__column-header">На&nbsp;выполнение диплома ушло 5&nbsp;недель</h4>
          <p className="project__column-text">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="project__weeks">
        <span className="project__backend">1 неделя</span>
        <span className="project__frontend">4 недели</span>
      </div>
      <div className="project__weeks">
        <span className="project__backend project__backend_transparent">Back-end</span>
        <span className="project__frontend project__frontend_transparent">Front-end</span>
      </div>
    </section>
  )
}

export default AboutProject;