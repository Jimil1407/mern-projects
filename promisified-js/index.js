async function readfile(path) {
    try {
        const fs = require('fs');
        const data = await fs.promises.readFile(path, 'utf8');
        return data;
    } catch(error) {
        console.error(`Error reading file ${path}: ${error}`);
        return null;
    }
}

// Properly handle the Promise
readfile('data.txt')
    .then(data => console.log(data))
    .catch(error => console.error(error));

async function fetchData(url) {
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("error fetching response")
        return null;
    }
}

fetchData('https://api.github.com/users/hadley/orgs')
    .then(data => console.log(data));

async function waittime(time){
    try{
        await new Promise(resolve => setTimeout(resolve, time));
        console.log(`waited for ${time}ms`);
    } catch(error) {
        console.log("error waiting")
    }
}

waittime(4000);