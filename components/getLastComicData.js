async function getLastComicData(){
    const res = await fetch("api/comicdata")
    const comicData = await res.json()
    return comicData
}

export default getLastComicData