import test from 'node:test';
import assert from 'node:assert/strict';
import {compareMeasurements,formatDifference} from '../src/lib/measurements.js';
test('compara velocidade em condições equivalentes',()=>{
  const result=compareMeasurements(3.2,4.1,'m/s');
  assert.ok(Math.abs(result.difference-0.9)<1e-9);
  assert.ok(Math.abs(result.percent-28.125)<1e-9);
});
test('não inventa porcentagem quando valor inicial é zero',()=>{
  assert.equal(compareMeasurements(0,4).percent,null);
});
test('ignora medições ausentes ou inválidas',()=>{
  assert.equal(compareMeasurements('',10),null);
  assert.equal(compareMeasurements('erro',10),null);
  assert.equal(compareMeasurements(null,10),null);
});
test('temperatura negativa continua válida como diferença, não economia',()=>{
  assert.equal(compareMeasurements(19,13,'°C').difference,-6);
});
test('formatação em pt-BR',()=>{
  assert.equal(formatDifference(1.25,1),'+1,3');
  assert.equal(formatDifference(-6,0),'-6');
});
