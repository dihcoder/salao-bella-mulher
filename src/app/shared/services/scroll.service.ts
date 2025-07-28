import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ScrollService {

	private lastCall = 0;

	throttle(func: (...args: any[]) => void, limit: number): (...args: any[]) => void {
		return (...args: any[]) => {
			const now = Date.now();
			if (now - this.lastCall >= limit) {
				this.lastCall = now;
				func(...args);
			}
		};
	}
}
