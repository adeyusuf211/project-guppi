const api   = 'https://api.publicapis.org/entries';

fetch(api)
    .then(response  => response.json())
    .then(data      => {
        const entries   = data.entries.slice(0, 100);
        allData(entries);
    });

function allData(data) {
    let card        = ``;
    data.forEach(d => card += cards(d));
    document.querySelector('.content-cards').innerHTML = card;
    
    document.querySelector('.content h1').innerHTML         = 'Example Data';
    document.querySelector('.content p > strong').innerHTML = data.length;

    no(data);
    apiKey(data);
    OAuth(data);
}

// Untuk menampilkan data api yang dicari berdasarkan nama dari api.
const search = document.getElementById('search');

search.addEventListener('input', async function() {
    fetch(api)
        .then(response  => response.json())
        .then(data      => {
            const keyword   = search.value;
            const result    = data.entries.filter(d => d.API.toLowerCase().includes(keyword.toLowerCase()));
            searchData(result);
        });
});

function searchData(data) {
    let card         = ``;
    data.forEach(d  => card += cards(d));
    document.querySelector('.content-cards').innerHTML = card;

    document.querySelector('.content h1').innerHTML         = 'Result';
    document.querySelector('.content p > strong').innerHTML = data.length;

    no(data);
    apiKey(data);
    OAuth(data);
}

const buttons = document.querySelectorAll('.sidebar-link ul li');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const id        = this.id;
        fetch(api)
            .then(response  => response.json())
            .then(data      => {
                const entries   = data.entries.filter(result => result.Category.toLowerCase() == id);
                sidebar(entries);
            });
    });
});


function sidebar(data) {
    let card            = '';
    data.forEach(category => card += cards(category));
    document.querySelector('.content-cards').innerHTML      = card;

    document.querySelector('.content h1').innerHTML         = "Result";
    document.querySelector('.content p > strong').innerHTML = data.length;

    no(data);
    apiKey(data);
    OAuth(data);
}

function no(data) {
    // Untuk menampilkan jumlah data api yang tidak membutuhkan autentikasi
    let totalNo     = ``;
    const no        = data.filter(d => d.Auth === '');
    const nos       = document.querySelector('.no');
    totalNo         +=   `
                            <h1>${no.length}</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                        `;
    nos.innerHTML = totalNo;
}

function apiKey(data) {
    // Untuk menampilkan jumlah data api yang membutuhkan autentikasi dengan apiKey
    let totalApikey = ``;
    const apiKey    = data.filter(d => d.Auth === 'apiKey');
    const apiKeys   = document.querySelector('.apikey');
    totalApikey    += `
                            <h1>${apiKey.length}</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M21,10h-8.35C11.83,7.67,9.61,6,7,6c-3.31,0-6,2.69-6,6s2.69,6,6,6c2.61,0,4.83-1.67,5.65-4H13l2,2l2-2l2,2l4-4.04L21,10z M7,15c-1.65,0-3-1.35-3-3c0-1.65,1.35-3,3-3s3,1.35,3,3C10,13.65,8.65,15,7,15z"/></g></svg>
                        `;
    apiKeys.innerHTML = totalApikey;
}

function OAuth(data) {
    // Untuk menampilkan jumlah data api yang membutuhkan autentikasi dengan OAuth.
    let totalOAuth  = ``;
    const oauth     = data.filter(d => d.Auth === 'OAuth');
    const oauths    = document.querySelector('.oauth');
    totalOAuth     += `
                            <h1>${oauth.length}</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
                        `;
    oauths.innerHTML = totalOAuth;
}

function cards(result) {
    return `
                <div class="card">
                    <div class="card-body">
                        <h3>${result.API}</h3>
                        <p>${result.Description}</p>
                    </div>
                    <div class="card-footer">
                        <div class="card-key">
                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M21,10h-8.35C11.83,7.67,9.61,6,7,6c-3.31,0-6,2.69-6,6s2.69,6,6,6c2.61,0,4.83-1.67,5.65-4H13l2,2l2-2l2,2l4-4.04L21,10z M7,15c-1.65,0-3-1.35-3-3c0-1.65,1.35-3,3-3s3,1.35,3,3C10,13.65,8.65,15,7,15z"/></g></svg>
                            <span>${result.Auth === "" ? "No Auth" : result.Auth}</span>
                        </div>
                        <a href="${result.Link}" target="_blank">Visit Site</a>
                    </div>
                </div>
            `;
}

const sidebars = document.querySelectorAll('.sidebar-link ul li');
sidebars.forEach(sidebar => {
    sidebar.addEventListener('click', function() {
        for(const sidebar of sidebars) {
            sidebar.classList.remove('active');
        }
        sidebar.classList.add('active');
    });
});

const toggle = document.getElementById('toggle');
toggle.addEventListener('click', () => {
    const sidebar           = document.querySelector('.sidebar');
    const sidebarBrandSpan  = document.querySelector('.sidebar .sidebar-brand span');

    sidebar.classList.toggle('side');
    sidebarBrandSpan.addEventListener('click', () => {
        sidebar.classList.remove('side');
    });
});