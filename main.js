import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

// ── Precomputed per-frame stats (mean/min/max from all pixels) ──────────────
const FRAME_STATS = [
  {frame:0,  time:"2020-07-28T00:30:05", mean:24.57, min:0.81,  max:33.69},
  {frame:1,  time:"2020-07-28T01:30:05", mean:24.48, min:1.21,  max:33.69},
  {frame:2,  time:"2020-07-28T02:30:05", mean:24.35, min:0.99,  max:34.92},
  {frame:3,  time:"2020-07-28T03:30:05", mean:24.24, min:0.76,  max:33.81},
  {frame:4,  time:"2020-07-28T04:30:05", mean:24.22, min:1.69,  max:33.28},
  {frame:5,  time:"2020-07-28T05:30:05", mean:24.11, min:1.20,  max:32.35},
  {frame:6,  time:"2020-07-28T06:30:05", mean:24.02, min:1.00,  max:32.30},
  {frame:7,  time:"2020-07-28T07:30:05", mean:23.94, min:1.40,  max:32.18},
  {frame:8,  time:"2020-07-28T08:30:05", mean:23.86, min:1.28,  max:32.32},
  {frame:9,  time:"2020-07-28T09:30:05", mean:23.93, min:1.46,  max:32.38},
  {frame:10, time:"2020-07-28T10:30:05", mean:24.13, min:1.31,  max:32.31},
  {frame:11, time:"2020-07-28T11:30:05", mean:24.25, min:0.90,  max:32.12},
  {frame:12, time:"2020-07-28T12:30:05", mean:24.27, min:1.18,  max:31.99},
  {frame:13, time:"2020-07-28T13:30:05", mean:24.28, min:0.46,  max:33.02},
  {frame:14, time:"2020-07-28T14:30:05", mean:24.28, min:0.63,  max:34.05},
  {frame:15, time:"2020-07-28T15:30:05", mean:24.26, min:1.06,  max:33.88},
  {frame:16, time:"2020-07-28T16:30:05", mean:24.36, min:0.56,  max:34.57},
  {frame:17, time:"2020-07-28T17:30:05", mean:24.32, min:-0.09, max:35.24},
  {frame:18, time:"2020-07-28T18:30:05", mean:24.33, min:0.42,  max:36.04},
  {frame:19, time:"2020-07-28T19:30:05", mean:24.35, min:0.40,  max:35.62},
  {frame:20, time:"2020-07-28T20:30:05", mean:24.39, min:1.34,  max:35.43},
  {frame:21, time:"2020-07-28T21:30:05", mean:24.32, min:0.82,  max:36.72},
  {frame:22, time:"2020-07-28T22:30:05", mean:24.38, min:-2.37, max:37.08},
  {frame:23, time:"2020-07-28T23:30:05", mean:24.35, min:-0.81, max:35.89},
  {frame:24, time:"2020-07-29T00:30:05", mean:24.29, min:-0.45, max:35.30},
  {frame:25, time:"2020-07-29T01:30:05", mean:24.25, min:1.08,  max:35.42},
  {frame:26, time:"2020-07-29T02:30:05", mean:24.05, min:-0.14, max:34.80},
  {frame:27, time:"2020-07-29T03:30:05", mean:23.94, min:-1.32, max:34.07},
  {frame:28, time:"2020-07-29T04:30:04", mean:23.93, min:-1.80, max:33.49},
  {frame:29, time:"2020-07-29T05:30:05", mean:23.85, min:-0.28, max:32.81},
  {frame:30, time:"2020-07-29T06:30:05", mean:23.80, min:0.21,  max:32.24},
  {frame:31, time:"2020-07-29T07:30:05", mean:23.88, min:-1.62, max:32.61},
  {frame:32, time:"2020-07-29T08:30:05", mean:23.85, min:-0.24, max:32.63},
  {frame:33, time:"2020-07-29T09:30:04", mean:23.94, min:1.05,  max:32.65},
  {frame:34, time:"2020-07-29T10:30:04", mean:23.95, min:2.26,  max:32.62},
  {frame:35, time:"2020-07-29T11:30:04", mean:24.12, min:0.83,  max:32.47},
  {frame:36, time:"2020-07-29T12:30:04", mean:24.11, min:1.55,  max:32.35},
  {frame:37, time:"2020-07-29T13:30:04", mean:24.14, min:1.23,  max:32.42},
  {frame:38, time:"2020-07-29T14:30:04", mean:24.08, min:1.48,  max:32.53},
  {frame:39, time:"2020-07-29T15:30:04", mean:null,  min:null,  max:null,  anomaly:true},
  {frame:40, time:"2020-07-29T16:30:04", mean:24.14, min:1.59,  max:35.01},
  {frame:41, time:"2020-07-29T17:30:04", mean:23.80, min:null,  max:null,  anomaly:true},
  {frame:42, time:"2020-07-29T18:30:04", mean:24.22, min:0.09,  max:34.78},
  {frame:43, time:"2020-07-29T19:30:04", mean:24.30, min:-0.59, max:35.58},
  {frame:44, time:"2020-07-29T20:30:04", mean:24.32, min:2.02,  max:36.53},
  {frame:45, time:"2020-07-29T21:30:04", mean:24.32, min:1.85,  max:36.72},
  {frame:46, time:"2020-07-29T22:30:04", mean:24.31, min:2.43,  max:37.02},
  {frame:47, time:"2020-07-29T23:30:04", mean:24.30, min:1.17,  max:37.66},
  {frame:48, time:"2020-07-30T00:30:04", mean:24.28, min:1.22,  max:37.41},
  {frame:49, time:"2020-07-30T01:30:04", mean:24.24, min:1.55,  max:36.59},
  {frame:50, time:"2020-07-30T02:30:04", mean:24.19, min:2.50,  max:35.91},
  {frame:51, time:"2020-07-30T03:30:04", mean:24.10, min:2.77,  max:35.27},
  {frame:52, time:"2020-07-30T04:30:04", mean:24.07, min:1.73,  max:34.82},
  {frame:53, time:"2020-07-30T05:30:04", mean:24.01, min:0.70,  max:34.36},
  {frame:54, time:"2020-07-30T06:30:04", mean:24.00, min:0.98,  max:34.10},
  {frame:55, time:"2020-07-30T07:30:04", mean:24.00, min:1.31,  max:33.72},
  {frame:56, time:"2020-07-30T08:30:04", mean:24.06, min:1.37,  max:33.42},
  {frame:57, time:"2020-07-30T09:30:04", mean:24.21, min:0.60,  max:33.22},
  {frame:58, time:"2020-07-30T10:30:04", mean:24.32, min:0.72,  max:33.27},
  {frame:59, time:"2020-07-30T11:30:04", mean:24.51, min:0.71,  max:33.58},
  {frame:60, time:"2020-07-30T12:30:04", mean:24.58, min:1.12,  max:33.42},
  {frame:61, time:"2020-07-30T13:30:04", mean:24.60, min:0.85,  max:33.12},
  {frame:62, time:"2020-07-30T14:30:04", mean:24.64, min:0.25,  max:33.75},
  {frame:63, time:"2020-07-30T15:30:04", mean:24.70, min:0.62,  max:34.49},
  {frame:64, time:"2020-07-30T16:30:04", mean:24.75, min:0.60,  max:34.77},
  {frame:65, time:"2020-07-30T17:30:04", mean:24.82, min:0.90,  max:35.43},
  {frame:66, time:"2020-07-30T18:30:04", mean:24.86, min:0.94,  max:35.99},
  {frame:67, time:"2020-07-30T19:30:04", mean:24.94, min:-0.03, max:36.87},
  {frame:68, time:"2020-07-30T20:30:04", mean:24.97, min:-0.36, max:37.51},
  {frame:69, time:"2020-07-30T21:30:04", mean:24.84, min:-0.10, max:38.89},
  {frame:70, time:"2020-07-30T22:30:04", mean:24.80, min:-0.40, max:39.70},
  {frame:71, time:"2020-07-30T23:30:04", mean:24.68, min:0.43,  max:40.15},
];

// ── Color scale (shared across map, legend, histogram) ─────────────────────
const COLOR_DOMAIN = [16, 32];
const color = d3.scaleSequential()
  .domain(COLOR_DOMAIN)
  .interpolator(d3.interpolateInferno)
  .clamp(true);

// ── MAP ─────────────────────────────────────────────────────────────────────
const MAP_W = 900, MAP_H = 630;
const mapSvg = d3.select('#map-svg')
  .attr('viewBox', `0 0 ${MAP_W} ${MAP_H}`)
  .attr('preserveAspectRatio', 'xMidYMid meet');

const xScale = d3.scaleLinear().domain([-0.151, 0.151]).range([0, MAP_W]);
const yScale = d3.scaleLinear().domain([0.151, -0.151]).range([0, MAP_H]);

// Grouping map for later targeting
const mapG  = mapSvg.append('g').attr('id', 'map-g');
const dataG = mapG.append('g').attr('id', 'data-g');  // data cells — rendered below coastlines
const geoG  = mapG.append('g').attr('id', 'geo-g');   // coastlines — always on top

// GOES-16 constants
const H = 42164.16;
const Re = 6378.137;
const Rp = 6356.7523;
const lon0 = -75.2 * Math.PI / 180;

//lat/lon to x/y
function latLonToXY(latDeg, lonDeg) {
  const lat = latDeg * Math.PI / 180;
  const lon = lonDeg * Math.PI / 180;

  const latC = Math.atan((Rp / Re) * (Rp / Re) * Math.tan(lat));
  const rc = Rp / Math.sqrt(1 - ((Re * Re - Rp * Rp) / (Re * Re)) * Math.cos(latC) * Math.cos(latC));

  const sx = H - rc * Math.cos(latC) * Math.cos(lon - lon0);
  const sy = -rc * Math.cos(latC) * Math.sin(lon - lon0);
  const sz = rc * Math.sin(latC);

  // Point not visible from satellite
  if (H * (H - sx) < sy * sy + (Re / Rp) * (Re / Rp) * sz * sz) return null;

  const scanX = Math.atan(-sy / sx);
  const scanY = Math.asin(sz / Math.sqrt(sx * sx + sy * sy + sz * sz));

  return [xScale(scanX), yScale(scanY)];
}

const geoProjection = d3.geoTransform({
  point(lonDeg, latDeg) {
    const xy = latLonToXY(latDeg, lonDeg);
    if (xy) this.stream.point(xy[0], xy[1]);
  }
});

const geoPath = d3.geoPath().projection(geoProjection);

// Map outline
fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  .then(r => r.json())
  .then(world => {
    geoG.append('path')
      .datum(topojson.mesh(world, world.objects.land, (a, b) => a === b))
      .attr('class', 'coastline')
      .attr('d', d => {
        const p = geoPath(d);
        if (!p || /^Z+$/.test(p)) return null;
        return p;
      })
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.85)')
      .attr('stroke-width', 0.9)
      .attr('pointer-events', 'none');

    geoG.append('g').attr('class', 'geo-layer')
      .selectAll('path')
      .data(topojson.feature(world, world.objects.countries).features)
      .enter().append('path')
      .attr('d', d => {
        const p = geoPath(d);
        if (!p || /^Z+$/.test(p)) return null;
        return p;
      })
      .attr('fill', '#0a0a0f')
      .attr('stroke', 'rgba(255,255,255,0.45)')
      .attr('stroke-width', 0.5)
      .attr('pointer-events', 'none');
  });

//Zoom/Pan
const zoom = d3.zoom()
  .scaleExtent([1, 12])          
  .translateExtent([[0, 0], [MAP_W, MAP_H]])  
  .on('zoom', (event) => {
    mapG.attr('transform', event.transform);
  });

mapSvg.call(zoom);

// Reset button — double-click to reset
mapSvg.on('dblclick.zoom', () => {
  mapSvg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
});

//Conversion function from GOES-16 x/y to lat/lon
function scanAngleToLatLon(sx, sy) {
  const sinX = Math.sin(sx), cosX = Math.cos(sx);
  const sinY = Math.sin(sy), cosY = Math.cos(sy);

  const a = sinX * sinX + cosX * cosX * (cosY * cosY + (Re/Rp) * (Re/Rp) * sinY * sinY);
  const b = -2 * H * cosX * cosY;
  const c = H * H - Re * Re;

  const disc = b * b - 4 * a * c;
  if (disc < 0) return null;

  const rs = (-b - Math.sqrt(disc)) / (2 * a);
  const Sx = rs * cosX * cosY - H;
  const Sy = rs * sinX;
  const Sz = -rs * cosX * sinY; 

  const lon = Math.atan(Sy / -Sx) + lon0;
  const lat = Math.atan((Re/Rp) * (Re/Rp) * Sz / Math.sqrt(Sx*Sx + Sy*Sy));

  return [lon * 180/Math.PI, lat * 180/Math.PI];
}

// Tooltip
const tooltip = d3.select('#tooltip');

function showTooltip(event, d) {
  const val = d.mean !== undefined ? d.mean : d.temp;
  tooltip
    .classed('hidden', false)
    .style('left', (event.clientX + 14) + 'px')
    .style('top',  (event.clientY - 32) + 'px')
    .html(`<strong>${val.toFixed(2)}°C</strong>`);
}
function hideTooltip() {
  tooltip.classed('hidden', true);
}

// ── TIME SERIES CHART ────────────────────────────────────────────────────────
const TS_M = { top: 18, right: 16, bottom: 40, left: 46 };
const TS_FULL_W = 348, TS_FULL_H = 200;
const tsW = TS_FULL_W - TS_M.left - TS_M.right;
const tsH = TS_FULL_H - TS_M.top  - TS_M.bottom;

const tsSvg = d3.select('#ts-svg')
  .attr('viewBox', `0 0 ${TS_FULL_W} ${TS_FULL_H}`)
  .attr('preserveAspectRatio', 'xMidYMid meet');

const tsG = tsSvg.append('g').attr('transform', `translate(${TS_M.left},${TS_M.top})`);

// Day-boundary separators (frames 0, 24, 48)
const dayStarts = [0, 24, 48];
const dayLabels = ['Jul 28', 'Jul 29', 'Jul 30'];

const xTs = d3.scaleLinear().domain([0, 71]).range([0, tsW]);
const yTs = d3.scaleLinear().domain([23.5, 25.2]).range([tsH, 0]);

// Day separator lines
dayStarts.forEach((f, i) => {
  tsG.append('line')
    .attr('x1', xTs(f)).attr('x2', xTs(f))
    .attr('y1', 0).attr('y2', tsH)
    .attr('stroke', '#e8e8e8').attr('stroke-width', 1);
  tsG.append('text')
    .attr('x', xTs(f) + 4).attr('y', 10)
    .attr('font-size', 9).attr('fill', '#aaa')
    .text(dayLabels[i]);
});

// Axes
tsG.append('g')
  .attr('transform', `translate(0,${tsH})`)
  .call(d3.axisBottom(xTs).ticks(6).tickFormat(d => `F${d}`))
  .call(g => g.select('.domain').attr('stroke', '#ddd'));

tsG.append('g')
  .call(d3.axisLeft(yTs).ticks(5).tickFormat(d => `${d}°`))
  .call(g => g.select('.domain').attr('stroke', '#ddd'));

// Axis label
tsG.append('text')
  .attr('class', 'axis-label')
  .attr('transform', 'rotate(-90)')
  .attr('x', -tsH / 2).attr('y', -38)
  .attr('text-anchor', 'middle')
  .text('Mean SST (°C)');

// Anomaly region markers (frames 39 & 41)
[39, 41].forEach(f => {
  tsG.append('rect')
    .attr('x', xTs(f) - 4).attr('y', 0)
    .attr('width', 8).attr('height', tsH)
    .attr('fill', '#e05050').attr('opacity', 0.15);
  tsG.append('text')
    .attr('x', xTs(f)).attr('y', tsH - 4)
    .attr('font-size', 8).attr('fill', '#e05050')
    .attr('text-anchor', 'middle')
    .text('⚠');
});

// Line path (skipping anomalous frames)
const validStats = FRAME_STATS.filter(d => d.mean !== null);
const tsLine = d3.line()
  .x(d => xTs(d.frame))
  .y(d => yTs(d.mean))
  .defined(d => d.mean !== null);

tsG.append('path')
  .datum(FRAME_STATS)
  .attr('fill', 'none')
  .attr('stroke', '#e07b39')
  .attr('stroke-width', 2)
  .attr('d', tsLine);

// Dots for valid frames
tsG.selectAll('.ts-dot')
  .data(validStats)
  .enter().append('circle')
  .attr('class', 'ts-dot')
  .attr('cx', d => xTs(d.frame))
  .attr('cy', d => yTs(d.mean))
  .attr('r', 2)
  .attr('fill', '#e07b39');

// Cursor (vertical line + dot that moves with current frame)
const tsCursor = tsG.append('line')
  .attr('y1', 0).attr('y2', tsH)
  .attr('stroke', '#333').attr('stroke-width', 1.5)
  .attr('stroke-dasharray', '4 3');

const tsCursorDot = tsG.append('circle')
  .attr('r', 5).attr('fill', '#fff')
  .attr('stroke', '#333').attr('stroke-width', 1.5);

function updateTsCursor(frame) {
  const s = FRAME_STATS[frame];
  tsCursor.attr('x1', xTs(frame)).attr('x2', xTs(frame));
  if (s.mean !== null) {
    tsCursorDot.attr('cx', xTs(frame)).attr('cy', yTs(s.mean)).attr('opacity', 1);
  } else {
    tsCursorDot.attr('opacity', 0);
  }
}

// ── HISTOGRAM ───────────────────────────────────────────────────────────────
const H_M = { top: 10, right: 16, bottom: 36, left: 46 };
const H_FULL_W = 348, H_FULL_H = 175;
const hW = H_FULL_W - H_M.left - H_M.right;
const hH = H_FULL_H - H_M.top  - H_M.bottom;

const histSvg = d3.select('#hist-svg')
  .attr('viewBox', `0 0 ${H_FULL_W} ${H_FULL_H}`)
  .attr('preserveAspectRatio', 'xMidYMid meet');

const histG = histSvg.append('g').attr('transform', `translate(${H_M.left},${H_M.top})`);

const xHist = d3.scaleLinear().domain([0, 38]).range([0, hW]);
const yHist = d3.scaleLinear().range([hH, 0]);

histG.append('g')
  .attr('transform', `translate(0,${hH})`)
  .call(d3.axisBottom(xHist).ticks(8).tickFormat(d => `${d}°`))
  .call(g => g.select('.domain').attr('stroke', '#ddd'));

const yHistAxis = histG.append('g')
  .call(d3.axisLeft(yHist).ticks(4).tickFormat(d3.format('.2s')))
  .call(g => g.select('.domain').attr('stroke', '#ddd'));

histG.append('text')
  .attr('class', 'axis-label')
  .attr('transform', 'rotate(-90)')
  .attr('x', -hH / 2).attr('y', -38)
  .attr('text-anchor', 'middle')
  .text('Pixel count');

histG.append('text')
  .attr('class', 'axis-label')
  .attr('x', hW / 2).attr('y', hH + 30)
  .attr('text-anchor', 'middle')
  .text('SST (°C)');

const binner = d3.bin().domain([0, 38]).thresholds(38);

function drawHistogram(data) {
  const temps = data.map(d => d.temp).filter(t => t >= 0 && t <= 38);
  const bins = binner(temps);
  yHist.domain([0, d3.max(bins, b => b.length)]);
  yHistAxis.call(d3.axisLeft(yHist).ticks(4).tickFormat(d3.format('.2s')));

  const bars = histG.selectAll('.bar').data(bins);
  bars.enter().append('rect')
    .attr('class', 'bar')
    .merge(bars)
    .attr('x', d => xHist(d.x0) + 1)
    .attr('y', d => yHist(d.length))
    .attr('width', d => Math.max(0, xHist(d.x1) - xHist(d.x0) - 1))
    .attr('height', d => hH - yHist(d.length))
    .attr('fill', d => color((d.x0 + d.x1) / 2));
  bars.exit().remove();
}

// ── COLOR LEGEND ─────────────────────────────────────────────────────────────
function drawLegend() {
  const svg = d3.select('#legend-svg');
  const lX = 0, lY = 6, lW = 260, lH = 16;

  const defs = svg.append('defs');
  const grad = defs.append('linearGradient').attr('id', 'legend-grad');
  d3.range(0, 1.01, 0.05).forEach(t => {
    grad.append('stop')
      .attr('offset', `${(t * 100).toFixed(0)}%`)
      .attr('stop-color', color(COLOR_DOMAIN[0] + t * (COLOR_DOMAIN[1] - COLOR_DOMAIN[0])));
  });

  svg.append('rect')
    .attr('x', lX).attr('y', lY)
    .attr('width', lW).attr('height', lH)
    .attr('fill', 'url(#legend-grad)')
    .attr('rx', 3);

  const xLeg = d3.scaleLinear().domain(COLOR_DOMAIN).range([lX, lX + lW]);
  svg.append('g')
    .attr('transform', `translate(0,${lY + lH})`)
    .call(d3.axisBottom(xLeg).ticks(5).tickFormat(d => `${d}°C`))
    .call(g => g.select('.domain').remove());
}

// ── STAT CARDS ───────────────────────────────────────────────────────────────
function updateStatCards(frame) {
  const s = FRAME_STATS[frame];
  const d = new Date(s.time);
  const hhmm = s.time.substring(11, 16);
  const dateStr = d.toDateString() + ' ' + hhmm + ' UTC';

  d3.select('#stat-time').text(dateStr);
  d3.select('#stat-mean').text(s.mean !== null ? `${s.mean.toFixed(2)}°C` : 'N/A');
  d3.select('#stat-min').text(s.min !== null ? `${s.min.toFixed(2)}°C` : 'N/A (artifact)');
  d3.select('#stat-max').text(s.max !== null ? `${s.max.toFixed(2)}°C` : 'N/A (artifact)');
}

// ── GRID CELLS ───────────────────────────────────────────────────────────────
// Bin scan-angle space into GRID_COLS × GRID_ROWS rectangular cells.
// Each cell is colored by the mean temperature of all data points inside it.
const GRID_COLS = 50;
const GRID_ROWS = 35;
const X_MIN = -0.151, X_MAX = 0.151;
const Y_MIN = -0.151, Y_MAX = 0.151;
const CELL_W_ANG = (X_MAX - X_MIN) / GRID_COLS;
const CELL_H_ANG = (Y_MAX - Y_MIN) / GRID_ROWS;
const CELL_W_PX  = MAP_W / GRID_COLS;
const CELL_H_PX  = MAP_H / GRID_ROWS;

function buildGrid(data) {
  const acc = new Map();
  for (const d of data) {
    const c = Math.min(GRID_COLS - 1, Math.max(0, Math.floor((d.x - X_MIN) / CELL_W_ANG)));
    const r = Math.min(GRID_ROWS - 1, Math.max(0, Math.floor((d.y - Y_MIN) / CELL_H_ANG)));
    const k = r * GRID_COLS + c;
    let cell = acc.get(k);
    if (!cell) { cell = { col: c, row: r, sum: 0, count: 0, key: k }; acc.set(k, cell); }
    cell.sum += d.temp;
    cell.count++;
  }
  return Array.from(acc.values()).map(cell => ({
    col: cell.col, row: cell.row, mean: cell.sum / cell.count, key: cell.key
  }));
}

// ── DRAW FRAME ───────────────────────────────────────────────────────────────
function drawFrame(frameNum) {
  const s = FRAME_STATS[frameNum];
  const d = new Date(s.time);
  const hhmm = s.time.substring(11, 16);
  d3.select('#timeLabel')
    .text(`Frame ${frameNum} | ${d.toDateString()} ${hhmm} UTC`);

  updateStatCards(frameNum);
  updateTsCursor(frameNum);

  d3.json(`data/frame_${frameNum}.json`).then(data => {
    const gridCells = buildGrid(data);

    const rects = dataG.selectAll('.cell').data(gridCells, d => d.key);

    rects.enter().append('rect')
      .attr('class', 'cell')
      .on('mouseover', showTooltip)
      .on('mousemove', showTooltip)
      .on('mouseleave', hideTooltip)
      .merge(rects)
      // x: left edge of cell in pixel space
      .attr('x', d => xScale(X_MIN + d.col * CELL_W_ANG))
      // y: top edge of cell — yScale is inverted (higher scan-y → smaller pixel-y)
      .attr('y', d => yScale(Y_MIN + (d.row + 1) * CELL_H_ANG))
      .attr('width',  CELL_W_PX)
      .attr('height', CELL_H_PX)
      .attr('fill', d => color(d.mean));

    rects.exit().remove();

    drawHistogram(data);
  });
}

// ── PLAYBACK CONTROLS ────────────────────────────────────────────────────────
let curFrame = 0;
let running = false;
let playInterval = null;

function getSpeed() {
  return +d3.select('#speed-select').property('value');
}

function startPlay() {
  running = true;
  d3.select('#play-btn').html('&#9646;&#9646; Pause');
  playInterval = setInterval(() => {
    curFrame = (curFrame + 1) % 72;
    drawFrame(curFrame);
    d3.select('#slider').property('value', curFrame);
  }, getSpeed());
}

function stopPlay() {
  running = false;
  d3.select('#play-btn').html('&#9654; Play');
  clearInterval(playInterval);
  playInterval = null;
}

d3.select('#play-btn').on('click', () => running ? stopPlay() : startPlay());

d3.select('#speed-select').on('change', () => {
  if (running) { stopPlay(); startPlay(); }
});

d3.select('#slider').on('input', function () {
  curFrame = +this.value;
  drawFrame(curFrame);
});

// ── INIT ─────────────────────────────────────────────────────────────────────
drawLegend();
drawFrame(0);
