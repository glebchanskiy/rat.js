
export const colorize = (...args) => ({
    black: `\x1b[30m${args.join(' ')}`,
    red: `\x1b[31m${args.join(' ')}`,
    green: `\x1b[32m${args.join(' ')}`,
    yellow: `\x1b[33m${args.join(' ')}`,
    blue: `\x1b[34m${args.join(' ')}`,
    magenta: `\x1b[35m${args.join(' ')}`,
    cyan: `\x1b[36m${args.join(' ')}`,
    white: `\x1b[37m${args.join(' ')}`,
    bgBlack: `\x1b[40m${args.join(' ')}\x1b[0m`,
    bgRed: `\x1b[41m${args.join(' ')}\x1b[0m`,
    bgGreen: `\x1b[42m${args.join(' ')}\x1b[0m`,
    bgYellow: `\x1b[43m${args.join(' ')}\x1b[0m`,
    bgBlue: `\x1b[44m${args.join(' ')}\x1b[0m`,
    bgMagenta: `\x1b[45m${args.join(' ')}\x1b[0m`,
    bgCyan: `\x1b[46m${args.join(' ')}\x1b[0m`,
    bgWhite: `\x1b[47m${args.join(' ')}\x1b[0m`
  });

export function log(...args) {
    if (args.includes('ERROR')) {
        const text = args.filter(arg => arg !== 'ERROR').join(' ');
        typewriter(text, 40, 8, true);
    } else {
        const text = args.join(' ');
        typewriter(text, 40, 8);
    }
}

export function fastLog(...args) {
    if (args.includes('ERROR')) {
        const text = args.filter(arg => arg !== 'ERROR').join(' ');
        typewriter(text, 5, 8, true);
    } else {
        const text = args.join(' ');
        typewriter(text, 5, 8);
    }
}

function sleepSync(ms) {
    const end = Date.now() + ms;
    while (Date.now() < end) continue;
}

function typewriter(text, baseSpeed = 100, changeInterval = 5, err = false) {
    let currentSpeed = baseSpeed;

    const output = err ? process.stderr : process.stdout;

    const updateSpeed = () => {
        currentSpeed = baseSpeed + Math.floor(Math.random() * 40 - 20); // от -20 до +20 мс
    };

    for (let index = 0; index < text.length; index++) {
        output.write(text[index]);

        if (index % changeInterval === 0) {
            updateSpeed();
        }

        sleepSync(currentSpeed);
    }

    output.write('\n');
}
