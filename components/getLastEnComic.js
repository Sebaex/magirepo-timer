async function getLastEnComic() {
    const res = await fetch("/api/encomic/")
        const enComicData = await res.json()
        return enComicData
}

export default getLastEnComic