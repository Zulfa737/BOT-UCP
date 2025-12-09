const query = require("samp-query");

const server = {
  host: '159.223.64.118', // IP server SAMP
  port: 7019
    // Port server SAMP
};

    query(server, (error, response) => {
    if (error) {
        console.log("Server Offline atau tidak dapat diakses.");
        console.error(error);
    } else {
        console.log("Server Online!");
        console.log("Data server:");
        console.log(response); // Tampilkan info server SAMP
    }
});