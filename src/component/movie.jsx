import { deleteMovie, getMovies } from "../services/fakeMovieService";
import { Component } from "react";
import React from "react";
import Heart from "./heart";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";

class Movie extends Component {
  state = { movies: getMovies(), pageSize: 2, currentPage: 1};

  handleDelete = (movieId) => {
    const movies = this.state.movies.filter((movie) => movie._id !== movieId);
    this.setState({ movies });
    deleteMovie(movieId);
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.findIndex((e)=>e._id === movie._id)
    movies[index].liked = ! movies[index].liked;
    this.setState(movies)
  }

  handleChangePage = (page) =>{
    //diviser le tableau de films en x partie
    const movies = [...this.state.movies]
    const numElementPerPage = movies.length / this.state.pageSize;
    console.log("PAGE " + page)
    this.setState({currentPage: page})
    //const lastElement = numElementPerPage *  movies.length
    //const firstElement = 
    //movies.slice()
  }

  render() {
    const {length: count} = this.state.movies;
    const {pageSize, currentPage} = this.state

     if (count === 0 )  return <h2> There are no movies in the database DUCON</h2>
     const paginatemovies = paginate(this.state.movies, this.state.pageSize)
    return (
       <React.Fragment>
    
       <h2>Showing {count} movies in the database</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Titre</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td><Heart onLike= {() => this.handleLike(movie)} isLiked={movie.liked} ></Heart></td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDelete(movie._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
          <Pagination itemsCount={count} pageSize={pageSize} changePage= {this.handleChangePage} currentPage = {currentPage}></Pagination>
        </React.Fragment>
    );
  }
}

export default Movie;
