// 全站交互增强（不侵入主题源码）
(function(){
  const init = () => {
    // 平滑滚动（退化处理：不支持则忽略）
    try{ document.documentElement.style.scrollBehavior = 'smooth' }catch(e){}

    // 为站内所有文章卡片添加轻微的入场动画
    const inView = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          e.target.style.transition='opacity .5s ease, transform .5s ease';
          e.target.style.opacity='1';
          e.target.style.transform='translateY(0)';
          inView.unobserve(e.target);
        }
      })
    }, { threshold: .08 })

    const cards = document.querySelectorAll('.recent-post-item, .article-sort-item');
    cards.forEach(c=>{
      c.style.opacity='0';
      c.style.transform='translateY(8px)';
      inView.observe(c);
    })

    // 外链新窗口打开且加上安全属性
    document.querySelectorAll('a[href^="http"]:not([href*="'+location.host+'"])').forEach(a=>{
      a.setAttribute('target','_blank');
      a.setAttribute('rel','noopener noreferrer');
    })
  }

  // 初次加载
  init()

  // PJAX 兼容：在主题的 PJAX 完成钩子里重新执行
  window.globalFn = window.globalFn || {}
  window.globalFn.pjaxComplete = window.globalFn.pjaxComplete || {}
  window.globalFn.pjaxComplete.customInit = init
})();