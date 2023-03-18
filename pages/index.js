import Countdown from "./components/Timer"
import ShowComics from "./components/ShowComics"
import styles from '../styles/index.module.css'

export default function Home() {
  return (
    <main>
      <section className="text-center">
        <h1 className={`${styles.pageTitle}`}><strong>Magia Report Comic Timer</strong></h1>
        <Countdown timezone="Asia/Tokyo" targetHour={17} />
        <ShowComics></ShowComics>
      </section>
    </main>
  )
}
