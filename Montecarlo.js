
const agulhas = 10000;

class DefinirAgulha {
    constructor(x, y, theta, length = 0.5) {
        this.x = x
        this.y = y
        this.theta = theta;
        this.length = length;


        if (this.x == null) {
            this.x = Math.random() * (1 - 0) + 0
        }
        if (this.y == null) {
            this.y = Math.random() * (1 - 0) + 0;
        }
        if (this.theta == null) {
            this.theta = Math.random() * (Math.PI - 0) + 0;
        }

    }

    needleCoordinates = new Array(this.x, this.y)
    complexRepresentation = new Array(this.length / 2 * Math.cos(this.theta), this.length / 2 * Math.sin(this.theta))

    endPoints = new Array(this.needleCoordinates, this.complexRepresentation)


}

const agulha = new DefinirAgulha(200, 300);

console.log(agulha)