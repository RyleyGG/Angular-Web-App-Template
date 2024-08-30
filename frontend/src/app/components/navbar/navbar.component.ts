import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { ThemeService } from '../../theme/theme.service';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { OAuth2Service } from '../../auth/oauth2.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';
import { firstValueFrom } from 'rxjs';
import { User } from '../../models/user.interface';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonModule,
    RouterLink,
    MessagesModule,
    MessageModule,
    OverlayPanelModule,
    DividerModule,
    ToolbarModule,
    MenubarModule,
    RouterOutlet,
    ToolbarModule,
    RouterLinkActive,
    ToggleButtonModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: 'navbar.component.css',
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  loggedInUser: User | null = null;
  isDarkMode: boolean = false;

  constructor(
    private router: Router,
    private oauthService: OAuth2Service,
    private themeService: ThemeService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
  ) {
    this.isDarkMode = this.themeService.theme() == 'arya-blue';
  }

  async ngOnInit() {
    try {
      const isUserAuthenticated = await firstValueFrom(
        this.oauthService.validate_token(),
      );
      this.loggedIn = isUserAuthenticated;
    } catch (error) {
      console.error('Error checking user login status:', error);
    }

    this.userService.getCurrentUser().subscribe((data) => {
      this.loggedInUser = data;
    });
  }

  swapTheme(): void {
    const newTheme =
      this.themeService.theme() == 'arya-blue' ? 'saga-blue' : 'arya-blue';
    this.themeService.setTheme(newTheme);
    this.localStorageService.set('theme', newTheme);
    this.isDarkMode = newTheme == 'arya-blue';
  }

  signOut(): void {
    this.oauthService.sign_out();
    this.router.navigate(['/landing']);
    window.location.reload();
  }
}
