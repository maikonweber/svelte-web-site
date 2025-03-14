<svelte:head>
	{#if previewHtml}
		<title>{`${getPreviewText(title, 60)}... - Maikon Weber Blog`}</title>
		<meta name="description" content={`${getPreviewText(preview, 160)}...`}>
		<meta name="keywords" content="Tecnologia, Ciência, Música, Blog, Maikon Weber, Desenvolvimento, Svelte, JavaScript">
		<meta name="author" content="Maikon Weber">
		<meta property="og:title" content={`${getPreviewText(title, 60)}... - Maikon Weber Blog`}>
		<meta property="og:description" content={`${getPreviewText(preview, 160)}...`}>
		<meta property="og:image" content={img || 'default-image-url'}>
		<meta property="og:url" content={`https://muttercorp.com.br/blog/${window.location.pathname.split('/').pop()}`}>
		<meta name="twitter:card" content="summary_large_image">
		<meta property="og:type" content="article">
	{:else}
		<title>Maikon Weber Blog</title>
		<meta name="description" content="Bem-vindo ao Maikon Weber Blog, onde compartilho minhas experiências e conhecimentos sobre tecnologia, ciência e música.">
		<meta name="keywords" content="Tecnologia, Ciência, Música, Blog, Maikon Weber, Desenvolvimento, Svelte, JavaScript">
		<meta name="author" content="Maikon Weber">
		<meta property="og:title" content="Maikon Weber Blog">
		<meta property="og:description" content="Descubra artigos sobre tecnologia, ciência e música no Maikon Weber Blog.">
		<meta property="og:image" content="default-image-url">
		<meta property="og:url" content="https://muttercorp.com.br/blog">
		<meta name="twitter:card" content="summary_large_image">
		<meta property="og:type" content="website">
	{/if}
</svelte:head>
<script>
	import { onMount } from 'svelte';

	let blogName = "Maikon Weber Blog"
	let previewHtml = $state('');
	let error = $state(false);
	let preview = $state('')
	let title = $state('')
	let errorMessage = $state('');
	let img = $state('');

	function getPreviewText(text, maxLength) {
		return text.length > maxLength ? text.slice(0, maxLength) : text;
	}


	async function fetchPostData(slug) {
		try {
			const response = await fetch(`https://dev.muttercorp.com.br/blog/${slug}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Failed to fetch post data');
			}

			const data = await response.json();
			if (!data) {
				throw new Error('Post not found');
			}

			img = data.img;
			const html = data.text;
			title = data.titulo
			preview = data.preview
			previewHtml = html;
			error = false; // Reset error state if fetch is successful
		} catch (error) {
			console.error(error);
			error = true;
			errorMessage = error.message || 'An unexpected error occurred';
		}
	}

	onMount(() => {
		const slug = window.location.pathname.split('/').pop(); // Supondo que o slug está no final da URL
		fetchPostData(slug);
	});
</script>

{#if error}
	<div class="max-w-md mx-auto p-6 bg-red-100 text-red-800 border border-red-200 rounded-lg shadow text-center">
		<h1 class="text-2xl font-bold mb-4">Erro</h1>
		<p class="text-lg">{errorMessage}</p>
	</div>
{:else}
	<div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
		<div class="flex flex-col gap-6">
			<img src={img} alt="Post Image" class="w-full h-auto rounded-lg shadow" />
			<div class="post-body">
				{@html previewHtml}
			</div>
		</div>
	</div>
{/if}


<style>
	/* Adicionando estilos para blocos de código */
	.code-block {
		background: #f5f5f5;
		padding: 1rem;
		border-radius: 5px;
		overflow-x: auto;
	}

	.code-block .language-js {
		color: #d73a49;
	}

	/* Outros estilos existentes */
	body {
		font-family: 'Arial', sans-serif;
		margin: 0;
		padding: 0;
		background: linear-gradient(to right, #f8f9fa, #e9ecef);
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
		margin-top: 40px;
	}

	.post {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.post-image {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.post-title {
		font-size: 2.5em;
		color: #343a40;
		margin: 0;
		line-height: 1.2;
	}

	.post-body {
		font-size: 1.1em;
		color: #495057;
		white-space: pre-wrap;
		word-wrap: break-word;
		line-height: 1.8;
	}

	.post-body h1,
	.post-body h2,
	.post-body h3 {
		margin-top: 1em;
		margin-bottom: 0.5em;
		color: #343a40;
	}

	.post-body code {
		background: #f8f9fa;
		border-radius: 4px;
		padding: 2px 4px;
		font-size: 0.9em;
	}

	.post-body pre {
		background: #f1f3f5;
		border-radius: 4px;
		padding: 10px;
		overflow-x: auto;
	}

	.error-container {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
		background: #f8d7da;
		color: #721c24;
		border: 1px solid #f5c6cb;
		border-radius: 8px;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
		text-align: center;
	}

	.error-container h1 {
		font-size: 2em;
		margin-bottom: 10px;
	}

	.error-container p {
		font-size: 1.2em;
	}
</style>
