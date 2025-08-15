import { Category } from "./category.js";

function setInnerHTML(naam, content) {
    document.getElementById(naam).innerHTML = content;
}

function getInnerHTML(naam) {
    return document.getElementById(naam).innerHTML;
}

function renderRow(e) {
    return `
    <tr>
      <td>${e.name ?? ''}</td>
      <td>${e.imageUrl ? `<img src="${e.imageUrl}" style="width:200px;" />` : ''}</td>
    </tr>
  `;
}

function saveToLocal() {
    var rowData = getInnerHTML('resultaat');
    if (rowData != '') {
        localStorage.setItem('rows', rowData);
    }
}

function loadFromLocal() {
    var rowData = localStorage.getItem('rows');
    if (rowData != '') {
        setInnerHTML('resultaat2', rowData);
    }
}

window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(ex => console.log(`Exception: ${ex}`));
    }

    setInnerHTML('resultaat', '<tr>Content aan het laden...</tr>');

    let categories;

    fetch('https://api.imdbapi.dev/interests')
        .then(x => x.json())
        .then(data => {
            const result = data.categories;
            categories = Array.isArray(result) ? result.map(Category.fromJSON) : [];
        })
        .then(() => {
            const interests = categories.find(c => c.name === 'Fantasy').interests;
            const rows = interests.map(renderRow).join('');
            setInnerHTML('resultaat', rows);
        });

    document.getElementById('btnSave').addEventListener('click', saveToLocal, false);

    document.getElementById('btnLoad').addEventListener('click', loadFromLocal, false);
}