import { deepMerge } from "savage-utils";

const a = {
    test: {
        foo: "bar",
    },
};

const b = {
    hello: 'shit'
}

console.log(deepMerge(a, b))