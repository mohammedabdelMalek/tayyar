function loadTranslations(language) {
    return fetch(`${language}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function setLanguage(language) {
    const flagIcon = document.getElementById("flagIcon");
    const heroSection = document.getElementById("heroSection"); // تأكد من وجود هذا العنصر في HTML

    // تغيير اللغة بين العربية والإنجليزية
    if (language === 'en') {
        flagIcon.src = 'assets/images/flags/uk.svg'; // علم الإنجليزية
        document.getElementById('welcome_message').classList.remove('float-end');
        document.getElementById('welcome_message').classList.add('float-start');
        heroSection .style.backgroundImage = "url('assets/images/heroeng.jpg')";
        heroSectionn.style.backgroundImage = "url('assets/images/heroeng.jpg')";

        heroSectionnn .style.backgroundImage = "url('assets/images/heroeng.jpg')";

        menucard2.style.backgroundImage = "url('assets/images/4cced25418f70ca76a2e48e6b55ab4c1.png')";
        menucard1.style.backgroundImage = "url('assets/images/fe2875b7b4dc3d3d1bdef0804b63f1cb.png')";
        heroSection.style.backgroundPosition = "right";
        heroSectionn.style.backgroundPosition = "right";
        heroSectionnn.style.backgroundPosition = "right";
    } else {
        flagIcon.src = 'assets/images/flags/sud.png'; // علم العربية
        document.getElementById('welcome_message').classList.remove('float-start');
        document.getElementById('welcome_message').classList.add('float-end');
        heroSection.style.backgroundImage = "url('assets/images/her2.jpg')";
        heroSectionn.style.backgroundImage = "url('assets/images/her2.jpg')";

        heroSectionnn.style.backgroundImage = "url('assets/images/her2.jpg')";

        menucard2.style.backgroundImage = "url('assets/images/mmmmmmmm.png')";
        menucard1.style.backgroundImage = "url('assets/images/mmmmmmm.png')";
        heroSection.style.backgroundPosition = "left";
        heroSectionn.style.backgroundPosition = "left";

        heroSectionnn.style.backgroundPosition = "left";

    }

    // تعيين اتجاه النص بناءً على اللغة
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.className = language === 'en' ? 'ltr' : 'rtl';
    localStorage.setItem('selectedLanguage', language);

    loadTranslations(language)
        .then(translations => {
            const keys = [
                'welcome_message', 'healthyvariety', 'Enjoyhealthy',
                'about_us', 'contact_us', 'home', 'FoodMenu',
                'ourlocation', 'Whychoose', 'BecausetHealthy',
                'Wespecialize', 'Wespecializee', 'Wespecializeee',
                'Discovermore', 'Enjoythebestmenu', 'MainDishesMenu',
                'MainDishesMenuu', 'Dark_Light'
            ];
            keys.forEach(key => {
                const element = document.getElementById(key);
                if (element) {
                    element.innerText = translations[key];
                }
            });
        })
        .catch(error => {
            console.error('Error loading translations:', error);
        });
}

function toggleLanguage() {
    const currentLanguage = localStorage.getItem('selectedLanguage') || 'en'; // اللغة الحالية أو افتراضية الإنجليزية
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar'; // التبديل بين اللغتين
    setLanguage(newLanguage); // استدعاء الدالة لتغيير اللغة
}

 
window.onload = function() {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // اللغة الافتراضية
    const savedTheme = localStorage.getItem('selectedTheme') || 'light-mode';
    setLanguage(savedLanguage);
    document.body.classList.add(savedTheme);
};

 