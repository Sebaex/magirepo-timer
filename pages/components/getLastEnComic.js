async function getLastEnComic() {
    const res = await fetch(`api/encomic/`)
        const enComicLink = await res.json()
        return enComicLink.comicLink
}

export default getLastEnComic