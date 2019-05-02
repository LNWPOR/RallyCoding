const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
    // const minQuery = Artist
        // .find({})
        // .sort({ age: 1 })
        // .then((artists) => artists[0]);
        // ไม่ควรทำท่านี้เนื่องจาก มันไปหา artists ก้อนใหญ่ทั้งหมดมาก่อน
        // จะเอาทั้งหมดมาดูอีกทำไมในเมื่อเราต้องการแค่อันเดียว
    const minQuery = Artist
        .find({})
        .sort({ age: 1 })
        .limit(1)
        .then(artists => artists[0].age); // artists อันนี้ไม่ใช่หลายอันละนะ แต่จะได้มาอันเดียวเนื่องจาก limit 1
                                        // แต่ถึงจะ limit 1 มันก็คืนกลับมาเป็น array นะ = array 1 member

    const maxQuery = Artist
        .find({})
        .sort({ age: -1 })
        .limit(1)
        .then(artists => artists[0].age);

    return Promise.all([minQuery, maxQuery])
        .then((result) => {
            return { min: result[0], max: result[1] };
        });
};
