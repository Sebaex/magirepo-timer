import Countdown from "./components/Timer"
import ShowComics from "./components/ShowComics"

export default function Home() {
  return (
    <main>
      <section>
        <h1>Magia Report Comic Timer</h1>
        <Countdown timezone="Asia/Tokyo" targetHour={17} />
        <ShowComics></ShowComics>
      </section>
    </main>
  )
}
