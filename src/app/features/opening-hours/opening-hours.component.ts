import { Component } from '@angular/core';

@Component({
	selector: 'app-opening-hours',
	imports: [],
	templateUrl: './opening-hours.component.html',
	styleUrl: './opening-hours.component.scss'
})
export class OpeningHoursComponent {
	hours = [
		{ day: 'Segunda a Sexta', time: '10h - 20h30', isClosed: false },
		{ day: 'Sábado', time: 'Fechado', isClosed: true },
		{ day: 'Domingo', time: '10h – 20h30', isClosed: false }
	];
}
