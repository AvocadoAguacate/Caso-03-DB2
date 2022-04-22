export default {
    'endpoint': (libro) => `https://simple-books-api.glitch.me/books/${libro}`,
    'redis' : {
        'port': process.env.REDIS_PORT || 6379,
        'host': process.env.REDIS_HOST || "15.0.0.2"
    }
}