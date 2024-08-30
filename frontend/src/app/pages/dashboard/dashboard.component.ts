import {Component} from '@angular/core';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {RouterLink} from '@angular/router';
import {DataViewModule} from 'primeng/dataview';
import {CarouselModule} from 'primeng/carousel';
import {ConfirmationService, MessageService} from 'primeng/api';
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
  public loggedInUser: User | null = null;

  public editProfileDialogVisible: boolean = false;
  public updatedFirstName: string = '';
  public updatedLastName: string = '';
  public updatedEmail: string = '';

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    // Get user information...
    this.userService.getCurrentUser().subscribe((data) => {
      this.loggedInUser = data;
      this.updatedFirstName = this.loggedInUser?.first_name || '';
      this.updatedLastName = this.loggedInUser?.last_name || '';
      this.updatedEmail = this.loggedInUser?.email_address || '';
    });
  }

  public cancelUserUpdate() {
    this.updatedFirstName = this.loggedInUser?.first_name || '';
    this.updatedLastName = this.loggedInUser?.last_name || '';
    this.updatedEmail = this.loggedInUser?.email_address || '';
  }

  public updateUserInformation() {
    this.userService
      .updateCurrentUser({
        id: this.loggedInUser?.id!,
        first_name: this.updatedFirstName,
        last_name: this.updatedLastName,
        email_address: this.updatedEmail,
      })
      .subscribe((data) => {
        window.location.reload();
      });
  }

  public handleEditProfile() {
    this.editProfileDialogVisible = true;
  }
}
