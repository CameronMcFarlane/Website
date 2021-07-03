import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { InputComponent } from './components/terminal/input/input.component';
import { DraggableDirective } from './directives/draggable.directive';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    InputComponent,
    DraggableDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
