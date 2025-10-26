document.addEventListener('DOMContentLoaded', () => {
    const paragrafosInput = document.getElementById('paragrafos');
    const btnGerar = document.getElementById('btn-gerar');
    const btnCopiar = document.getElementById('btn-copiar');
    const outputTextarea = document.getElementById('output-text');
    const statusMessage = document.getElementById('status-message');

    // Texto base do Lorem Ipsum (um texto grande para ter de onde tirar)
    const LOREM_IPSUM_BASE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    Proin non nibh eu diam porta rhoncus. Mauris sit amet odio eu dolor ultrices malesuada. Integer a augue eget sapien ullamcorper aliquam in eu libero. Etiam id felis ac purus maximus laoreet. Nulla facilisi. Sed non metus sit amet dolor fermentum cursus. Donec auctor, elit in bibendum malesuada, est lacus ultricies elit, vitae tristique libero nisl a tortor.

    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum finibus, massa ac tincidunt luctus, nisi velit luctus mauris, vel posuere sapien lacus vel ante. Nullam euismod nisi vel mi consectetur, a tincidunt odio vehicula. Fusce eu quam vitae nibh facilisis congue vitae nec quam.

    Aenean tincidunt lectus quis justo facilisis, sed vulputate enim vehicula. Quisque at nibh eu arcu tristique vestibulum. Praesent vel dolor sit amet quam tristique tincidunt. Fusce bibendum metus a turpis finibus, id tincidunt quam varius. Etiam maximus, libero a sollicitudin consectetur, odio lacus posuere nisl, vel ullamcorper libero turpis at mi.

    Vivamus interdum magna at nulla elementum, sit amet ullamcorper turpis ultrices. Sed non magna nec est congue egestas. Nulla facilisi. Aliquam erat volutpat. Nam tristique erat eu ligula consequat, in fermentum mi iaculis.`;


    // Função que gera o texto baseado no número de parágrafos
    function gerarLoremIpsum() {
        const numParagrafos = parseInt(paragrafosInput.value);

        if (isNaN(numParagrafos) || numParagrafos < 1) {
            statusMessage.textContent = 'Por favor, insira um número válido (1 ou mais).';
            outputTextarea.value = '';
            btnCopiar.disabled = true;
            return;
        }

        const paragrafosArray = LOREM_IPSUM_BASE.split('\n\n').filter(p => p.trim() !== '');
        let textoGerado = '';
        
        // Pega os parágrafos do texto base
        for (let i = 0; i < numParagrafos; i++) {
            const index = i % paragrafosArray.length; // Garante que a repetição seja contínua
            textoGerado += paragrafosArray[index] + '\n\n';
        }

        outputTextarea.value = textoGerado.trim();
        btnCopiar.disabled = false;
        statusMessage.textContent = `${numParagrafos} parágrafo(s) gerado(s) com sucesso.`;
    }

    // Função que copia o texto para a área de transferência
    function copiarTexto() {
        if (outputTextarea.value.trim() === '') {
            statusMessage.textContent = 'Não há texto para copiar.';
            return;
        }

        navigator.clipboard.writeText(outputTextarea.value)
            .then(() => {
                statusMessage.textContent = '✅ Texto copiado para a área de transferência!';
                setTimeout(() => {
                    statusMessage.textContent = `${paragrafosInput.value} parágrafo(s) gerado(s) com sucesso.`;
                }, 2000);
            })
            .catch(err => {
                statusMessage.textContent = '❌ Erro ao copiar. Por favor, selecione e copie manualmente.';
                console.error('Erro ao copiar:', err);
            });
    }

    // --- Event Listeners ---
    btnGerar.addEventListener('click', gerarLoremIpsum);
    btnCopiar.addEventListener('click', copiarTexto);

    // Gera um texto inicial ao carregar a página
    gerarLoremIpsum();
});
