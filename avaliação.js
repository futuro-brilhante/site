document.addEventListener('DOMContentLoaded', () => {
    // 1. Dados do Quiz: Perguntas e Respostas Fáceis
    const questions = [
        {
            text: "Onde o pássaro faz o seu ____? (Ninho, Livro, Mesa)",
            options: ["Ninho", "Livro", "Mesa"],
            answer: "Ninho"
        },
        {
            text: "Eu uso o ____ para escrever. (Bola, Lápis, Gato)",
            options: ["Lápis", "Gato", "Bola"],
            answer: "Lápis"
        },
        {
            text: "O ____ é amarelo e redondo. (Cadeira, Sol, Chuva)",
            options: ["Cadeira", "Sol", "Chuva"],
            answer: "Sol"
        },
        {
            text: "Para beber água, usamos o ____. (Pneu, Copo, Ouvido)",
            options: ["Copo", "Pneu", "Ouvido"],
            answer: "Copo"
        },
        {
            text: "O que a vaca dá? (Ovo, Pão, Leite)",
            options: ["Pão", "Leite", "Ovo"],
            answer: "Leite"
        }
    ];

    // 2. Variáveis de Estado
    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    // 3. Seletores de Elementos
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const quizSection = document.getElementById('quiz-section');
    const resultSection = document.getElementById('result-section');
    const scoreText = document.getElementById('score-text');
    const feedbackMessage = document.getElementById('feedback-message');
    const restartButton = document.getElementById('restart-button');

    // 4. Funções Principais
    
    // Carrega a pergunta atual na tela
    function loadQuestion() {
        answered = false;
        nextButton.style.display = 'none';
        
        // Remove animação e adiciona para transição suave da nova pergunta
        const questionBox = document.getElementById('question-box');
        questionBox.style.animation = 'none';
        void questionBox.offsetWidth; // Força o reflow para reiniciar a animação
        questionBox.style.animation = 'slideIn 0.5s ease-out';

        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.text;
        optionsContainer.innerHTML = '';

        // Cria e anexa os botões de opção
        currentQuestion.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => checkAnswer(button, option, currentQuestion.answer));
            optionsContainer.appendChild(button);
        });
    }

    // Verifica a resposta clicada
    function checkAnswer(selectedButton, selectedOption, correctAnswer) {
        if (answered) return; // Evita cliques múltiplos
        answered = true;

        const allButtons = optionsContainer.querySelectorAll('.option-btn');
        allButtons.forEach(btn => btn.disabled = true); // Desabilita todos os botões

        if (selectedOption === correctAnswer) {
            score++;
            selectedButton.classList.add('correct');
        } else {
            selectedButton.classList.add('incorrect');
            // Anima o botão correto para mostrar a resposta
            allButtons.forEach(btn => {
                if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
        }
        
        nextButton.style.display = 'block';
    }

    // Avança para a próxima pergunta ou termina o quiz
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }

    // Exibe a tela de resultados
    function showResults() {
        quizSection.style.display = 'none';
        resultSection.style.display = 'block';
        
        const totalQuestions = questions.length;
        scoreText.textContent = `${score} de ${totalQuestions}`;

        let message = "";
        const percentage = (score / totalQuestions) * 100;

        if (percentage >= 80) {
            message = "Parabéns! Você tem uma ótima compreensão de leitura básica. Continue praticando!";
            scoreText.style.color = 'var(--verde-acerto)';
        } else if (percentage >= 50) {
            message = "Muito bom! Você está no caminho certo. Tente ler textos curtos todos os dias.";
            scoreText.style.color = 'var(--golden)';
        } else {
            message = "Não desanime! Este é um ótimo começo. Ler e escrever exige prática. Peça ajuda para praticar um pouco mais.";
            scoreText.style.color = 'var(--vermelho-erro)';
        }
        
        feedbackMessage.textContent = message;
        resultSection.style.animation = 'fadeIn 1s ease-out';
    }

    // Reinicia o quiz
    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultSection.style.display = 'none';
        quizSection.style.display = 'block';
        loadQuestion();
    }

    // 5. Event Listeners
    nextButton.addEventListener('click', nextQuestion);
    restartButton.addEventListener('click', restartQuiz);

    // 6. Início do Quiz
    loadQuestion();
});