function(properties, context) {
    const axios = require('axios');

    const ip = properties.ip;

    const options = {
        method: 'GET',
        url: `http://ip-api.com/json/${ip}`
    };

    return axios(options)
        .then(response => {
            console.log("API Response Status:", response.status);
            console.log("API Response Headers:", response.headers);
            console.log("API Response Data:", response.data);

            const data = response.data;
            if (data.status === 'success') {
                return {
                    status: data.status,
                    country: data.country,
                    countryCode: data.countryCode,
                    region: data.region,
                    regionName: data.regionName,
                    city: data.city,
                    zip: data.zip,
                    lat: data.lat,
                    lon: data.lon,
                    timezone: data.timezone,
                    isp: data.isp,
                    org: data.org,
                    as: data.as,
                    query: data.query
                };
            } else {
                console.error("API Response Error:", data.message);
                throw new Error("Failed to retrieve location data");
            }
        })
        .catch(error => {
            if (error.response) {
                // O servidor respondeu com um status diferente de 2xx
                console.error("API Error Response Data:", error.response.data);
                console.error("API Error Response Status:", error.response.status);
                console.error("API Error Response Headers:", error.response.headers);
            } else if (error.request) {
                // A requisição foi feita mas nenhuma resposta foi recebida
                console.error("API Error Request Data:", error.request);
            } else {
                // Algo aconteceu na configuração da requisição que provocou o erro
                console.error("API Error Message:", error.message);
            }
            console.error("API Error Config:", error.config);
            throw new Error("Failed to connect to API");
        });
}
