// Async/await version of readfile
async function readFileAsync(path) {
    try {
        const fs = require('fs');
        const data = await fs.promises.readFile(path, 'utf8');
        return data;
    } catch (error) {
        throw new Error(`Error reading file: ${error.message}`);
    }
}

// Async/await version of fetchData
async function fetchDataAsync(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}

// Async/await version of waittime
async function waitTimeAsync(time) {
    try {
        await new Promise(resolve => setTimeout(resolve, time));
        console.log(`waited for ${time}ms`);
    } catch (error) {
        throw new Error(`Error in wait: ${error.message}`);
    }
}

// Example usage of individual functions
async function runIndividualExamples() {
    try {
        const fileData = await readFileAsync('data.txt');
        console.log('File content:', fileData);

        const githubData = await fetchDataAsync('https://api.github.com/users/hadley/orgs');
        console.log('GitHub data:', githubData);

        await waitTimeAsync(4000);
        console.log('Wait completed');
    } catch (error) {
        console.error('Error in examples:', error.message);
    }
}

// Example of running multiple async operations in parallel
async function runParallelExamples() {
    try {
        const [fileData, githubData] = await Promise.all([
            readFileAsync('data.txt'),
            fetchDataAsync('https://api.github.com/users/hadley/orgs')
        ]);
        
        console.log('All async operations completed');
        console.log('File data:', fileData);
        console.log('GitHub data:', githubData);
    } catch (error) {
        console.error('Error in parallel operations:', error.message);
    }
}

// Example of sequential operations
async function runSequentialExamples() {
    try {
        console.log('Starting sequential operations...');
        
        await waitTimeAsync(2000);
        const fileData = await readFileAsync('data.txt');
        console.log('File read after wait:', fileData);
        
        await waitTimeAsync(1000);
        const githubData = await fetchDataAsync('https://api.github.com/users/hadley/orgs');
        console.log('GitHub data after wait:', githubData);
        
        console.log('All sequential operations completed');
    } catch (error) {
        console.error('Error in sequential operations:', error.message);
    }
}

// Run all examples
async function runAllExamples() {
    console.log('=== Running Individual Examples ===');
    await runIndividualExamples();
    
    console.log('\n=== Running Parallel Examples ===');
    await runParallelExamples();
    
    console.log('\n=== Running Sequential Examples ===');
    await runSequentialExamples();
}

// Execute all examples
runAllExamples().catch(error => {
    console.error('Error running examples:', error.message);
});