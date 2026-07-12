/**
 * Links da página /about (About me).
 * Altere URLs aqui — a página importa este arquivo.
 */
import { PRODUCT_URLS } from '$lib/products.js';
import { SOCIAL_URLS } from '$lib/medium.js';

export const PROFILE = {
	name: 'Maikon Weber',
	fullName: 'Maikon Weber de Carvalho',
	role: 'Senior Software Engineer · Solutions Architect · Fundador da MutterCorp',
	location: 'São Paulo, Brasil',
	photo: 'https://avatars.githubusercontent.com/u/45263705?v=4',
	about: [
		'Sou desenvolvedor full stack e arquiteto de soluções, com foco em NestJS, Kafka e sistemas distribuídos. Fundei a MutterCorp para transformar ideias em produtos digitais — de APIs e painéis a SaaS com IA.',
		'Hoje atuo na Abbiamo com infraestrutura logística para e-commerce. Já passei por dados geoespaciais (Smart Sky), AIoT (Group Link One) e BPO/telecom (Grupo PLL), sempre entregando software que resolve problema real de negócio.'
	]
};

export const ABOUT_URLS = {
	site: '/',
	blog: '/blog',
	whatsapp:
		'https://wa.me/5511915009625?text=' +
		encodeURIComponent('Olá Maikon! Vi seu About me e quero conversar.'),
	email: SOCIAL_URLS.email,
	linkedin: SOCIAL_URLS.linkedin,
	github: SOCIAL_URLS.github,
	x: SOCIAL_URLS.x,
	medium: SOCIAL_URLS.medium,
	cv: '/Profile.pdf',
	emotiveCare: PRODUCT_URLS.emotiveCare,
	jyhhad: PRODUCT_URLS.jyhhad,
	noticiaApi: PRODUCT_URLS.noticiaApi,
	barbeiroShop: PRODUCT_URLS.barbeiroShop,
	abbiamolog: 'https://abbiamolog.com/',
	smartSky: 'https://smartsky.com.br',
	groupLinkOne: 'https://grouplinkone.com/',
	grupoPll: 'https://grupopll.com.br'
};

/** @typedef {{ label: string, href: string, hint?: string, external?: boolean, download?: boolean }} AboutLink */

/** @type {{ id: string, title: string, links: AboutLink[] }[]} */
export const LINK_SECTIONS = [
	{
		id: 'contato',
		title: 'Contato',
		links: [
			{ label: 'WhatsApp', href: ABOUT_URLS.whatsapp, hint: 'Fale comigo agora', external: true },
			{ label: 'E-mail', href: ABOUT_URLS.email, hint: 'muttercorp@gmail.com' },
			{
				label: 'LinkedIn',
				href: ABOUT_URLS.linkedin,
				hint: 'Currículo e recomendações',
				external: true
			},
			{ label: 'Baixar CV', href: ABOUT_URLS.cv, hint: 'PDF', download: true }
		]
	},
	{
		id: 'produtos',
		title: 'Produtos MutterCorp',
		links: [
			{
				label: 'EmotiveCare',
				href: ABOUT_URLS.emotiveCare,
				hint: 'Saúde emocional com IA',
				external: true
			},
			{
				label: 'Jyhhad',
				href: ABOUT_URLS.jyhhad,
				hint: 'Vampire: The Eternal Struggle online',
				external: true
			},
			{
				label: 'Notice',
				href: ABOUT_URLS.noticiaApi,
				hint: 'Agregador de notícias + API',
				external: true
			},
			{
				label: 'BarberSync',
				href: ABOUT_URLS.barbeiroShop,
				hint: 'CRM e WhatsApp para barbearias',
				external: true
			},
			{ label: 'Site MutterCorp', href: ABOUT_URLS.site, hint: 'Produtos, serviços e experiências' }
		]
	},
	{
		id: 'experiencia',
		title: 'Experiência',
		links: [
			{
				label: 'Abbiamo',
				href: ABOUT_URLS.abbiamolog,
				hint: 'Logística · e-commerce · atual',
				external: true
			},
			{
				label: 'Smart Sky',
				href: ABOUT_URLS.smartSky,
				hint: 'Infra de dados · geoespacial',
				external: true
			},
			{
				label: 'Group Link One',
				href: ABOUT_URLS.groupLinkOne,
				hint: 'AIoT · telemetria',
				external: true
			},
			{
				label: 'Grupo PLL',
				href: ABOUT_URLS.grupoPll,
				hint: 'BPO · telecom',
				external: true
			}
		]
	},
	{
		id: 'redes',
		title: 'Redes',
		links: [
			{
				label: 'Medium',
				href: ABOUT_URLS.medium,
				hint: 'Blog e artigos',
				external: true
			},
			{ label: 'Blog no site', href: ABOUT_URLS.blog, hint: 'Últimos posts' },
			{ label: 'GitHub', href: ABOUT_URLS.github, hint: '@maikonweber', external: true },
			{ label: 'X / Twitter', href: ABOUT_URLS.x, hint: '@MaikonWeber1', external: true }
		]
	}
];
