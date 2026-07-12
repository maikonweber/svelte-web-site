import { fetchMediumPosts, SOCIAL_URLS } from '$lib/medium.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	try {
		const posts = await fetchMediumPosts({ fetch, limit: 12 });
		return {
			mediumUrl: SOCIAL_URLS.medium,
			posts,
			error: null
		};
	} catch (error) {
		console.error('Erro ao carregar posts do Medium:', error);
		return {
			mediumUrl: SOCIAL_URLS.medium,
			posts: [],
			error: 'Não foi possível carregar os posts do Medium agora.'
		};
	}
}
