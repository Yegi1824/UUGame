import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing,module";
import {BrowserModule} from '@angular/platform-browser';
import {BoardComponent} from "./components/board/board.component";
import {SquareComponent} from "./components/square/square.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDialogModule} from "@angular/material/dialog";
import {ResultModalComponent} from "./components/result-modal/result-modal.component";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareComponent,
    ResultModalComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
})
export class AppModule { }
