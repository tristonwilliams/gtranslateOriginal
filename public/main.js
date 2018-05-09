'use strict'

let sdk = new window.sfdc.BlockSDK(); //initalize SDK
let defaultContent = `<h1>This is the defualt content</h1>`;

let data = {
    textMessage: '',
    fromLang: 'auto',
    toLang: 'en'
};

let saveData = () => {
    console.log('Saving data...');

    data.textMessage = document.getElementById('textMessage').value;
    data.fromLang = document.getElementById('fromLang').value;
    data.toLang = document.getElementById('toLang').value;

    let xhttp = new XMLHttpRequest();

    xhttp.open('POST', '/translate', true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(`text=${data.textMessage}&from=${data.fromLang}&to=${data.toLang}`);

    xhttp.onreadystatechange = () => {
        console.log('response -> ' + xhttp.responseText);
        // document.getElementById('t1').innerText = xhttp.responseText;

        sdk.setData(data, (updatedData) => {
            let content = xhttp.responseText;
            sdk.setContent(content);
        });
    }

}

let fetchData = () => {
    console.log('Loading data...');

    sdk.getData((data) => {
        if (Object.keys(data).length > 0) {

            document.getElementById('textMessage').value = data.text;
            document.getElementById('fromLang').value = data.from;
            document.getElementById('toLang').value = data.to;

            // console.log('Found data!');
        }
    });


}

// sdk.setSuperContent(defaultContent, (newSuperContent) => {});

// Event Handlers
window.onload = fetchData;
window.onchange = saveData;