import { Tabs, Tab } from 'react-bootstrap'
import { useState, useEffect, createElement } from 'react'
import getLastComicNumber from './getLastComicNumber'
import getLastEnComic from './getLastEnComic'
import styles from '../../styles/ShowComics.module.css'

function ShowComics() {
    const [lastComic, setLastComic] = useState("")
    const [lastEnComic, setLastEnComic] = useState("")
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
                setEnComicLink(link.comicLink)
                setLastEnComic(link.lastEnComic)
            })
    });


    const jpComic = lastComic === "" ? <h1>Waiting for comic...</h1> : createElement(
        "img",
        { src: `https://magireco.com/images/comic2/image/${lastComic}.jpg`, className: `${styles.comicPicture}` },
        null
    );

    const enComic = lastComic === "" ? <h1>Waiting for comic...</h1> : createElement(
        "img",
        { src: `${enComicLink}`, className: `${styles.comicPicture}` },
        null
    );

    return (
        <div>
            <section className='container'>
            <h1>For now, enjoy the current comic</h1>
                <Tabs justify defaultActiveKey="tab-1" className={`${styles.languageTab}`}>
                    <Tab eventKey="tab-1" title={`Japanese (#${lastComic})`}>
                        {jpComic}
                    </Tab>
                    <Tab eventKey="tab-2" title={`English Translated (#${lastEnComic})`}>
                        {enComic}
                    </Tab>
                </Tabs>
            </section>
        </div>
    )
}

export default ShowComics