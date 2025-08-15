import { Category } from "./category";

function setInnerHTML(naam, content) {
    document.getElementById(naam).innerHTML = content;
}

function getInnerHTML(naam) {
    return document.getElementById(naam).innerHTML;
}

function getInterests(data, category) {
    return data.categories.find(c => c.category === category).interests
}

function renderRow(e) {
    return `
    <tr>
      <td>${e.name ?? ''}</td>
      <td>${e.primaryImage?.url ? `<img src="${e.primaryImage.url}" style="width:200px;" />` : ''}</td>
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

    fetch('https://api.imdbapi.dev/interests')
        .then(x => x.json())
        .then(data => {
            const result = data.categories;
            const categories = Array.isArray(result) ? result.map(Category.fromJSON) : [];
            const rows = getInterests(data, 'Fantasy').map(renderRow).join('');
            setInnerHTML('resultaat', rows);
        });


    document.getElementById('btnSave').addEventListener('click', saveToLocal, false);

    document.getElementById('btnLoad').addEventListener('click', loadFromLocal, false);
}