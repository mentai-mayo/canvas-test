import { Canvas } from './canvas.mjs';
import update from './drawing.mjs';

window.addEventListener('load', async ()=>{

  console.log('[canvas-test]', 'onload...');
  
  const frontFrame = document.querySelector('div#game-frame > canvas') as (HTMLCanvasElement | null);
  if(!frontFrame) throw new Error('[canvas-test] canvas element is not exist');

  const frontContext = frontFrame.getContext('2d');
  if(!frontContext) throw new Error('[canva-test] 2d-context of canvas element is not exist');

  // init front canvas
  frontContext.fillStyle = '#000';
  frontContext.fillRect(0, 0, 1200, 720);

  // test
  const canvas = new Canvas(frontFrame, frontContext, 1200, 720, 60);
  canvas.setUpdate(update);

  canvas.start();
});