import { JSDOM } from 'jsdom'

const lastComicNumber = async (req, res) => {
    const response = await fetch("https://magireco.com/comic2/")
    const html = await response.text()

    const dom = new JSDOM(html)
    const document = dom.window.document

    const lastComic = document.getElementsByClassName("number")[0].textContent.slice(1)
    if(lastComic){
        res.status(200).json({lastComic})
    }
}

export default lastComicNumber