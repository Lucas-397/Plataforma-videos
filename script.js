const containerVideo = document.querySelector(".videos__container");

async function montaVideos(){
    try {
        const busca = await fetch("http://localhost:3000/videos");  
        const videos = await busca.json();

        videos.forEach(video => {
            if(video.categoria == ""){
                throw new Error('Video não possui descrição');
            }
            containerVideo.innerHTML += `
            <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                    <img class="imagem-canal"  src="${video.imagem}">
                    <h3 class="titulo-video">${video.titulo}</h3>
                    <p class = "titulo-canal">${video.descricao}</p>
                    <p class="categorias ${video.categoria}">${video.categoria}</p>
                </div>
            </li>
            `
        });
    }catch(error){
        containerVideo.innerHTML = `<p>Houve um erro ao carregar os videos:${error}</p>`
    }
}

function pesquisar(){
    const videoProcurado = barraPesquisa.value.toLowerCase();
    const videos = document.querySelectorAll('.videos__item');

    if(videoProcurado != ""){
        videos.forEach(video => {
            let tituloVideo = video.querySelector('.titulo-video').textContent.toLowerCase();

            if(!tituloVideo.includes(videoProcurado)){
                video.style.display = "none";
            }else{
                video.style.display = "block";
            }
        });
    }
}


montaVideos();

const barraPesquisa = document.querySelector(".pesquisar__input");

barraPesquisa.addEventListener('input', pesquisar);

const BTcategorias = document.querySelectorAll('.superior__item');


BTcategorias.forEach(BTcategoria => {
    BTcategoria.addEventListener('click', () =>{
    //eu presciso selecionar as .categorias e comparar o conteudo do seu texto com a categoria desejada caso seja igual o <li> deve ficar com o display none.
        const categorias = document.querySelectorAll(".categorias");
        const categoriaSelecionada = BTcategoria.textContent;
        const videos = document.querySelectorAll(".videos__item");

        if(categoriaSelecionada != "Tudo"){

            for(let video of videos){
                const categoriaVideo = video.querySelector('.categorias').textContent;
                console.log(categoriaVideo == categoriaSelecionada)          

                if(!categoriaVideo.includes(categoriaSelecionada)){
                    video.style.display = "none";
                }else{
                    video.style.display = "block";
                }
            }

        }else{
            
        }
    });
});
