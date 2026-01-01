// بيانات القائمة الافتراضية (تستخدم فقط إذا فشل تحميل ملف JSON)
const defaultMenuItems = [
    {
        id: 1,
        title: "كشري التحرير الكلاسيكي",
        description: "وصفة كشري التحرير الأصلية منذ ١٩٧٥ - أرز، معكرونة، عدس، حمص، صلصة طماطم، ثوم مقلي، وبصل مقرمش.",
        price: "٣٠ ج.م",
        category: "koshari",
        tag: "الأكثر طلباً",
        tagType: "popular",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "كشري عائلي كبير",
        description: "وجبة كشري تكفي ٤-٥ أشخاص. تحتوي على أرز، معكرونة، عدس، حمص، صلصة طماطم غنية، ثوم، بصل، وليمون.",
        price: "١٢٠ ج.م",
        category: "koshari",
        tag: "جديد",
        tagType: "new",
        image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
];

// تعريفات الأقسام
const menuSections = [
    {
        id: "koshari",
        title: "أصناف الكشري",
        icon: "🍚",
        description: "تشكيلة متنوعة من الكشري المصري الأصيل"
    },
    {
        id: "extras",
        title: "الإضافات والسلطات",
        icon: "🥗",
        description: "إضافات لذيذة تكمّل وجبتك"
    },
    {
        id: "drinks",
        title: "المشروبات",
        icon: "🥤",
        description: "مشروبات منعشة وطبيعية"
    },
    {
        id: "desserts",
        title: "الحلويات",
        icon: "🍮",
        description: "حلويات تقليدية لإنهاء الوجبة"
    }
];

// المتغيرات العامة
let menuItems = [];

// دالة لتحميل البيانات من ملف JSON
async function loadMenuData() {
    try {
        const response = await fetch('menu-data.json');
        
        if (!response.ok) {
            throw new Error(`خطأ في تحميل الملف: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ تم تحميل البيانات من ملف JSON:', data.length, 'عنصر');
        return data;
        
    } catch (error) {
        console.log('⚠️ استخدام البيانات الافتراضية بسبب:', error.message);
        
        // إذا كان الموقع يعمل على GitHub Pages، حاول مساراً مختلفاً
        if (window.location.hostname.includes('github.io')) {
            try {
                // حاول تحميل الملف من المسار الجذر
                const response = await fetch('/menu-data.json');
                if (response.ok) {
                    const data = await response.json();
                    console.log('✅ تم تحميل البيانات من المسار الجذر:', data.length, 'عنصر');
                    return data;
                }
            } catch (e) {
                console.log('❌ فشل التحميل من المسار الجذر:', e.message);
            }
        }
        
        return defaultMenuItems;
    }
}

// دالة لإنشاء بطاقة صنف
function createMenuItemCard(item) {
    const tagHtml = item.tag ? `<span class="card-tag tag-${item.tagType}">${item.tag}</span>` : '';
    
    return `
        <div class="menu-card" role="article" aria-label="${item.title} - ${item.price}">
            <div class="card-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="card-title">${item.title}</h3>
                    <div class="card-price">${item.price}</div>
                </div>
                <p class="card-description">${item.description}</p>
                ${tagHtml}
            </div>
        </div>
    `;
}

// دالة لإنشاء قسم قائمة
function createMenuSection(sectionId, sectionTitle, sectionIcon, items) {
    if (items.length === 0) return '';
    
    const itemsHtml = items.map(item => createMenuItemCard(item)).join('');
    
    return `
        <section class="menu-section" id="section-${sectionId}" aria-label="${sectionTitle}">
            <div class="section-header">
                <div class="section-icon">${sectionIcon}</div>
                <h2 class="section-title">${sectionTitle}</h2>
                <span class="section-count">${items.length} صنف</span>
            </div>
            <div class="menu-grid">
                ${itemsHtml}
            </div>
        </section>
    `;
}

// دالة لعرض أقسام القائمة
function renderMenuSections(items) {
    const menuSectionsContainer = document.getElementById('menuSections');
    
    if (!items || items.length === 0) {
        menuSectionsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🍽️</div>
                <h3>القائمة فارغة</h3>
                <p>لا توجد أصناف متاحة حالياً. يرجى المحاولة لاحقاً.</p>
            </div>
        `;
        return;
    }
    
    let hasVisibleSections = false;
    let sectionsHtml = '';
    
    // إنشاء كل قسم بناءً على البيانات
    menuSections.forEach(section => {
        const sectionItems = items.filter(item => item.category === section.id);
        
        if (sectionItems.length > 0) {
            sectionsHtml += createMenuSection(section.id, section.title, section.icon, sectionItems);
            hasVisibleSections = true;
        }
    });
    
    // إذا لم يكن هناك أقسام بعد التصفية
    if (!hasVisibleSections) {
        menuSectionsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>لم يتم العثور على نتائج</h3>
                <p>حاول تغيير كلمات البحث أو تصفية النتائج.</p>
            </div>
        `;
    } else {
        menuSectionsContainer.innerHTML = sectionsHtml;
    }
}

// دالة لتصفية العناصر حسب البحث
function filterMenuItems() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    
    console.log('🔍 بحث عن:', searchTerm || '(فارغ)');
    console.log('📊 إجمالي العناصر:', menuItems.length);
    
    let filteredItems = [...menuItems];
    
    // تطبيق البحث إذا كان هناك نص
    if (searchTerm) {
        filteredItems = menuItems.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(searchTerm);
            const descMatch = item.description.toLowerCase().includes(searchTerm);
            return titleMatch || descMatch;
        });
    }
    
    console.log('✅ النتائج:', filteredItems.length, 'عنصر');
    
    // عرض الأقسام المصفاة
    renderMenuSections(filteredItems);
}

// دالة لتهيئة الأحداث
function initializeEvents() {
    // إضافة مستمع حدث للبحث
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterMenuItems);
        console.log('✅ تم تهيئة حدث البحث');
    }
    
    // زر الطلب للجوال
    const orderBtn = document.getElementById('orderBtn');
    if (orderBtn) {
        orderBtn.addEventListener('click', () => {
            alert('مرحباً! يمكنك الطلب عن طريق الاتصال بنا على: 01212494501 أو عبر تطبيق واتساب.');
        });
        console.log('✅ تم تهيئة زر الطلب');
    }
    
    // إظهار/إخفاء زر الطلب حسب التمرير
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // التمرير لأسفل
            orderBtn.style.transform = 'translateY(80px)';
        } else {
            // التمرير لأعلى
            orderBtn.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// دالة لتحديث الواجهة حسب حجم الشاشة
function updateLayout() {
    const width = window.innerWidth;
    const orderBtn = document.getElementById('orderBtn');
    
    if (orderBtn) {
        if (width <= 768) {
            orderBtn.style.display = 'flex';
        } else {
            orderBtn.style.display = 'none';
        }
    }
}

// تحسين أداء الصور
function optimizeImages() {
    const images = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => img.setAttribute('loading', 'lazy'));
        console.log('✅ تم تفعيل lazy loading للصور');
    }
}

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 بدء تحميل التطبيق...');
    console.log('📁 الموقع الحالي:', window.location.href);
    
    // تحميل البيانات من ملف JSON
    menuItems = await loadMenuData();
    console.log('✅ تم تحميل البيانات:', menuItems.length, 'عنصر');
    
    // عرض البيانات في أقسام
    renderMenuSections(menuItems);
    
    // تهيئة الأحداث
    initializeEvents();
    
    // تحديث الواجهة
    updateLayout();
    
    // تحسين الصور
    optimizeImages();
    
    // تحديث عند تغيير الحجم
    window.addEventListener('resize', updateLayout);
    window.addEventListener('orientationchange', updateLayout);
    
    // تخزين البيانات في نطاق عام للاستخدام في console
    window.menuData = menuItems;
    window.filterMenuItems = filterMenuItems;
    window.renderMenuSections = renderMenuSections;
    
    console.log('🎉 التطبيق جاهز للاستخدام!');
    console.log('📋 جميع الأصناف:', menuItems);
    console.log('💡 يمكنك الوصول للبيانات عبر: window.menuData');
    console.log('💡 يمكنك تصفية القائمة عبر: window.filterMenuItems()');
    
    // زر لإعادة تحميل البيانات (للتجربة)
    const reloadBtn = document.createElement('button');
    reloadBtn.textContent = '🔄 تحديث البيانات';
    reloadBtn.style.cssText = `
        position: fixed;
        top: 60px;
        right: 10px;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        z-index: 9999;
        font-family: 'Cairo', sans-serif;
        font-size: 12px;
    `;
    reloadBtn.onclick = async () => {
        console.log('🔄 إعادة تحميل البيانات...');
        menuItems = await loadMenuData();
        renderMenuSections(menuItems);
        console.log('✅ تم تحديث البيانات:', menuItems.length, 'عنصر');
    };
    document.body.appendChild(reloadBtn);
});

