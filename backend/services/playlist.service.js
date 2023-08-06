const httpStatus = require("http-status");
// const { playlistService } = require(".");
const { Playlist } = require("../models");
const ApiError = require("../utils/ApiError");
// const ObjectId = require('mongoose').Types.ObjectId;


const getPlaylistByUser = async (req, res) => {
  console.log(req.params.e, "EEEEE")
  const lists = await Playlist.findOne({ email: req.params.e })
  if (!lists) {
    throw new ApiError(httpStatus.NOT_FOUND, "No Playlist Found")
  }
  return lists;
};


const addMovieToPlaylist = async (user, body) => {
  let movie = await Playlist.findOne({ email: user.email });
  console.log(movie, "asasas", body.Title)
  if (!movie) {
    try {
      movie = await Playlist.create({
        email: user.email,
        publicPlaylists: [],
        privatePlaylists: []
      });
      await movie.save();
    } catch (e) {
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Movie added to playlist failed");
    }
  }


  if (movie.publicPlaylists.some((item) => item.Title == body.Title)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Movie already in playlist.")
  }

  movie.publicPlaylists.push(body)
  await movie.save();

  return movie;

};

const Move = async(req) =>{
  // try {
    let movie = await Playlist.findOne({ email: req.user.email });
    console.log(Playlist,"QWWQWQW")
    movie.publicPlaylists.forEach((movie) => console.log(movie._id.toString()===req.body.Id))
    const movieIndex = movie.publicPlaylists.findIndex((movie) => movie._id.toString() === req.body.Id); 

    if (movieIndex === -1) {
      console.log('Movie not found in publicPlaylists.');
      return;
    }
    const removedMovie = movie.publicPlaylists.splice(movieIndex, 1)[0];
   console.log(removedMovie,"remove")
    movie.privatePlaylists.push(removedMovie)
    await movie.save();
    return movie
  // } catch (error) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "Error moving document.'");
  // }
}


module.exports = {
  addMovieToPlaylist,
  getPlaylistByUser,
  Move
};
