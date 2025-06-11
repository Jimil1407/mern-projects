// Promise-based version of readfile
function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        const fs = require('fs');
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

// Promise-based version of fetchData
function fetchDataPromise(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

// Promise-based version of waittime
function waitTimePromise(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`waited for ${time}ms`);
            resolve();
        }, time);
    });
}

// Example usage:
readFilePromise('data.txt')
    .then(data => console.log('File content:', data))
    .catch(error => console.error('Error reading file:', error));

fetchDataPromise('https://api.github.com/users/hadley/orgs')
    .then(data => console.log('GitHub data:', data))
    .catch(error => console.error('Error fetching data:', error));

waitTimePromise(4000)
    .then(() => console.log('Wait completed'))
    .catch(error => console.error('Error in wait:', error));
