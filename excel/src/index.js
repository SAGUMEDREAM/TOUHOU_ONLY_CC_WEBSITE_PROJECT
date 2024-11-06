const year = 2024;
const version = 20241106;
const excelBody = document.querySelector(".excel");
const tableBody = document.querySelector(".excel tbody");
const API_SOURCE = {
    2024: "https://thonly.cc/proxy_google_doc/v4/spreadsheets/13ykPzw9cKqQVXXEwhCuX_mitQegHdFHjZtGdqT6tlmk/values:batchGet?ranges=THO!A2:E200&ranges=THP%26tea-party!A2:E200&ranges=School!A2:E200&ranges=LIVE!A2:E200&key=AIzaSyAKE37_qaMY4aYDHubmX_yfebfYmnx2HUw",
    2025: "https://thonly.cc/proxy_google_doc/v4/spreadsheets/1mMUsvTdyz07BtnLbs0WEr5gdvsRkjftnrek_n5HSdNU/values:batchGet?ranges=THO!A2:E200&ranges=THP%26tea-party!A2:E200&ranges=School!A2:E200&ranges=LIVE!A2:E200&key=AIzaSyAKE37_qaMY4aYDHubmX_yfebfYmnx2HUw"
}
const YEAR_DATA = new Map();
const DataSuppler = class {
    TOUHOU_ONLY = [];
    TOUHOU_PARTY = [];
    SCHOOL_PARTY = [];
    LIVE_OR_MUSIC = [];
}
const Year = class {
    constructor() {
    }
    dataSuppler;
}
var renderQueue = [];
var SELECT_YEAR = null;
var SELECT_TYPE = null;
function initMain() {
    for (const apisourceKey in API_SOURCE) {
        let url = API_SOURCE[apisourceKey]
        if(url != null && url !== '') {
            let year = new Year();
            let dataSuppler = new DataSuppler();
            year.dataSuppler = dataSuppler;
            initGoogleMultiDocs(API_SOURCE[apisourceKey], dataSuppler);
            console.log(year)
            YEAR_DATA.set(apisourceKey, year);
        }
    }
    createListener();
    render();
    console.log(`*** 东方Project线下活动维基 ***\n- Built Version: ${version}\n- Code: 稀神灵梦`);
}
function createListener() {
    const yearSelect = document.getElementById('year');
    const typeSelect = document.getElementById('type');
    SELECT_YEAR = yearSelect.value;
    SELECT_TYPE = typeSelect.value;
    yearSelect.addEventListener('change', function(event) {
        SELECT_YEAR = event.target.value;
        render();
    });
    typeSelect.addEventListener('change', function(event) {
        SELECT_TYPE = event.target.value;
        render();
    });
    let backToTopButton = document.querySelector('.back-to-top');
    backToTopButton.style.display = 'none';
    window.addEventListener('scroll', () => {
        let backToTopButton = document.querySelector('.back-to-top');
        if (window.pageYOffset > 100) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    document.querySelector('.back-to-top').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
function render() {
    renderQueue = [];
    tableBody.innerHTML = '';
    if (SELECT_YEAR == "ALL") {
        YEAR_DATA.forEach((value, key, map) => {
            let dataSuppler = value.dataSuppler;
            if(SELECT_TYPE == "ALL") {
                for (let dataSupplerKey in dataSuppler) {
                    joinRenderQueue(dataSuppler[dataSupplerKey]);
                }
            } else {
                joinRenderQueue(dataSuppler[SELECT_TYPE]);
            }
        });
    } else {
        let data = YEAR_DATA.get(SELECT_YEAR);
        if(data) {
            let dataSuppler = data.dataSuppler;
            if(SELECT_TYPE == "ALL") {
                for (let dataSupplerKey in dataSuppler) {
                    joinRenderQueue(dataSuppler[dataSupplerKey]);
                }
            } else {
                console.log(YEAR_DATA)
                console.log(SELECT_TYPE)
                console.log(dataSuppler)
                console.log(dataSuppler[SELECT_TYPE])
                joinRenderQueue(dataSuppler[SELECT_TYPE]);
            }
        }
    }
    finishRender();
}
function finishRender() {
    renderQueue.sort((a, b) => {
        const dateA = a[3] === "待定" ? new Date("9999/12/31") : new Date(a[3]);
        const dateB = b[3] === "待定" ? new Date("9999/12/31") : new Date(b[3]);
        return dateA - dateB;
    });

    renderQueue.forEach(row => {
        let tr = document.createElement('tr');

        row.forEach((cell, index) => {
            let td = document.createElement('td');
            td.textContent = cell;

            switch (index) {
                case 0:
                    td.style.width = "10%";
                    if (cell === "取消") {
                        td.classList.add('cancelled');
                    }
                    break;
                case 1:
                    td.style.width = "30%";
                    break;
                case 2:
                    td.style.width = "20%";
                    break;
                case 3:
                    td.style.width = "30%";
                    break;
                case 4:
                    td.style.width = "10%";
                    break;
            }

            tr.appendChild(td);
        });

        tableBody.appendChild(tr);
    });
    document.querySelectorAll('tr').forEach(tr => {
        if (tr.innerHTML.trim() === '') {
            tr.remove();
        }
    });
    document.querySelectorAll('tr').forEach((value, key, parent) => {
        if(value.querySelector('th') == null) {
            try {
                let len = value.querySelectorAll('td').length
                if(len != 5) {
                    value.remove();
                }
            } catch (e) {}
        }
    });
}


function joinRenderQueue(obj) {
    renderQueue.push(...obj);
}

function initGoogleMultiDocs(api_url, dataSuppler) {
    const xhr0 = new XMLHttpRequest();
    xhr0.open('GET', api_url, false);
    xhr0.onload = function () {
        if (xhr0.status === 200) {
            let data = JSON.parse(xhr0.responseText);
            let valueRanges = data["valueRanges"];
            dataSuppler.TOUHOU_ONLY = valueRanges[0]["values"] || [];
            dataSuppler.TOUHOU_PARTY = valueRanges[1]["values"] || [];
            dataSuppler.SCHOOL_PARTY = valueRanges[2]["values"] || [];
            dataSuppler.LIVE_OR_MUSIC = valueRanges[3]["values"] || [];
        } else {
            console.error(`Request failed with status: ${xhr0.status}`);
        }
    };
    xhr0.send();
}
function searchTable() {
    const query = document.getElementById('search').value.toLowerCase();
    const rows = document.querySelectorAll('.excel tbody tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let found = false;

        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(query)) {
                found = true;
            }
        });
        
        row.style.display = found ? '' : 'none';
    });
}
