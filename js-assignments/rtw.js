const fs = require('fs');

async function trimFile(filePath) {
    try {
        // Read the file
        const data = fs.readFileSync(filePath, 'utf8');
        console.log('Original content:', data);
        
        // Trim the content
        const trimmedData = data.trim();
        
        // Write back to the same file
        fs.writeFileSync(filePath, trimmedData);
        console.log('File trimmed successfully');
        
    } catch (error) {
        console.error('Error processing file:', error.message);
    }
}

// Example usage
trimFile('input.txt');

