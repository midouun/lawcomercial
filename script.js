// قاعدة بيانات الأسئلة مستخرجة بدقة من الملخص
const questions = [
    {
        id: 1,
        text: "يطبق القانون التجاري على كافة الأشخاص وكافة الأعمال دون تمييز.",
        isTrue: false,
        justification: "خطأ. القانون التجاري هو شريعة خاصة تطبق فقط على نوع معين من الأعمال (التجارية) وطائفة معينة من الأشخاص (التجار). [المصدر: تعريف القانون التجاري - الصفحة 1]"
    },
    {
        id: 2,
        text: "تتميز الأعمال التجارية بالسرعة وحرية الإثبات، بخلاف الأعمال المدنية.",
        isTrue: true,
        justification: "صحيح. الأعمال التجارية تعتمد على سرعة الحركة واتخاذ القرارات، ومن أمثلة ذلك قاعدة حرية الإثبات في المواد التجارية. [المصدر: خصائص القانون التجاري - فقرة أ]"
    },
    {
        id: 3,
        text: "الائتمان في القانون التجاري يعني منح المدين أجلاً للوفاء بناءً على الثقة.",
        isTrue: true,
        justification: "صحيح. الائتمان هو الثقة، والتاجر يحتاج غالباً لفترة زمنية لتنفيذ تعهداته والدائن يمنحه هذا الأجل. [المصدر: خصائص القانون التجاري - فقرة ب]"
    },
    {
        id: 4,
        text: "القانون التجاري مستقل تماماً عن القانون المدني ولا علاقة بينهما.",
        isTrue: false,
        justification: "خطأ. الاستقلالية ليست تامة، إذ يبقى القانون المدني هو الشريعة العامة عند انعدام حكم في القانون التجاري. [المصدر: مدى استقلالية القانون التجاري]"
    },
    {
        id: 5,
        text: "أخذ المشرع الجزائري بالنظرية الشخصية فقط في تحديد نطاق تطبيق القانون التجاري.",
        isTrue: false,
        justification: "خطأ. أخذ المشرع بالنظريتين معاً (الشخصية والموضوعية) كما نص في المواد 2، 3 و 4 من القانون التجاري. [المصدر: نطاق تطبيق القانون التجاري]"
    },
    {
        id: 6,
        text: "يأتي العرف في المرتبة الأولى قبل التشريع التجاري كمصدر للقانون.",
        isTrue: false,
        justification: "خطأ. الترتيب هو: 1- القانون التجاري، 2- القانون المدني، 3- العرف عند الاقتضاء. [المصدر: مصادر القانون التجاري]"
    },
    {
        id: 7,
        text: "شراء العقارات لإعادة بيعها يعد عملاً تجارياً منفرداً بحسب الموضوع.",
        isTrue: true,
        justification: "صحيح. نصت المادة 2 على أن شراء العقارات لإعادة بيعها يعد عملاً تجارياً حتى لو صدر بصفة منفردة. [المصدر: الأعمال التجارية بحسب الموضوع]"
    },
    {
        id: 8,
        text: "التعامل بالسفتجة يكسب الشخص صفة التاجر.",
        isTrue: false,
        justification: "خطأ. السفتجة عمل تجاري بحسب الشكل، لكن التعامل بها لا يكسب الشخص صفة التاجر مهما تكرر. [المصدر: الأعمال التجارية بحسب الشكل - ملاحظة]"
    },
    {
        id: 9,
        text: "دفتر اليومية ودفتر الجرد هما دفتران اختياريان للتاجر.",
        isTrue: false,
        justification: "خطأ. هما دفتران إلزاميان يلزم كل تاجر بمسكهما وفقاً للمادتين 9 و 10 من القانون التجاري. [المصدر: الدفاتر الإلزامية]"
    },
    {
        id: 10,
        text: "في عقد التسيير الحر، يعمل المسير باسم المؤجر ولحسابه.",
        isTrue: false,
        justification: "خطأ. يعمل المسير باسمه ولحسابه الخاص ويجني الأرباح ويتحمل الخسائر مقابل دفع بدل الإيجار. [المصدر: التزامات المستأجر المسير]"
    }
];

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    loadQuiz();
    document.getElementById('total').textContent = questions.length;
});

// التنقل بين التبويبات
function switchTab(tabName) {
    // إخفاء كل الأقسام
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    // إظهار القسم المطلوب
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
        card.innerHTML = `
            <h3>${index + 1}. ${q.text}</h3>
            <div class="options">
                <button onclick="checkAnswer(${q.id}, true, this)">صح</button>
                <button onclick="checkAnswer(${q.id}, false, this)">خطأ</button>
            </div>
            <div class="justification" id="justify-${q.id}">
                <p><strong>التبرير:</strong> ${q.justification}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

// التحقق من الإجابة
let score = 0;
const answeredQuestions = new Set();

function checkAnswer(id, userChoice, btnElement) {
    if (answeredQuestions.has(id)) return; // منع الإجابة مرتين

    const question = questions.find(q => q.id === id);
    const justificationDiv = document.getElementById(`justify-${id}`);
    const parentOptions = btnElement.parentElement;

    // تعطيل الأزرار
    const buttons = parentOptions.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);

    justificationDiv.classList.add('show');

    if (userChoice === question.isTrue) {
        // إجابة صحيحة
        btnElement.classList.add('selected-true');
        justificationDiv.innerHTML = `<strong style="color:green">إجابة صحيحة!</strong> ${question.justification}`;
        score++;
    } else {
        // إجابة خاطئة
        btnElement.classList.add('selected-false');
        justificationDiv.classList.add('incorrect');
        justificationDiv.innerHTML = `<strong style="color:red">إجابة خاطئة!</strong> ${question.justification}`;
    }

    answeredQuestions.add(id);
    document.getElementById('score').textContent = score;
}

// التحقق من كلمة المرور
function checkPassword() {
    const input = document.getElementById('password-input').value;
    const errorMsg = document.getElementById('error-msg');
    
    if (input === "123456") {
        document.getElementById('lock-screen').style.display = 'none';
        document.getElementById('full-summary').classList.remove('hidden');
    } else {
        errorMsg.textContent = "كلمة المرور غير صحيحة. حاول مرة أخرى.";
        // هز خفيف للصندوق
        const lockCard = document.querySelector('.lock-card');
        lockCard.style.animation = "shake 0.5s";
        setTimeout(() => lockCard.style.animation = "", 500);
    }
}

// إضافة تأثير اهتزاز بسيط في CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
}`;
document.head.appendChild(styleSheet);
