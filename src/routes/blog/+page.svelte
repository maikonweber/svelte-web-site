<svelte:head>
	<title>CyberBlog - Pensamentos do Futuro</title>
	<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Press+Start+2P&display=swap" rel="stylesheet">
</svelte:head>

<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let posts = [];
	let loading = true;

	async function fetchPosts() {
		try {
			const response = await fetch('https://api.example.com/posts');
			posts = await response.json();
		} catch (error) {
			console.error('Error fetching posts:', error);
		} finally {
			loading = false;
		}
	}

	onMount(fetchPosts);
</script>

<div class="cyberpunk-container">
	<!-- Grid de fundo animado -->
	<div class="cyber-grid"></div>

	<!-- Header -->
	<header class="cyber-header">
		<div class="glitch-container">
			<h1 class="glitch" data-text="CyberBlog">CyberBlog</h1>
		</div>
		<p class="neon-text">Explorando o futuro através das palavras</p>
	</header>

	<!-- Conteúdo Principal -->
	<main class="cyber-main">
		{#if loading}
			<div class="loading-container">
				<div class="cyber-spinner"></div>
				<p class="neon-text">Carregando dados...</p>
			</div>
		{:else}
			<div class="posts-grid">
				{#each posts as post}
					<article 
						class="cyber-card"
						in:fly="{{ y: 50, duration: 800 }}"
					>
						<div class="card-image">
							<img src={post.image} alt={post.title} />
							<div class="image-glitch"></div>
						</div>
						<div class="card-content">
							<h2 class="cyber-title">{post.title}</h2>
							<p class="cyber-text">{post.excerpt}</p>
							<div class="card-footer">
								<span class="cyber-date">{post.date}</span>
								<a href={`/blog/${post.slug}`} class="cyber-button">
									<span class="button-text">Ler mais</span>
									<span class="button-glitch"></span>
								</a>
							</div>
						</div>
					</article>
				{/each}
			</div>
		{/if}
	</main>
</div>

<style>
	/* Estilos Base */
	:global(body) {
		background: #0a0a0f;
		color: #fff;
		font-family: 'Orbitron', sans-serif;
		margin: 0;
		overflow-x: hidden;
	}

	.cyberpunk-container {
		min-height: 100vh;
		position: relative;
		padding: 2rem;
		background: linear-gradient(45deg, #0a0a2e, #1a1a3a);
	}

	/* Grid de Fundo */
	.cyber-grid {
		position: fixed;
		inset: 0;
		background: 
			linear-gradient(90deg, #ff00ea 1px, transparent 1px) 0 0 / 50px 50px,
			linear-gradient(0deg, #00f6ff 1px, transparent 1px) 0 0 / 50px 50px;
		opacity: 0.1;
		z-index: 0;
		animation: grid-scroll 20s linear infinite;
	}

	/* Header Estilizado */
	.cyber-header {
		text-align: center;
		margin-bottom: 4rem;
		position: relative;
		z-index: 1;
	}

	.glitch {
		font-family: 'Press Start 2P', cursive;
		font-size: 4rem;
		color: #fff;
		text-shadow: 
			2px 2px #ff00ea,
			-2px -2px #00f6ff;
		animation: glitch 1s infinite;
	}

	.neon-text {
		color: #00f6ff;
		text-shadow: 0 0 5px #00f6ff, 0 0 10px #00f6ff;
		font-size: 1.2rem;
	}

	/* Cards */
	.posts-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		position: relative;
		z-index: 1;
	}

	.cyber-card {
		background: rgba(255, 255, 255, 0.05);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		overflow: hidden;
		transition: transform 0.3s;
		position: relative;
	}

	.cyber-card:hover {
		transform: translateY(-5px);
	}

	.cyber-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(45deg, #ff00ea, #00f6ff);
		opacity: 0;
		transition: opacity 0.3s;
	}

	.cyber-card:hover::before {
		opacity: 0.1;
	}

	.card-image {
		position: relative;
		height: 200px;
		overflow: hidden;
	}

	.card-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image-glitch {
		position: absolute;
		inset: 0;
		background: linear-gradient(45deg, #ff00ea, #00f6ff);
		mix-blend-mode: overlay;
		opacity: 0.3;
	}

	.card-content {
		padding: 1.5rem;
	}

	.cyber-title {
		font-size: 1.5rem;
		margin-bottom: 1rem;
		color: #fff;
		text-shadow: 0 0 5px #ff00ea;
	}

	.cyber-text {
		color: #b8b8b8;
		line-height: 1.6;
		margin-bottom: 1.5rem;
	}

	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cyber-date {
		color: #00f6ff;
		font-size: 0.9rem;
	}

	.cyber-button {
		position: relative;
		padding: 0.5rem 1rem;
		background: linear-gradient(45deg, #ff00ea, #00f6ff);
		border: none;
		border-radius: 5px;
		color: #fff;
		text-decoration: none;
		font-weight: bold;
		overflow: hidden;
	}

	.button-glitch {
		position: absolute;
		inset: 0;
		background: linear-gradient(45deg, #ff00ea, #00f6ff);
		filter: blur(10px);
		opacity: 0;
		transition: opacity 0.3s;
	}

	.cyber-button:hover .button-glitch {
		opacity: 0.5;
	}

	/* Animações */
	@keyframes grid-scroll {
		0% { transform: translateY(0); }
		100% { transform: translateY(50px); }
	}

	@keyframes glitch {
		0% { text-shadow: 2px 2px #ff00ea, -2px -2px #00f6ff; }
		25% { text-shadow: -2px 2px #ff00ea, 2px -2px #00f6ff; }
		50% { text-shadow: 2px -2px #ff00ea, -2px 2px #00f6ff; }
		75% { text-shadow: -2px -2px #ff00ea, 2px 2px #00f6ff; }
		100% { text-shadow: 2px 2px #ff00ea, -2px -2px #00f6ff; }
	}

	/* Loading */
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.cyber-spinner {
		width: 50px;
		height: 50px;
		border: 3px solid #ff00ea;
		border-top-color: #00f6ff;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>