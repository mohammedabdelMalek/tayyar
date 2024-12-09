 
const favoritesIcon = document.getElementById('favoritesIcon');
const favorites = document.getElementById('favorites');
const closeFavorites = document.getElementById('closeFavorites');
const favoritesContent = document.getElementById('favoritesContent');
function changeImage(smallImage) {
    // الحصول على عنصر الصورة الكبيرة
    const largeImage = document.getElementById('largeImage');
    
    // تغيير مصدر الصورة الكبيرة إلى مصدر الصورة الصغيرة
    largeImage.src = smallImage.src;
}
// فتح وإغلاق القائمة
favoritesIcon.addEventListener('click', (event) => {
    if (favorites.style.display === 'none' || favorites.style.display === '') {
        const iconRect = favoritesIcon.getBoundingClientRect();
        favorites.style.top = `${iconRect.bottom + window.scrollY}px`;
        favorites.style.left = `${iconRect.left}px`;
        favorites.style.display = 'block';
        event.preventDefault();
    } else {
        favorites.style.display = 'none';
        event.preventDefault();
    }
});

closeFavorites.addEventListener('click', () => {
    favorites.style.display = 'none';
});

// استرجاع العناصر من localStorage عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    storedFavorites.forEach(item => addItemToDOM(item.name, item.price, item.imageUrl));
});

// إضافة منتج إلى قائمة المفضلة
function addToFavorites(name, price, imageUrl, event) {
    // التحقق مما إذا كان المنتج موجودًا بالفعل في المفضلة
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = storedFavorites.some(item => item.name === name);

    if (isFavorite) {
        alert(`${name} موجود بالفعل في قائمة المفضلة!`);
        return; // إذا كان موجودًا، لا تضف المنتج مرة أخرى
    }

    // تحديث القائمة في DOM
    addItemToDOM(name, price, imageUrl);

    // حفظ في localStorage
    storedFavorites.push({ name, price, imageUrl });
    localStorage.setItem('favorites', JSON.stringify(storedFavorites));

    // تغيير الأيقونة إلى الأيقونة المملوكة
    const heartIcon = event.currentTarget.querySelector('i');
    heartIcon.classList.remove('lni-heart');
    heartIcon.classList.add('lni-heart-filled');

    // عرض إشعار للمستخدم
  alert(`${name} تم إضافته إلى قائمة المفضلة!`);
    
}

// إضافة عنصر إلى DOM
function addItemToDOM(name, price, imageUrl) {
    const item = document.createElement('div');
    item.classList.add('item');

    item.innerHTML = `
        <img src="${imageUrl}" alt="صورة المنتج">
        <span>${name} <br>${price} ريال سعودي</span>
        <button onclick="removeItem(this, '${name}')">×</button>
    `;

    favoritesContent.appendChild(item);
}

// إزالة عنصر من القائمة
function removeItem(button, name) {
    // إزالة العنصر من DOM
    const item = button.parentElement;
    favoritesContent.removeChild(item);

    // تحديث localStorage
    let storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    storedFavorites = storedFavorites.filter(item => item.name !== name);
    localStorage.setItem('favorites', JSON.stringify(storedFavorites));
}

    // استبدال حجم الصورة