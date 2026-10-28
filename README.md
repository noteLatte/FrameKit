# FrameKit Liquid Glass

> **Apple-inspired Glassmorphism UI Framework**
> Pure CSS & JavaScript - No dependencies required

[![Version](https://img.shields.io/badge/version-1.0.0-0096ff.svg)](https://github.com/noteLatte/FrameKit)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

FrameKit Liquid Glass는 Apple의 Liquid Glass 디자인을 영감으로 한 **Glassmorphism UI 프레임워크**입니다. 순수 CSS와 JavaScript로 구현되어 있어, 어떤 웹 프로젝트에서도 쉽게 사용할 수 있습니다.

## ✨ 특징

- 🎨 **Glassmorphism 디자인** - 블러 효과, 투명도, 그림자 등
- ⚡ **빠른 로딩** - Preconnect 지원
- 📱 **반응형 디자인** - 모든 기기에서 최적의 UI
- 🎭 **테마 시스템** - 라이트/다크 모드 자동 감지
- ✨ **애니메이션** - 다양한 CSS 애니메이션 효과
- 🧩 **컴포넌트** - 버튼, 카드, 모달, 폼 등
- 🚀 **zero dependency** - 순수 CSS & JS만으로 동작

## 🚀 빠른 시작

### 1. FrameKit 추가

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
    
    <!-- Preconnect for faster loading (권장) -->
    <link rel="preconnect" href="framekit.a5.css" crossorigin>
    <link rel="preconnect" href="framekit.a5.js" crossorigin>
    
    <!-- FrameKit CSS -->
    <link rel="stylesheet" href="framekit.a5.css">
</head>
<body>
    <!-- Your content -->
    <button class="fk-btn fk-btn-primary">Click Me</button>
    
    <!-- FrameKit JS -->
    <script src="framekit.a5.js"></script>
</body>
</html>
```

### 2. CDN 사용 (준비중)

```html
<!-- Preconnect -->
<link rel="preconnect" href="https://cdn.framekit.dev/a5/framekit.a5.css" crossorigin>
<link rel="preconnect" href="https://cdn.framekit.dev/a5/framekit.a5.js" crossorigin>

<!-- CSS -->
<link rel="stylesheet" href="https://cdn.framekit.dev/a5/framekit.a5.css">

<!-- JS -->
<script src="https://cdn.framekit.dev/a5/framekit.a5.js"></script>
```

## 📦 설치

### npm

```bash
npm install framekit-liquid-glass
```

### yarn

```bash
npm install framekit-liquid-glass
```

### Direct Download

1. [framekit.a5.css](src/css/framekit.a5.css) 다운로드
2. [framekit.a5.js](src/js/framekit.a5.js) 다운로드
3. 프로젝트에 추가

## 📖 사용법

### 기본 클래스

#### Glass 효과

```html
<!-- 기본 글라스 카드 -->
<div class="fk-glass">
    Content here
</div>

<!-- 글라스 강도 조절 -->
<div class="fk-glass fk-glass-light">Light Glass</div>
<div class="fk-glass fk-glass-medium">Medium Glass</div>
<div class="fk-glass fk-glass-dark">Dark Glass</div>
```

#### 버튼

```html
<button class="fk-btn fk-btn-primary">Primary Button</button>
<button class="fk-btn fk-btn-glass">Glass Button</button>
<button class="fk-btn fk-btn-dark">Dark Button</button>
```

#### 카드

```html
<div class="fk-card">
    <h3 class="fk-card-title">Card Title</h3>
    <p class="fk-card-subtitle">Subtitle</p>
    <p class="fk-card-content">Card content goes here</p>
</div>
```

#### 입력 폼

```html
<label class="fk-input-label">Email Address</label>
<input type="email" class="fk-input" placeholder="Enter your email">
```

#### 내비게이션 바

```html
<nav class="fk-navbar">
    <a href="#" class="fk-navbar-brand">My App</a>
    <ul class="fk-navbar-menu">
        <li><a href="#" class="fk-navbar-link">Home</a></li>
        <li><a href="#" class="fk-navbar-link">About</a></li>
        <li><a href="#" class="fk-navbar-link">Contact</a></li>
    </ul>
</nav>
```

#### 모달

```html
<!-- Trigger -->
<button data-fk-modal="my-modal">Open Modal</button>

<!-- Modal -->
<div id="my-modal" class="fk-modal-overlay">
    <div class="fk-modal">
        <button class="fk-modal-close">&times;</button>
        <h2>Modal Title</h2>
        <p>Modal content here</p>
    </div>
</div>
```

### JavaScript API

#### 테마 관리

```javascript
// 테마 설정
FrameKit.theme.setTheme('dark');  // dark, light, auto

// 테마 토글
FrameKit.theme.toggle();

// 현재 테마 가져오기
const currentTheme = FrameKit.theme.get();

// 다크 모드 체크
if (FrameKit.theme.isDark()) {
    console.log('Dark mode is active');
}
```

#### 애니메이션

```javascript
// 커스텀 애니메이션 생성
const animation = FrameKit.animations.createAnimation(
    element,
    [{ opacity: 0 }, { opacity: 1 }],
    { duration: 500 }
);

// 패럴랙스 효과
const cleanup = FrameKit.animations.parallax(element, 0.5);
// Later: cleanup();
```

#### 컴포넌트 생성 (JavaScript)

```javascript
// 버튼 생성
const button = FrameKit.components.createButton({
    text: 'Click Me',
    variant: 'fk-btn-primary',
    onClick: () => alert('Clicked!')
});

// 카드 생성
const card = FrameKit.components.createCard({
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    content: '<p>Card content</p>'
});

// 모달 생성
const { overlay, modal } = FrameKit.components.createModal({
    title: 'Modal Title',
    content: '<p>Modal content</p>',
    id: 'my-modal'
});

// 내비게이션 바 생성
const navbar = FrameKit.components.createNavbar({
    brand: { text: 'My App', href: '#' },
    menu: {
        items: [
            { text: 'Home', href: '#' },
            { text: 'About', href: '#' },
            { text: 'Contact', href: '#' }
        ]
    }
});
```

#### 유틸리티 함수

```javascript
// Debounce
const debouncedFn = FrameKit.utils.debounce(myFunction, 300);

// Throttle
const throttledFn = FrameKit.utils.throttle(myFunction, 100);

// Unique ID 생성
const id = FrameKit.utils.generateId('my-prefix');

// 날짜 포맷
const formatted = FrameKit.utils.formatDate(new Date(), 'YYYY-MM-DD');

// Query String 파싱
const params = FrameKit.utils.parseQuery('?name=John&age=25');
```

## 🎨 애니메이션

FrameKit은 다양한 CSS 애니메이션을 제공합니다.

### 사용 방법

```html
<!-- Fade In -->
<div class="fk-fade-in">This will fade in</div>

<!-- Slide Up -->
<div class="fk-slide-up">This will slide up</div>

<!-- Slide Down -->
<div class="fk-slide-down">This will slide down</div>

<!-- Scale In -->
<div class="fk-scale-in">This will scale in</div>

<!-- Float -->
<div class="fk-float">This will float</div>

<!-- Pulse -->
<div class="fk-pulse">This will pulse</div>

<!-- Liquid Effect -->
<div class="fk-glass fk-liquid">Liquid glass effect</div>
```

### 커스텀 애니메이션

```javascript
// JavaScript로 애니메이션 추가
FrameKit.animations.animateIn(element, 'fade-in');
FrameKit.animations.animateIn(element, 'slide-up');
```

## 🎭 테마 시스템

FrameKit은 자동으로 시스템 테마를 감지하고, 사용자 설정을 저장합니다.

### 테마 설정

```javascript
// 수동으로 테마 설정
FrameKit.theme.setTheme('dark');
FrameKit.theme.setTheme('light');
FrameKit.theme.setTheme('auto');  // 시스템 설정 따라가기

// 테마 토글
FrameKit.theme.toggle();

// 현재 테마 확인
const theme = FrameKit.theme.get();  // 'light' or 'dark'

// 체크
FrameKit.theme.isDark();  // boolean
FrameKit.theme.isLight(); // boolean
```

### HTML로 테마 설정

```html
<html data-theme="dark">
    <!-- 다크 테마로 시작 -->
</html>
```

## 📱 반응형 디자인

FrameKit은 모든 기기에서 최적의 UI를 제공합니다.

- 데스크탑: 완전한 기능
- 태블릿: 적응형 레이아웃
- 모바일: 터치 최적화

## 🔧 커스텀

### CSS 변수 커스텀

```css
:root {
    /* 색상 */
    --fk-primary: rgba(255, 100, 100, 0.8);
    --fk-secondary: rgba(255, 255, 255, 0.9);
    
    /* 글라스 효과 */
    --fk-glass-bg: rgba(255, 255, 255, 0.2);
    --fk-glass-border: rgba(255, 255, 255, 0.3);
    
    /* 애니메이션 */
    --fk-transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --fk-blur: blur(16px);
}
```

### 사용자 정의 클래스

```css
/* 사용자 정의 버튼 */
.my-custom-btn {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
}

.my-custom-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}
```

## 🌟 예제

### 간단한 대시보드

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    
    <link rel="preconnect" href="framekit.a5.css" crossorigin>
    <link rel="preconnect" href="framekit.a5.js" crossorigin>
    <link rel="stylesheet" href="framekit.a5.css">
</head>
<body>
    <nav class="fk-navbar">
        <a href="#" class="fk-navbar-brand">Dashboard</a>
        <ul class="fk-navbar-menu">
            <li><a href="#" class="fk-navbar-link">Home</a></li>
            <li><a href="#" class="fk-navbar-link">Analytics</a></li>
            <li><a href="#" class="fk-navbar-link">Settings</a></li>
        </ul>
    </nav>
    
    <div class="demo-container" style="padding-top: 80px;">
        <div class="demo-grid">
            <div class="fk-card fk-fade-in">
                <h3 class="fk-card-title">Total Users</h3>
                <p class="fk-card-subtitle">Last 30 days</p>
                <p style="font-size: 32px; font-weight: bold; margin: 16px 0;">1,234</p>
                <button class="fk-btn fk-btn-primary">View Details</button>
            </div>
            
            <div class="fk-card fk-fade-in">
                <h3 class="fk-card-title">Revenue</h3>
                <p class="fk-card-subtitle">This month</p>
                <p style="font-size: 32px; font-weight: bold; margin: 16px 0;">$12,345</p>
                <button class="fk-btn fk-btn-glass">View Report</button>
            </div>
            
            <div class="fk-card fk-fade-in">
                <h3 class="fk-card-title">Tasks</h3>
                <p class="fk-card-subtitle">Pending</p>
                <p style="font-size: 32px; font-weight: bold; margin: 16px 0;">8</p>
                <button class="fk-btn fk-btn-dark">Manage</button>
            </div>
        </div>
    </div>
    
    <script src="framekit.a5.js"></script>
</body>
</html>
```

## 📊 브라우저 지원

| 브라우저 | 지원 | 비고 |
|---------|------|------|
| Chrome | ✅ | 60+ |
| Firefox | ✅ | 52+ |
| Safari | ✅ | 12+ |
| Edge | ✅ | 79+ |
| Opera | ✅ | 47+ |

> **Note**: `backdrop-filter`는 Safari 15.4+에서 완전히 지원됩니다.

## 🤝 기여

FrameKit은 오픈 소스 프로젝트입니다. 기여를 환영합니다!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

MIT License - [LICENSE](LICENSE) 파일 참고

## 📞 연락처

- GitHub: [noteLatte/FrameKit](https://github.com/noteLatte/FrameKit)
- Issues: [GitHub Issues](https://github.com/noteLatte/FrameKit/issues)

---

**FrameKit by dummy** - Modern UI Framework for the Web
