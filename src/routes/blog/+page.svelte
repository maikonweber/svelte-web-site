<script>
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	/** @type {{ data: { mediumUrl: string, posts: Array<{ title: string, url: string, date: string | null, excerpt: string, categories: string[], image: string | null }>, error: string | null } }} */
	let { data } = $props();

	/**
	 * @param {string | null} iso
	 */
	function formatDate(iso) {
		if (!iso) return '';
		return new Date(iso).toLocaleDateString('pt-BR', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Blog — Maikon Weber | MutterCorp</title>
	<meta
		name="description"
		content="Últimos artigos de Maikon Weber no Medium: software, IA, produto e engenharia."
	/>
</svelte:head>

<div class="blog">
	<header class="hero" in:fade={{ duration: 400 }}>
		<p class="eyebrow">Blog</p>
		<h1>Escritos no Medium</h1>
		<p class="lede">
			Ideias sobre software, IA, produto e o fluxo de quem transforma especificação em código.
		</p>
		<a
			href={data.mediumUrl}
			class="medium-cta"
			target="_blank"
			rel="noopener noreferrer"
		>
			Abrir perfil no Medium
			<span aria-hidden="true">→</span>
		</a>
	</header>

	{#if data.error}
		<p class="status error" in:fade={{ duration: 300 }}>{data.error}</p>
		<p class="status">
			Enquanto isso, leia direto no
			<a href={data.mediumUrl} target="_blank" rel="noopener noreferrer">Medium</a>.
		</p>
	{:else if data.posts.length === 0}
		<p class="status" in:fade={{ duration: 300 }}>
			Nenhum post encontrado. Confira o
			<a href={data.mediumUrl} target="_blank" rel="noopener noreferrer">Medium</a>.
		</p>
	{:else}
		<ul class="post-list">
			{#each data.posts as post, i}
				<li in:fly={{ y: 24, duration: 500, delay: 60 + i * 60, easing: cubicOut }}>
					<article class="post" class:no-thumb={!post.image}>
						{#if post.image}
							<a
								class="thumb"
								href={post.url}
								target="_blank"
								rel="noopener noreferrer"
								tabindex="-1"
								aria-hidden="true"
							>
								<img src={post.image} alt="" loading="lazy" />
							</a>
						{/if}
						<div class="body">
							{#if post.date}
								<time datetime={post.date}>{formatDate(post.date)}</time>
							{/if}
							<h2>
								<a href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a>
							</h2>
							{#if post.excerpt}
								<p>{post.excerpt}</p>
							{/if}
							{#if post.categories.length}
								<ul class="tags">
									{#each post.categories.slice(0, 4) as tag}
										<li>{tag}</li>
									{/each}
								</ul>
							{/if}
							<a
								class="read"
								href={post.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								Ler no Medium
								<span aria-hidden="true">→</span>
							</a>
						</div>
					</article>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.blog {
		--paper: var(--site-fg);
		--muted: var(--site-muted);
		--accent: var(--site-accent);
		--accent-soft: var(--site-accent-soft);
		--surface: var(--site-surface);
		--line: var(--site-line);
		max-width: 44rem;
		margin: 0 auto;
		padding: 2.5rem 1.25rem 4rem;
		font-family: 'Manrope', system-ui, sans-serif;
		color: var(--paper);
		position: relative;
		isolation: isolate;
	}

	.blog::before {
		content: '';
		position: absolute;
		inset: -2rem -1rem auto;
		height: 16rem;
		background:
			radial-gradient(
				ellipse 70% 60% at 15% 0%,
				color-mix(in srgb, var(--site-orb-a) 35%, transparent),
				transparent
			),
			radial-gradient(
				ellipse 55% 50% at 95% 10%,
				color-mix(in srgb, var(--site-orb-b) 28%, transparent),
				transparent
			);
		pointer-events: none;
		z-index: -1;
	}

	.hero {
		margin-bottom: 2.5rem;
	}

	.eyebrow {
		margin: 0 0 0.4rem;
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		font-weight: 600;
		color: var(--accent-soft);
	}

	h1 {
		font-family: 'Syne', sans-serif;
		font-size: clamp(1.85rem, 5vw, 2.4rem);
		font-weight: 800;
		letter-spacing: -0.04em;
		margin: 0 0 0.65rem;
		line-height: 1.1;
	}

	.lede {
		margin: 0 0 1.25rem;
		color: var(--muted);
		line-height: 1.6;
		max-width: 36rem;
	}

	.medium-cta {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--paper);
		font-weight: 700;
		text-decoration: none;
		border-bottom: 1px solid var(--site-link-underline);
		padding: 0.2rem 0;
	}

	.medium-cta:hover {
		color: var(--accent-soft);
		border-color: var(--accent-soft);
	}

	.status {
		color: var(--muted);
		line-height: 1.55;
	}

	.status a {
		color: var(--accent-soft);
	}

	.status.error {
		color: var(--paper);
		padding: 0.85rem 1rem;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 0.5rem;
	}

	.post-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1.15rem;
	}

	.post {
		display: grid;
		grid-template-columns: 7.5rem 1fr;
		gap: 1.1rem;
		padding: 1.15rem;
		background: var(--surface);
		border: 1px solid var(--line);
		border-radius: 0.5rem;
		transition:
			border-color 0.2s ease,
			background 0.2s ease,
			transform 0.2s ease;
	}

	.post.no-thumb {
		grid-template-columns: 1fr;
	}

	.post:hover {
		border-color: var(--site-line-strong);
		background: var(--site-surface-hover);
		transform: translateY(-2px);
	}

	.thumb {
		display: block;
		border-radius: 0.35rem;
		overflow: hidden;
		aspect-ratio: 1;
		background: var(--site-chip-bg);
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.body {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	time {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--muted);
		letter-spacing: 0.02em;
	}

	h2 {
		margin: 0;
		font-family: 'Syne', sans-serif;
		font-size: 1.15rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.3;
	}

	h2 a {
		color: inherit;
		text-decoration: none;
	}

	h2 a:hover {
		color: var(--accent-soft);
	}

	.body > p {
		margin: 0;
		color: var(--muted);
		font-size: 0.92rem;
		line-height: 1.55;
	}

	.tags {
		list-style: none;
		margin: 0.15rem 0 0;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	.tags li {
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.22rem 0.45rem;
		border: 1px solid var(--line);
		border-radius: 0.25rem;
		background: var(--site-chip-bg);
		color: var(--paper);
	}

	.read {
		margin-top: 0.35rem;
		width: fit-content;
		color: var(--paper);
		font-weight: 700;
		font-size: 0.9rem;
		text-decoration: none;
		border-bottom: 1px solid var(--site-link-underline);
		padding: 0.15rem 0;
	}

	.read:hover {
		color: var(--accent-soft);
		border-color: var(--accent-soft);
	}

	@media (max-width: 560px) {
		.post {
			grid-template-columns: 1fr;
		}

		.thumb {
			aspect-ratio: 16 / 9;
			max-height: 11rem;
		}
	}
</style>
