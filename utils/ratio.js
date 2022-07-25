const getRatio = (x, y) => {
    x = parseFloat(x).toFixed(0);
    y = parseFloat(y).toFixed(0);

    if (x === 0 || y === 0) {
        return `${x}:${y}`;
    }
    if (x % y === 0) {
        return `${x / y}:1`;
    }
    if (y % x === 0) {
        return `1:${y / x}`;
    }

    const limit = Math.min(x, y) / 2;

    for (let i = 2; i <= limit; i++) {
        while (x % i === 0 && y % i === 0) {
            x = x / i;
            y = y / i;
        }
    }
    return `${x}:${y}`;
};

module.exports = getRatio;
