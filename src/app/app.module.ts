import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { InputComponent } from './components/terminal/input/input.component';
import { PaneDirective } from './directives/pane.directive';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    InputComponent,
    PaneDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
