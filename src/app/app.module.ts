import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { InputComponent } from './components/terminal/input/input.component';
import { PaneComponent } from './components/pane-manager/pane/pane.component';
import { PaneManagerComponent } from './components/pane-manager/pane-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    InputComponent,
    PaneManagerComponent,
    PaneComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
