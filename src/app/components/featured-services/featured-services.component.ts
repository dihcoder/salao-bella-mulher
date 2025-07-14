import { Component } from '@angular/core';

@Component({
    selector: 'app-featured-services',
    imports: [],
    templateUrl: './featured-services.component.html',
    styleUrl: './featured-services.component.scss'
})
export class FeaturedServicesComponent {
    services = [
        {
            icon: '/barbershop.svg',
            name: 'Corte Feminino',
            description: 'Realce sua beleza com um corte moderno e feito sob medida para o seu estilo e personalidade. Técnicas atuais, com atenção aos detalhes e acabamento impecável.',
            price: 49
        },
        {
            icon: '/flask-round-potion.svg',
            name: 'Hidratação Profunda',
            description: 'Devolva o brilho, a maciez e a vitalidade dos fios com um tratamento intensivo que nutre profundamente, ideal para cabelos ressecados, quimicamente tratados ou opacos.',
            price: 65
        },
        {
            icon: '/hairbrush.svg',
            name: 'Escova Modelada',
            description: 'Fios alinhados, com volume e movimento na medida certa. A escova ideal para um evento especial ou para se sentir ainda mais linda no dia a dia.',
            price: 40
        }
    ];
}
