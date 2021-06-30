import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalComponent } from './terminal/terminal.component';
import { InputComponent } from './terminal/input/input.component';
import { GitHubLogoComponent } from './svg/github.logo.component';
import { GitHubMarkComponent } from './svg/github.mark.component';
import { DraggableDirective } from './directives/draggable.directive';

@NgModule({
  declarations: [
    AppComponent,
    TerminalComponent,
    InputComponent,
    GitHubLogoComponent,
    GitHubMarkComponent,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
