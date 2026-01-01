// kadai.js
(function() {
  const loadingScreen = document.getElementById('loadingScreen');
  const progressBar = document.getElementById('progressBar');
  const mainContent = document.getElementById('mainContent');
  const mainText = document.getElementById('mainText');
  const characterGrid = document.getElementById('characterGrid');
  const characterSection = document.querySelector('.character-section');
  const customCursor = document.getElementById('customCursor');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // カスタムカーソル
  function setupCustomCursor() {
    document.addEventListener('mousemove', (e) => {
      customCursor.style.left = (e.clientX - 12) + 'px';
      customCursor.style.top = (e.clientY - 12) + 'px';
    });
  }

  // ローディング画面アニメーション
  function animateLoading() {
    let progress = 0;
    const startTime = Date.now();
    const duration = 3000;

    function updateProgress() {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / duration) * 100;
      progress = Math.min(newProgress, 100);
      
      progressBar.style.width = progress + '%';
      
      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          triggerGlitch();
        }, 300);
      }
    }

    updateProgress();
  }

  // グリッチエフェクト
  function triggerGlitch() {
    const glitchNoise = document.getElementById('glitchNoise');
    glitchNoise.style.animation = 'glitchNoise 0.4s ease forwards';
  }

  // フローティングテキスト
  function animateFloatingText() {
    const text = mainText.textContent;
    mainText.innerHTML = '';
    
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'floating-char';
      span.textContent = char;
      span.style.display = 'inline-block';
      mainText.appendChild(span);
    });

    setInterval(() => {
      const chars = mainText.querySelectorAll('.floating-char');
      chars.forEach(char => {
        const randomSize = (Math.random() - 0.5) * 6;
        const randomY = (Math.random() - 0.5) * 4;
        char.style.transform = `scale(${1 + randomSize / 100}) translateY(${randomY}px)`;
      });
    }, 1000);
  }

  // キャラクターカード選択（hoverのみ）
  function setupCharacterSelection() {
    const cards = document.querySelectorAll('.character-card');

    // ホバーイベント
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        cards.forEach(c => c.classList.remove('is-hover'));
        card.classList.add('is-hover');
      });

      // マウスがカードから離れたらホバー状態を削除
      card.addEventListener('mouseleave', () => {
        card.classList.remove('is-hover');
      });
    });
  }

  // スクロール時フェードイン
  function setupScrollReveal() {
    const sections = document.querySelectorAll('.fade-in-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // ナビゲーションリンク
  function setupNavigation() {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const target = link.getAttribute('data-target');
        const section = document.getElementById(target);
        
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // 初期化
  document.addEventListener('DOMContentLoaded', () => {
    setupCustomCursor();
    animateLoading();
    
    setTimeout(() => {
      animateFloatingText();
      setupCharacterSelection();
      setupNavigation();
      setupScrollReveal();
    }, 3300);
  });
})();