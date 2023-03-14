import { Row, Tabs, Tab } from 'react-bootstrap'
import { useState, createElement } from 'react'

function ShowComics() {
    const [lastComic, setLastComic] = useState("")
    const [tlComic, setTLComic] = useState("")

    const getLastComic = async () => {
        const res = await fetch("http://localhost:3000/api/lastComic", {mode: 'no-cors'})
        const comicNumber = await res.json()
        setLastComic(comicNumber.lastComic)
    }
    getLastComic()

    const jpComic = lastComic === "" ? "Waiting for comic" : createElement(
        "img",
        {src: `https://magireco.com/images/comic2/image/${lastComic}.jpg`},
        null
    );
      

    console.log(lastComic)
    
    return (
        <div>
            <h1>For now, enjoy the actual comic</h1>
            <section className='col-6'>
                <Row>
                    <Tabs justify defaultActiveKey="tab-1" className="mb-1 p-0">
                        <Tab eventKey="tab-1" title="Japanese">
                            <p className="jpComic">
                                {jpComic}
                            </p>
                        </Tab>
                        <Tab eventKey="tab-2" title="English (Translated)">
                            <p className="translatedComic">
                                {tlComic}
                            </p>
                        </Tab>
                    </Tabs>
                </Row>
            </section>
        </div>
    )
}

export default ShowComics