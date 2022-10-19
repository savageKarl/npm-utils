import { installEventCenter, get, getSingle } from "@savage181855/utils";

const o = { a: 1 };

const obj = installEventCenter(o);

const shit = getSingle(function () {
  return "savage";
});

shit();
