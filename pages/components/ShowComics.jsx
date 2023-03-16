import { Tabs, Tab } from 'react-bootstrap'
import { useState, useEffect, createElement } from 'react'
import getLastComicNumber from './getLastComicNumber'
import getLastEnComic from './getLastEnComic'

function ShowComics() {
    const [lastComic, setLastComic] = useState("")
    const [enComicLink, setEnComicLink] = useState("")

    useEffect(() => {
        getLastComicNumber()
            .then(num => {
                setLastComic(num)
            })
    });

    useEffect(() => {
        getLastEnComic()
            .then(link => {
                setEnComicLink(link)
            })
    });


    const jpComic = lastComic === "" ? "Waiting for comic" : createElement(
        "img",
        { src: `https://magireco.com/images/comic2/image/${lastComic}.jpg` },
        null
    );

    const enComic = lastComic === "" ? "Waiting for comic" : createElement(
        "img",
        { src: `${enComicLink}` },
        null
    );

    return (
        <div>
            <h1>For now, enjoy the current comic</h1>

            <section className='col-6'>
                <Tabs justify defaultActiveKey="tab-1" className="mb-1 p-0">
                    <Tab eventKey="tab-1" title="Japanese">
                        <p className="jpComic">
                            {jpComic}
                        </p>
                    </Tab>
                    <Tab eventKey="tab-2" title="English (Translated)">
                        <p className="translatedComic">
                            {enComic}
                        </p>
                    </Tab>
                </Tabs>
            </section>
        </div>
    )
}

export default ShowComics