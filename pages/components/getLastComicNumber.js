async function getLastComicNumber() {
    if (typeof window !== 'undefined') {
        const res = await fetch(window.location.href + "api/lastcomic", { mode: 'no-cors' })
        const comicNumber = await res.json()
        return comicNumber.lastComic
    }
}

export default getLastComicNumber