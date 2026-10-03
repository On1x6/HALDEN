(() => {
  "use strict";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const PAGE = document.body.dataset.page;
  const CART_KEY = "halden_cart_v2";
  const money = n => `$${n}`;
  const byId = id => PRODUCTS.find(p => p.id === id);
  const href = p => `product.html?p=${p.slug}`;
  const priceOf = (p, size) => (p.sizes.find(s => s[0] === size) || p.sizes[0])[1];

  /* ---------- Product art ---------- */
  const bottle = (type, c, vb = "0 0 80 124") => {
    const y = type === "jar" ? 62 : type === "dropper" ? 62 : 74;
    const shapes = {
      dropper: `<rect x="32" y="4" width="16" height="22" rx="5" fill="#1a1a1a"/><rect x="28" y="24" width="24" height="9" fill="#1a1a1a"/><rect x="16" y="33" width="48" height="84" rx="9" fill="${c}"/>`,
      tube: `<rect x="20" y="6" width="40" height="14" rx="3" fill="#1a1a1a"/><path d="M16 20h48l-4 98H20Z" fill="${c}"/>`,
      jar: `<rect x="10" y="40" width="60" height="16" rx="4" fill="#1a1a1a"/><rect x="12" y="56" width="56" height="58" rx="10" fill="${c}"/>`
    };
    return `<svg viewBox="${vb}" aria-hidden="true">${shapes[type]}<rect x="22" y="${y}" width="36" height="30" rx="2" fill="#f9f6f1" opacity=".9"/><path d="M28 ${y + 10}h24" stroke="#1a1a1a" stroke-width="1.4"/></svg>`;
  };
  const stars = r => `<span class="stars"><i aria-hidden="true">${"★".repeat(Math.round(r))}${"☆".repeat(5 - Math.round(r))}</i><span>${r}<span class="sr"> out of 5</span></span></span>`;
  const card = p => `
    <article class="card">
      <div class="card__media">
        <a class="card__img" href="${href(p)}" aria-label="View ${p.name}">${bottle(p.type, p.color)}</a>
        <div class="card__overlay">
          <a class="ov-btn" href="${href(p)}">View details</a>
          <button data-add="${p.id}" aria-label="Add ${p.name} to cart">Add to cart</button>
        </div>
      </div>
      <div class="card__body">
        <div class="card__row"><h3 class="card__name"><a href="${href(p)}">${p.name}</a></h3><span>${money(p.sizes[0][1])}</span></div>
        <span class="card__meta">${p.sizes[0][0]}</span>${stars(p.rating)}
      </div>
    </article>`;

  /* ---------- Shared layout (same header, drawers and footer on every page) ---------- */
  const links = [["shop.html", "Shop", "shop"], ["our-story.html", "Our story", "story"], ["ingredients.html", "Ingredients", "ingredients"], ["journal.html", "Journal", "journal"]];
  const nav = links.map(([h, t, k]) => `<a href="${h}"${PAGE === k || (k === "shop" && PAGE === "product") ? ' aria-current="page"' : ""}>${t}</a>`).join("");
  document.body.insertAdjacentHTML("afterbegin", `
    <a class="skip" href="#main">Skip to content</a>
    <p class="announce">Free shipping on orders over $60</p>
    <header class="header">
      <div class="container header__row">
        <button class="icon-btn menu-toggle" id="menuOpen" aria-label="Open menu" aria-controls="navDrawer" aria-expanded="false"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
        <a href="index.html" class="logo" aria-label="Halden home">Halden</a>
        <nav class="nav" aria-label="Main">${nav}</nav>
        <div class="header__actions">
          <button class="icon-btn" id="searchToggle" aria-label="Search products" aria-expanded="false" aria-controls="searchBar"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg></button>
          <button class="icon-btn cart-btn" id="cartOpen" aria-label="Open cart, 0 items"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span class="badge" id="cartBadge" hidden>0</span></button>
        </div>
      </div>
      <form class="search" id="searchBar" action="shop.html" hidden><div class="container"><input type="search" name="q" id="searchInput" placeholder="Search cleansers, serums, SPF…" aria-label="Search products"></div></form>
    </header>
    <div class="drawer drawer--left" id="navDrawer" aria-hidden="true"><button class="icon-btn drawer__close" data-close aria-label="Close menu">✕</button><nav aria-label="Mobile">${nav}</nav></div>`);
  document.body.insertAdjacentHTML("beforeend", `
    <footer class="footer"><div class="container">
      <section class="newsletter" id="newsletter">
        <div><h2>Get 10% off your first order</h2><p>Routine tips and new releases, twice a month. Unsubscribe any time.</p></div>
        <form id="newsletterForm" novalidate><label for="email" class="sr">Email address</label>
          <div class="field"><input id="email" type="email" placeholder="you@example.com" autocomplete="email" required aria-describedby="emailMsg"><button class="btn btn--dark" type="submit">Subscribe</button></div>
          <p class="form-msg" id="emailMsg" role="status"></p></form>
      </section>
      <div class="footer__cols">
        <div><a href="index.html" class="logo">Halden</a><p class="muted">Considered skincare, made in small batches.</p></div>
        <div><h3>Shop</h3><a href="shop.html?cat=cleanse">Cleanse</a><a href="shop.html?cat=treat">Treat</a><a href="shop.html?cat=moisturise">Moisturise</a><a href="shop.html?cat=protect">Protect</a></div>
        <div><h3>Learn</h3><a href="our-story.html">Our story</a><a href="ingredients.html">Ingredients</a><a href="journal.html">Journal</a></div>
        <div><h3>Follow</h3><a href="https://instagram.com" rel="noopener">Instagram</a><a href="https://tiktok.com" rel="noopener">TikTok</a><a href="https://pinterest.com" rel="noopener">Pinterest</a></div>
      </div>
      <p class="muted copyright">Developed by Vladyslav Statyvka</p>
    </div></footer>
    <aside class="drawer drawer--right" id="cartDrawer" aria-hidden="true" aria-label="Shopping cart">
      <div class="drawer__head"><h2>Your cart</h2><button class="icon-btn" data-close aria-label="Close cart">✕</button></div>
      <ul class="cart-list" id="cartList"></ul>
      <div class="drawer__foot"><div class="subtotal"><span>Subtotal</span><strong id="cartTotal">$0</strong></div><button class="btn btn--dark btn--block" id="checkoutBtn">Checkout</button></div>
    </aside>
    <div class="backdrop" id="backdrop" hidden></div><div class="toast" id="toast" role="status" aria-live="polite"></div>`);

  /* ---------- Cart (localStorage, shared by every page) ---------- */
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { cart = []; }
  cart = cart.filter(i => byId(i.id));
  const save = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {} };
  const find = (id, size) => cart.find(i => i.id === id && i.size === size);
  function renderCart() {
    const count = cart.reduce((n, i) => n + i.qty, 0);
    const total = cart.reduce((n, i) => n + i.qty * priceOf(byId(i.id), i.size), 0);
    const badge = $("#cartBadge"); badge.textContent = count; badge.hidden = !count;
    $("#cartOpen").setAttribute("aria-label", `Open cart, ${count} item${count === 1 ? "" : "s"}`);
    $("#cartTotal").textContent = money(total); $("#checkoutBtn").disabled = !count;
    $("#cartList").innerHTML = cart.length ? cart.map(i => { const p = byId(i.id); return `
      <li class="cart-item">
        <a class="cart-item__thumb" href="${href(p)}" tabindex="-1">${bottle(p.type, p.color)}</a>
        <div><h3><a href="${href(p)}">${p.name}</a></h3><span class="card__meta">${i.size}</span>
          <div class="qty"><button data-dec="${p.id}" data-size="${i.size}" aria-label="Decrease quantity">−</button><span>${i.qty}</span><button data-inc="${p.id}" data-size="${i.size}" aria-label="Increase quantity">+</button></div></div>
        <div style="text-align:right"><div>${money(priceOf(p, i.size) * i.qty)}</div><button class="remove" data-remove="${p.id}" data-size="${i.size}">Remove</button></div>
      </li>`; }).join("") : `<li class="cart-empty">Your cart is empty. <a href="shop.html"><u>Browse the shop</u></a> to get started.</li>`;
  }
  function add(id, size, qty = 1) {
    const p = byId(id); size = size || p.sizes[0][0];
    const line = find(id, size); line ? (line.qty += qty) : cart.push({ id, size, qty });
    save(); renderCart();
    const b = $("#cartBadge"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
    toast(`${p.name} added to cart`);
  }
  $("#cartList").addEventListener("click", e => {
    const t = e.target.closest("button"); if (!t) return;
    const id = +(t.dataset.inc || t.dataset.dec || t.dataset.remove), line = find(id, t.dataset.size);
    if (!line) return;
    if (t.dataset.inc) line.qty++;
    if (t.dataset.dec) line.qty--;
    if (t.dataset.remove || line.qty < 1) cart = cart.filter(i => i !== line);
    save(); renderCart();
  });
  $("#checkoutBtn").addEventListener("click", () => toast("Checkout is a demo. Connect your payment provider."));
  // Keep other open tabs in sync
  window.addEventListener("storage", e => { if (e.key === CART_KEY) { try { cart = JSON.parse(e.newValue) || []; } catch { cart = []; } renderCart(); } });
  document.addEventListener("click", e => { const a = e.target.closest("[data-add]"); if (a) add(+a.dataset.add); });

  /* ---------- Drawers, search, toast, newsletter ---------- */
  const backdrop = $("#backdrop"); let lastFocus = null;
  function openDrawer(el, trigger) { lastFocus = trigger; el.classList.add("is-open"); el.setAttribute("aria-hidden", "false"); backdrop.hidden = false; document.body.classList.add("locked"); if (trigger.id === "menuOpen") trigger.setAttribute("aria-expanded", "true"); $("[data-close]", el).focus(); }
  function closeDrawers() { $$(".drawer.is-open").forEach(d => { d.classList.remove("is-open"); d.setAttribute("aria-hidden", "true"); }); backdrop.hidden = true; document.body.classList.remove("locked"); $("#menuOpen").setAttribute("aria-expanded", "false"); if (lastFocus) lastFocus.focus(); }
  $("#menuOpen").addEventListener("click", e => openDrawer($("#navDrawer"), e.currentTarget));
  $("#cartOpen").addEventListener("click", e => openDrawer($("#cartDrawer"), e.currentTarget));
  backdrop.addEventListener("click", closeDrawers);
  $$("[data-close]").forEach(b => b.addEventListener("click", closeDrawers));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && $(".drawer.is-open")) closeDrawers(); });

  window.matchMedia("(min-width: 960px)").addEventListener("change", e => { if (e.matches && $("#navDrawer").classList.contains("is-open")) closeDrawers(); });

  const sBar = $("#searchBar"), sBtn = $("#searchToggle"), sIn = $("#searchInput");
  sBtn.addEventListener("click", () => { sBar.hidden = !sBar.hidden; sBtn.setAttribute("aria-expanded", !sBar.hidden); if (!sBar.hidden) sIn.focus(); });
  sIn.addEventListener("input", () => document.dispatchEvent(new CustomEvent("halden:search", { detail: sIn.value })));
  sBar.addEventListener("submit", e => { if (PAGE === "shop") e.preventDefault(); });

  let tt; function toast(text) { const t = $("#toast"); t.textContent = text; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2400); }
  $("#newsletterForm").addEventListener("submit", e => {
    e.preventDefault();
    const input = $("#email"), msg = $("#emailMsg"), v = input.value.trim(), ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    input.setAttribute("aria-invalid", !ok); msg.className = `form-msg ${ok ? "ok" : "error"}`;
    msg.textContent = ok ? "Subscribed. Check your inbox for your 10% code." : v ? "Enter a valid email, like name@example.com." : "Enter your email address to subscribe.";
    if (ok) input.value = "";
  });

  /* ---------- Page: home ---------- */
  if ($("#heroBottles")) $("#heroBottles").innerHTML = ["dropper", "jar", "tube"].map((t, i) => bottle(t, ["#e2c7c0", "#c4cdbc", "#ddd2c4"][i])).join("");
  if ($("#bestsellers")) $("#bestsellers").innerHTML = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 3).map(card).join("");

  /* ---------- Page: shop ---------- */
  if (PAGE === "shop") {
    const sp = new URLSearchParams(location.search);
    const st = { filter: sp.get("cat") || "all", query: sp.get("q") || "", sort: "featured" };
    const sorters = { featured: () => 0, "price-asc": (a, b) => a.sizes[0][1] - b.sizes[0][1], "price-desc": (a, b) => b.sizes[0][1] - a.sizes[0][1], rating: (a, b) => b.rating - a.rating };
    const grid = $("#productGrid");
    function render() {
      const q = st.query.trim().toLowerCase();
      const list = PRODUCTS.filter(p => (st.filter === "all" || p.category === st.filter) && (!q || `${p.name} ${p.category} ${p.desc}`.toLowerCase().includes(q))).sort(sorters[st.sort]);
      grid.innerHTML = list.map(card).join("");
      $("#emptyState").hidden = list.length > 0;
      $("#resultCount").textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
      $$(".chip").forEach(c => { const on = c.dataset.filter === st.filter; c.classList.toggle("is-active", on); c.setAttribute("aria-pressed", on); });
    }
    $("#filters").addEventListener("click", e => { const b = e.target.closest("[data-filter]"); if (b) { st.filter = b.dataset.filter; render(); } });
    $("#sort").addEventListener("change", e => { st.sort = e.target.value; render(); });
    document.addEventListener("halden:search", e => { st.query = e.detail; render(); });
    if (st.query) { sBar.hidden = false; sIn.value = st.query; }
    render();
  }

  /* ---------- Page: product detail ---------- */
  if (PAGE === "product") {
    const p = PRODUCTS.find(x => x.slug === new URLSearchParams(location.search).get("p"));
    const root = $("#pdp");
    if (!p) { root.innerHTML = `<p class="empty">We couldn’t find that product. <a href="shop.html"><u>Back to the shop</u></a></p>`; $("#related").hidden = true; }
    else {
      document.title = `${p.name} — Halden`;
      const views = [["#ffffff", "0 0 80 124"], ["#e9d6d0", "0 0 80 124"], ["#d5ddce", "0 0 80 124"], ["#ffffff", "8 50 64 66"]];
      let size = p.sizes[0][0], qty = 1;
      root.innerHTML = `
        <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a> / <a href="shop.html">Shop</a> / <a href="shop.html?cat=${p.category}">${p.category[0].toUpperCase() + p.category.slice(1)}</a> / ${p.name}</nav>
        <div class="pdp">
          <div class="gallery"><div class="stage" id="stage"></div>
            <div class="thumbs">${views.map((v, i) => `<button class="thumb" data-view="${i}" style="background:${v[0]}" aria-label="View ${i + 1} of ${views.length}">${bottle(p.type, p.color, v[1])}</button>`).join("")}</div></div>
          <div class="pdp__info">
            <h1>${p.name}</h1>
            <div>${stars(p.rating)} <span class="card__meta">· ${p.reviews} reviews</span></div>
            <p class="pdp__price" id="price"></p>
            <p>${p.long}</p>
            <div><p class="label">Size</p><div class="sizes" id="sizes">${p.sizes.map(s => `<button class="size" data-size="${s[0]}" aria-pressed="false">${s[0]}</button>`).join("")}</div></div>
            <div class="buy"><div class="qty qty--lg"><button id="qMinus" aria-label="Decrease quantity">−</button><span id="qVal" aria-live="polite">1</span><button id="qPlus" aria-label="Increase quantity">+</button></div>
              <button class="btn btn--dark" id="addBtn" style="flex:1">Add to cart</button></div>
            <div class="acc"><details open><summary>How to use</summary><p>${p.usage}</p></details>
              <details><summary>Full ingredients</summary><p>${p.ingredients}</p></details>
              <details><summary>Shipping &amp; returns</summary><p>Free shipping over $60. Returns accepted within 30 days, even if opened.</p></details></div>
          </div>
        </div>`;
      const setView = i => { $("#stage").style.background = views[i][0]; $("#stage").innerHTML = bottle(p.type, p.color, views[i][1]); $$(".thumb").forEach((t, j) => t.setAttribute("aria-current", j === i)); };
      const setSize = s => { size = s; $("#price").textContent = money(priceOf(p, s)); $$(".size").forEach(b => b.setAttribute("aria-pressed", b.dataset.size === s)); };
      const setQty = n => { qty = Math.max(1, Math.min(10, n)); $("#qVal").textContent = qty; };
      setView(0); setSize(size);
      $(".thumbs").addEventListener("click", e => { const t = e.target.closest("[data-view]"); if (t) setView(+t.dataset.view); });
      $("#sizes").addEventListener("click", e => { const b = e.target.closest("[data-size]"); if (b) setSize(b.dataset.size); });
      $("#qMinus").addEventListener("click", () => setQty(qty - 1)); $("#qPlus").addEventListener("click", () => setQty(qty + 1));
      $("#addBtn").addEventListener("click", () => add(p.id, size, qty));
      const rel = [...PRODUCTS.filter(x => x !== p && x.category === p.category), ...PRODUCTS.filter(x => x !== p && x.category !== p.category)].slice(0, 3);
      $("#relatedGrid").innerHTML = rel.map(card).join("");
    }
  }
  renderCart();
})();
