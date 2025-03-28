<script>
	import { onMount } from 'svelte';

	let preview = $state('');
	let image = $state(null);
	let title = $state('');
	let body = $state('');
	let previewHtml = $state('');
	let isLoading = true; // Variável para controlar o estado de carregamento
	let isAuthenticated = false;

	// Função para converter Markdown para HTML
	async function convertMarkdownToHtml(markdown) {
		const response = await fetch('https://api.github.com/markdown', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ text: markdown, mode: 'gfm' })
		});
		const html = await response.text();
		return html;
	}

	async function validateToken() {
		const token = localStorage.getItem('MutterCorp');
		if (!token) {
			return false; // Não autenticado se não houver token
		}

		const response = await fetch('https://dev.muttercorp.com.br/users/check-admin', {
			method: 'GET',
			headers: {
				accept: '*/*',
				Authorization: `Bearer ${token}` // Envia o token no cabeçalho Authorization
			}
		});

		if (response.ok) {
			return true; // Autenticado
		} else {
			return false; // Não autenticado
		}
	}

	// Função para processar a conversão do Markdown
	async function handleConvertMarkdown() {
		previewHtml = await convertMarkdownToHtml(body);
	}

	function handleSubmit(event) {
		event.preventDefault();

		// Cria um objeto FormData para enviar os dados
		const formData = new FormData();
		formData.append('file', image);
		formData.append('titulo', title);
		formData.append('text', previewHtml);
		formData.append('preview', preview);

		fetch('https://dev.muttercorp.com.br/blog', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${localStorage.getItem('MutterCorp')}`
			},
			body: formData
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success:', data);
				// Handle success
			})
			.catch((error) => {
				console.error('Error:', error);
				// Handle error
			});
	}

	onMount(async () => {
		isAuthenticated = await validateToken();
		isLoading = false; // A autenticação terminou
		if (!isAuthenticated) {
			window.location.href = '/login'; // Redireciona para login se não autenticado
		}
	});
</script>

<div class="container">
	<header>
		<h1>Minha Página Protegida</h1>
	</header>
	<p class="message">Este conteúdo só é acessível se o usuário estiver autenticado.</p>

	<form onsubmit={handleSubmit}>
		<div class="form-group">
			<label for="image">Imagem:</label>
			<input
				type="file"
				id="image"
				accept="image/*"
				onchange={(event) => (image = event.target.files[0])}
			/>
		</div>
		<div class="form-group">
			<label for="title">Título:</label>
			<input type="text" id="title" bind:value={title} />
		</div>
		<div class="form-group">
			<label for="body">Corpo:</label>
			<textarea id="body" bind:value={body}></textarea>
		</div>

		<div class="form-group">
			<label for="body">Preview:</label>
			<textarea id="body" bind:value={preview}></textarea>
		</div>

		<button type="button" onclick={handleConvertMarkdown}>Converter Markdown</button>
		<button type="submit">Enviar</button>
	</form>

	<div class="preview">
		<h2>Pré-visualização:</h2>
		{@html previewHtml}
	</div>
</div>

<style>
	/* Seu CSS permanece inalterado, incluindo os estilos do esqueleto */
	input {

	}

	body {
		font-family: Arial, sans-serif;
		background-color: #f4f4f4;
		margin: 0;
		padding: 0;
	}

	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	header {
		text-align: center;
		margin-bottom: 20px;
	}

	h1 {
		font-size: 2em;
		color: #333;
	}

	form {
		display: flex;
		flex-direction: column;
	}

	.form-group {
		margin-bottom: 15px;
	}

	label {
		display: block;
		font-weight: bold;
		margin-bottom: 5px;
	}

	input[type='text'],
	textarea {
		width: 100%;
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	input[type='file'] {
		margin-top: 5px;
	}

	textarea {
		resize: vertical;
		min-height: 150px;
	}

	button {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		margin-bottom: 10px;
	}

	button:hover {
		background-color: #0056b3;
	}

	.message {
		margin-top: 20px;
		font-size: 1.2em;
		color: #333;
	}

	.preview {
		border: 1px solid #ddd;
		padding: 10px;
		border-radius: 4px;
		background-color: #f9f9f9;
		margin-top: 20px;
	}

	/* Skeleton styles */
	.skeleton {
		opacity: 0.6;
		animation: pulse 1.5s infinite;
	}

	.skeleton-text {
		background-color: #e0e0e0;
		border-radius: 4px;
		height: 20px;
		width: 100%;
		margin-bottom: 10px;
	}

	.skeleton-box {
		background-color: #e0e0e0;
		border-radius: 4px;
		height: 40px;
		width: 100%;
		margin-bottom: 15px;
	}

	.skeleton-button {
		background-color: #e0e0e0;
		border-radius: 4px;
		height: 50px;
		width: 100px;
		margin-top: 15px;
	}

	input[type='text'],
	textarea {
    color: #000 !important;
	}

	input,
textarea {
    color: #000 !important;
}	
.preview {
  color: #000 !important; /* Força a cor do texto principal */
  background-color: #fff !important; /* Melhora o contraste */
  border: 2px solid #e0e0e0;
  padding: 20px;
  margin-top: 30px;
}

.preview :global(*) {
  color: inherit !important; /* Herda a cor do container pai */
}

.preview :global(code) {
  background-color: #1a1a1a !important;
  color: #f8f8f8 !important;
  padding: 2px 4px;
  border-radius: 4px;
}

.preview :global(a) {
  color: #0066cc !important;
  text-decoration: underline;
}

.preview :global(h1),
.preview :global(h2),
.preview :global(h3) {
  color: #1a1a1a !important;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 0.5em;
}

	@keyframes pulse {
		0% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.6;
		}
	}
</style>
