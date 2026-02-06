// Seleciona nossa UL com a lista de tarefas no html
const clientes = document.getElementById("clients-list");
const addBtn = document.getElementById("add-btn");
const email = document.getElementById("email");
const nome = document.getElementById("nome");
const baseUrl = "https://crudcrud.com/api/1e35fdbdc2cc4a4e83b7d180b89d9a44/clientes";

// Realiza uma requisição GET para a API externa pra buscar todas as tarefas
fetch(baseUrl)
    .then(resposta => resposta.json()) // Converte o corpo da resposta em JSON
    .then((listaClientes) => {
        // Itera sobre cada uma dessas tarefas do array
        listaClientes.forEach(cliente => {
            // Cria um novo elemento de lista (<li>) para cada tarefa
            const item = document.createElement("li");

            // Define o conteúdo HTML do item, incluindo descrição e botão 
            item.innerHTML = `<span class="client-name">${cliente.nome}</span>
                              <span class="client-email">${cliente.email}</span>
                              <button class="delete-btn" onclick="remove(this, '${cliente._id}')">Remover</button>`;

            // Adiciona o novo item à lista de tarefas no HTML
            clientes.appendChild(item)
        });
    })

// Adiciona um ouvinte de evento de click no botão "adicionar"
addBtn.addEventListener("click", () => {
    // Faz uma requisição POST para a API externa para criar a tarefa 
    fetch(baseUrl, {
        // Definimos como POST, mas podemos utilizar GET, POST, PUT ou DELETE
        method: "POST",
        // Definimos os cabeçalhos da requisição, como tipo de conteúdo JSON
        headers: {
            "Content-Type": "application/json"
        },
        // Convertemos um objeto JS para uma string JSON e passamos no corpo
        body: JSON.stringify({ 
            nome: nome.value,
            email: email.value
         })
    })
        .then(resposta => resposta.json())
        .then((cliente) => {
            // Cria um novo elemento de lista (<li>) para cada tarefa
            const item = document.createElement("li");

            // Define o conteúdo HTML do item, incluindo descrição e botão 
            item.innerHTML = `<span class="client-name">${cliente.nome}</span>
                              <span class="client-email">${cliente.email}</span>
                              <button class="delete-btn" onclick="remove(this, '${cliente._id}')">Remover</button>`;

            // Adiciona o novo item à lista de tarefas no HTML
            clientes.appendChild(item)
        })
})

function remove(btn, id) {
    fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(resposta => {
            if (resposta.ok) {
                const elementoLi = btn.closest('li');
                elementoLi.remove();
            }
        })
}