const getExpression = (again) => {
    return prompt(`Enter your expression${again ? ` ${again}.` : '.'}`);
};

const errorBoundary = (phrase) => {
    let result = 0;
    try {
        result = eval(getExpression(phrase));

        if (result === null) {

            return alert('You denied action!');

        } else if (result === Infinity) {
            const infinityError = new Error('Infinity!');
            throw infinityError;
        }else if (isNaN(result)) {
            const nan = new Error('Result is not a number!');
            throw nan;
        }

        return alert(result);

    } catch (e) {

        if (e instanceof ReferenceError ||
            e instanceof SyntaxError) {
            alert('You entered invalid expression!');
        } else {
            alert(e.message);
        };

        return errorBoundary('again');
    };
};
errorBoundary();


