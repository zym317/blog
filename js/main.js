// 首页：加载文章列表
const postList = document.getElementById('post-list');
if (postList) {
  fetch('posts/index.json')
    .then(res => res.json())
    .then(posts => {
      if (posts.length === 0) {
        postList.innerHTML = '<p class="loading">还没有文章，敬请期待。</p>';
        return;
      }

      postList.innerHTML = posts.map(post => `
        <div class="post-card" onclick="location.href='post.html?slug=${post.slug}'">
          <h3><a href="post.html?slug=${post.slug}">${post.title}</a></h3>
          <div class="date">${post.date}</div>
          <div class="summary">${post.summary}</div>
        </div>
      `).join('');
    })
    .catch(() => {
      postList.innerHTML = '<p class="loading">加载失败，请刷新重试。</p>';
    });
}

// 文章详情页：加载并渲染 Markdown
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
