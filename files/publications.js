(() => {
    const section = document.getElementById('publications');
    const controls = section.querySelector('.publication-controls');
    const selected = document.getElementById('selected-publications');
    const full = document.getElementById('full-publications');
    const selectedList = selected.querySelector('ol');
    const selectedRoles = new Set(['first', 'co-first', 'corresponding']);

    let nextNumber = full.querySelectorAll('ol > li').length;
    full.querySelectorAll('ol').forEach((list) => {
        list.reversed = true;
        list.start = nextNumber;
        nextNumber -= list.children.length;
    });

    Array.from(full.querySelectorAll('li[data-author-role]'))
        .filter((paper) => paper.dataset.authorRole.split(/\s+/).some((role) => selectedRoles.has(role)))
        .sort((a, b) => (Number(a.dataset.selectedOrder) || Infinity) - (Number(b.dataset.selectedOrder) || Infinity))
        .forEach((paper) => selectedList.appendChild(paper.cloneNode(true)));

    const showView = (view) => {
        selected.hidden = view !== 'selected';
        full.hidden = view !== 'full';
        controls.querySelectorAll('button').forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.view === view));
        });
    };

    controls.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => showView(button.dataset.view));
    });

    showView('selected');
    controls.hidden = false;
})();
