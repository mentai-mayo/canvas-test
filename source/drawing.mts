
import { UpdateFunction } from "./canvas.mjs";

const colors: string[] = [ 'aaa', 'aaf', 'afa', 'faa', 'aff', 'ffa', 'faf', 'fff' ];
let colorIndex: number = 0;

const pos = {
  top: 0,
  left: 0,
};
const direction = {
  horizontal: 1, // 1 toRight / -1 toLeft
  vertical: 1,   // 1 toDown  / -1 toUp
};

const update: UpdateFunction = (meta)=>{
  const ctx = meta.context;

  pos.top += 3 * direction.vertical;
  pos.left += 3 * direction.horizontal;

  let isColorChange: boolean = false;

  if(pos.top > (meta.height - 50)){
    pos.top -= (pos.top - meta.height + 50) * 2;
    direction.vertical = -1;
    isColorChange = true;
  }
  if(pos.top < 0){
    pos.top *= -1;
    direction.vertical = 1;
    isColorChange = true;
  }
  if(pos.left > (meta.width - 326)){
    pos.left -= (pos.left - meta.width + 326) * 2;
    direction.horizontal = -1;
    isColorChange = true;
  }
  if(pos.left < 0){
    pos.left += -1;
    direction.horizontal = 1;
    isColorChange = true;
  }

  if(isColorChange){
    colorIndex++;
    if(colorIndex == colors.length) colorIndex = 0;
  }

  ctx.fillStyle = `#${ colors[colorIndex] }`;
  ctx.font = '48pt serif';
  ctx.fillText('Windows11', pos.left, pos.top + 50);
}

export default update;
