export const optimizeCommand = (command: string): string => {
    if (!command) return '';

    const cleaned = command.replace(/[^ЛПВНОБ]/g, '');

    const step1 = compressSequences(cleaned);

    const step2 = findRepeatingPatterns(step1);

    return step2;
};

const compressSequences = (str: string): string => {
    let result = '';
    let i = 0;

    while (i < str.length) {
        const currentChar = str[i];
        let count = 1;

        while (i + count < str.length && str[i + count] === currentChar) {
            count++;
        }

        if (count > 1) {
            result += `${count}${currentChar}`;
        } else {
            result += currentChar;
        }

        i += count;
    }

    return result;
};

const findRepeatingPatterns = (str: string): string => {
    const maxPatternLength = Math.floor(str.length / 2);

    for (let len = maxPatternLength; len >= 2; len--) {
        for (let i = 0; i <= str.length - len * 2; i++) {
            const pattern = str.substr(i, len);
            let count = 1;

            for (let j = i + len; j <= str.length - len; j += len) {
                if (str.substr(j, len) === pattern) {
                    count++;
                } else {
                    break;
                }
            }

            if (count > 1) {
                const before = str.substr(0, i);
                const after = str.substr(i + count * len);
                const middle = `${count}(${pattern})`;
                return findRepeatingPatterns(before + middle + after);
            }
        }
    }

    return str;
};