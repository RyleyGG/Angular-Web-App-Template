import {Component} from '@angular/core';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {RouterLink} from '@angular/router';
import {DataViewModule} from 'primeng/dataview';
import {CarouselModule} from 'primeng/carousel';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {SidebarModule} from 'primeng/sidebar';
import {ProgressBarModule} from 'primeng/progressbar';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {User} from '../../models/user.interface';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {UserService} from '../../services/user/user.service';
import {RippleModule} from 'primeng/ripple';

/**
 * Component for the user dashboard page
 */
@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [
		CheckboxModule,
		ProgressSpinnerModule,
		CarouselModule,
		FormsModule,
		DialogModule,
		InputTextModule,
		ProgressBarModule,
		DataViewModule,
		SidebarModule,
		ButtonModule,
		ConfirmDialogModule,
		RouterLink,
		CardModule,
		RippleModule,
	],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
	loggedInUser: User | null = null;
	userName = '';

	constructor(private userService: UserService) {
		this.userService.getCurrentUser().subscribe((user: User) => {
			this.loggedInUser = user;
			this.userName = user.first_name;
		});
	}
}
