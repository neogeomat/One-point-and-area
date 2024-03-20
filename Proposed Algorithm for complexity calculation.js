// https://www.timecomplexity.ai/
p = poly.features[sP].geom.coor[0].slice();
const spp = p[sPI];
const fPP = p.splice(0, sPI);
p = [...p, ...fPP];
var aOO = p.map(function (arr, index) {
  return { x: arr[0], y: arr[1], index: index };
});
var ch = convexhull.makeHull(aOO);
ch.sort((a, b) => a.index - b.index)
cI = ch.map(function (arr) {
  return arr.index;
});
if (cI[0] !== 0) {
  cI.unshift(0);
}
ch = ch.map(function (arr) {
  return [arr.x, arr.y];
});
var rPC = cI.map((index) => {
  return p[index];
}
);
for (let i = 2; i < rPC.length; i++) {
  var pP = rPC.slice(0, i + 1);
  pP.push(spp);
  var pPTurf = turf.polygon([pP]);
  pP.pop();
  var I = turf.intersect(poly.features[sP], pPTurf);
  var aI = [];
  if (!I) {
    aI.push(0);
  } else if (I.geom.coor.length <= 1) {
    aI.push(area(I.geom.coor[0]));
  } else {
    for (let j = 0; j < I.geom.coor.length; j++) {
      aI.push(area(I.geom.coor[j][0]));
    }
  }
  var intA = aI.reduce((x, y) => x + y);
  if (intA - rA >= 0.01) {
    var LV = rPC[i - 1];
    var NV = rPC[i];
    break;
  }
}
function dPP(rPC, pP, LV, NV, rA) {
  const LastpP = pP;
  LastpP.push(spp);
  var LastpPTurf = turf.polygon([LastpP]);
  LastpP.pop();
  var I = turf.intersect(poly.features[sP], LastpPTurf);
  var aI = [];
  if (!I) {
    aI.push(0);
  } else if (I.geom.coor.length <= 1) {
    aI.push(area(I.geom.coor[0]));
  } else {
    for (let j = 0; j < I.geom.coor.length; j++) {
      aI.push(area(I.geom.coor[j][0]));
    }
  }
  var intA = aI.reduce((x, y) => x + y);
  const areaDiff = rA - intA;
  if (areaDiff <= 1) {
    return I
  } else {
    const pDist = (2 * areaDiff) / (dist(LV, spp) * Math.sin(angle(NV, LV, spp) * Math.PI / 180));
    const pNewLatLng = [LV[0] + ((NV[0] - LV[0]) * pDist) / dist(NV, LV), LV[1] + ((NV[1] - LV[1]) * pDist) / dist(NV, LV),];
    LastpP.splice(LastpP.length, 0, pNewLatLng);
    const FinalpP = dPP(rPC, LastpP, pNewLatLng, NV, rA);
    return FinalpP;
  }
}
const FinalpP = dPP(rPC, pP.slice(0, -1), LV, NV, rA);