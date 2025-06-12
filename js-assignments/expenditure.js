function expenditure(transactions){
    const categories = [];
    transactions.forEach(tr => {
        if(!categories[tr.category]){
            categories[tr.category] = 0;
        }
        categories[tr.category] += tr.price;
    });
    return Object.keys(categories).map((category) => ({
        category,
        totalspent: categories[category],
    }));
}

let transactions =  [{
    id: 1,
    timestamp: 1656076800000,
    price: 10,
    category: 'Food',
    itemName: 'Pizza',
}]

console.log(expenditure(transactions))