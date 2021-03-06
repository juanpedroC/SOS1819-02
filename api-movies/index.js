var moviesApi = {};
const BASE_PATH = "/api-movies/v1";

console.log("submodulo api-movies");

module.exports = moviesApi;


moviesApi.register = function(app, movies, moviesstatsinitial) {
    console.log("quedan registrados");
    app.get(BASE_PATH + "/movies-stats/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/7067709/S17xsmGb");
    })


    "============================="
    //Recursos Alejandro Martin
    "============================="

    console.log("###################Recursos Alejandro###################");

    //GET /api/v1/movies-stats/docs
    console.log("GET conjunto movies-stats/docs");

    app.get("/api/v1/movies-stats/docs/", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/7067709/S17usmjv");
    });



    // loadInitialData
    app.get(BASE_PATH + "/movies-stats/loadInitialData", (req, res) => {
        console.log("loadInitialAle#########");
        movies.find({}).toArray((error, moviesArray) => {
            if (moviesArray.length == 0) {
                console.log("vacio");
                movies.insertMany(moviesstatsinitial);
                console.log("movies insertadas");
                res.sendStatus(200);
            }
            else {
                res.sendStatus(409);
                console.log("error: 409 conflict");
            }
        });
    });

    // GET /api/v1/movies-stats
    console.log("GET conjunto movies-stats");
    app.get(BASE_PATH + "/movies-stats", (req, res) => {


        //Búsqueda
        var search = {}
        if (req.query.country) search["country"] = req.query.country;
        if (req.query.year) search["year"] = req.query.year;
        if (req.query.name) search["name"] = req.query.company;
        if (req.query.movienomination) search["movienomination"] = req.query.movienomination;
        if (req.query.movieaward) search["movieaward"] = req.query.movieaward;
        if (req.query.movieedition) search["movieedition"] = req.query.movieedition;


        //Paginación
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;
        movies.find(search, { projection : { _id: 0 } }).skip(offset).limit(limit).toArray((error, moviesArray) => {
            console.log("###############GET movies Array#####################");

            res.send(moviesArray);
            if (error) {
                console.log("Error:");
            }


        });
    });


    // POST /api/v1/movies-stats
    console.log("POST conjunto movies-stats");
    app.post(BASE_PATH + "/movies-stats", (req, res) => {

        var newmoviesstats = req.body;
        var yearMovie = req.body.year;

        var newMovies = req.body;

        if (!newMovies.country || !newMovies.year || !newMovies.name || !newMovies.movienomination || !newMovies.movieaward || !newMovies.movieedition) {
            res.sendStatus(400);
            console.log("Json mal")
        }
        else{

        movies.find({ "year": yearMovie }).toArray((error, moviesArray) => {

            if (error) {
                console.log("Error: " + error);
            }
            if (moviesArray.length > 0) {
                res.sendStatus(409);
                console.log("error 409 conflicto")
            }
            else {
                movies.insertOne(newmoviesstats);
                res.sendStatus(201);
                console.log("creado correctamente")
            }
        });
        }
    });

    // DELETE /api/v1/movies-stats
    console.log("DELETE conjunto movies-stats");
    app.delete(BASE_PATH + "/movies-stats", (req, res) => {

        movies.deleteMany({});
        res.sendStatus(200);

    });


    // GET /api/v1/movies-stats/1997
    console.log("GET al año movies-stats/1997");
    app.get(BASE_PATH + "/movies-stats/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = req.params.year;

        movies.find({ "country": country , "year": year },{ projection : { _id: 0 }} ).toArray((error, filteredmoviesstats) => {
            if (error) {
                console.log("Error: " + error);
            }
            if (filteredmoviesstats.length >= 1) {
                res.send(filteredmoviesstats[0]);
            }
            else {
                res.sendStatus(404);
            }
        });

    });




    // PUT /api/v1/movies-stats/1997
    console.log("PUT al año movies-stats/EEUU/1997");
    app.put(BASE_PATH + "/movies-stats/:country/:year", (req, res) => {
        var id = req.params._id
        var country = req.params.country;
        var year = req.params.year;
        var updatedmoviesstats = req.body;
        movies.find({ "country": country, "year": year }).toArray((error, moviesArray) => {
            if (error) {
                console.log(error);
            }
            if (moviesArray.length == 0) {
                res.sendStatus(404);
            }
            else {
                if (
                    id != updatedmoviesstats._id || country != updatedmoviesstats.country || year != updatedmoviesstats.year || !updatedmoviesstats.country || !updatedmoviesstats.year || !updatedmoviesstats.name || !updatedmoviesstats.movienomination || !updatedmoviesstats.movieaward || !updatedmoviesstats.movieedition ) {
                    res.sendStatus(400);
                }
                else {
                    movies.updateOne({ year: year }, { $set: updatedmoviesstats });
                    movies.updateOne({ country: country }, { $set: updatedmoviesstats });
                    res.sendStatus(200);
                }
            }
        });
    });

    // DELETE /api/v1/movies-stats/EEUU/1997
    console.log("DELETE al año movies-stats/1997");
    app.delete(BASE_PATH + "/movies-stats/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = req.params.year;
        movies.find({ "country": country, "year": year }).toArray((error, filteredmoviesstats) => {
            if (error) {
                console.log("Error: " + error);
            }
            if (filteredmoviesstats.length == 0) {
                res.sendStatus(404);
            }
            else {
                movies.deleteOne({ "country": country, "year": year });
                res.sendStatus(200);
            }
        });
    });


    // POST /api/v1/movies-stats/EEUU/1997
    console.log("POST erroneo al año movies-stats/EEUU/1997--> 405");
    app.post(BASE_PATH + "/movies-stats/:country/:year", (req, res) => {

        res.sendStatus(405);
    });

    // PUT /api/v1/movies-stats
    console.log("PUT erroneo al conjunto movies-stats--> 405");
    app.put(BASE_PATH + "/movies-stats", (req, res) => {

        res.sendStatus(405);
    });

}
