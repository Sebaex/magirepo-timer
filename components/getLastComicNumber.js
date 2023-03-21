async function getLastComicNumber() {
    const res = await fetch("/api/lastcomic")
    const comicNumber = await res.json()
    return comicNumber.lastComic
}

export default getLastComicNumber