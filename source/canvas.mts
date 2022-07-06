
export type UpdateFunction = (meta: { context: CanvasRenderingContext2D, frame: number, width: number, height: number })=>void;

export class Canvas {

  // ----- private fields -----

  /**
   * front canvas & context
   */
  private _front: { readonly canvas: HTMLCanvasElement, readonly context: CanvasRenderingContext2D };

  /**
   * back canvas & context
   */
  private _back: { readonly canvas: HTMLCanvasElement, readonly context: CanvasRenderingContext2D };

  /**
   * canvas information
   */
  private _canvasInfo: { readonly width: number, readonly height: number };

  private _updateFunction: UpdateFunction | null;

  private _startFrame: number;

  private _animationId: number | null;

  private _intervalId: number | null;

  private _fps: number;

  // ----- private methods -----

  private _flip(){
    this._animationId = null;
    this._front.context.fillStyle = '#000';
    this._front.context.fillRect(0, 0, this._front.canvas.width, this._front.canvas.height);
    this._front.context.drawImage(this._back.canvas, 0, 0, this._canvasInfo.width, this._canvasInfo.height, 0, 0, this._front.canvas.width, this._front.canvas.height);
  }

  private _everyFrame(){
    if(this._updateFunction){
      this._back.context.fillStyle = '#000';
      this._back.context.fillRect(0, 0, this._canvasInfo.width, this._canvasInfo.height);
      this._updateFunction({
        context: this._back.context,
        frame: Math.floor((performance.now() * this._fps / 1000 )) - this._startFrame,
        width: this._canvasInfo.width,
        height: this._canvasInfo.height,
      });
    }
    if(this._animationId !== null)
      window.cancelAnimationFrame(this._animationId);
    window.requestAnimationFrame(()=>this._flip());
  }

  // ----- public methods -----

  /**
   * constructor
   * @param canvas front-canvas
   * @param context front-rendering-context
   * @param width back-canvas width
   * @param height back-canvas height
   */
  public constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, width: number, height: number, fps: number){
    
    const backCanvas = document.createElement('canvas');
    backCanvas.width = width;
    backCanvas.height = height;
    const backContext = backCanvas.getContext('2d');
    if(!backContext) throw new Error('[canvas-test.canvas] cannot get 2d-context of inner-canvas');

    this._front = { canvas, context };
    this._back = { canvas: backCanvas, context: backContext };
    this._canvasInfo = { width: width, height: height };
    this._fps = Math.floor(fps);

    this._updateFunction = null;
    this._startFrame = 0;
    this._animationId = null;
    this._intervalId = null;
  }

  /**
   * set update function
   * @param callback function called everyframe
   * @param replace replace exist function
   * @return does set new function
   */
  setUpdate(callback: UpdateFunction, replace?: true): boolean{
    if(this._updateFunction && !replace) return false;
    this._updateFunction = callback;
    return true;
  }

  start(){
    if(this._intervalId !== null) return;
    this._startFrame = Math.floor(performance.now() * this._fps / 1000);
    this._intervalId = window.setInterval(()=>this._everyFrame(), 1000 / this._fps);
  }

  stop(){
    if(this._intervalId === null) return;
    window.clearInterval(this._intervalId);
  }
}
