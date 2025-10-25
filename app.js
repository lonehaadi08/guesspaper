// JKBOSE Class 10th Guess Paper Examination System
// Complete App with Admin Roll 3212 - Infinite Retakes + Certificate Feature
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

        // 20 Allowed Roll Numbers with unique 3-letter certificate codes
        this.allowedRollNumbers = [
            "1001", "1002", "1003", "1004", "1005",
            "1006", "1007", "1008", "1009", "1010",
            "2001", "2002", "2003", "2004", "2005",
            "3001", "3002", "3003", "3004", "3212"
        ];

        // Unique 3-letter certificate codes for each roll number
        this.certificateCodes = {
            "1001": "rty",
            "1002": "yuo",
            "1003": "juh",
            "1004": "mnb",
            "1005": "vfr",
            "1006": "pqw",
            "1007": "zxc",
            "1008": "lkj",
            "1009": "ghf",
            "1010": "dsa",
            "2001": "qwe",
            "2002": "asd",
            "2003": "zxv",
            "2004": "bnm",
            "2005": "iop",
            "3001": "tyu",
            "3002": "gfd",
            "3003": "hjk",
            "3004": "wer",
            "3212": "xyz"
        };

        // State management
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.candidateDetails = {};
        this.questions = [];
        this.examStartTime = null;
        this.examEndTime = null;
        this.examResults = null;
        this.userRole = null;
        this.actualMarks = 0; // Store actual marks for certificate

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
                "options": ["0.101", "0.202202220.....", "0.1011", "0.121121112..."],
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
                "answer": "b",
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
                "answer": ["true", "True", "TRUE"],
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

        // Certificate button event listener
        document.getElementById('get-certificate-btn')?.addEventListener('click', () => {
            this.showCertificatePrompt();
        });

        // Certificate code submit
        document.getElementById('certificate-submit')?.addEventListener('click', () => {
            this.verifyCertificateCode();
        });

        document.getElementById('certificate-code-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.verifyCertificateCode();
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
            roleDisplay.textContent = this.userRole === 'admin' 
                ? '👑 Admin Access' 
                : '📚 Student Access';
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

        if (this.userRole === 'general' && this.hasAlreadyAttempted(details.rollNumber)) {
            this.showBlockedScreen('This roll number has already taken the examination. General users can attempt only once.');
            return;
        }

        this.candidateDetails = details;
        this.markAttemptStarted(details.rollNumber);
        this.startExam();
    }

    hasAlreadyAttempted(rollNumber) {
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
        if (this.userRole === 'general') {
            const completedAttempts = JSON.parse(localStorage.getItem('exam_completed') || '[]');
            if (!completedAttempts.includes(rollNumber)) {
                completedAttempts.push(rollNumber);
                localStorage.setItem('exam_completed', JSON.stringify(completedAttempts));
            }
        }
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
        document.getElementById('section-info').textContent = 
            `Section ${question.section} (${question.marks} mark${question.marks > 1 ? 's' : ''})`;

        const container = document.getElementById('question-content');
        let html = `
            <h3 class="question-text">Q${question.id}. ${question.text}</h3>
        `;

        if (question.type === 'mcq') {
            html += '<div class="options-container">';
            const optionLabels = ['a', 'b', 'c', 'd'];
            question.options.forEach((option, index) => {
                const optionId = `q${question.id}-${optionLabels[index]}`;
                const isChecked = this.answers[question.id] === optionLabels[index];
                html += `
                    <label class="option-item ${isChecked ? 'selected' : ''}" for="${optionId}">
                        <input 
                            type="radio" 
                            name="q${question.id}" 
                            id="${optionId}" 
                            value="${optionLabels[index]}"
                            ${isChecked ? 'checked' : ''}
                        >
                        <span class="option-label">${optionLabels[index].toUpperCase()})</span>
                        <span class="option-text">${option}</span>
                    </label>
                `;
            });
            html += '</div>';
        } else if (question.type === 'tf') {
            const trueId = `q${question.id}-true`;
            const falseId = `q${question.id}-false`;
            const currentAnswer = this.answers[question.id];
            html += `
                <div class="tf-container">
                    <label class="tf-option ${currentAnswer === 'True' ? 'selected' : ''}" for="${trueId}">
                        <input 
                            type="radio" 
                            name="q${question.id}" 
                            id="${trueId}" 
                            value="True"
                            ${currentAnswer === 'True' ? 'checked' : ''}
                        >
                        <span class="tf-text">✓ True</span>
                    </label>
                    <label class="tf-option ${currentAnswer === 'False' ? 'selected' : ''}" for="${falseId}">
                        <input 
                            type="radio" 
                            name="q${question.id}" 
                            id="${falseId}" 
                            value="False"
                            ${currentAnswer === 'False' ? 'checked' : ''}
                        >
                        <span class="tf-text">✗ False</span>
                    </label>
                </div>
            `;
        }

        container.innerHTML = html;

        // Add event listeners for answer selection
        container.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.answers[question.id] = e.target.value;
                // Update visual selection
                container.querySelectorAll('.option-item, .tf-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                e.target.closest('.option-item, .tf-option')?.classList.add('selected');
            });
        });

        // Update navigation buttons
        document.getElementById('prev-btn').disabled = this.currentQuestionIndex === 0;

        const isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
        document.getElementById('next-btn').style.display = isLastQuestion ? 'none' : 'inline-block';
        document.getElementById('submit-btn').style.display = isLastQuestion ? 'inline-block' : 'none';
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
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
        const unanswered = this.questions.length - Object.keys(this.answers).length;

        if (unanswered > 0) {
            const confirm = window.confirm(
                `You have ${unanswered} unanswered question(s). Do you want to submit anyway?`
            );
            if (!confirm) return;
        }

        this.examEndTime = new Date();
        this.calculateResults();
        this.markAttemptCompleted(this.candidateDetails.rollNumber);
        this.showScreen('results-screen');
        this.displayResults();
    }

    calculateResults() {
        let correctAnswers = 0;
        let incorrectAnswers = 0;

        this.questions.forEach(question => {
            const userAnswer = this.answers[question.id];

            if (question.type === 'mcq') {
                if (userAnswer === question.answer) {
                    correctAnswers++;
                } else if (userAnswer) {
                    incorrectAnswers++;
                }
            } else if (question.type === 'tf') {
                if (question.answer.includes(userAnswer)) {
                    correctAnswers++;
                } else if (userAnswer) {
                    incorrectAnswers++;
                }
            }
        });

        const totalQuestions = this.questions.length;
        const unanswered = totalQuestions - correctAnswers - incorrectAnswers;
        const correctPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
        const incorrectPercentage = ((incorrectAnswers / totalQuestions) * 100).toFixed(2);

        this.actualMarks = correctAnswers; // Store for certificate

        this.examResults = {
            correctAnswers,
            incorrectAnswers,
            unanswered,
            totalQuestions,
            correctPercentage,
            incorrectPercentage,
            encodedMarks: this.encodingMap[correctAnswers] || 'aa'
        };
    }

    displayResults() {
        const results = this.examResults;

        document.getElementById('encoded-marks').textContent = results.encodedMarks;

        // Show screenshot reminder popup before showing certificate button
        this.showScreenshotReminder();
    }

    showScreenshotReminder() {
        const reminderHTML = `
            <div class="screenshot-reminder-overlay" id="screenshot-reminder">
                <div class="screenshot-reminder-box">
                    <h3>📸 Important!</h3>
                    <p>Please take a screenshot of your encoded result before proceeding.</p>
                    <p class="reminder-note">You will need to share this encoded result with the examiner.</p>
                    <button class="neon-button primary" onclick="app.closeScreenshotReminder()">
                        I have taken the screenshot
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', reminderHTML);
    }

    closeScreenshotReminder() {
        const reminder = document.getElementById('screenshot-reminder');
        if (reminder) {
            reminder.remove();
        }
        // Show the certificate button after closing reminder
        document.getElementById('get-certificate-btn').style.display = 'block';
    }

    showCertificatePrompt() {
        this.showScreen('certificate-code-screen');
        const input = document.getElementById('certificate-code-input');
        if (input) {
            input.value = '';
            input.focus();
        }
    }

    verifyCertificateCode() {
        const code = document.getElementById('certificate-code-input').value.trim().toLowerCase();
        const errorDiv = document.getElementById('certificate-error');
        const rollNumber = this.candidateDetails.rollNumber;
        const correctCode = this.certificateCodes[rollNumber];

        if (code === correctCode) {
            // Code is correct, show certificate
            this.showCertificate();
        } else {
            if (errorDiv) {
                errorDiv.textContent = '❌ Incorrect certificate code. Please contact the examiner.';
                errorDiv.classList.add('show');
                document.getElementById('certificate-code-input').value = '';
                setTimeout(() => {
                    errorDiv.classList.remove('show');
                }, 3000);
            }
        }
    }

    showCertificate() {
        // Generate and display certificate
        this.showScreen('certificate-screen');
        this.generateCertificateHTML();
    }

    generateCertificateHTML() {
        const container = document.getElementById('certificate-container');
        const { fullName, rollNumber, phone, email, address } = this.candidateDetails;
        const marks = this.actualMarks;
        const totalMarks = this.questions.length;
        const percentage = ((marks / totalMarks) * 100).toFixed(2);
        const currentDate = new Date().toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });

        const certificateHTML = `
            <div class="certificate-wrapper">
                <div class="certificate-border">
                    <div class="certificate-content">
                        <div class="certificate-header">
                            <h1 class="certificate-title">CERTIFICATE</h1>
                            <h2 class="certificate-subtitle">Class 10th Boards Exam Test</h2>
                            <div class="certificate-divider"></div>
                        </div>

                        <div class="certificate-body">
                            <p class="certificate-intro">This is to certify that</p>
                            <h2 class="certificate-name">${fullName}</h2>

                            <div class="certificate-details">
                                <div class="detail-row">
                                    <span class="detail-label">Roll Number:</span>
                                    <span class="detail-value">${rollNumber}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Phone:</span>
                                    <span class="detail-value">${phone}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Email:</span>
                                    <span class="detail-value">${email}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-label">Address:</span>
                                    <span class="detail-value">${address}</span>
                                </div>
                            </div>

                            <div class="certificate-marks">
                                <div class="marks-box">
                                    <span class="marks-label">Marks Obtained</span>
                                    <span class="marks-value">${marks} / ${totalMarks}</span>
                                </div>
                                <div class="marks-box">
                                    <span class="marks-label">Percentage</span>
                                    <span class="marks-value">${percentage}%</span>
                                </div>
                            </div>

                            <p class="certificate-success">has successfully completed the examination</p>
                        </div>

                        <div class="certificate-footer">
                            <div class="certificate-date">
                                <p>Date of Issue</p>
                                <p class="date-value">${currentDate}</p>
                            </div>
                            <div class="certificate-digital">
                                <p class="digital-badge">🔐 DIGITALLY GENERATED</p>
                                <p class="digital-note">This is a computer-generated certificate</p>
                            </div>
                        </div>

                        <div class="certificate-watermark">
                            <p>JKBOSE CLASS 10TH</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="certificate-action">
                <button class="neon-button success" onclick="window.print()">
                    🖨️ Print Certificate
                </button>
                <p class="certificate-note">Take a screenshot of this certificate for your records</p>
            </div>
        `;

        container.innerHTML = certificateHTML;
    }

    sendToWhatsApp() {
        const results = this.examResults;
        const message = `JKBOSE Class 10th Exam Result\n\n` +
            `Student: ${this.candidateDetails.fullName}\n` +
            `Roll No: ${this.candidateDetails.rollNumber}\n\n` +
            `Encoded Result: ${results.encodedMarks}\n\n` +
            `Please decode to get actual marks.`;

        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    retakeExam() {
        if (this.userRole === 'admin') {
            this.currentQuestionIndex = 0;
            this.answers = {};
            this.examResults = null;
            this.actualMarks = 0;
            this.startExam();
        } else {
            alert('Only admin users can retake the exam. General users have only one attempt.');
        }
    }

    showBlockedScreen(message) {
        this.showScreen('blocked-screen');
        document.getElementById('blocked-message').textContent = message;
    }

    showError(message, container) {
        if (container) {
            container.textContent = message;
            container.classList.add('show');
            setTimeout(() => {
                container.classList.remove('show');
            }, 4000);
        }
    }
}

// Initialize the app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ExamApp();
});
