export class Line {
    constructor({
        first, last, marginSize, content,
    }) {
        this._first = first;
        this._last = last;
        this._marginSize = marginSize;
        this._content = content;
    }

    static get EMPTY() {
        return '__INTRO_EMPTY_LINE__';
    }

    _beforeContentLength(length) {
        return Math.floor(length / 2) - ((this._content.length / 2) + this._marginSize + 1);
    }

    _afterContentLength(length) {
        return Math.ceil(length / 2) - ((this._content.length / 2) + this._marginSize + 2);
    }

    _filledEmpty(number, char = ' ') {
        let str = '';
        for (let i = 0; i < number; i += char.length) {
            str += char;
        }
        return str;
    }

    get length() {
        return (2 * (1 + this._marginSize)) + this._content.length;
    }

    toString(lenght) {
        return this._first
            + this._filledEmpty(this._marginSize)
            + this._filledEmpty(this._beforeContentLength(lenght))
            + this._content
            + this._filledEmpty(this._afterContentLength(lenght))
            + this._filledEmpty(this._marginSize)
            + this._last;
    }

    get content() {
        return this._content;
    }
}

export class BorderLine extends Line {
    constructor({
        first, last, content,
    }) {
        super({
            first,
            last,
            content,
            marginSize: 0,
        });
    }

    toString(length) {
        return this._first
            + this._filledEmpty(length - 2, this._content)
            + this._last;
    }
}

export class EmptyLine extends Line {
    constructor({
        first, last, length,
    }) {
        super({
            first,
            last,
            length,
            content: ' ',
            marginSize: 0,
        });
    }

    toString(length) {
        return this._first
            + this._filledEmpty(length - 2, this._content)
            + this._last;
    }
}

class Index {
    constructor(config) {
        this._config = Object.assign({
            first: '|',
            last: '|',
            corner: '+',
            marginSize: 2,
        }, config);
        this._lines = [];
        this._firstLine = new BorderLine({
            first: this.config.corner,
            last: this.config.corner,
            content: '-',
        });
        this._lastLine = this._firstLine;
    }

    addLine(content) {
        if (content === Line.EMPTY) {
            this._lines.push(new EmptyLine({
                first: this.config.first,
                last: this.config.last,
            }));
        } else {
            this._lines.push(new Line({
                first: this.config.first,
                last: this.config.last,
                marginSize: this.config.marginSize,
                content,
            }));
        }
    }

    _getMaxLength() {
        if (!this._lines.length) {
            return 0;
        }
        let maxLength = this._lines[0].length;
        for (const line of this._lines) {
            if (line.length > maxLength) {
                maxLength = line.length;
            }
        }
        return maxLength;
    }

    get config() {
        return this._config;
    }

    get firstLine() {
        return this._firstLine;
    }

    get lastLine() {
        return this._lastLine;
    }

    get lines() {
        return this._lines;
    }

    display() {
        const maxLength = this._getMaxLength();
        this._displayMethod(this.firstLine.toString(maxLength));
        for (const line of this.lines) {
            this._displayMethod(line.toString(maxLength));
        }
        this._displayMethod(this.lastLine.toString(maxLength));
    }

    _displayMethod(input) {
        console.log(input);
    }
}

export default Index;
