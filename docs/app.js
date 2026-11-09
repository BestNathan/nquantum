(function () {
  "use strict";
  var root = document.getElementById("app-content");
  var label = document.getElementById("view-label");
  var search = document.getElementById("global-search");
  var data = null;
  var state = { view: "overview", query: "", hardware: "全部", metric: "全部" };
  var titles = { overview: "总览", hardware: "技术路线", metrics: "指标体系", research: "研究专题", sources: "来源与证据", roadmap: "实施路线" };
  var repo = "https://github.com/BestNathan/nquantum";
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }
  function matches() {
    var haystack = Array.prototype.slice.call(arguments).join(" ").toLocaleLowerCase();
    return !state.query || haystack.indexOf(state.query.toLocaleLowerCase()) !== -1;
  }
  function link(labelText, href, cls) {
    return '<a class="' + esc(cls || "text-link") + '" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + esc(labelText) + ' ↗</a>';
  }
  function heading(eyebrow, title, description) {
    return '<section class="page-heading"><div class="page-eyebrow">' + esc(eyebrow) + '</div><h1 class="page-title">' + esc(title) + '</h1><p class="page-desc">' + esc(description) + '</p></section>';
  }
  function sectionTop(title, subtitle, url, href) {
    return '<div class="section-top"><div><h2 class="section-title">' + esc(title) + '</h2><p class="section-subtitle">' + esc(subtitle) + '</p></div>' +
      (url ? '<a class="text-link" href="' + esc(url) + '">' + esc(href || "查看全部") + ' →</a>' : "") + '</div>';
  }
  function trackCard(t) {
    return '<a class="track-card" href="#research"><span class="track-id">RESEARCH / ' + esc(t.no) + '</span><h3>' + esc(t.name) + '<span>' + esc(t.en) + '</span></h3><p>' + esc(t.description) + '</p><div class="card-end"><span>研究专题</span><span>↗</span></div></a>';
  }
  function overview() {
    return '<section class="hero"><div class="hero-copy">' +
      '<div class="page-eyebrow">EVIDENCE FIRST / OPEN RESEARCH</div>' +
      '<h1>看见量子计算的<br><em>真实进展。</em></h1>' +
      '<p>从物理量子比特到逻辑纠错，从论文证据到工程系统。建立可验证、可比较、可持续更新的量子计算研究工作台。</p>' +
      '<div class="hero-actions"><a class="button button-primary" href="#hardware">探索技术路线 <span>↗</span></a>' +
      '<a class="button button-ghost" target="_blank" rel="noopener noreferrer" href="' + repo + '/blob/main/docs/METHODOLOGY.md">研究方法论 <span>↗</span></a></div></div>' +
      '<div class="orbital" aria-hidden="true"><div class="orbit"></div><div class="orbit two"></div><div class="orbit three"></div><div class="orbit four"></div><div class="nucleus">ψ</div></div></section>' +
      '<div class="stats-grid">' +
      stat(data.tracks.length, "研究主线", "RESEARCH TRACKS") +
      stat(data.hardware.length, "硬件技术路线", "HARDWARE MODALITIES") +
      stat(data.metrics.length, "指标定义", "METRIC DEFINITIONS") +
      stat(data.verified_observations, "已录入核实观测", "NO BENCHMARKS YET") + '</div>' +
      '<section class="section">' + sectionTop("研究领域", "从理论到产业，六条相互关联的研究主线。", "#research", "全部专题") +
      '<div class="track-grid">' + data.tracks.map(trackCard).join("") + '</div></section>' +
      '<section class="section">' + sectionTop("研究方法", "对证据和实验条件进行分层，而不是直接对厂商打分。") +
      '<div class="split-panels"><article class="panel"><h3>当前重点问题</h3><div class="focus-list">' +
      '<div class="focus-item"><span class="focus-index">01</span><div><strong>规模不等于计算能力</strong><p>设备数量、可用拓扑、原生门质量和有效电路深度需要一起解释。</p></div></div>' +
      '<div class="focus-item"><span class="focus-index">02</span><div><strong>纠错是通用计算的关键转折</strong><p>关注逻辑错误率、码距、解码时延和逻辑门可执行性。</p></div></div>' +
      '<div class="focus-item"><span class="focus-index">03</span><div><strong>应用优势必须有强经典基线</strong><p>比较完整任务的精度、成本和时间，区分理论与商业价值。</p></div></div></div></article>' +
      '<article class="panel"><h3>证据链工作流</h3><p>每条结论都要回答：来源是什么、何时测量、实验条件如何、是否独立复现？</p>' +
      '<div class="pipeline"><span>来源发现</span><b>→</b><span>条件提取</span><b>→</b><span>证据复核</span><b>→</b><span>结构化记录</span></div>' +
      '<div class="panel-foot">路线图、营销叙述、论文和真实设备观测属于不同级别的材料。' +
      '<p>' + link("阅读数据和证据规范", repo + "/blob/main/docs/METHODOLOGY.md") + '</p></div></article></div></section>' +
      '<div class="notice">' + esc(data.disclaimer) + '</div>';
  }
  function stat(value, title, hint) {
    return '<article class="stat"><div class="stat-label">' + esc(title) + '</div><div class="stat-value">' + esc(value) + '<span>项</span></div><div class="stat-hint">' + esc(hint) + '</div></article>';
  }
  function filters(values, selected, kind) {
    return '<div class="toolbar" role="group" aria-label="' + (kind === "hardware" ? "路线筛选" : "指标分组筛选") + '">' +
      values.map(function (v) { return '<button type="button" data-filter="' + esc(kind) + '" data-value="' + esc(v) + '" class="filter-button' + (selected === v ? ' active' : '') + '" aria-pressed="' + (selected === v) + '">' + esc(v) + '</button>'; }).join("") + '</div>';
  }
  function hwCard(h, index) {
    return '<article class="hardware-card"><div class="hw-top"><span class="hw-label">MODALITY / ' + String(index + 1).padStart(2, "0") + '</span><span class="hw-kind">' + esc(h.category) + '</span></div>' +
      '<h3>' + esc(h.name) + '<small>' + esc(h.en) + '</small></h3><p class="hw-intro">' + esc(h.intro) + '</p>' +
      '<div class="hw-columns"><div class="hw-column"><h4>研究潜力</h4><ul>' + h.advantages.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("") + '</ul></div>' +
      '<div class="hw-column challenge"><h4>主要挑战</h4><ul>' + h.challenges.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join("") + '</ul></div></div>' +
      '<div class="hw-question"><span>KEY RESEARCH QUESTION</span>' + esc(h.question) + '</div><div class="hw-source">' + link("阅读来源入口", h.source) + '</div></article>';
  }
  function hardware() {
    var categories = ["全部"].concat(Array.from(new Set(data.hardware.map(function (h) { return h.category; }))));
    var filtered = data.hardware.filter(function (h) { return (state.hardware === "全部" || h.category === state.hardware) && matches(h.name, h.en, h.intro, h.category, h.question, h.advantages, h.challenges); });
    return heading("HARDWARE LANDSCAPE", "量子硬件技术路线", "比较不同量子计算物理实现的架构特点、潜在价值与工程障碍。所有描述为研究导览，不是设备性能排名。") +
      filters(categories, state.hardware, "hardware") +
      '<div class="notice">当前仅做技术维度梳理，未录入经原始证据核实的设备基准值。不能依据卡片顺序推断领先程度。</div>' +
      (filtered.length ? '<div class="hardware-grid">' + filtered.map(hwCard).join("") + '</div>' : '<div class="empty">没有匹配的技术路线。</div>') +
      '<section class="section"><div class="panel"><h3>为什么不提供“最佳量子计算机”综合排名？</h3><p>物理比特数量、连接拓扑、原生门集、门质量、算法任务以及纠错水平分属不同维度。若没有共同测量协议和可复现实验，单个分数只会制造错误的可比性。</p>' +
      link("查看研究规范", repo + "/blob/main/docs/METHODOLOGY.md") + '</div></section>';
  }
  function metricCard(m) {
    return '<details class="metric-item" id="' + esc(m.id) + '"><summary><span class="metric-title">' + esc(m.name) + '<small>' + esc(m.en) + '</small></span>' +
      '<span class="metric-symbol">' + esc(m.symbol) + '</span><span class="metric-chevron" aria-hidden="true">+</span></summary><div class="metric-details">' +
      '<div class="full"><h4>定义 / 公式</h4><div class="formula">' + esc(m.formula) + '</div></div>' +
      '<div><h4>它解释什么</h4><p>' + esc(m.meaning) + '</p></div><div><h4>解读限制</h4><p>' + esc(m.caveat) + '</p></div>' +
      '<div class="full"><h4>采集时必须附带</h4><p>' + esc(m.collection) + '</p></div></div></details>';
  }
  function metricView() {
    var groups = ["全部"].concat(data.metric_groups);
    var items = data.metrics.filter(function (m) { return (state.metric === "全部" || state.metric === m.group) && matches(m.name, m.en, m.group, m.formula, m.meaning, m.caveat); });
    var content = data.metric_groups.map(function (g) {
      var matching = items.filter(function (m) { return m.group === g; });
      return matching.length ? '<section class="metric-group"><h2 class="group-name">' + esc(g) + ' <span class="muted">/ ' + matching.length + '</span></h2>' + matching.map(metricCard).join("") + '</section>' : "";
    }).join("");
    return heading("MEASUREMENT FRAMEWORK", "指标体系与释义", "所有指标按研究问题分组。点击指标展开公式、实际含义、比较限制和数据采集要求。先定义口径，再加入实测数据。") +
      filters(groups, state.metric, "metric") +
      '<div class="notice">目前为指标定义字典，并非实时观测数据库。不同门集、协议、任务和实验条件的数值不得直接横向排序。</div>' +
      (items.length ? content : '<div class="empty">没有匹配的指标。</div>') +
      '<div class="panel"><h3>指标记录的最低要求</h3><p>每条观测应附测量日期、设备版本、具体协议、样本量/区间与原始来源。缺失值必须显示为“暂无可验证数据”，不能填 0。</p>' +
      link("阅读数据模型", repo + "/blob/main/docs/DATA_MODEL.md") + '</div>';
  }
  function researchCard(t) {
    return '<article class="research-card"><span class="sequence">RESEARCH / ' + esc(t.no) + '</span><h3>' + esc(t.name) + ' <small>' + esc(t.en) + '</small></h3><p>' + esc(t.description) + '</p>' +
      '<div class="question-box"><h4>KEY QUESTIONS</h4><ul>' + t.questions.map(function (q) { return '<li>' + esc(q) + '</li>'; }).join("") + '</ul></div>' +
      link("阅读完整研究文档", t.url) + '</article>';
  }
  function research() {
    var items = data.tracks.filter(function (t) { return matches(t.name, t.en, t.description, t.questions); });
    return heading("RESEARCH PROGRAM", "研究专题", "六条研究方向相互关联。每个专题都有核心问题、研究边界和下一阶段应交付的证据。") +
      (items.length ? '<div class="research-grid">' + items.map(researchCard).join("") + '</div>' : '<div class="empty">没有匹配的研究专题。</div>') +
      '<div class="panel"><h3>研究总纲</h3><p>每一项结论必须连接到来源、可验证实验条件和具体限制；实测、供应商声明与未来计划分别标记。</p>' +
      link("阅读完整研究规划", repo + "/blob/main/docs/RESEARCH_PLAN.md") + '</div>';
  }
  function sourceCard(s) {
    return '<article class="source-card"><div class="source-top"><span class="source-type">' + esc(s.kind) + '</span><span class="source-level">' + esc(s.level) + '</span></div>' +
      '<h3>' + esc(s.name) + '</h3><div class="source-org">' + esc(s.organization) + '</div><p>' + esc(s.note) + '</p>' +
      link("打开原始来源", s.url) + '</article>';
  }
  function sources() {
    var items = data.sources.filter(function (s) { return matches(s.name, s.kind, s.organization, s.note); });
    return heading("SOURCE & PROVENANCE", "来源与证据", "每个可发布的事实都应能追溯到原始材料。证据等级依据材料类型，不代表某机构的所有观点均已核实。") +
      '<section class="evidence-grid" aria-label="证据层级"><div class="evidence-level"><strong>E1</strong><p>原始论文、实验数据和可复现记录</p></div>' +
      '<div class="evidence-level"><strong>E2</strong><p>官方设备/API 文档及审计材料</p></div>' +
      '<div class="evidence-level"><strong>E3</strong><p>企业公告、技术博客和发展路线</p></div>' +
      '<div class="evidence-level"><strong>E4</strong><p>媒体与第三方评论、研究线索</p></div></section>' +
      '<div class="notice">* arXiv 是论文入口，不代表所有预印本都经过同行评审。来源等级需要针对具体论文或资料逐条复核。</div>' +
      (items.length ? '<div class="source-grid">' + items.map(sourceCard).join("") + '</div>' : '<div class="empty">没有匹配的来源。</div>') +
      '<div class="panel"><h3>从来源到结论</h3><p>保存作者、时间、原始链接、关键数据、测量协议、缺失信息及核实状态；新闻与公告不能替代原始实验。</p>' +
      link("阅读引用规范", repo + "/blob/main/docs/SOURCES.md") + '</div>';
  }
  function phaseCard(p) {
    return '<article class="phase"><div class="phase-heading"><h3><span>PHASE ' + esc(p.no) + '</span>' + esc(p.title) + '</h3><span class="phase-status">' + esc(p.status) + '</span></div>' +
      '<p>' + esc(p.description) + '</p><div class="task-list">' + p.tasks.map(function (task) {
        return '<div class="task"><span aria-hidden="true" class="task-mark' + (task.done ? ' done' : '') + '">' + (task.done ? '✓' : '·') + '</span><span>' + esc(task.text) + '</span></div>';
      }).join("") + '</div></article>';
  }
  function roadmap() {
    var items = data.roadmap.filter(function (p) { return matches(p.title, p.status, p.description, p.tasks.map(function (t) { return t.text; })); });
    return heading("RESEARCH ROADMAP", "实施路线图", "先建立可靠的知识与数据规范，再做时序分析、实验复现和持续更新。阶段任务表示计划和仓库内可检查的交付，不等于科研成果已经实现。") +
      (items.length ? '<div class="timeline">' + items.map(phaseCard).join("") + '</div>' : '<div class="empty">没有匹配的阶段。</div>') +
      '<div class="panel"><h3>更新纪律</h3><p>对来源、指标或研究结论的更新都通过仓库留下可追溯记录。自动发现候选材料可以后续加入，但不跳过证据审核。</p>' +
      link("阅读完整路线图", repo + "/blob/main/docs/ROADMAP.md") + '</div>';
  }
  function render() {
    if (!data) return;
    var segment = location.hash.replace(/^#/, "").split("/")[0];
    state.view = Object.prototype.hasOwnProperty.call(titles, segment) ? segment : "overview";
    label.textContent = titles[state.view];
    document.title = titles[state.view] + " · nquantum";
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      var active = a.getAttribute("data-nav") === state.view;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    var pages = { overview: overview, hardware: hardware, metrics: metricView, research: research, sources: sources, roadmap: roadmap };
    root.innerHTML = pages[state.view]();
  }
  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-filter]");
    if (!button) return;
    var kind = button.getAttribute("data-filter");
    if (kind === "hardware") state.hardware = button.getAttribute("data-value");
    if (kind === "metric") state.metric = button.getAttribute("data-value");
    render();
  });
  search.addEventListener("input", function () { state.query = search.value.trim(); render(); });
  window.addEventListener("hashchange", function () { state.query = ""; search.value = ""; render(); window.scrollTo(0, 0); });
  fetch("./data/research.json", { cache: "no-cache" }).then(function (response) {
    if (!response.ok) throw Error("HTTP " + response.status);
    return response.json();
  }).then(function (loaded) {
    if (!Array.isArray(loaded.tracks) || !Array.isArray(loaded.metrics)) throw Error("研究数据格式不正确");
    data = loaded;
    render();
  }).catch(function (error) {
    root.innerHTML = '<section class="panel"><h2>研究数据未能加载</h2><p>无法读取当前站点的 research.json：' + esc(error.message) + '。请检查 GitHub Pages 是否从 main /docs 发布，以及文件是否完整。</p>' +
      link("访问 GitHub 仓库", repo) + '</section>';
  });
})();
