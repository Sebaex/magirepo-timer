const enComic = async (req, res) => {
    var comicList = []
    var tumblr = require('tumblr.js');
    var client = tumblr.createClient({
        consumer_key: process.env.TUMBLR_CONSUMER_KEY,
        consumer_secret: process.env.TUMBLR_CONSUMER_SECRET,
        token: process.env.TUMBLR_TOKEN,
        token_secret: process.env.TUMBLR_TOKEN_SECRET
    });

    client.blogPosts('tfoscans.tumblr.com', { type: 'photo', limit: 3 }, function (err, data) {        
        const posts = data.posts
        const lastEnComic = posts[0].summary.substring(16,19)
        posts.forEach(post => {
            if(post.summary.includes("Magia Report")){
                const comicPhotos = post.photos
                comicPhotos.forEach(photo =>{
                    comicList.push(photo.original_size.url)
                })
            }
        });
        const comicLink = comicList[0]
        return res.status(200).json({ comicLink, lastEnComic })
    });
}
export default enComic