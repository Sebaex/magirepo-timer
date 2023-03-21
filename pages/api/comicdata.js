import {JSDOM} from 'jsdom'

const comicdata = async (req, res) => {
    var comicList = [], enComicLink, lastEnComic

    // JP Comic
    const responseJP = await fetch("https://magireco.com/comic2/")
    const htmlJP = await responseJP.text()

    const domJP = new JSDOM(htmlJP)
    const documentJP = domJP.window.document

    const lastComic = documentJP.getElementsByClassName("number")[0].textContent.slice(1)

    //EN Comic
    var tumblr = require('tumblr.js');
    var client = tumblr.createClient({
        consumer_key: process.env.TUMBLR_CONSUMER_KEY,
        consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
        token: process.env.TUMBLR_TOKEN,
        token_secret: process.env.TUMBLR_TOKEN_SECRET
    });

    client.blogPosts('tfoscans.tumblr.com', { type: 'photo', limit: 3 }, function (err, data) {        
        const posts = data.posts
        lastEnComic = posts[0].summary.substring(16,19)
        posts.forEach(post => {
            if(post.summary.includes("Magia Report")){
                const comicPhotos = post.photos
                comicPhotos.forEach(photo =>{
                    comicList.push(photo.original_size.url)
                })
            }
        });
        enComicLink = comicList[0]
        res.status(200).json({lastComic, lastEnComic, enComicLink})
    });
}

export default comicdata