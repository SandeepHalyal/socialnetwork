const fs = require('fs')

class photobuffer {
    constructor() {}
    async getphoto(loc) {
        let promise = new Promise((resolve, reject) => {
            var readStream = fs.createReadStream(loc);
            var i=0, vaal=[];
            readStream.on("data", (chunk) => {
                vaal[i] = chunk;
                i++;
            })
            setInterval(() => resolve(vaal), 500)
        })
        let result = await promise;
        console.log(result);
    }
}