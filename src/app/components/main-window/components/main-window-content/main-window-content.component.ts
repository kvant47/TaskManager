import { Component } from '@angular/core';

@Component({
  selector: 'app-main-window-content',
  templateUrl: './main-window-content.component.html',
  styleUrl: './main-window-content.component.css'
})
export class MainWindowContentComponent {

  public fullscreenMode = false;

  public hideMenuMode: boolean = false;

  HideMenu(newValue: boolean){
    this.hideMenuMode = newValue;
  };
}
