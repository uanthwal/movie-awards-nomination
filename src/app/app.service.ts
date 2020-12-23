import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { URL_CONFIG } from "./app.config";

@Injectable()
export class AppService {
  nominatedMovies = {};
  constructor(private http: HttpClient) {}

  search(params) {
    return this.http.get(URL_CONFIG.BASE_URL + URL_CONFIG.SEARCH_URL, {
      params: new HttpParams({ fromObject: params }),
    });
  }

  addMovieToList(movie?) {
    movie["isNominated"] = true;
    this.nominatedMovies[movie.imdbID] = movie;
  }

  getNominatedMovies() {
    return this.nominatedMovies;
  }

  getNominatedMoviesCount() {
    return Object.keys(this.nominatedMovies).length;
  }

  removeMovieFromList(movie?) {
    delete this.nominatedMovies[movie["imdbID"]];
  }
}
