function add2(x) {
  return x + 2;
}

export default function iamDefault() {
  return 'Hola yo soy el default';
}

export function toExport() {
  return 'hola from ES modules!';
}

export function add4(x) {
  return add2(x) + 2;
}
