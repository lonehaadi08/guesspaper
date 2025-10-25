// JKBOSE Class 10th Guess Paper Examination System
// Complete App with Admin Roll 3212 - Infinite Retakes
// 20 Questions Only (MCQ + True/False)
// General Password: opklnm (1 attempt)
// Admin Password: Lone88 (infinite attempts)

class ExamApp {
    constructor() {
        // Configuration
        this.generalPassword = "opklnm";
        this.adminPassword = "Lone88";
        this.adminRollNumber = "3212";
        this.whatsappNumber = "+918899051944";
        
        // 20 Allowed Roll Numbers
        this.allowedRollNumbers = [
            "1001", "1002", "1003", "1004", "1005",
            "1006", "1007", "1008", "1009", "1010",
            "2001", "2002", "2003", "2004", "2005",
            "3001", "3002", "3003", "3004",
            "3212"  // Admin Roll Number
        ];

        // State management
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.candidateDetails = {};
        this.questions = [];
        this.examStartTime = null;
        this.examEndTime = null;
        this.examResults = null;
        this.userRole = null;

        // Encoding map for marks (1-20)
        this.encodingMap = this.generateEncodingMap();

        this.init();
    }

    generateEncodingMap() {
        const map = {};
        const chars = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 1; i <= 20; i++) {
            const firstChar = chars[Math.floor((i - 1) / 26)];
            const secondChar = chars[(i - 1) % 26];
            map[i] = `${firstChar}${secondChar}`;
        }
        return map;
    }

    async init() {
        try {
            await this.loadQuestions();
            this.setupEventListeners();
            this.showLoadingScreen(1000);
        } catch (error) {
            console.error('Failed to initialize exam:', error);
            this.showError('Failed to load examination. Please refresh the page.');
        }
    }

    async loadQuestions() {
        this.questions = [
            // 15 MCQ Questions
            {
                "id": 1,
                "section": "A",
                "text": "Which of the following numbers is an irrational number?",
                "type": "mcq",
                "options": ["0.101", "0.202202220.....", "0.1011", "0.121121112"],
                "answer": "b",
                "marks": 1
            },
            {
                "id": 2,
                "section": "A",
                "text": "7√3 is:",
                "type": "mcq",
                "options": ["Rational", "Irrational", "Whole number", "Integer"],
                "answer": "b",
                "marks": 1
            },
            {
                "id": 3,
                "section": "A",
                "text": "The pair of linear equations 2x+3y-9=0 and 4x+6y-18=0 are:",
                "type": "mcq",
                "options": ["Intersecting", "Parallel", "Coincident", "Perpendicular"],
                "answer": "c",
                "marks": 1
            },
            {
                "id": 4,
                "section": "A",
                "text": "The 35th term of the A.P. 21, 18, 15,.... is:",
                "type": "mcq",
                "options": ["-71", "-81", "71", "81"],
                "answer": "b",
                "marks": 1
            },
            {
                "id": 5,
                "section": "A",
                "text": "cot 30° is equal to:",
                "type": "mcq",
                "options": ["1/√3", "√3", "1", "2"],
                "answer": "b",
                "marks": 1
            },
            {
                "id": 6,
                "section": "A",
                "text": "The distance of a point from the x-axis is called its:",
                "type": "mcq",
                "options": ["Abscissa", "Ordinate", "Coordinate", "Origin"],
                "answer": "b",
                "marks": 1
            },
            {
                "id": 7,
                "section": "A",
                "text": "H.C.F. of 7 and 28 is:",
                "type": "mcq",
                "options": ["4", "28", "7", "14"],
                "answer": "c",
                "marks": 1
            },
            {
                "id": 8,
                "section": "A",
                "text": "If the probability of rain tomorrow is 0.85, the probability that it will NOT rain is:",
                "type": "mcq",
                "options": ["0.15", "0.85", "0.5", "0.25"],
                "answer": "a",
                "marks": 1
            },
            {
                "id": 9,
                "section": "A",
                "text": "Volume of a cone is:",
                "type": "mcq",
                "options": ["πr²h", "1/3 πr²h", "3πr²h", "2πrh"],
                "answer": "b",
                "marks": 1
            },
            {
                "id": 10,
                "section": "A",
                "text": "Discriminant of 3x²-2√6x+2=0 is:",
                "type": "mcq",
                "options": ["24", "6", "0", "12"],
                "answer": "c",
                "marks": 1
            },
            {
                "id": 11,
                "section": "A",
                "text": "Number of tangents that can be drawn from a point outside a circle:",
                "type": "mcq",
                "options": ["1", "2", "3", "Infinite"],
                "answer": "b",
                "marks": 1
            },
            {
                "id": 12,
                "section": "A",
                "text": "If two triangles are similar, then ratio of their corresponding sides is:",
                "type": "mcq",
                "options": ["Equal to ratio of areas", "Equal", "Equal to ratio of perimeters", "All of above"],
                "answer": "b",
                "marks": 1
            },
            {
                "id": 13,
                "section": "A",
                "text": "Mean of first 6 prime numbers (2, 3, 5, 7, 11, 13) is approximately:",
                "type": "mcq",
                "options": ["6", "6.83", "7", "7.5"],
                "answer": "b",
                "marks": 1
            },
            {
                "id": 14,
                "section": "A",
                "text": "Class mark is calculated using which formula?",
                "type": "mcq",
                "options": ["(Upper limit + Lower limit)/2", "(Upper limit - Lower limit)/2", "(Upper limit × Lower limit)/2", "Upper limit + Lower limit"],
                "answer": "a",
                "marks": 1
            },
            {
                "id": 15,
                "section": "A",
                "text": "A die is thrown. What is the Probability of getting an even number?",
                "type": "mcq",
                "options": ["2/3", "1", "5/6", "1/2"],
                "answer": "d",
                "marks": 1
            },
            // 5 True/False Questions
            {
                "id": 16,
                "section": "A",
                "text": "Prime factorization of 1771 is 7 × 11 × 13.",
                "type": "tf",
                "answer": ["false", "False", "FALSE"],
                "marks": 1
            },
            {
                "id": 17,
                "section": "A",
                "text": "The sum of the first 51 positive integers is 1326.",
                "type": "tf",
                "answer": ["true", "True", "TRUE"],
                "marks": 1
            },
            {
                "id": 18,
                "section": "A",
                "text": "-0.5 can be the probability of an event.",
                "type": "tf",
                "answer": ["false", "False", "FALSE"],
                "marks": 1
            },
            {
                "id": 19,
                "section": "A",
                "text": "All circles are congruent.",
                "type": "tf",
                "answer": ["false", "False", "FALSE"],
                "marks": 1
            },
            {
                "id": 20,
                "section": "A",
                "text": "x=0, y=2 is a solution of the equation y-2x = 2.",
                "type": "tf",
                "answer": ["true", "True", "TRUE"],
                "marks": 1
            }
        ];
    }

    setupEventListeners() {
        document.getElementById('start-btn')?.addEventListener('click', () => {
            this.showScreen('preview-screen');
        });

        document.getElementById('back-to-landing')?.addEventListener('click', () => {
            this.showScreen('landing-screen');
        });

        document.getElementById('proceed-btn')?.addEventListener('click', () => {
            this.showPasswordPrompt();
        });

        document.getElementById('password-submit')?.addEventListener('click', () => {
            this.verifyPassword();
        });

        document.getElementById('password-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.verifyPassword();
        });

        document.getElementById('begin-paper-btn')?.addEventListener('click', () => {
            this.showScreen('details-screen');
        });

        document.getElementById('candidate-form')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateAndStartExam();
        });

        document.getElementById('prev-btn')?.addEventListener('click', () => {
            this.previousQuestion();
        });

        document.getElementById('next-btn')?.addEventListener('click', () => {
            this.nextQuestion();
        });

        document.getElementById('submit-btn')?.addEventListener('click', () => {
            this.submitExam();
        });

        document.getElementById('whatsapp-btn')?.addEventListener('click', () => {
            this.sendToWhatsApp();
        });

        document.getElementById('retake-btn')?.addEventListener('click', () => {
            this.retakeExam();
        });
    }

    showLoadingScreen(duration = 2000) {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.classList.add('show');
            setTimeout(() => {
                loading.classList.remove('show');
            }, duration);
        }
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId)?.classList.add('active');
    }

    showPasswordPrompt() {
        this.showScreen('password-screen');
        const input = document.getElementById('password-input');
        if (input) {
            input.value = '';
            input.focus();
        }
    }

    verifyPassword() {
        const password = document.getElementById('password-input').value;
        const errorDiv = document.getElementById('password-error');

        if (password === this.adminPassword) {
            this.userRole = 'admin';
            localStorage.removeItem('exam_completed');
            this.showSuccessAnimation();
        } else if (password === this.generalPassword) {
            this.userRole = 'general';
            this.showSuccessAnimation();
        } else {
            if (errorDiv) {
                errorDiv.textContent = '❌ Incorrect password. Access denied.';
                errorDiv.classList.add('show');
                document.getElementById('password-input').value = '';
                setTimeout(() => {
                    errorDiv.classList.remove('show');
                }, 3000);
            }
        }
    }

    showSuccessAnimation() {
        this.showScreen('success-screen');
        const roleDisplay = document.getElementById('role-display');
        if (roleDisplay) {
            roleDisplay.textContent = this.userRole === 'admin' ? '👑 Admin Access' : '📚 Student Access';
        }
        this.createConfetti();
    }

    createConfetti() {
        const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff40'];
        const confettiContainer = document.querySelector('.success-container');
        if (!confettiContainer) return;

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'absolute';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;

            confettiContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }

        if (!document.querySelector('#confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    validateAndStartExam() {
        const form = document.getElementById('candidate-form');
        const formData = new FormData(form);
        const errorDiv = document.getElementById('details-error');

        const details = {
            fullName: formData.get('fullName').trim(),
            phone: formData.get('phone').trim(),
            email: formData.get('email').trim(),
            address: formData.get('address').trim(),
            rollNumber: formData.get('rollNumber').trim()
        };

        if (!details.fullName || !details.phone || !details.email || !details.address || !details.rollNumber) {
            this.showError('Please fill in all required fields.', errorDiv);
            return;
        }

        if (!/^\d{10}$/.test(details.phone)) {
            this.showError('Phone number must be exactly 10 digits.', errorDiv);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
            this.showError('Please enter a valid email address.', errorDiv);
            return;
        }

        if (!/^\d{4}$/.test(details.rollNumber)) {
            this.showError('Roll number must be exactly 4 digits.', errorDiv);
            return;
        }

        if (!this.allowedRollNumbers.includes(details.rollNumber)) {
            this.showError('This roll number is not authorized to take the examination.', errorDiv);
            return;
        }

        // Admin (roll 3212) with admin password can reattempt infinitely
        // General users can only attempt once
        if (this.userRole === 'general' && this.hasAlreadyAttempted(details.rollNumber)) {
            this.showBlockedScreen('This roll number has already taken the examination. General users can attempt only once.');
            return;
        }

        this.candidateDetails = details;
        this.markAttemptStarted(details.rollNumber);
        this.startExam();
    }

    hasAlreadyAttempted(rollNumber) {
        // Admin users can always reattempt
        if (this.userRole === 'admin') {
            return false;
        }

        const completedAttempts = JSON.parse(localStorage.getItem('exam_completed') || '[]');
        return completedAttempts.includes(rollNumber);
    }

    markAttemptStarted(rollNumber) {
        const startedAttempts = JSON.parse(localStorage.getItem('exam_started') || '[]');
        if (!startedAttempts.includes(rollNumber)) {
            startedAttempts.push(rollNumber);
            localStorage.setItem('exam_started', JSON.stringify(startedAttempts));
        }
    }

    markAttemptCompleted(rollNumber) {
        // Only mark general users as completed (to block retry)
        if (this.userRole === 'general') {
            const completedAttempts = JSON.parse(localStorage.getItem('exam_completed') || '[]');
            if (!completedAttempts.includes(rollNumber)) {
                completedAttempts.push(rollNumber);
                localStorage.setItem('exam_completed', JSON.stringify(completedAttempts));
            }
        }
        // Admin attempts NOT marked - allowing infinite retakes
    }

    startExam() {
        this.examStartTime = new Date();
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.showScreen('exam-screen');
        this.displayCurrentQuestion();
    }

    displayCurrentQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        if (!question) return;

        this.updateProgress();

        document.getElementById('question-counter').textContent = 
            `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        document.getElementById('section-info').textContent = `Section ${question.section} (${question.marks} mark${question.marks > 1 ? 's' : ''})`;

        const container = document.getElementById('question-content');
        let html = `<div class="question-text">${question.text}</div>`;

        if (question.type === 'mcq') {
            html += '<div class="options-container">';
            question.options.forEach((option, index) => {
                const optionLetter = String.fromCharCode(97 + index);
                const isSelected = this.answers[question.id] === optionLetter;
                html += `
                    <div class="option-item ${isSelected ? 'selected' : ''}" onclick="app.selectOption(${question.id}, '${optionLetter}')">
                        <input type="radio" name="q${question.id}" value="${optionLetter}" ${isSelected ? 'checked' : ''}>
                        <span>${option}</span>
                    </div>
                `;
            });
            html += '</div>';
        } else if (question.type === 'tf') {
            const currentAnswer = this.answers[question.id] || '';
            html += `
                <div class="options-container">
                    <div class="option-item ${currentAnswer === 'true' ? 'selected' : ''}" onclick="app.selectOption(${question.id}, 'true')">
                        <input type="radio" name="q${question.id}" value="true" ${currentAnswer === 'true' ? 'checked' : ''}>
                        <span>True</span>
                    </div>
                    <div class="option-item ${currentAnswer === 'false' ? 'selected' : ''}" onclick="app.selectOption(${question.id}, 'false')">
                        <input type="radio" name="q${question.id}" value="false" ${currentAnswer === 'false' ? 'checked' : ''}>
                        <span>False</span>
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
        this.updateNavigationButtons();
    }

    selectOption(questionId, option) {
        this.answers[questionId] = option;

        document.querySelectorAll(`input[name="q${questionId}"]`).forEach(input => {
            const optionItem = input.closest('.option-item');
            if (input.value === option) {
                input.checked = true;
                optionItem.classList.add('selected');
            } else {
                input.checked = false;
                optionItem.classList.remove('selected');
            }
        });
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');

        if (prevBtn) prevBtn.disabled = this.currentQuestionIndex === 0;

        if (this.currentQuestionIndex === this.questions.length - 1) {
            if (nextBtn) nextBtn.style.display = 'none';
            if (submitBtn) submitBtn.style.display = 'block';
        } else {
            if (nextBtn) nextBtn.style.display = 'block';
            if (submitBtn) submitBtn.style.display = 'none';
        }
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.displayCurrentQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.displayCurrentQuestion();
        }
    }

    submitExam() {
        if (!confirm('Are you sure you want to submit the examination? You cannot change your answers after submission.')) {
            return;
        }

        this.examEndTime = new Date();
        this.markAttemptCompleted(this.candidateDetails.rollNumber);
        const results = this.calculateResults();
        this.showResults(results);
    }

    calculateResults() {
        let totalMarks = 0;
        let obtainedMarks = 0;
        let correctAnswers = 0;
        const questionResults = [];

        this.questions.forEach(question => {
            totalMarks += question.marks;
            const userAnswer = this.answers[question.id];
            const isCorrect = this.checkAnswer(question, userAnswer);

            if (isCorrect) {
                obtainedMarks += question.marks;
                correctAnswers++;
            }

            questionResults.push({
                questionId: question.id,
                userAnswer: userAnswer || '',
                correctAnswer: question.answer,
                isCorrect: isCorrect,
                marks: isCorrect ? question.marks : 0
            });
        });

        const percentage = Math.round((obtainedMarks / totalMarks) * 100);

        return {
            totalMarks,
            obtainedMarks,
            percentage,
            correctAnswers,
            totalQuestions: this.questions.length,
            questionResults,
            encodedMarks: this.encodingMap[obtainedMarks] || 'xx',
            incorrectAnswers: this.questions.length - correctAnswers,
            correctPercentage: ((correctAnswers / this.questions.length) * 100).toFixed(2),
            incorrectPercentage: (((this.questions.length - correctAnswers) / this.questions.length) * 100).toFixed(2)
        };
    }

    checkAnswer(question, userAnswer) {
        if (!userAnswer) return false;

        const userAnswerNormalized = userAnswer.toString().toLowerCase().trim();

        if (question.type === 'mcq') {
            const correctAnswer = question.answer.toString().toLowerCase().trim();
            return userAnswerNormalized === correctAnswer;
        } else if (question.type === 'tf') {
            const correctAnswers = Array.isArray(question.answer) ? question.answer : [question.answer];
            return correctAnswers.some(ans => 
                userAnswerNormalized === ans.toString().toLowerCase().trim()
            );
        }

        return false;
    }

    showResults(results) {
        this.showScreen('results-screen');
        this.animateScore(results.percentage);

        const marksObtainedEl = document.getElementById('marks-obtained');
        const percentageEl = document.getElementById('percentage-display');
        const encodedEl = document.getElementById('encoded-marks');

        if (marksObtainedEl) marksObtainedEl.textContent = results.obtainedMarks;
        if (percentageEl) percentageEl.textContent = `${results.percentage}%`;
        if (encodedEl) encodedEl.textContent = results.encodedMarks;

        // Analytics
        const analyticsContainer = document.getElementById('analytics-container');
        if (analyticsContainer) {
            analyticsContainer.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px;">
                    <div class="stat-card">
                        <h4>Correct Answers</h4>
                        <p class="stat-value">${results.correctAnswers}/${results.totalQuestions}</p>
                        <p class="stat-percentage">${results.correctPercentage}%</p>
                    </div>
                    <div class="stat-card">
                        <h4>Incorrect Answers</h4>
                        <p class="stat-value">${results.incorrectAnswers}/${results.totalQuestions}</p>
                        <p class="stat-percentage" style="color: #e74c3c;">${results.incorrectPercentage}%</p>
                    </div>
                </div>
                <div id="chart-container" style="margin-top: 30px; text-align: center;">
                    <canvas id="performanceChart" width="300" height="200"></canvas>
                </div>
            `;

            setTimeout(() => {
                this.drawPerformanceChart(results);
            }, 100);
        }

        // Show retake button for admin users
        const retakeBtn = document.getElementById('retake-btn');
        if (retakeBtn && this.userRole === 'admin') {
            retakeBtn.style.display = 'block';
        }

        this.examResults = results;
    }

    drawPerformanceChart(results) {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;

        const correctAngle = (results.correctAnswers / results.totalQuestions) * 2 * Math.PI;

        // Draw correct section (green)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, correctAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = '#27ae60';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw incorrect section (red)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, correctAngle, 2 * Math.PI);
        ctx.lineTo(centerX, centerY);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        ctx.stroke();

        // Draw labels
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${results.correctAnswers}`, centerX - 30, centerY - 20);
        ctx.fillText(`${results.incorrectAnswers}`, centerX + 30, centerY + 20);

        // Draw legend
        ctx.font = '12px Arial';
        ctx.fillStyle = '#27ae60';
        ctx.fillRect(centerX - 60, centerY + 100, 10, 10);
        ctx.fillStyle = '#000';
        ctx.textAlign = 'left';
        ctx.fillText('Correct', centerX - 45, centerY + 105);

        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(centerX + 10, centerY + 100, 10, 10);
        ctx.fillStyle = '#000';
        ctx.fillText('Incorrect', centerX + 25, centerY + 105);
    }

    animateScore(percentage) {
        const scoreElement = document.getElementById('score-percentage');
        if (!scoreElement) return;

        let currentPercentage = 0;
        const increment = percentage / 100;

        const animation = setInterval(() => {
            currentPercentage += increment;
            if (currentPercentage >= percentage) {
                currentPercentage = percentage;
                clearInterval(animation);
            }
            scoreElement.textContent = `${Math.round(currentPercentage)}%`;
        }, 20);
    }

    sendToWhatsApp() {
        const results = this.examResults;
        const candidate = this.candidateDetails;

        const message = `🎓 JKBOSE Class 10th Examination Result

📋 Candidate Details:
• Name: ${candidate.fullName}
• Roll Number: ${candidate.rollNumber}
• Phone: ${candidate.phone}
• Email: ${candidate.email}

📊 Exam Results:
🔐 Encoded Result: ${results.encodedMarks}

📅 Exam completed on: ${this.examEndTime.toLocaleString()}

---
This is an automated result from JKBOSE Guess Paper System.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    }

    retakeExam() {
        this.showScreen('landing-screen');
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.examStartTime = null;
        this.examEndTime = null;
        this.examResults = null;
    }

    showBlockedScreen(reason) {
        const blockedReason = document.getElementById('blocked-reason');
        if (blockedReason) {
            blockedReason.textContent = reason;
        }
        this.showScreen('blocked-screen');
    }

    showError(message, container = null) {
        if (!container) {
            alert(message);
            return;
        }

        container.textContent = message;
        container.classList.add('show');

        setTimeout(() => {
            container.classList.remove('show');
        }, 5000);
    }
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ExamApp();
});

// Prevent right-click and common shortcuts (basic protection)
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});

// Prevent page refresh during exam
window.addEventListener('beforeunload', (e) => {
    if (app && app.examStartTime && !app.examEndTime) {
        e.preventDefault();
        e.returnValue = 'Your exam is in progress. Are you sure you want to leave?';
        return e.returnValue;
    }
});
