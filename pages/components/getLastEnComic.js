async function getLastEnComic() {
    const res = await fetch(window.location.href + `api/encomic/`)
        const enComicLink = await res.json()
        return enComicLink.comicLink
}

export default getLastEnComic