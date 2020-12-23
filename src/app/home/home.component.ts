import { Component, HostListener, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { first } from "rxjs/operators";
import { APP_CONFIG } from "../app.config";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbdModalContent } from "../modal/modal.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  searchText: string;
  searchResults: [];
  nominatedMovies: any = [];
  showNominatedMovies: boolean = false;
  modalMessage: string = "";
  constructor(
    private _appService: AppService,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  onChangeSearchIp() {
    if (this.searchText === "") {
      this.searchResults = [];
      return;
    }
  }

  onClickSearch(page?) {
    if (this.searchText === "" || this.searchText === undefined) {
      this.searchResults = [];
      return;
    }
    const requestParams = {
      apiKey: APP_CONFIG.API_KEY,
      s: this.searchText,
      type: "movie",
      r: "json",
      page: page !== undefined ? page : 1,
    };

    this._appService
      .search(requestParams)
      .pipe(first())
      .subscribe(
        (responseData) => {
          if (responseData && responseData["Response"] === "True") {
            this.searchResults = responseData["Search"];
            let nominatedMovies = this._appService.getNominatedMovies();
            this.searchResults.forEach((_: any) => {
              _["isNominated"] = nominatedMovies[_["imdbID"]] ? true : false;
            });
          } else {
            this.modalMessage = responseData["Error"];
            this.open();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  open() {
    const modalRef = this._modalService.open(NgbdModalContent);
    modalRef.componentInstance.message = this.modalMessage;
  }

  onClickShowNominatedMovies() {
    this.showNominatedMovies = !this.showNominatedMovies;
    if (this.showNominatedMovies) {
      this.nominatedMovies = [];
      let tempNominatedMovies: any = this._appService.getNominatedMovies();
      for (let key in tempNominatedMovies)
        this.nominatedMovies.push(tempNominatedMovies[key]);
    }
  }

  onClickDelete(movie?) {
    let index: any = this.searchResults.findIndex(
      (_) => _["imdbID"] === movie["imdbID"]
    );
    let obj: any = this.searchResults[index];
    obj["isNominated"] = false;
    this._appService.removeMovieFromList(movie);
    let nmIdx = this.nominatedMovies.findIndex(
      (_) => _["imdbID"] === movie["imdbID"]
    );
    this.nominatedMovies.splice(nmIdx, 1);
  }

  @HostListener("document:click", ["$event"])
  clickout(event) {
    let classList = [
      "nominated-list-container",
      "movie-block",
      "info-block",
      "img-block",
      "delete-icon",
      "span-item",
      "img-item",
    ];
    if (
      event &&
      event.target &&
      event.target.className &&
      classList.indexOf(event.target.className) === -1
    ) {
      this.showNominatedMovies = false;
    }
  }
}
