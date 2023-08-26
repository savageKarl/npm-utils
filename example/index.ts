import { shallowCopy, area, debounce } from "@savage181855/utils";

const a = {
    test: {
        foo: "bar",
    },
};
const b = shallowCopy(a);
b.test.foo = "foo";

debounce(() => {
    console.log("sss");
});
