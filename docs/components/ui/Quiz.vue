<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    quizData: {
        type: Object,
        required: true
    }
});

const currentQuestionIndex = ref(0);
const userAnswers = ref({});

const currentQuestion = computed(() => props.quizData.questions[currentQuestionIndex.value]);

const correctAnswersCount = computed(() =>
    props.quizData.questions.reduce((count, question, index) =>
        count + (userAnswers.value[index] === question.correctAnswer ? 1 : 0), 0)
);

const progress = computed(() =>
    (correctAnswersCount.value / props.quizData.questions.length) * 100
);

const allQuestionsAnsweredCorrectly = computed(() =>
    correctAnswersCount.value === props.quizData.questions.length
);

const selectAnswer = (optionKey) => {
    userAnswers.value[currentQuestionIndex.value] = optionKey;
};

const goToNextQuestion = () => {
    if (currentQuestionIndex.value < props.quizData.questions.length - 1) {
        currentQuestionIndex.value++;
    }
};

const goToPreviousQuestion = () => {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--;
    }
};
</script>

<template>
    <calcite-card>
        <!-- Progress Bar -->
        <div class="quiz-progress">
            <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
            <div class="progress-stats">
                {{ correctAnswersCount }} of {{ quizData.questions.length }} correct
            </div>
        </div>

        <!-- Question and Options -->
        <div class="quiz-question">
            <p class="question">{{ currentQuestion.question }}</p>
            <div class="options">
                <button v-for="option in currentQuestion.options" :key="option.key" :class="[
                    'quiz-option',
                    { 'selected': userAnswers[currentQuestionIndex] === option.key },
                    { 'correct': userAnswers[currentQuestionIndex] === option.key && option.key === currentQuestion.correctAnswer },
                    { 'incorrect': userAnswers[currentQuestionIndex] === option.key && option.key !== currentQuestion.correctAnswer }
                ]" @click="selectAnswer(option.key)">
                    {{ option.answer }}
                </button>
            </div>
        </div>

        <!-- Navigation -->
        <div class="navigation">
            <button @click="goToPreviousQuestion" :disabled="currentQuestionIndex === 0" class="nav-button">
                Previous
            </button>
            <span class="question-counter">
                Question {{ currentQuestionIndex + 1 }} of {{ quizData.questions.length }}
            </span>
            <button @click="goToNextQuestion" :disabled="currentQuestionIndex === quizData.questions.length - 1"
                class="nav-button">
                Next
            </button>
        </div>

        <!-- Completion Message -->
        <div v-if="allQuestionsAnsweredCorrectly" class="completion-message">
            🎉 Congratulations! You've answered all questions correctly!
        </div>
    </calcite-card>
</template>

<style scoped>
/* Progress bar styles */
.quiz-progress {
    margin-bottom: 1rem;
}

.progress-bar {
    width: 100%;
    height: 0.5rem;
    background: #e2e8f0;
    border-radius: 9999px;
    margin-bottom: 0.5rem;
}

.progress-fill {
    height: 100%;
    background: #22c55e;
    border-radius: 9999px;
    transition: width 0.3s ease;
}

.progress-stats {
    font-size: 0.875rem;
    margin-top: 0.5rem;
}

/* Question styles */
.question-counter {
    font-size: 0.875rem;
    flex: 2;
    text-align: center;
}

.question {
    font-size: 1.5rem;
    font-weight: 500;
    margin: 0;
    padding: 5px;
    padding-top: 10px;
    border-top: 1px solid #c4c4c45d
}

.options {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.quiz-option {
    width: 100%;
    padding: 1rem;
    margin: 0.25rem 0;
    text-align: left;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.2s;
}

html.dark .quiz-option {
    background: #383838;
    border-color: #444444;
    color: white;
}

.quiz-option:hover:not(.selected) {
    background: #f8fafc;
}

html.dark .quiz-option:hover:not(.selected) {
    background: #4b4b4b;
}

.quiz-option.selected.correct {
    background: #dcfce7;
    border-color: #22c55e;
    color: #166534;
}

html.dark .quiz-option.selected.correct {
    background: #14532d;
    border-color: #16a34a;
    color: #bbf7d0;
}

.quiz-option.selected.incorrect {
    background: #fee2e2;
    border-color: #ef4444;
    color: #991b1b;
}

html.dark .quiz-option.selected.incorrect {
    background: #7f1d1d;
    border-color: #dc2626;
    color: #fecaca;
}

/* Navigation styles */
.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
}

.nav-button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    background: none;
    border: none;
    cursor: pointer;
    flex: 1;
}

.nav-button:disabled {
    color: #6c757d;
    cursor: not-allowed;
}

/* Completion message */
.completion-message {
    margin-top: 1.5rem;
    padding: 1rem;
    background: #dcfce7;
    color: #166534;
    border-radius: 0.5rem;
    text-align: center;
}

@media (max-width: 640px) {
    .question {
        font-size: 1.25rem;
    }
}
</style>