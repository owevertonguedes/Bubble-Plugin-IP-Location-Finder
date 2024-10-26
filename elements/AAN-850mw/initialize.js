function(instance, context) {
    // Função para obter o IP do usuário
    function getUserIP() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                // Publicar o IP como um estado do elemento
                instance.publishState('ip', data.ip);
            })
            .catch(error => {
                console.error('Error getting IP:', error);
                // Publicar erro como um estado do elemento
                instance.publishState('error', 'Failed to get IP');
            });
    }

    // Carregar um pixel invisível para iniciar a obtenção do IP
    var img = new Image();
    img.src = 'https://api.ipify.org?format=json';
    img.style.display = 'none';
    document.body.appendChild(img);

    // Chamar a função para obter o IP
    getUserIP();
}
