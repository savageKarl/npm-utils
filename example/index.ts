import { shallowCopy, area } from "@savage181855/utils";

const a = {
    test: {
        foo: "bar",
    },
};
const b = shallowCopy(a);
b.test.foo = "foo";

console.log(a, b);
