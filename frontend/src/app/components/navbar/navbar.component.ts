import { Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
	Router,
	RouterLink,
	RouterLinkActive,
	RouterOutlet,
} from '@angular/router';
import { Theme, ThemeService } from '../../theme/theme.service';
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
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { TieredMenuModule } from 'primeng/tieredmenu';

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
		DialogModule,
		FormsModule,
		InputTextModule,
		RippleModule,
		TieredMenuModule,
	],
	templateUrl: './navbar.component.html',
	styleUrl: 'navbar.component.css',
})
export class NavbarComponent implements OnInit {
	loggedIn: boolean = false;
	loggedInUser: User | null = null;
	isDarkMode: boolean = false;
	themeIcon = signal('');
	textColor = signal('');

	dummyNavItems = [
		{
			label: 'Home',
			icon: 'pi pi-home',
			routerLink: ['/dashboard'],
		},
		{
			label: 'Projects',
			icon: 'pi pi-search',
			items: [
				{
					label: 'Project 1',
					icon: 'pi pi-bolt',
				},
				{
					label: 'Project 2',
					icon: 'pi pi-server',
				},
				{
					label: 'Project 3',
					icon: 'pi pi-pencil',
				},
				{
					label: 'Project 4',
					icon: 'pi pi-palette',
					items: [
						{
							label: 'Apollo',
							icon: 'pi pi-palette',
						},
						{
							label: 'Ultima',
							icon: 'pi pi-palette',
						},
					],
				},
			],
		},
		{
			label: 'Contact',
			icon: 'pi pi-envelope',
		},
	];

	constructor(
		private router: Router,
		private oauthService: OAuth2Service,
		private themeService: ThemeService,
		private localStorageService: LocalStorageService,
		private userService: UserService,
	) {
		effect(
			() => {
				const themeIcon = this.themeService.currentThemeIcon();
				this.themeIcon.set(this.themeService.currentThemeIcon());
				console.log(this.themeService.textColor());
				this.textColor.set(this.themeService.textColor());

				this.isDarkMode =
					this.themeService.currentTheme() === Theme.dark;
			},
			{ allowSignalWrites: true },
		);
	}

	async ngOnInit() {
		try {
			this.loggedIn = await firstValueFrom(
				this.oauthService.validate_token(),
			);
		} catch (error) {
			console.error('Error checking user login status:', error);
		}

		this.userService.getCurrentUser().subscribe((data) => {
			this.loggedInUser = data;
		});
	}

	swapTheme(): void {
		this.themeService.currentTheme.set(
			this.themeService.currentTheme() === Theme.dark
				? Theme.light
				: Theme.dark,
		);
		this.isDarkMode = this.themeService.currentTheme() === Theme.dark;
	}

	signOut(): void {
		this.oauthService.sign_out();
		this.router.navigate(['/landing']);
		window.location.reload();
	}
}
