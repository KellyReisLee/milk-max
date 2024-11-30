document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Mostra o ícone de carregamento
    document.getElementById("loading").style.display = "block";

    // Dados do formulário
    const formData = new FormData(this);

    // Requisição AJAX com fetch
    fetch("/forgot", { 
        method: "POST",
        body: formData,
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.success) {
            document.getElementById("extra").style.display = "block";
        } else {
            alert(data.message); // Display error message
        }
    })
    .catch(error => {
        console.error("Error:", error);
    })
    .finally(() => {
        // Garante que o ícone de carregamento seja escondido apenas após a requisição terminar
        document.getElementById("loading").style.display = "none";
    });
});
