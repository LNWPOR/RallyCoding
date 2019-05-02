const Artist = require('../models/artist');

/**
 * Deletes a single artist from the Artists collection
 * @param {string} _id - The ID of the artist to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = (_id) => {
    // ไม่ควรทำท่านี้ เนื่องจากเป็นการแตะ DB 2 รอบ ซึ่งจริงๆแตะทีเดียวก็ได้
    // return Artist.findById(_id).then((artist) => artist.remove());
    return Artist.remove({ _id });
};
