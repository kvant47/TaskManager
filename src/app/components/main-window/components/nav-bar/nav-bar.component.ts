import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent  implements OnInit{

  constructor(
    private authService: AuthService
  ){}

  @Output() hideMenu = new EventEmitter<boolean>()

  public hideMenuMode = false;


  HideMenu(){
    this.hideMenuMode = !this.hideMenuMode;
    this.hideMenu.emit(this.hideMenuMode);
  }

  logout(){
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
