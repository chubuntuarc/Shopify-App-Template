// MySQL Helpers.
//const MySQL = require('./helpers/mysql');

// Enpoints calls functions.
module.exports = {
    // Sample data function.
    sampleData: () => {
        try {

            let responseData = {
                sample: 'value'
            };

            return {
                status: 'Successful call.',
                data: responseData
            };

        } catch (error) { console.log(`WS Endpoint [getSampleData] ${error.message}`); }
    }
}
