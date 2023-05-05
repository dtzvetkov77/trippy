import './Hero.css'


function Hero(props) {
  return (
    <>
      <div className={props.cName}>
        <img src={props.heroImg} alt="HeroImg" />
      </div>
      <div className={props.textCName}>
        <h1>{props.title}</h1>
        <p>{props.text}</p>
        <a href={props.url} className={props.btnClass}>{props.buttonText}</a>
      </div>
    </>
  )
}

export default Hero
