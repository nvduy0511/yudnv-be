const mongoose = require('mongoose');
const URI = 'mongodb+srv://nvduy:duy123@chatapp.wylpz.mongodb.net/?retryWrites=true&w=majority';

const config = async () => {
    let isConnect = false;
    await mongoose
        .connect(URI)
        .then(() => {
            isConnect = true;
        })
        .catch((err) => {
            console.log(err.reason);
            isConnect = false;
        });
    return new Promise((resolve, reject) => {
        if (isConnect) resolve();
        else reject("Connect to DB fail, Can't start app!");
    });
};

module.exports = { config };
