import { effect, Inject, Injectable, Signal, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

/**
 * A service for working with the document theme (light/dark mode and others).
 */
@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	get currentThemeIcon(): Signal<string> {
		return this.currentThemeIconSignal.asReadonly();
	}

	currentTheme = signal<string>(Theme.light);

	chartChanges = signal(0);

	textColor = signal('');
	textColorSecondary = signal('');
	surfaceD = signal('');
	blue = signal('');
	green = signal('');
	yellow = signal('');
	chartTextColor = signal('');
	chartBackground = signal('');
	fontFamily = signal('');

	private currentThemeIconSignal = signal('pi pi-moon');

	/**
	 * Creates the ThemeService.
	 *
	 * @param document the document to set the theme for (don't worry about setting this, Angular injects this for us)
	 */
	constructor(
		@Inject(DOCUMENT) private document: Document,
		private localStorageService: LocalStorageService,
	) {
		effect(
			() => {
				const theme = this.currentTheme();

				this.setTheme(theme);
				switch (this.currentTheme()) {
					case Theme.light:
						this.currentThemeIconSignal.set('pi pi-moon');
						break;
					case Theme.dark:
						this.currentThemeIconSignal.set('pi pi-sun');
						break;
				}
			},
			{ allowSignalWrites: true },
		);
	}

	/**
	 * Sets a new theme for the application.
	 *
	 * @param {string} theme the name of the theme to use (the part before the .css in the filename)
	 */
	setTheme(theme: string): void {
		let themeLink = this.document.getElementById(
			'app-theme',
		) as HTMLLinkElement;

		if (!!themeLink) {
			themeLink.href = theme + '.css';
			this.currentTheme.set(theme);
			this.localStorageService.set('theme', theme);
		}

		setTimeout(() => {
			this.initializeStyles();
		}, 100);
	}

	private initializeStyles(): void {
		this.textColor.set(this.getStyleValue('--text-color'));
		this.textColorSecondary.set(
			this.getStyleValue('--text-color-secondary'),
		);
		this.chartTextColor.set(this.getStyleValue('--text-color'));
		this.surfaceD.set(this.getStyleValue('--surface-d'));
		this.blue.set(this.getStyleValue('--blue-500'));
		this.green.set(this.getStyleValue('--green-500'));
		this.yellow.set(this.getStyleValue('--yellow-500'));
		this.chartBackground.set(this.getStyleValue('--primary-color'));
		this.chartBackground.set(this.getStyleValue('--font-family'));

		this.initializeChartStyles();
	}

	private initializeChartStyles(): void {
		Chart.defaults.color = this.chartTextColor();
		Chart.defaults.borderColor = this.chartBackground();
		Chart.defaults.backgroundColor = this.chartBackground();
		(Chart.defaults.plugins as any)[ChartDataLabels.id] = {
			color: this.chartTextColor(),
			display: true,
			anchor: 'center',
			align: 'center',
			font: {
				family: this.fontFamily(),
			},
		};
		// Chart.defaults.font.size = +this.fontSize().split('px')[0];
		Chart.defaults.font.weight = 'bold';
		Chart.defaults.font.family = this.fontFamily();

		this.chartChanges.update((v) => v + 1);
	}

	private getStyleValue(propertyName: string): string {
		return getComputedStyle(this.document.body).getPropertyValue(
			propertyName,
		);
	}
}

export enum Theme {
	light = 'saga-blue',
	dark = 'arya-blue',
}
