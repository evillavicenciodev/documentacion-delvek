import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Docs DelvelK',
			expressiveCode: true,
			defaultLocale: 'root', // opcional
			locales: {
				root: {
					label: 'Spanish',
					lang: 'es', // lang es obligatorio para los locales raíz
				}
			},
			social: {
				github: 'https://github.com/withastro/starlight',
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
			],
		}),
	],
});
