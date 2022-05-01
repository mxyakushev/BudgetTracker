const circle = document.getElementById('circle');

const canvas = document.createElement('canvas');

circle.appendChild(canvas);

canvas.width = 80;

const width = canvas.width;

canvas.height = 80;

const height = canvas.height;

const ctx = canvas.getContext("2d");

ctx.lineWidth = 20;
const R = 30;

function updateCircle(income, outcome){
    let ratio = income / (income + outcome);
    ctx.clearRect(0, 0, width, height)
    drawCircle(-ratio, true, '#c3e8bd')
    drawCircle(1-ratio, false, "red");

}

function drawCircle(ratio, whichWay, color){
    ctx.beginPath();
    ctx.arc(width/2, height/2, R, 0, ratio * 2 * Math.PI, whichWay);
    ctx.strokeStyle = color;
    ctx.stroke();
}
