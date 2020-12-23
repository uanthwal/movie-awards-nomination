import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { APP_CONFIG } from "../app.config";
import { AppService } from "../app.service";
import { NgbdModalContent } from "../modal/modal.component";

@Component({
  selector: "app-movie-card",
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.scss"],
})
export class MovieCardComponent implements OnInit {
  @Input() card;
  constructor(
    private _appService: AppService,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  onClickNominateBtn(card?) {
    if (card.isNominated) return;
    if (
      this._appService.getNominatedMoviesCount() >=
      APP_CONFIG.MAX_NOMINATION_ALLOWED
    ) {
      this.displayErrorMsg();
      return;
    }
    this._appService.addMovieToList(card);
  }

  displayErrorMsg() {
    const modalRef = this._modalService.open(NgbdModalContent);
    modalRef.componentInstance.message = APP_CONFIG.MAX_NOMINATION_ERR_MSG;
  }
}
