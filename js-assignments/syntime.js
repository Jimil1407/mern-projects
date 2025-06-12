
function calculateTime(n) {
    const startTime = Date.now();
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    const endTime = Date.now();
    console.log(endTime - startTime);
}

calculateTime(10000000000000);