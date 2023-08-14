// Configurar as credenciais do Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDZKRKPUNnruVeeVG-8UaVZUveV3AoaZ3E",
  authDomain: "aula3-9e9e3.firebaseapp.com",
  projectId:"aula3-9e9e3",
  storageBucket: "aula3-9e9e3.appspot.com",
};
// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

// Referenciar o Firestore
var db = firebase.firestore();

// Capturar o formulário e salvar as tags de vídeos do YouTube no Firestore ao enviá-las
document.getElementById("meuFormulario").addEventListener("submit", function (event) {
    event.preventDefault();

    var tagVideo = document.getElementById("tagVideo").value;

    // Salvar a tag de vídeo do YouTube na coleção "videos"
    db.collection("videos").add({
        tagVideo: tagVideo
    })
    .then(function (docRef) {
        console.log("Tag de vídeo salva com ID: ", docRef.id);
        alert("Tag de vídeo salva com sucesso!");
        // Limpar o campo do formulário após salvar a tag de vídeo
        document.getElementById("meuFormulario").reset();
        // Atualizar a lista de vídeos salvos na página
        exibirVideosSalvos();
    })
    .catch(function (error) {
        console.error("Erro ao salvar tag de vídeo: ", error);
        alert("Ocorreu um erro ao salvar a tag de vídeo. Por favor, tente novamente.");
    });
});

// Função para exibir as tags de vídeos salvos na página
function exibirVideosSalvos() {
    var listaVideos = document.getElementById("videosSalvos");

    // Limpar a lista antes de atualizá-la
    listaVideos.innerHTML = "";

    // Buscar as tags de vídeos na coleção "videos"
    db.collection("videos").get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // Criar um item da lista com a tag de vídeo
                var itemLista = document.createElement("li");
                var tagVideo = doc.data().tagVideo;
                itemLista.innerHTML = tagVideo;
                listaVideos.appendChild(itemLista);
            });
        })
        .catch(function (error) {
            console.error("Erro ao buscar vídeos: ", error);
        });
}

// Chamar a função de exibir vídeos ao carregar a página
exibirVideosSalvos();

// ... (código anterior)

// Função para exibir as tags de vídeos salvos na página
function exibirVideosSalvos() {
    var listaVideos = document.getElementById("videosSalvos");

    // Limpar a lista antes de atualizá-la
    listaVideos.innerHTML = "";

    // Buscar as tags de vídeos na coleção "videos"
    db.collection("videos").get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // Criar um item da lista com a tag de vídeo e botão de exclusão
                var itemLista = document.createElement("li");
                var tagVideo = doc.data().tagVideo;
                itemLista.innerHTML = `${tagVideo} <button data-id="${doc.id}" class="btnExcluir">Excluir</button>`;
                listaVideos.appendChild(itemLista);

                // Adicionar evento de clique ao botão de exclusão
                var btnExcluir = itemLista.querySelector(".btnExcluir");
                btnExcluir.addEventListener("click", function () {
                    var videoId = this.getAttribute("data-id");
                    excluirVideo(videoId);
                });
            });
        })
        .catch(function (error) {
            console.error("Erro ao buscar vídeos: ", error);
        });
}

// Função para excluir um vídeo do Firestore
function excluirVideo(videoId) {
    db.collection("videos").doc(videoId).delete()
        .then(function () {
            console.log("Vídeo excluído com sucesso!");
            exibirVideosSalvos(); // Atualizar a lista de vídeos após exclusão
        })
        .catch(function (error) {
            console.error("Erro ao excluir vídeo: ", error);
        });
}



