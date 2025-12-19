// بيانات القائمة الافتراضية
const defaultMenuItems = [
    {
        id: 1,
        title: "بيتزا مارجريتا",
        description: "صلصة طماطم، موزاريلا، ريحان.",
        price: "75 ج.م",
        category: "Pizza",
        tag: "الأكثر طلباً",
        tagType: "popular",
        image: "https://images.pexels.com/photos/845798/pexels-photo-845798.jpeg"
    },
    {
        id: 2,
        title: "بيتزا بيبروني",
        description: "بيبروني، موزاريلا، صلصة طماطم.",
        price: "90 ج.م",
        category: "Pizza",
        tag: "جديد",
        tagType: "new",
        image: "https://images.pexels.com/photos/4109111/pexels-photo-4109111.jpeg"
    },
    {
        id: 3,
        title: "كشري حار خاص",
        description: "كشري مع صلصة حارة خاصة وكمية إضافية من الثوم والبصل المقلي. للمحبيين الطعم الحار المميز.",
        price: "٤٠ ج.م",
        category: "koshari",
        tag: "حار",
        tagType: "spicy",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "كشري صغير",
        description: "وجبة كشري صغيرة مناسبة للأطفال أو الوجبات الخفيفة. تحتوي على جميع مكونات الكشري الكلاسيكي.",
        price: "٢٠ ج.م",
        category: "koshari",
        tag: null,
        tagType: "",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "كشري بصلصة إضافية",
        description: "كشري كلاسيكي مع صلصة طماطم إضافية وكمية كبيرة من البصل المقلي المقرمش.",
        price: "٣٥ ج.م",
        category: "koshari",
        tag: null,
        tagType: "",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "طبق حمص إضافي",
        description: "طبق حمص إضافي يمكن إضافته لأي وجبة كشري. يزيد من القيمة الغذائية والطعم.",
        price: "١٥ ج.م",
        category: "extras",
        tag: "إضافة",
        tagType: "popular",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        title: "سلطة خضراء",
        description: "سلطة طازجة من الخس، الطماطم، الخيار، والفلفل الملون. تقدم كطبق جانبي مع الكشري.",
        price: "٢٠ ج.م",
        category: "extras",
        tag: null,
        tagType: "",
        image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        title: "عصير قصب طازج",
        description: "عصير قصب طازج مع إضافة من الليمون والنعناع. منعش ومفيد مع وجبة الكشري.",
        price: "٢٥ ج.م",
        category: "drinks",
        tag: "منعش",
        tagType: "new",
        image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        title: "حلاوة المولد",
        description: "حلاوة المولد التقليدية المغطسة بالفول السوداني والسمسم. حلوة مصري أصيل.",
        price: "٣٠ ج.م",
        category: "desserts",
        tag: "حلويات",
        tagType: "popular",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
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

// دالة لإنشاء قائمة الأقسام ديناميكيًا من البيانات
function getDynamicSections(items) {
    const sectionMap = {};

    items.forEach(item => {
        if (!item.category) return; // تجاهل الأصناف بدون فئة
        if (!sectionMap[item.category]) {
            sectionMap[item.category] = {
                id: item.category,
                title: item.category, // يمكن استبداله باسم أجمل أو ترجمة
                icon: "🍽️", // أي أيقونة عامة، يمكن تخصيص حسب الفئة
                items: []
            };
        }
        sectionMap[item.category].items.push(item);
    });

    return Object.values(sectionMap);
}

// دالة لإنشاء القسم HTML
function createMenuSectionDynamic(section) {
    const itemsHtml = section.items.map(item => createMenuItemCard(item)).join('');

    return `
        <section class="menu-section" id="section-${section.id}" aria-label="${section.title}">
            <div class="section-header">
                <div class="section-icon">${section.icon}</div>
                <h2 class="section-title">${section.title}</h2>
                <span class="section-count">${section.items.length} صنف</span>
            </div>
            <div class="menu-grid">
                ${itemsHtml}
            </div>
        </section>
    `;
}

// دالة عرض الأقسام ديناميكيًا
function renderMenuSectionsDynamic(items) {
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

    const dynamicSections = getDynamicSections(items);
    let sectionsHtml = '';

    dynamicSections.forEach(section => {
        sectionsHtml += createMenuSectionDynamic(section);
    });

    menuSectionsContainer.innerHTML = sectionsHtml;
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
            alert('مرحباً! يمكنك الطلب عن طريق الاتصال بنا على: ٠١٠٠١٢٣٤٥٦٧ أو عبر تطبيق واتساب.');
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
    
    // تحديث حجم الخطوط للشاشات الكبيرة جداً
    if (width > 2000) {
        document.documentElement.style.fontSize = '20px';
    } else if (width > 1600) {
        document.documentElement.style.fontSize = '18px';
    } else {
        document.documentElement.style.fontSize = '16px';
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
    
    // تحميل البيانات
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
    console.log('💡 يمكنك الوصول للبيانات عبر: window.menuData');
    console.log('💡 يمكنك تصفية القائمة عبر: window.filterMenuItems()');
    
    // إضافة زر للتصحيح في وضع التطوير
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const debugBtn = document.createElement('button');
        debugBtn.textContent = 'تصحيح';
        debugBtn.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #ff4444;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            z-index: 9999;
            font-family: 'Cairo', sans-serif;
        `;
        debugBtn.onclick = () => {
            console.log('=== حالة التطبيق ===');
            console.log('🔍 نص البحث:', document.getElementById('searchInput').value);
            console.log('📊 إجمالي العناصر:', menuItems.length);
            console.log('=== نهاية التقرير ===');
        };
        document.body.appendChild(debugBtn);
    }

});


