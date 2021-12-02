const fib = require('.')
const suite = new (require('benchmark')).Suite
const benchmarks = require('beautify-benchmark')

function rec(n) {
  if (n === 1) return 0
  if (n === 2) return 1
  return rec(n - 1) + rec(n - 2);
}

function struct(num) {
  let num1 = 0, num2 = 1, sum;
  for (let i = 0; i < num; i++) {
    sum=num1+num2;
    num1=num2;
    num2=sum;
  }
  return num2;
}

suite
  .add('this one', () => fib(15))
  .add('structured', () => struct(15))
  .add('recursive', () => rec(15))
  .on('cycle', e => benchmarks.add(e.target))
  .on('complete', () => benchmarks.log())
  .run({ async: true })
