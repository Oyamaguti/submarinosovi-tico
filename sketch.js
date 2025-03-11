let fundo;
let fonte;
let submarino; // Para a imagem do submarino
let mapaMundi; // Para a imagem do mapa mundi
let submarinoX;
let submarinoY;
let submarinoEncontrado = false; // Variável para controlar se o submarino foi encontrado
let tomare; // Para o áudio "tomare.mp3"
let tomareTocado = false; // Variável para controlar se o áudio "tomare" já foi tocado

function preload() {
    fundo = loadSound("musica.mp3"); // Certifique-se de que o caminho está correto
    fonte = loadFont("fonte2.ttf");
    submarino = loadImage("submarino.png"); // Certifique-se de que o caminho está correto
    mapaMundi = loadImage("mapa_mundi.jpg"); // Carregue a imagem do mapa mundi
    tomare = loadSound("tomare.mp3"); // Carregue o áudio "tomare.mp3"
}

function setup() {
    let canvas = createCanvas(1300, 800);
    canvas.parent("jogo");

    // Adiciona um evento de movimento do mouse
    canvas.mouseMoved(function() {
        if (!fundo.isPlaying()) {
            fundo.loop(); // Inicia a música em loop quando o mouse é movido
        }
    });

    // Posiciona o submarino aleatoriamente
    submarinoX = random(width);
    submarinoY = random(height);
}

function draw() {
    // Desenhar o fundo do mapa mundi
    image(mapaMundi, 0, 0, width, height); // Desenha o mapa mundi cobrindo toda a área do jogo

    // Remover o stroke da área do jogo
    noStroke();

    // Movendo a bolinha
    let distancia = dist(mouseX, mouseY, submarinoX, submarinoY);

    // Verifica se o mouse está perto do submarino
    if (distancia < 10) {
        submarinoEncontrado = true; // O submarino foi encontrado
    }

    // Se o submarino foi encontrado, desenhe-o
    if (submarinoEncontrado) {
        fundo.stop(); // Para o áudio em loop
        if (!tomareTocado) {
            tomare.play(); // Toca o áudio "tomare.mp3"
            tomareTocado = true; // Marca que o áudio já foi tocado
        }

        fill("green");
        textSize(60);
        textFont(fonte);
        text("Voce encontrou o submarino!", 400, 400);
        
        // Desenhar o submarino
        image(submarino, submarinoX, submarinoY, 50, 20); // Ajuste o tamanho conforme necessário
    } else {
        // Mudar a cor da bolinha baseado na distância
        let corBolinha;
        if (distancia > 200) {
            corBolinha = "purple"; // Longe
        } else if (distancia > 100) {
            corBolinha = "yellow"; // Médio
        } else {
            corBolinha = "red"; // Perto
        }

        // Tamanho da bolinha baseado na distância
        let tamanhoBolinha = map(distancia, 0, 300, 30, 100); // Aumenta o tamanho da bolinha conforme se afasta
        fill(corBolinha); // Define a cor da bolinha
        ellipse(mouseX, mouseY, tamanhoBolinha, tamanhoBolinha); // Desenha a bolinha na posição do mouse
    }
}