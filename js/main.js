// ===== 首页：加载文章列表 =====
const postList = document.getElementById('post-list');
if (postList) {
  fetch('posts/index.json')
    .then(res => res.json())
    .then(posts => {
      if (posts.length === 0) {
        postList.innerHTML = '<p class="loading">还没有文章，敬请期待。</p>';
        return;
      }

      postList.innerHTML = posts.map((post, i) => `
        <div class="post-card reveal" style="transition-delay:${i * 0.1}s" onclick="location.href='post.html?slug=${post.slug}'">
          <h3><a href="post.html?slug=${post.slug}">${post.title}</a></h3>
          <div class="date">${post.date}</div>
          <div class="summary">${post.summary}</div>
        </div>
      `).join('');

      observeReveal();
    })
    .catch(() => {
      postList.innerHTML = '<p class="loading">加载失败，请刷新重试。</p>';
    });
}

// ===== 文章详情页：加载并渲染 Markdown =====
const postContent = document.getElementById('post-content');
if (postContent) {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');

  if (!slug) {
    postContent.innerHTML = '<p class="loading">未指定文章。</p>';
  } else {
    fetch(`posts/${slug}.md`)
      .then(res => {
        if (!res.ok) throw new Error('文章不存在');
        return res.text();
      })
      .then(md => {
        document.title = md.split('\n')[0].replace('# ', '') + ' - 我的博客';
        postContent.innerHTML = marked.parse(md);
      })
      .catch(() => {
        postContent.innerHTML = '<p class="loading">文章加载失败，可能已被删除。</p>';
      });
  }
}

// ===== 打字机效果 =====
(function typewriter() {
  const el = document.querySelector('.hero h1');
  if (!el || !el.textContent) return;

  const text = el.textContent.trim();
  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';
  el.parentElement.appendChild(cursor);

  let i = 0;
  const timer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
    } else {
      clearInterval(timer);
      setTimeout(() => { cursor.style.display = 'none'; }, 3000);
    }
  }, 100);
})();

// ===== 滚动渐显 =====
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== 回到顶部 =====
(function backToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 300);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===== 暗色模式 =====
(function darkMode() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const html = document.documentElement;

  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.setAttribute('data-theme', 'dark');
    toggle.textContent = '☀️';
  }

  toggle.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    if (isDark) {
      html.removeAttribute('data-theme');
      toggle.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
      toggle.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    }
  });
})();
