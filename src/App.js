import React from 'react';
import Shape from './Shape';
import './style.css';

const BOX_DATA = [
  [1, 1, 0, 1],
  [1, 1, 1, 0],
  [1, 1, 0],
];

export default function App() {
  return <Shape boxData={BOX_DATA} />;
}
