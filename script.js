// قاعدة بيانات الأسئلة
const questions = [
    {
        id: 1,
        text: "يطبق القانون التجاري على كافة الأشخاص وكافة الأعمال دون تمييز.",
        isTrue: false,
        [cite_start]justification: "القانون التجاري هو شريعة خاصة تطبق فقط على نوع معين من الأعمال (التجارية) وطائفة معينة من الأشخاص (التجار). [cite: 1]"
    },
    {
        id: 2,
        text: "تتميز الأعمال التجارية بالسرعة وحرية الإثبات، بخلاف الأعمال المدنية.",
        isTrue: true,
        [cite_start]justification: "صحيح، تعتمد على سرعة اتخاذ القرارات، ومن أمثلة ذلك قاعدة حرية الإثبات في المواد التجارية. [cite: 4]"
    },
    {
        id: 3,
        text: "الائتمان في القانون التجاري يعني منح المدين أجلاً للوفاء بناءً على الثقة.",
        isTrue: true,
        [cite_start]justification: "صحيح، لأن التاجر يحتاج غالباً لفترة زمنية لتنفيذ تعهداته والدائن يمنحه هذا الأجل بناءً على الثقة. [cite: 6]"
    },
    {
        id: 4,
        text: "القانون التجاري مستقل تماماً عن القانون المدني ولا علاقة بينهما.",
        isTrue: false,
        [cite_start]justification: "الاستقلالية ليست تامة، إذ يبقى القانون المدني هو الشريعة العامة عند انعدام حكم في القانون التجاري. [cite: 9]"
    },
    {
        id: 5,
        text: "أخذ المشرع الجزائري بالنظرية الشخصية فقط في تحديد نطاق تطبيق القانون التجاري.",
        isTrue: false,
        [cite_start]justification: "خطأ، أخذ المشرع بالنظريتين معاً (الشخصية والموضوعية) كما نص في المواد 2، 3 و 4. [cite: 17]"
    },
    {
        id: 6,
        text: "يأتي العرف في المرتبة الأولى قبل التشريع التجاري كمصدر للقانون.",
        isTrue: false,
        [cite_start]justification: "الترتيب هو: 1- القانون التجاري، 2- القانون المدني، 3- العرف عند الاقتضاء. [cite: 19-21]"
    },
    {
        id: 7,
        text: "شراء العقارات لإعادة بيعها يعد عملاً تجارياً منفرداً بحسب الموضوع.",
        isTrue: true,
        [cite_start]justification: "صحيح، نصت المادة 2 على ذلك حتى لو صدر بصفة منفردة. [cite: 54]"
    },
    {
        id: 8,
        text: "التعامل بالسفتجة يكسب الشخص صفة التاجر.",
        isTrue: false,
        [cite_start]justification: "خطأ، السفتجة عمل تجاري بحسب الشكل، لكن التعامل بها لا يكسب الشخص صفة التاجر. [cite: 67]"
    },
    {
        id: 9,
        text: "دفتر اليومية ودفتر الجرد هما دفتران إلزاميان للتاجر.",
        isTrue: true,
        [cite_start]justification: "صحيح، يلزم كل تاجر بمسكهما وفقاً للمادتين 9 و 10 من القانون التجاري. [cite: 99]"
    },
    {
        id: 10,
        text: "في عقد التسيير الحر، يعمل المسير باسم المؤجر ولحسابه.",
        isTrue: false,
        [cite_start]justification: "خطأ، يعمل المسير باسمه ولحسابه الخاص ويجني الأرباح ويتحمل الخسائر. [cite: 206]"
    }
];

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    loadQuiz();
    document.getElementById('total').textContent = questions.length;
    updateProgress(0);
});

// التنقل بين التبويبات
function switchTab(tabName) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    if (tabName === 'quiz') {
        document.getElementById('quiz-section').classList.add('active');
        document.querySelector('button[onclick="switchTab(\'quiz\')"]').classList.add('active');
    } else {
        document.getElementById('summary-section').classList.add('active');
        document.querySelector('button[onclick="switchTab(\'summary\')"]').classList.add('active');
    }
}

// تحميل الأسئلة
function loadQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';

    questions.forEach((q, index) => {
        const card = document.createElement('div');
        card.className = 'question-card';
        card.id = `q-card-${q.id}`;
        card.innerHTML = `
            <h3>${index + 1}. ${q.text}</h3>
            <div class="options-grid">
                <button class="option-btn" onclick="checkAnswer(${q.id}, true, this)">
                    <i class="fas fa-check"></i> صح
                </button>
                <button class="option-btn" onclick="checkAnswer(${q.id}, false, this)">
                    <i class="fas fa-times"></i> خطأ
                </button>
            </div>
            <div class="justification" id="justify-${q.id}">
                <p><strong><i class="fas fa-info-circle"></i> التبرير القانوني:</strong> ${q.justification}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// المتغيرات للنتائج
let score = 0;
const answeredQuestions = new Set();

// التحقق من الإجابة
function checkAnswer(id, userChoice, btnElement) {
    if (answeredQuestions.has(id)) return;

    const question = questions.find(q => q.id === id);
    const justificationDiv = document.getElementById(`justify-${id}`);
    const parentGrid = btnElement.parentElement;
    const allButtons = parentGrid.querySelectorAll('.option-btn');

    // تعطيل الأزرار
    allButtons.forEach(btn => btn.disabled = true);

    justificationDiv.style.display = 'block';

    const isCorrect = (userChoice === question.isTrue);

    if (isCorrect) {
        btnElement.classList.add('correct');
        score++;
        justificationDiv.classList.remove('error-bg');
    } else {
        btnElement.classList.add('wrong');
        // تلوين الزر الصحيح للإرشاد
        const correctBtnIndex = question.isTrue ? 0 : 1;
        allButtons[correctBtnIndex].classList.add('correct');
        justificationDiv.classList.add('error-bg');
    }

    // تحديث النتيجة والتقدم
    answeredQuestions.add(id);
    document.getElementById('score').textContent = score;
    updateProgress(answeredQuestions.size);
}

// تحديث شريط التقدم
function updateProgress(answeredCount) {
    const total = questions.length;
    const percentage = Math.round((answeredCount / total) * 100);
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${percentage}%`;
}

// التحقق من كلمة المرور
function checkPassword() {
    const input = document.getElementById('password-input');
    const errorMsg = document.getElementById('error-msg');
    const lockCard = document.querySelector('.lock-card');
    
    if (input.value === "123456") {
        document.getElementById('lock-screen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('lock-screen').style.display = 'none';
            const fullSummary = document.getElementById('full-summary');
            fullSummary.classList.remove('hidden');
            fullSummary.style.animation = "slideUp 0.6s ease";
        }, 300);
    } else {
        errorMsg.textContent = "خطأ: كلمة المرور غير صحيحة!";
        input.value = "";
        
        // تأثير الاهتزاز عند الخطأ
        lockCard.style.animation = "shake 0.4s ease";
        setTimeout(() => lockCard.style.animation = "", 400);
    }
}

// إضافة ستايل الاهتزاز بالجافاسكريبت لعدم تضخيم ملف CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}`;
document.head.appendChild(styleSheet);
