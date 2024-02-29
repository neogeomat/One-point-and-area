function anticlockwiseAngle2D(A, B, C) {
  // Calculate vectors AB and BC
  const AB = {
    x: B[0] - A[0],
    y: B[1] - A[1],
  };
  const BC = {
    x: C[0] - B[0],
    y: C[1] - B[1],
  };

  // Use atan2 to get angle between vectors
  const angle = Math.atan2(AB.y * BC.x - AB.x * BC.y, AB.x * BC.x + AB.y * BC.y);

  // Convert to degrees and adjust range to 0-360 (anticlockwise)
  const degrees = (angle * 180) / Math.PI;
  return degrees < 0 ? degrees + 360 : degrees;
}

function angleWithXAxis(origin, point){
  // console.log(origin, point);
  const angle = Math.atan2(point[1] - origin[1], point[0] - origin[0]) * 180 / Math.PI;
  // console.log('angle: ', angle);
  return (angle < 0 ? angle + 360 : angle);

}
function calcPolygonAreaASA(angleA, angleB, includedSide) {
  // Calculate the third angle
  const angleC = 180 - (angleA + angleB);
  // console.log('angleC: ', angleC);
  // const angleC = Math.PI - (angleA + angleB);

  // Convert angles to radians for trigonometric functions
  const radianA = (angleA * Math.PI) / 180;
  const radianB = (angleB * Math.PI) / 180;
  const radianC = (angleC * Math.PI) / 180;

  // Calculate the height using sine function
  const height = (includedSide * Math.sin(radianA) * Math.sin(radianB)/Math.sin(radianC));
  console.log('height: ', height);

  // Calculate the area
  const area = (includedSide * height) / 2;

  return area;
}
// shoelace formula
function calcPolygonAreaShoelace(vertices) {
  var total = 0;
  for (var i = 0, l = vertices.length; i < l; i++) {
  var addX = vertices[i][0];
  var addY = vertices[i == vertices.length - 1 ? 0 : i + 1][1];
  var subX = vertices[i == vertices.length - 1 ? 0 : i + 1][0];
  var subY = vertices[i][1];
  total += (addX * addY * 0.5);
  total -= (subX * subY * 0.5);
  }
  return total;
  // return Math.abs(total);
}

function distance(point1, point2){
  return Math.sqrt(Math.pow((point2[0] - point1[0]),2) + Math.pow((point2[1] - point1[1]),2));
}

function findAnglesWithSmallerSuccessor(arr) {
  const result = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const currentIndex = arr[i].index;
    // Check if both next element exists and its angle is smaller
    if (i < arr.length - 2 && arr[i + 1].index < currentIndex) {
      result.push(currentIndex);
    }
  }
  return result;
}

function getPolygonAngles(vertices) {
  // debugger;
  const angles = [];
  for (let i = 0; i < vertices.length; i++) {
    const prev = vertices[(i - 1 + vertices.length) % vertices.length];
    // 
    const current = vertices[i];
    // 
    const next = vertices[(i + 1) % vertices.length];
    // 

    const angle = anticlockwiseAngle2D(next, current, prev);
    // 
    // Convert to degrees and adjust for direction
    angles.push(angle);
    // angles.push(angle * 180 / Math.PI);
  }
  return angles;
}

function numberToCapitalLetter(number) {
  if (number < 1 || number > 26) {
    throw new Error("Number must be between 1 and 26");
  }
  return String.fromCharCode(number + 64); // Add 64 to get the ASCII code of uppercase A
}
