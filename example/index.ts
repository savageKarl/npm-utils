import { installEventCenter, get, getSingle } from "@savage181855/utils";

const o = { a: 1 };

const obj = installEventCenter(o);

const shit = getSingle(function () {
  console.debug('only once action')
  return "savage";
});

shit();
