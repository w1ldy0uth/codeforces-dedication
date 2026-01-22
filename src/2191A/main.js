const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function solve() {
    let testCases = 0;
    let currentTestCase = 0;
    let n = 0;
    let arr = [];
    
    rl.on('line', (line) => {
        if (testCases === 0) {
            testCases = parseInt(line);
        } else if (n === 0) {
            n = parseInt(line);
        } else {
            arr = line.split(' ').map(Number);
            processTestCase(n, arr);
            currentTestCase++;
            
            if (currentTestCase === testCases) {
                rl.close();
            } else {
                n = 0;
                arr = [];
            }
        }
    });
}

function processTestCase(n, arr) {
    const adj = Array.from({ length: n }, () => []);
    
    for (let i = 0; i < n - 1; i++) {
        adj[i].push(i + 1);
        adj[i + 1].push(i);
    }
    
    const indexedArr = arr.map((value, index) => ({ value, index }));
    
    indexedArr.sort((a, b) => a.value - b.value);
    
    for (let i = 0; i < n - 1; i++) {
        const idx1 = indexedArr[i].index;
        const idx2 = indexedArr[i + 1].index;
        
        if (!adj[idx1].includes(idx2)) {
            adj[idx1].push(idx2);
        }
        if (!adj[idx2].includes(idx1)) {
            adj[idx2].push(idx1);
        }
    }
    
    const color = new Array(n).fill(-1);
    let isBipartite = true;
    
    for (let i = 0; i < n; i++) {
        if (color[i] === -1) {
            const queue = [i];
            color[i] = 0;
            
            while (queue.length > 0 && isBipartite) {
                const u = queue.shift();
                
                for (const v of adj[u]) {
                    if (color[v] === -1) {
                        color[v] = color[u] ^ 1;
                        queue.push(v);
                    } else if (color[v] === color[u]) {
                        isBipartite = false;
                        break;
                    }
                }
            }
            
            if (!isBipartite) break;
        }
    }
    
    console.log(isBipartite ? "YES" : "NO");
}

solve();