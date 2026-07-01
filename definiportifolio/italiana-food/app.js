document.addEventListener('DOMContentLoaded', () => {
    let menuData = [];
    const grid = document.getElementById('menu-grid');
    const tabs = document.querySelectorAll('.tab');
    const filterBtns = document.querySelectorAll('.filter');

    // — Fetch menu
    fetch('menu.json')
        .then(r => r.json())
        .then(data => { menuData = data; renderMenu(data); })
        .catch(() => { grid.innerHTML = '<p class="loading">Erro ao carregar cardápio.</p>'; });

    function renderMenu(items) {
        if (!items.length) { grid.innerHTML = '<p class="loading">Nenhum prato nesta categoria.</p>'; return; }
        grid.innerHTML = items.map(i => `
            <div class="dish-card">
                <div class="dish-head">
                    <span class="dish-name">${i.name}</span>
                    <span class="dish-price">R$ ${i.price.toFixed(2)}</span>
                </div>
                <p class="dish-desc">${i.description}</p>
                <div class="dish-foot">
                    <span class="dish-cat">${i.category}</span>
                    ${i.vegetarian ? '<span class="badge-veg">Vegetariano</span>' : ''}
                </div>
            </div>`).join('');
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.dataset.cat;
            renderMenu(cat === 'all' ? menuData : menuData.filter(i => i.category === cat));
        });
    });

    // — API Explorer
    const methodBadge = document.getElementById('method-badge');
    const urlText = document.getElementById('url-text');
    const statusTag = document.getElementById('status-tag');
    const resOut = document.getElementById('res-out');
    const btnSend = document.getElementById('btn-send');
    const pCat = document.getElementById('param-cat');
    const pId = document.getElementById('param-id');
    const pBody = document.getElementById('param-body');

    let activeUrl = 'menu-all';
    let activeMethod = 'GET';

    function updateUrlPreview() {
        methodBadge.textContent = activeMethod;
        methodBadge.className = 'method-badge ' + (activeMethod === 'GET' ? 'method-get' : 'method-post');
        const base = 'https://api.italiana.food';
        const map = {
            'menu-all': `${base}/menu`,
            'menu-cat': `${base}/menu?category=${document.getElementById('cat-val').value}`,
            'menu-id': `${base}/menu/${document.getElementById('id-val').value}`,
            'order': `${base}/order`
        };
        urlText.textContent = map[activeUrl];
    }

    tabs.forEach(t => {
        t.addEventListener('click', () => {
            tabs.forEach(x => x.classList.remove('active'));
            t.classList.add('active');
            activeUrl = t.dataset.url;
            activeMethod = t.dataset.method;
            pCat.style.display = activeUrl === 'menu-cat' ? 'flex' : 'none';
            pId.style.display = activeUrl === 'menu-id' ? 'flex' : 'none';
            pBody.style.display = activeUrl === 'order' ? 'flex' : 'none';
            updateUrlPreview();
        });
    });

    document.getElementById('cat-val').addEventListener('change', updateUrlPreview);
    document.getElementById('id-val').addEventListener('input', updateUrlPreview);

    btnSend.addEventListener('click', () => {
        statusTag.textContent = 'CARREGANDO…';
        resOut.textContent = '// aguardando resposta…';
        setTimeout(run, 500);
    });

    function run() {
        let result, code = '200 OK', color = '#27c93f';
        try {
            if (activeMethod === 'GET') {
                if (activeUrl === 'menu-all') result = menuData;
                else if (activeUrl === 'menu-cat') {
                    result = menuData.filter(i => i.category === document.getElementById('cat-val').value);
                } else {
                    const id = parseInt(document.getElementById('id-val').value);
                    result = menuData.find(i => i.id === id);
                    if (!result) { result = { error: `Prato ID ${id} não encontrado.` }; code = '404 NOT FOUND'; color = '#ff5f56'; }
                }
            } else {
                const raw = document.getElementById('body-val').value;
                const body = JSON.parse(raw);
                if (!body.customerName || !Array.isArray(body.items)) throw new Error('customerName e items são obrigatórios.');
                let total = 0;
                const detail = body.items.map(o => {
                    const d = menuData.find(m => m.id === o.id);
                    if (!d) throw new Error(`ID ${o.id} não encontrado no menu.`);
                    const sub = d.price * (o.qty || 1);
                    total += sub;
                    return { prato: d.name, qty: o.qty || 1, subtotal: sub };
                });
                result = {
                    success: true, orderId: Math.floor(Math.random() * 90000 + 10000),
                    customer: body.customerName, items: detail,
                    total, estimatedDelivery: '40 min', status: 'order_received',
                    timestamp: new Date().toISOString()
                };
                code = '201 CREATED';
            }
        } catch (e) {
            result = { error: e.message }; code = '400 BAD REQUEST'; color = '#ff5f56';
        }
        statusTag.textContent = code; statusTag.style.color = color;
        resOut.textContent = `HTTP/1.1 ${code}\nContent-Type: application/json\nDate: ${new Date().toUTCString()}\n\n` + JSON.stringify(result, null, 2);
    }

    updateUrlPreview();
});
