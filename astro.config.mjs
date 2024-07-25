import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Docs DelvelK',
			expressiveCode: true,
			social: {
				github: 'https://github.com/SisDelvel',
			},
			defaultLocale: 'root', // opcional
			locales: {
				root: {
					label: 'Spanish',
					lang: 'es', // lang es obligatorio para los locales raíz
				}
			},
			sidebar: [
				{
					label: 'Comenzando',
					autogenerate: { directory: 'demo' },
				},
				{
					label: 'Avaluo',
					autogenerate: { directory: 'avaluo' },
				},
				{
					label: 'Catalogos',
					autogenerate: { directory: 'catalogos' },
				},
			],
		}),
	],
});
