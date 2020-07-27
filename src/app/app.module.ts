import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalComponent } from './terminal/terminal.component';
import { InputComponent } from './terminal/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
