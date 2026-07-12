/**
 * Links sociais / blog — altere URLs aqui.
 */
export const SOCIAL_URLS = {
	medium: 'https://medium.com/@maikonwebercarvalho',
	mediumFeed: 'https://medium.com/feed/@maikonwebercarvalho',
	github: 'https://github.com/maikonweber',
	linkedin: 'https://www.linkedin.com/in/maikonwebercorp/',
	x: 'https://x.com/MaikonWeber1',
	email: 'mailto:muttercorp@gmail.com'
};

/**
 * @param {string} value
 */
function unwrapCdata(value) {
	return value.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
}

/**
 * @param {string} block
 * @param {string} tag
 */
function extractTag(block, tag) {
	const cdata = new RegExp(
		`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`,
		'i'
	);
	const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
	const cdataMatch = block.match(cdata);
	if (cdataMatch?.[1] != null) return unwrapCdata(cdataMatch[1]);
	const plainMatch = block.match(plain);
	if (plainMatch?.[1] != null) return unwrapCdata(plainMatch[1].trim());
	return '';
}

/**
 * @param {string} html
 */
function stripHtml(html) {
	return html
		.replace(/<script[\s\S]*?<\/script>/gi, '')
		.replace(/<style[\s\S]*?<\/style>/gi, '')
		.replace(/<[^>]+>/g, ' ')
		.replace(/&nbsp;/g, ' ')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/\s+/g, ' ')
		.trim();
}

/**
 * @param {string} xml
 * @returns {Array<{ title: string, url: string, date: string | null, excerpt: string, categories: string[], image: string | null }>}
 */
export function parseMediumRss(xml) {
	const items = [];
	for (const match of xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)) {
		const block = match[1];
		const title = extractTag(block, 'title');
		const rawLink = extractTag(block, 'link');
		const url = rawLink.split('?')[0];
		const pubDate = extractTag(block, 'pubDate');
		const content =
			extractTag(block, 'content:encoded') || extractTag(block, 'description');
		const categories = [...block.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/gi)].map(
			(c) => c[1]
		);
		const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/gi);
		/** @type {string | null} */
		let image = null;
		if (imgMatch) {
			for (const tag of imgMatch) {
				const src = tag.match(/src=["']([^"']+)["']/i)?.[1];
				if (!src || src.includes('medium.com/_/stat') || src.includes('stat?event=')) continue;
				if (src.includes('cdn-images') || src.includes('miro.medium')) {
					image = src;
					break;
				}
				if (!image && src.startsWith('https://') && !src.includes('medium.com/_/')) {
					image = src;
				}
			}
		}

		const plain = stripHtml(content);
		const excerpt = plain.length > 220 ? `${plain.slice(0, 220).trimEnd()}…` : plain;

		if (!title || !url) continue;

		items.push({
			title,
			url,
			date: pubDate ? new Date(pubDate).toISOString() : null,
			excerpt,
			categories,
			image
		});
	}
	return items;
}

/**
 * @param {{ limit?: number, fetch?: typeof fetch }} [options]
 */
export async function fetchMediumPosts(options = {}) {
	const limit = options.limit ?? 10;
	const fetchFn = options.fetch ?? fetch;

	const response = await fetchFn(SOCIAL_URLS.mediumFeed, {
		headers: {
			Accept: 'application/rss+xml, application/xml, text/xml, */*'
		}
	});

	if (!response.ok) {
		throw new Error(`Medium RSS HTTP ${response.status}`);
	}

	const xml = await response.text();
	return parseMediumRss(xml).slice(0, limit);
}
