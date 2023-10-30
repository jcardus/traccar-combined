const functions = require('@google-cloud/functions-framework');
const axios = require('axios').create({
    baseURL: 'https://api.pinme.io',
    withCredentials: true
});

functions.http('helloHttp', async (req, res) => {
    axios.defaults.headers.common['cookie'] = req.header('cookie')
    if (req.originalUrl.includes('deviceId')) {
        const positions = await axios.get(req.originalUrl.replace('combined', 'route')).then(d => d.data)
        const events = await axios.get(req.originalUrl.replace('combined', 'events')).then(d => d.data)
        if (Array.isArray(req.query.deviceId)) {
            req.query.deviceId.forEach(d => {
            })
        }
        res.send({positions, events});
    }
    res.status(200).end()
});
