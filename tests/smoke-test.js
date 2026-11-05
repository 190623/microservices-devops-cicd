const http = require('http');

const services = [
    {
        name: 'User Service',
        port: 3001,
        path: '/users'
    },
    {
        name: 'Product Service',
        port: 3002,
        path: '/products'
    },
    {
        name: 'Order Service',
        port: 3003,
        path: '/orders'
    }
];

function testService(service) {
    return new Promise((resolve) => {
        http.get(
            `http://localhost:${service.port}${service.path}`,
            (res) => {
                console.log(
                    `${service.name}: HTTP ${res.statusCode}`
                );

                resolve(res.statusCode === 200);
            }
        ).on('error', (error) => {
            console.error(
                `${service.name} failed: ${error.message}`
            );
            resolve(false);
        });
    });
}

async function runTests() {
    let passed = 0;

    for (const service of services) {
        if (await testService(service)) {
            passed++;
        }
    }

    console.log(`\nTests passed: ${passed}/${services.length}`);

    if (passed !== services.length) {
        process.exit(1);
    }

    console.log('All microservices are responding successfully.');
}

runTests();