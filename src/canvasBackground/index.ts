const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const colors = ['#f9ca24', '#f0932b', '#eb4d4b', '#6ab04c', '#22a6b3', '#be2edd', '#4834d4'];

export interface Options {
    count: number;
    width: number;
    height: number;
}

export default class CanvasBackground {
    public context: CanvasRenderingContext2D;
    public width: number = 0;
    public count: number = 0;
    public height: number = 0;
    public constructor(public element: HTMLCanvasElement, { count, height, width }: Options) {
        this.count = count;
        this.width = width;
        this.height = height;
        this.element = element;
        this.context = this.element.getContext('2d')!;

        this.renderShapes();
    }

    public renderShapes() {
        const methods = ['_drawRect', '_drawLine', '_drawCircle'] as const;
        for (let i = 0; i < this.count; i++) {
            this[methods[randInt(0, methods.length - 1)]]();
        }
    }

    private _drawRect() {
        const width = randInt(5, 15);
        const height = randInt(5, 15);
        const x = randInt(0, this.width);
        const y = randInt(0, this.height);

        this.context.save();
        this.context.strokeStyle = colors[randInt(0, colors.length - 1)];
        this.context.lineWidth = randInt(1, 5);
        this.context.beginPath();
        this.context.rect(x, y, width, height);
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    }

    private _drawLine() {
        const x1 = randInt(0, this.width);
        const y1 = randInt(0, this.height);
        const x2 = x1 + randInt(5, 20);
        const y2 = y1 + randInt(5, 20);

        this.context.save();
        this.context.strokeStyle = colors[randInt(0, colors.length - 1)];
        this.context.lineWidth = randInt(1, 5);
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    }

    private _drawCircle() {
        const x = randInt(0, this.width);
        const y = randInt(0, this.height);
        const r = randInt(2, 10);

        this.context.save();
        this.context.strokeStyle = colors[randInt(0, colors.length - 1)];
        this.context.lineWidth = randInt(1, 5);
        this.context.beginPath();
        this.context.arc(x, y, r, 0, Math.PI * 2);
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
    }
}
