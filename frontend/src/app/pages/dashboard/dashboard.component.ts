import {Component, effect} from '@angular/core';
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
import {ChartModule} from 'primeng/chart';
import {ThemeService} from '../../theme/theme.service';

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
		ChartModule,
	],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
	loggedInUser: User | null = null;
	userName = '';

	chartOneData: any = {};
	chartOneOpts: any = {};

	chartTwoData: any = {};
	chartTwoOpts: any = {};

	chartThreeData: any = {};
	chartThreeOpts: any = {};

	chartFourData: any = {};
	chartFourOpts: any = {};

	constructor(
		private userService: UserService,
		private themeService: ThemeService,
	) {
		this.userService.getCurrentUser().subscribe((user: User) => {
			this.loggedInUser = user;
			this.userName = user.first_name;
		});

		effect(() => {
			const chartChanges = this.themeService.chartChanges();

			this.initializeCharts();
		});
	}

	initializeCharts(): void {
		this.chartOneData = {
			labels: ['Q1', 'Q2', 'Q3', 'Q4'],
			datasets: [
				{
					label: 'Sales',
					data: [540, 325, 702, 620],
					backgroundColor: [
						'rgba(255, 159, 64, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(153, 102, 255, 0.2)',
					],
					borderColor: [
						'rgb(255, 159, 64)',
						'rgb(75, 192, 192)',
						'rgb(54, 162, 235)',
						'rgb(153, 102, 255)',
					],
					borderWidth: 1,
				},
			],
		};

		this.chartOneOpts = {
			plugins: {
				legend: {
					labels: {
						color: this.themeService.textColor(),
					},
				},
			},
			scales: {
				y: {
					beginAtZero: true,
					ticks: {
						color: this.themeService.textColor(),
					},
					grid: {
						drawBorder: false,
						color: this.themeService.surfaceD(),
					},
				},
				x: {
					ticks: {
						color: this.themeService.textColor(),
					},
					grid: {
						drawBorder: false,
						color: this.themeService.surfaceD(),
					},
				},
			},
		};

		this.chartTwoData = {
			labels: ['A', 'B', 'C'],
			datasets: [
				{
					data: [540, 325, 702],
					backgroundColor: [
						this.themeService.blue(),
						this.themeService.yellow(),
						this.themeService.green(),
					],
					hoverBackgroundColor: [
						this.themeService.blue(),
						this.themeService.yellow(),
						this.themeService.green(),
					],
				},
			],
		};

		this.chartTwoOpts = {
			plugins: {
				legend: {
					labels: {
						usePointStyle: true,
						color: this.themeService.textColor(),
					},
				},
			},
		};

		this.chartThreeData = {
			labels: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
			],
			datasets: [
				{
					type: 'bar',
					label: 'Dataset 1',
					backgroundColor: this.themeService.blue(),
					data: [50, 25, 12, 48, 90, 76, 42],
				},
				{
					type: 'bar',
					label: 'Dataset 2',
					backgroundColor: this.themeService.green(),
					data: [21, 84, 24, 75, 37, 65, 34],
				},
				{
					type: 'bar',
					label: 'Dataset 3',
					backgroundColor: this.themeService.yellow(),
					data: [41, 52, 24, 74, 23, 21, 32],
				},
			],
		};

		this.chartThreeOpts = {
			maintainAspectRatio: false,
			aspectRatio: 0.8,
			plugins: {
				tooltip: {
					mode: 'index',
					intersect: false,
				},
				legend: {
					labels: {
						color: this.themeService.textColor(),
					},
				},
			},
			scales: {
				x: {
					stacked: true,
					ticks: {
						color: this.themeService.textColorSecondary(),
					},
					grid: {
						color: this.themeService.surfaceD(),
						drawBorder: false,
					},
				},
				y: {
					stacked: true,
					ticks: {
						color: this.themeService.textColorSecondary(),
					},
					grid: {
						color: this.themeService.surfaceD(),
						drawBorder: false,
					},
				},
			},
		};

		this.chartFourData = {
			labels: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
			],
			datasets: [
				{
					label: 'First Dataset',
					data: [65, 59, 80, 81, 56, 55, 40],
					fill: false,
					borderColor: this.themeService.blue(),
					tension: 0.4,
				},
				{
					label: 'Second Dataset',
					data: [28, 48, 40, 19, 86, 27, 90],
					fill: false,
					borderColor: this.themeService.green(),
					tension: 0.4,
				},
			],
		};

		this.chartFourOpts = {
			maintainAspectRatio: false,
			aspectRatio: 0.6,
			plugins: {
				legend: {
					labels: {
						color: this.themeService.textColor(),
					},
				},
			},
			scales: {
				x: {
					ticks: {
						color: this.themeService.textColorSecondary(),
					},
					grid: {
						color: this.themeService.surfaceD(),
						drawBorder: false,
					},
				},
				y: {
					ticks: {
						color: this.themeService.textColorSecondary(),
					},
					grid: {
						color: this.themeService.surfaceD(),
						drawBorder: false,
					},
				},
			},
		};
	}
}
