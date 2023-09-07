const checkCounter = (counter, length) => {
    if (counter > length) {
        return 0;
    } else if (counter < 0) {
        return length;
    } else {
        return counter;
    };
};

export default checkCounter;