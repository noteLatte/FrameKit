# FrameKit Liquid Glass

> **Apple-inspired Glassmorphism UI Framework**
> Pure CSS & JavaScript - No dependencies required

[![Version](https://img.shields.io/badge/version-1.2.0-0096ff.svg)](https://github.com/noteLatte/FrameKit)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![CDN](https://img.shields.io/badge/CDN-jsDelivr-orange.svg)](https://cdn.jsdelivr.net/gh/noteLatte/FrameKit@main/framekit.a5.js)

FrameKit Liquid Glass는 Apple의 Liquid Glass 디자인을 영감으로 한 **Glassmorphism UI 프레임워크**입니다. **JS 파일 하나만 로드해도 CSS가 자동으로 로드**됩니다!

## ✨ 특징

- 🎨 **Glassmorphism 디자인** - 블러 효과, 투명도, 그림자 등
- ⚡ **자동 CSS 로딩** - JS 파일 하나만 로드해도 CSS가 GitHub CDN에서 자동 로드
- 📱 **반응형 디자인** - 모든 기기에서 최적의 UI
- 🎭 **테마 시스템** - 라이트/다크 모드 자동 감지
- ✨ **애니메이션** - 다양한 CSS 애니메이션 효과
- 🧩 **컴포넌트** - 버튼, 카드, 모달, 폼 등
- 🚀 **zero dependency** - 순수 CSS & JS만으로 동작

## 🚀 빠른 시작

### 1. JS 파일 하나만 로드 (추천)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
</head>
<body>
    <!-- JS 파일 하나만 로드하면 CSS가 자동으로 로드됨! -->
    <script src="https://cdn.jsdelivr.net/gh/noteLatte/FrameKit@main/framekit.a5.js"></script>
</body>
</html>
```

**✅ 이 방법으로 사용하면 CSS가 GitHub CDN에서 자동으로 로드됩니다!**

### 2. 로컬 파일 사용

```html
<!-- JS와 CSS 모두 로컬에서 로드 -->
<link rel="stylesheet" href="framekit.a5.css">
<script src="framekit.a5.js"></script>
```

### 3. Preconnect로 더 빠른 로딩 (권장)

```html
<head>
    <!-- Preconnect for faster loading -->
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net/gh/noteLatte/FrameKit@main/framekit.a5.js" crossorigin>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/gh/noteLatte/FrameKit@main/framekit.a5.js"></script>
</body>
```

## 📦 설치

### CDN 사용 (추천)

```html
<script src="https://cdn.jsdelivr.net/gh/noteLatte/FrameKit@main/framekit.a5.js"></script>
```

### Direct Download

1. [framekit.a5.js](https://cdn.jsdelivr.net/gh/noteLatte/FrameKit@main/framekit.a5.js) 다운로드
2. [framekit.a5.css](https://cdn.jsdelivr.net/gh/noteLatte/FrameKit@main/framekit.a5.css) 다운로드
3. 프로젝트에 추가

### npm (준비중)

```bash
npm install framekit-liquid-glass
```

## 📖 사용법

### 기본 클래스

#### Glass 효과

```html
<!-- 기본 글라스 카드 -->
<div class="fk-card">
    <h3 class="fk-card-title">Card Title</h3>
    <p class="fk-card-content">Content here</p>
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

#### 입력 폼

```html
<label class="fk-input-label">Email Address</label>
<input type="email" class="fk-input" placeholder="Enter your email">
```

#### 모달

```html
<!-- Trigger -->
<button data-fk-modal="my-modal">Open Modal</button>

<!-- Modal -->
<div id="my-modal" class="fk-modal-overlay">
    <div class="fk-modal">
        <button class="fk-modal-close" aria-label="Close">&times;</button>
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

## 🎨 애니메이션

FrameKit은 다양한 CSS 애니메이션을 제공합니다.

### 사용 방법

```html
<!-- Fade In -->
<div class="fk-fade-in">This will fade in</div>

<!-- Slide Up -->
<div class="fk-slide-up">This will slide up</div>

<!-- Scale In -->
<div class="fk-scale-in">This will scale in</div>

<!-- Float -->
<div class="fk-float">This will float</div>

<!-- Pulse -->
<div class="fk-pulse">This will pulse</div>

<!-- Liquid Effect -->
<div class="fk-glass fk-liquid">Liquid glass effect</div>
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

## 🌟 예제

### 간단한 페이지

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
</head>
<body>
    <!-- JS 파일 하나만 로드하면 CSS가 자동으로 로드됨! -->
    <script src="https://cdn.jsdelivr.net/gh/noteLatte/FrameKit@main/framekit.a5.js"></script>
    
    <div class="container" style="padding: 24px;">
        <h1>Hello FrameKit!</h1>
        
        <div class="fk-card">
            <h3 class="fk-card-title">Welcome</h3>
            <p class="fk-card-content">This is a beautiful glass card.</p>
            <button class="fk-btn fk-btn-primary">Click Me</button>
        </div>
    </div>
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

## 🔗 CDN Links

### JavaScript (CSS 자동 로드)
```html
<script src="https://cdn.jsdelivr.net/gh/noteLatte/FrameKit@main/framekit.a5.js"></script>
```

### CSS (별도로 사용)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/noteLatte/FrameKit@main/framekit.a5.css">
```

### Preconnect for faster loading
```html
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net/gh/noteLatte/FrameKit@main/framekit.a5.js" crossorigin>
```
