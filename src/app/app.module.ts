import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MovieCardComponent } from "./movie-card/movie-card.component";
import { HomeComponent } from "./home/home.component";
import { AppService } from "./app.service";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [AppComponent, MovieCardComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}
