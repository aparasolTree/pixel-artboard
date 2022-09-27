import { invariant } from './invariant';
import EventTarget from './EventTarget';
import { clamp, createCanvasElement, deepClone, isCanvasElement } from './utils';

export interface PixelArtboardOptions {
    width?: number;
    height?: number;
    rows?: number;
    cloumns?: number;
}

const pixelSiblingMap = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

export type Pixel = {
    color: string;
    opacity: number;
    row: number;
    column: number;
};
export type Pixels = Pixel[][];
export type EventName =
    | 'brush:down'
    | 'brush:move'
    | 'brush:up'
    | 'size'
    | 'forward'
    | 'save'
    | 'back'
    | 'erase:start'
    | 'erasing'
    | 'erase:end'
    | 'reset'
    | 'change:name'
    | 'set:rows'
    | 'set:columns'
    | 'change:color'
    | 'width'
    | 'height'
    | 'eyedropper';

export type PixelEvent = {
    row: number;
    currentColor: string;
    column: number;
    fillColor: string;
};

export class PixelArtboard extends EventTarget<EventName> {
    private _rows: number;
    private _columns: number;
    private _name: string = '';
    private _size: number = 0;
    private _brushColor: string = '';
    private _width: number = 0;
    private _height: number = 0;

    public id: string = '';
    public rowSpacing: number = 0;
    public columnSpacing: number = 0;
    public isMouseDown: boolean = false;
    public canRender: boolean = true;
    public offscreenCanvas: HTMLCanvasElement | null = null;
    public offscreenCanvasContext: CanvasRenderingContext2D | null = null;
    public brushState: 'rubber' | 'brush' | 'fill' | 'eyedropper' = 'brush';

    public past: Pixels[] = [];
    public pixels: Pixels = [];
    public future: Pixels[] = [];

    public element: HTMLCanvasElement | null = null;
    public context: CanvasRenderingContext2D | null = null;
    public constructor(options: PixelArtboardOptions = {}) {
        super();

        const { width = 300, height = 150, rows = 10, cloumns = 10 } = options;
        this._width = width;
        this._height = height;
        this._rows = rows;
        this._columns = cloumns;
    }

    mount(element: HTMLCanvasElement) {
        invariant(isCanvasElement(element), 'the element found is not a canvas element');

        this.element = element as HTMLCanvasElement;
        this.context = this.element.getContext('2d')!;

        this.initCanvasWidthHeight(this.width, this.height);
        this.setRowsColumnsSpacing();
        this.renderBackgroundGrid(this.context);
        this.createArtboardPixels();
        const remove = this.bindCanvasEvent();
        this.initOffscreenCanvas();
        this.setSize();
        return remove;
    }

    async setSize() {
        this.size = await this.getCanvasSize();
    }

    initOffscreenCanvas() {
        this.offscreenCanvas = createCanvasElement(this.width, this.height);
        this.offscreenCanvasContext = this.offscreenCanvas?.getContext('2d') ?? null;
    }

    createArtboardPixels() {
        this.pixels = Array.from({ length: this.rows }, (_, r) => {
            return Array.from({ length: this.columns }, (_, c) => ({
                color: '',
                opacity: 1,
                row: r,
                column: c,
            }));
        });
    }

    setRowsColumnsSpacing() {
        this.rowSpacing = Math.round(this.height / this.rows);
        this.columnSpacing = Math.round(this.width / this.columns);
    }

    renderBackgroundGrid(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 0, 0, .04)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 1; i < this.rows; i++) {
            ctx.moveTo(0, i * this.rowSpacing);
            ctx.lineTo(this.width, i * this.rowSpacing);
        }
        for (let i = 1; i < this.columns; i++) {
            ctx.moveTo(i * this.columnSpacing, 0);
            ctx.lineTo(i * this.columnSpacing, this.height);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

    initCanvasWidthHeight(width: number, height: number) {
        if (!this.element) return;
        this.element.width = width;
        this.element.height = height;
        this.element.style.cssText = `width: ${width}px; height: ${height}px;`;
    }

    getFixelColor(row: number, column: number) {
        return this.pixels[row][column].color;
    }

    isColorSame(color1: string, color2: string) {
        return color1 === color2;
    }

    private async __renderPixel(row: number, column: number) {
        if (!this.context) return;
        const pixel = this.pixels[row][column];
        pixel.color = this.brushColor;
        this.renderPixel(this.context, this.brushColor, pixel.opacity, row, column);
        this.size = await this.getCanvasSize();
    }

    private async _handleMouseDown(event: MouseEvent) {
        if (event.button !== 0) return;
        const { row, column } = this.getPixelCoord(event);
        const color = this.getFixelColor(row, column);

        this.isMouseDown = true;
        if (this.brushState === 'brush') {
            if (!this.isColorSame(color, this.brushColor)) {
                this.future = [];
                this.save();
                this.__renderPixel(row, column);
            }

            this.dispatch('brush:down', {
                row,
                currentColor: color,
                column,
                fillColor: this.brushColor,
            });
        } else if (this.brushState === 'rubber') {
            if (color) {
                this.save();
                this._clearPixel(row, column);
            }

            this.dispatch('erase:start', {
                row,
                column,
                currentColor: color,
                fillColor: this.brushColor,
            });
        } else if (this.brushState === 'fill') {
            this.save();
            const canFillList = this._getSiblingPixel(this.pixels[row][column]);
            canFillList.forEach((pixel) => (pixel.color = this.brushColor));
            this.render();
        } else if (this.brushState === 'eyedropper') {
            this.brushColor = color;
            this.dispatch('eyedropper');
        }
    }

    private _getSiblingPixel = (pixel: Pixel, wrapper: Pixel[] = []) => {
        if (wrapper.includes(pixel)) return [];
        if (!pixel.color) wrapper.push(pixel);
        const { row, column } = pixel;
        pixelSiblingMap.forEach(([r, c]) => {
            r = clamp(r + row, 0, this.pixels.length - 1);
            c = clamp(c + column, 0, this.pixels[r].length - 1);
            const siblingPixel = this.pixels[r][c];

            if (!pixel.color) {
                this._getSiblingPixel(siblingPixel, wrapper);
            }
        });

        return wrapper;
    };

    private async _handleMouseMove(event: MouseEvent) {
        if (this.isMouseDown) {
            const { row, column } = this.getPixelCoord(event);
            const color = this.getFixelColor(row, column);
            if (this.brushState === 'brush') {
                if (!this.isColorSame(color, this.brushColor)) {
                    this.__renderPixel(row, column);
                }

                this.dispatch('brush:move', {
                    row,
                    currentColor: color,
                    column,
                    fillColor: this.brushColor,
                });
            } else if (this.brushState === 'rubber') {
                color && this._clearPixel(row, column);
                this.dispatch('erasing', {
                    row,
                    currentColor: color,
                    column,
                    fillColor: '',
                });
            }
        }
    }

    private _handleMouseUp(event: MouseEvent) {
        if (this.isMouseDown) {
            this.isMouseDown = false;
            if (this.brushState === 'rubber') this.dispatch('erase:end');
            else if (this.brushState === 'brush') {
                const { row, column } = this.getPixelCoord(event);
                const color = this.getFixelColor(row, column);
                this.dispatch('brush:up', {
                    row,
                    currentColor: color,
                    column,
                    fillColor: this.brushColor,
                });
            }
        }
    }

    private async _clearPixel(row: number, column: number) {
        this.pixels[row][column].color = '';
        this.render();
        this.size = await this.getCanvasSize();
    }

    private bindCanvasEvent() {
        if (!this.element) return;
        const mousedown = this._handleMouseDown.bind(this);
        const mousemove = this._handleMouseMove.bind(this);
        const mouseup = this._handleMouseUp.bind(this);
        const contextmenu = (event: MouseEvent) => event.preventDefault();

        this.element.addEventListener('mousedown', mousedown);
        this.element.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', mouseup);
        this.element.addEventListener('contextmenu', contextmenu);

        return () => {
            if (!this.element) return;
            this.element.removeEventListener('mousedown', mousedown);
            this.element.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', mouseup);
            this.element.removeEventListener('contextmenu', contextmenu);
        };
    }

    private getPixelCoord(event: MouseEvent) {
        const { clientX, clientY } = event;
        const { left, top } = (event.target as HTMLCanvasElement).getBoundingClientRect();
        const row = Math.floor((clientY - top) / this.rowSpacing);
        const column = Math.floor((clientX - left) / this.columnSpacing);

        return {
            row: clamp(row, 0, this.rows),
            column: clamp(column, 0, this.columns),
        };
    }

    renderPixel(
        ctx: CanvasRenderingContext2D,
        color: string,
        opacity: number,
        row: number,
        column: number
    ) {
        ctx.save();
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.fillRect(
            column * this.columnSpacing,
            row * this.rowSpacing,
            this.columnSpacing,
            this.rowSpacing
        );
        ctx.closePath();
        ctx.restore();
    }

    renderPixels(ctx: CanvasRenderingContext2D) {
        this.pixels.forEach((row, rowIndex) => {
            row.forEach(({ color, opacity }, columnIndex) => {
                color && this.renderPixel(ctx, color, opacity, rowIndex, columnIndex);
            });
        });
    }

    render() {
        if (!this.canRender) return;
        this.canRender = false;
        requestAnimationFrame(async () => {
            this._clear();
            this.context && this.renderPixels(this.context);
            this.canRender = true;
        });
    }

    save() {
        const clonePixels = deepClone(this.pixels) as Pixels;
        if (this.past.length >= 20) this.past.shift();
        this.past.push(clonePixels);
        this.dispatch('save');
    }

    back() {
        if (this.past.length > 0) {
            const past = this.past.pop()!;
            const current = this.pixels;
            this.pixels = past;
            this.future.push(current);
            this.render();
            this.dispatch('back');
        }
    }

    forward() {
        if (this.future.length > 0) {
            const future = this.future.pop()!;
            const current = this.pixels;
            this.pixels = future;
            this.past.push(current);
            this.render();
            this.dispatch('forward');
        }
    }

    private _clear() {
        if (!this.context) return;
        this.context.clearRect(0, 0, this.width, this.height);
        this.renderBackgroundGrid(this.context);
    }

    toDataURL(type?: string | undefined, quality?: any) {
        if (!this.offscreenCanvasContext) return;
        this.offscreenCanvasContext.clearRect(0, 0, this.width, this.height);
        this.renderPixels(this.offscreenCanvasContext);
        return this.offscreenCanvas?.toDataURL(type, quality);
    }

    setBrushColor(color: string) {
        this.brushColor = color;
    }

    toBlob(type?: string) {
        return new Promise<Blob>((resolve, reject) => {
            if (!this.offscreenCanvasContext) return;
            this.offscreenCanvasContext.clearRect(0, 0, this.width, this.height);
            this.renderPixels(this.offscreenCanvasContext);

            this.offscreenCanvas?.toBlob((blob) => {
                if (!blob) return reject(new Error('blob is not defined'));
                resolve(blob);
            }, type);
        });
    }

    private _resetArtboard() {
        this._clear();
        this.future = [];
        this.pixels = [];
        this.past = [];
        this.createArtboardPixels();
        this.dispatch('reset');
    }

    async resetArtboard() {
        this._resetArtboard();
        this.size = await this.getCanvasSize();
    }

    async getCanvasSize(type?: string) {
        const blob = await this.toBlob(type);
        return blob.size;
    }

    async download(type?: string) {
        const blob = await this.toBlob(type);
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.setAttribute('download', this.name);
        a.click();
    }

    async downloadByPixels(
        pixels: Pixels,
        row: number,
        column: number,
        name: string,
        type?: string
    ) {
        const currentPixels = this.pixels;
        this.pixels = pixels;
        this._rows = row;
        this._columns = column;
        this.setRowsColumnsSpacing();
        const blob = await this.toBlob(type);
        this.pixels = currentPixels;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.setAttribute('download', name);
        a.click();
    }

    async modify(options: {
        id: string;
        name: string;
        pixels: Pixels;
        row: number;
        column: number;
        width: number;
        height: number;
    }) {
        this.id = options.id;
        this.name = options.name;
        this.rows = options.row;
        this.columns = options.column;
        this.width = options.width;
        this.height = options.height;
        this._resetArtboard();
        this.pixels = options.pixels;
        this.render();
        this.size = await this.getCanvasSize();
    }

    set rows(value: number) {
        if (this.rows < value) {
            const len = this.pixels.length;
            this.pixels = this.pixels.concat(
                Array.from({ length: value - this.rows }, (_, r) => {
                    return Array.from({ length: this.columns }, (_, c) => ({
                        color: '',
                        opacity: 1,
                        row: len + r,
                        column: c,
                    }));
                })
            );
        } else {
            this.pixels = this.pixels.slice(0, value);
        }
        this._rows = value;
        this.render();
        this.setRowsColumnsSpacing();
        this.dispatch('set:rows');
    }

    set columns(value: number) {
        if (this.columns < value) {
            this.pixels = this.pixels.map((row) => {
                const len = row.length;
                return row.concat(
                    Array.from({ length: value - this.columns }, (_, c) => ({
                        color: '',
                        opacity: 1,
                        row: this.pixels.length,
                        column: len + c,
                    }))
                );
            });
        } else {
            this.pixels = this.pixels.map((row) => {
                return row.slice(0, value);
            });
        }
        this._columns = value;
        this.render();
        this.setRowsColumnsSpacing();
        this.dispatch('set:columns');
    }

    get rows() {
        return this._rows;
    }

    get columns() {
        return this._columns;
    }

    get name() {
        return this._name;
    }

    set name(newValue: string) {
        if (this._name !== newValue) {
            this._name = newValue;
            this.dispatch('change:name');
        }
    }

    get size() {
        return this._size;
    }

    set size(newValue: number) {
        if (newValue !== this._size) {
            this._size = newValue;
            this.dispatch('size');
        }
    }

    get brushColor() {
        return this._brushColor;
    }

    set brushColor(newValue: string) {
        if (newValue !== this._brushColor) {
            this._brushColor = newValue;
            this.dispatch('change:color');
        }
    }

    get width() {
        return this._width;
    }

    set width(newWidth: number) {
        if (newWidth !== this._width && this.element) {
            this._width = newWidth;
            this.element.width = newWidth;
            this.element.style.width = newWidth + 'px';
            this.setRowsColumnsSpacing();
            this.render();
            this.dispatch('width');
        }
    }

    get height() {
        return this._height;
    }

    set height(newHeight: number) {
        if (newHeight !== this._height && this.element) {
            this._height = newHeight;
            this.element.height = newHeight;
            this.element.style.height = newHeight + 'px';
            this.setRowsColumnsSpacing();
            this.render();
            this.dispatch('height');
        }
    }
}
