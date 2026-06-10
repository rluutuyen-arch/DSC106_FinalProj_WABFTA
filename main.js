import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const storms = {
    'Laura':  {'date': new Date(Date.UTC(2020, 8, 27, 0, 30, 0)), 'frames': 155},
    'Ida':    {'date': new Date(Date.UTC(2021, 8, 29, 0, 30, 0)), 'frames': 155},
    'Ian':    {'date': new Date(Date.UTC(2022, 9, 28, 0, 30, 0)), 'frames': 152},
    'Isaiah': {'date': new Date(Date.UTC(2020, 7, 29, 0, 30, 0)), 'frames': 156},
}

async function loadFrameStats(storm) {
  const stats = [];
  for(let i=0; i < 156; i++) {
    const fileIdx = i*2;
    const frame = await d3.json(`${storm}/frame_${fileIdx}.json`);
    const temps = frame.pixels.map(p => p.temp);
    const mean = d3.mean(temps);
    const min = d3.min(temps);
    const max = d3.max(temps); 
    const t = new Date(storms[storm]['date'] + fileIdx * 3_600_000);
    const iso = t.toISOString().replace('.000Z', 'Z');
    stats.push({frame: i, time: iso.replace('Z', ''), mean, min, max});
    console.log(i);
  }
  return stats;
}

let FRAME_STATS = await loadFrameStats('Ian');
let frame_num = storms['Ian']['frames'];

// ── Hurricane Isaias (AL092020) · NHC HURDAT2 approximate best track ─────────
// 6-hourly positions during the Jul 28–30 observation window.
// Verify exact coordinates at: nhc.noaa.gov/data/hurdat/hurdat2-1851-2020.txt
// test
// const ISAIAS_TRACK = [
//   { iso:"2020-07-28T00:00:00Z", lat:12.2, lon:-55.2, wind:25, status:"Disturbance"        },
//   { iso:"2020-07-28T06:00:00Z", lat:12.5, lon:-57.0, wind:25, status:"Disturbance"        },
//   { iso:"2020-07-28T12:00:00Z", lat:12.9, lon:-58.8, wind:25, status:"Disturbance"        },
//   { iso:"2020-07-28T18:00:00Z", lat:13.2, lon:-60.3, wind:30, status:"Tropical Depression"},
//   { iso:"2020-07-29T00:00:00Z", lat:13.7, lon:-62.2, wind:30, status:"Tropical Depression"},
//   { iso:"2020-07-29T06:00:00Z", lat:14.2, lon:-64.1, wind:35, status:"Tropical Depression"},
//   { iso:"2020-07-29T12:00:00Z", lat:14.8, lon:-66.3, wind:40, status:"Tropical Depression"},
//   { iso:"2020-07-29T18:00:00Z", lat:15.5, lon:-68.4, wind:40, status:"Tropical Depression"},
//   { iso:"2020-07-30T00:00:00Z", lat:16.4, lon:-70.0, wind:45, status:"Tropical Storm"     },
//   { iso:"2020-07-30T06:00:00Z", lat:17.3, lon:-71.8, wind:55, status:"Tropical Storm"     },
//   { iso:"2020-07-30T12:00:00Z", lat:18.2, lon:-73.0, wind:60, status:"Tropical Storm"     },
//   { iso:"2020-07-30T18:00:00Z", lat:19.5, lon:-74.3, wind:65, status:"Hurricane"          },
// ];

// // Frame 0 starts at 2020-07-28T00:30:05Z; each subsequent frame is ~1 hour later.
// const FRAME0_MS = new Date("2020-07-28T00:30:05Z").getTime();

// function getStormState(frame) {
//   const t   = FRAME0_MS + frame * 3600000;
//   const pts = ISAIAS_TRACK.map(d => ({ ...d, ms: new Date(d.iso).getTime() }));
//   if (t <= pts[0].ms) return { ...pts[0], xy: latLonToXY(pts[0].lat, pts[0].lon) };
//   const last = pts[pts.length - 1];
//   if (t >= last.ms)   return { ...last,   xy: latLonToXY(last.lat,   last.lon)   };
//   for (let i = 0; i < pts.length - 1; i++) {
//     if (t >= pts[i].ms && t < pts[i + 1].ms) {
//       const f   = (t - pts[i].ms) / (pts[i + 1].ms - pts[i].ms);
//       const lat  = pts[i].lat  + f * (pts[i + 1].lat  - pts[i].lat);
//       const lon  = pts[i].lon  + f * (pts[i + 1].lon  - pts[i].lon);
//       const wind = pts[i].wind + f * (pts[i + 1].wind - pts[i].wind);
//       return { lat, lon, wind, status: pts[i].status, xy: latLonToXY(lat, lon) };
//     }
//   }
//   return null;
// }

function stormColor(status) {
  if (status === 'Hurricane')           return '#ff3b3b';
  if (status === 'Tropical Storm')      return '#ff8c00';
  if (status === 'Tropical Depression') return '#ffd700';
  return '#aaaaaa';
}

// ── Storm fuel constants ────────────────────────────────────────────────────
const SST_THRESHOLD  = 26;   // °C — minimum SST to sustain a tropical cyclone
const FUEL_RADIUS_PX = 60;   // sampling radius (px) around the eye — tune to taste

// ── Storm summaries (one entry per integrated hurricane dataset) ────────────
// Values are computed from each storm's FRAME_STATS-equivalent array so they
// stay current when data is updated. Add new entries as additional storms are
// wired into the visualization — the conclusion card renders from this array.
const _vf = FRAME_STATS.filter(f => f.mean !== null);
const STORM_SUMMARIES = [
  {
    name:       'Isaias · Jul 28–30, 2020',
    peakStatus: 'Category 1 Hurricane',
    peakWind:   65,
    firstMean:  _vf[0].mean,
    lastMean:   _vf[_vf.length - 1].mean,
    minMean:    d3.min(_vf, f => f.mean),
    maxMean:    d3.max(_vf, f => f.mean),
    frames:     FRAME_STATS,          // reference kept for diurnal calculation
  },
  // Add more storms here when integrating their datasets:
  // { name: 'Ian · Sep 24–27, 2022', peakStatus: 'Category 4 Hurricane', peakWind: 155,
  //   firstMean: X, lastMean: X, minMean: X, maxMean: X, frames: IAN_FRAME_STATS },
  // { name: 'Laura · Aug 25–27, 2020', peakStatus: 'Category 4 Hurricane', peakWind: 150,
  //   firstMean: X, lastMean: X, minMean: X, maxMean: X, frames: LAURA_FRAME_STATS },
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

const mapG   = mapSvg.append('g').attr('id', 'map-g');
const dataG  = mapG.append('g').attr('id', 'data-g');   // SST cells — below coastlines
const geoG   = mapG.append('g').attr('id', 'geo-g');    // coastlines — above SST cells
const stormG = mapG.append('g').attr('id', 'storm-g');  // storm track — topmost layer

// GOES-16 constants
const H  = 42164.16;
const Re = 6378.137;
const Rp = 6356.7523;
const lon0 = -75.2 * Math.PI / 180;

function latLonToXY(latDeg, lonDeg) {
  const lat = latDeg * Math.PI / 180;
  const lon = lonDeg * Math.PI / 180;

  const latC = Math.atan((Rp / Re) * (Rp / Re) * Math.tan(lat));
  const rc = Rp / Math.sqrt(1 - ((Re * Re - Rp * Rp) / (Re * Re)) * Math.cos(latC) * Math.cos(latC));

  const sx = H - rc * Math.cos(latC) * Math.cos(lon - lon0);
  const sy = -rc * Math.cos(latC) * Math.sin(lon - lon0);
  const sz = rc * Math.sin(latC);

  if (H * (H - sx) < sy * sy + (Re / Rp) * (Re / Rp) * sz * sz) return null;

  const scanX = Math.atan(-sy / sx);
  const scanY = Math.asin(sz / Math.sqrt(sx * sx + sy * sy + sz * sz));

  return [xScale(scanX), yScale(scanY)];
}

const geoProjection = d3.geoTransform({
  point(lonDeg, latDeg) {
    const xy = latLonToXY(latDeg, lonDeg);
    if (xy) this.stream.point(xy[0] * 1.1 - 50, xy[1] * 1.1 - 25);
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

// ── STORM TRACK LAYER ────────────────────────────────────────────────────────
// Full projected track as a faint dashed guide (drawn once at startup)
// test
// const allTrackXY = ISAIAS_TRACK.map(d => latLonToXY(d.lat, d.lon)).filter(Boolean);
// stormG.append('polyline')
//   .attr('points', allTrackXY.map(p => p.join(',')).join(' '))
//   .attr('fill', 'none')
//   .attr('stroke', '#ffffff')
//   .attr('stroke-width', 1.5)
//   .attr('stroke-dasharray', '4 5')
//   .attr('opacity', 0.45)
//   .attr('pointer-events', 'none');

// // Past track segment — color + length update each frame
// const stormTrackPast = stormG.append('polyline')
//   .attr('fill', 'none')
//   .attr('stroke-width', 2.5)
//   .attr('stroke-linecap', 'round')
//   .attr('stroke-linejoin', 'round')
//   .attr('opacity', 0.9)
//   .attr('pointer-events', 'none');

// // Storm eye marker
// let currentStormState = null;
// const stormEyeG = stormG.append('g').attr('class', 'storm-eye').attr('display', 'none').style('cursor', 'pointer');
// stormEyeG.append('circle').attr('class', 'eye-ring').attr('r', 14).attr('fill', 'none').attr('stroke-width', 2.5);
// stormEyeG.append('circle').attr('class', 'fuel-ring')
//   .attr('r', FUEL_RADIUS_PX).attr('fill', 'none')
//   .attr('stroke', '#fff').attr('stroke-width', 1)
//   .attr('stroke-dasharray', '2 4').attr('opacity', 0.35)
//   .attr('pointer-events', 'none');
// stormEyeG.append('circle').attr('class', 'eye-dot').attr('r', 6);
// stormEyeG.append('text').attr('class', 'eye-label')
//   .attr('dy', -16).attr('text-anchor', 'middle')
//   .attr('font-size', 10).attr('font-weight', 700)
//   .attr('fill', '#fff').attr('pointer-events', 'none')
//   .attr('paint-order', 'stroke').attr('stroke', '#000').attr('stroke-width', 2);

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

// Rich tooltip when hovering the storm eye
// test
// stormEyeG
//   .on('mouseover', (event) => {
//     if (!currentStormState) return;
//     const { wind, status, lat, lon } = currentStormState;
//     tooltip.classed('hidden', false)
//       .style('left', (event.clientX + 14) + 'px')
//       .style('top',  (event.clientY - 32) + 'px')
//       .html(`<strong>Isaias</strong><br>${status}<br>${Math.round(wind)} kt &nbsp;(${Math.round(wind * 1.852)} km/h)<br>${lat.toFixed(1)}°N, ${Math.abs(lon).toFixed(1)}°W`);
//   })
//   .on('mousemove', (event) => {
//     tooltip.style('left', (event.clientX + 14) + 'px').style('top', (event.clientY - 32) + 'px');
//   })
//   .on('mouseleave', hideTooltip);

// ── ZOOM/PAN ────────────────────────────────────────────────────────────────
const zoom = d3.zoom()
  .scaleExtent([1, 12])
  .translateExtent([[0, 0], [MAP_W, MAP_H]])
  .on('zoom', (event) => {
    mapG.attr('transform', event.transform);
  });

mapSvg.call(zoom);
mapSvg.on('dblclick.zoom', () => {
  mapSvg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
});

// Reverse-projection (GOES scan angle → lat/lon)
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

// ── TIME SERIES CHART ────────────────────────────────────────────────────────
const TS_M = { top: 18, right: 16, bottom: 40, left: 46 };
const TS_FULL_W = 348, TS_FULL_H = 200;
const tsW = TS_FULL_W - TS_M.left - TS_M.right;
const tsH = TS_FULL_H - TS_M.top  - TS_M.bottom;

const tsSvg = d3.select('#ts-svg')
  .attr('viewBox', `0 0 ${TS_FULL_W} ${TS_FULL_H}`)
  .attr('preserveAspectRatio', 'xMidYMid meet');

const tsG = tsSvg.append('g').attr('transform', `translate(${TS_M.left},${TS_M.top})`);

const dayStarts = [0, 24, 48];
const dayLabels = ['Jul 28', 'Jul 29', 'Jul 30'];

const xTs = d3.scaleLinear().domain([0, 155]).range([0, tsW]);
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

tsG.append('text')
  .attr('class', 'axis-label')
  .attr('transform', 'rotate(-90)')
  .attr('x', -tsH / 2).attr('y', -38)
  .attr('text-anchor', 'middle')
  .text('Mean SST (°C)');

// Anomaly markers (data gaps at frames 39 & 41)
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

// Storm intensity milestones on the time series
// Frame 18 ≈ Jul 28 18Z (TD formation), Frame 48 ≈ Jul 30 00Z (TS), Frame 66 ≈ Jul 30 18Z (HU)
[
  { frame: 18, label: 'TD forms',  color: '#ffd700' },
  { frame: 48, label: 'TS Isaias', color: '#ff8c00' },
  { frame: 66, label: 'Hurricane', color: '#ff3b3b' },
].forEach(({ frame, label, color: c }) => {
  tsG.append('line')
    .attr('x1', xTs(frame)).attr('x2', xTs(frame))
    .attr('y1', 0).attr('y2', tsH)
    .attr('stroke', c).attr('stroke-width', 1.2)
    .attr('stroke-dasharray', '3 3').attr('opacity', 0.8);
  tsG.append('text')
    .attr('x', xTs(frame) + 2).attr('y', 26)
    .attr('font-size', 7).attr('fill', c).attr('font-weight', 700)
    .text(label);
});

// SST line (skip anomalous frames)
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

tsG.selectAll('.ts-dot')
  .data(validStats)
  .enter().append('circle')
  .attr('class', 'ts-dot')
  .attr('cx', d => xTs(d.frame))
  .attr('cy', d => yTs(d.mean))
  .attr('r', 2)
  .attr('fill', '#e07b39');

// ── STORM INTENSITY OVERLAY (right axis) ─────────────────────────────────────
// test
// const windSeries = d3.range(72).map(f => {
//   const st = getStormState(f);
//   return { frame: f, wind: st ? st.wind : null };
// });
const yWind = d3.scaleLinear().domain([20, 70]).range([tsH, 0]);

tsG.append('g')
  .attr('transform', `translate(${tsW},0)`)
  .call(d3.axisRight(yWind).ticks(4).tickFormat(d => `${d}kt`))
  .call(g => g.select('.domain').attr('stroke', '#ddd'))
  .call(g => g.selectAll('text').attr('fill', '#c0392b'));

//test
// tsG.append('path')
//   .datum(windSeries)
//   .attr('fill', 'none')
//   .attr('stroke', '#c0392b')
//   .attr('stroke-width', 1.8)
//   .attr('stroke-dasharray', '5 3')
//   .attr('opacity', 0.85)
//   .attr('d', d3.line()
//     .x(d => xTs(d.frame))
//     .y(d => yWind(d.wind))
//     .defined(d => d.wind !== null));

tsG.append('text')
  .attr('x', tsW).attr('y', -6).attr('text-anchor', 'end')
  .attr('font-size', 8).attr('fill', '#c0392b').attr('font-weight', 700)
  .text('Isaias winds (kt)');

// Cursor (vertical line + dot that tracks current frame)
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
  const bins  = binner(temps);
  yHist.domain([0, d3.max(bins, b => b.length)]);
  yHistAxis.call(d3.axisLeft(yHist).ticks(4).tickFormat(d3.format('.2s')));

  const bars = histG.selectAll('.bar').data(bins);
  bars.enter().append('rect').attr('class', 'bar')
    .merge(bars)
    .attr('x',      d => xHist(d.x0) + 1)
    .attr('y',      d => yHist(d.length))
    .attr('width',  d => Math.max(0, xHist(d.x1) - xHist(d.x0) - 1))
    .attr('height', d => hH - yHist(d.length))
    .attr('fill',   d => color((d.x0 + d.x1) / 2));
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
  d3.select('#stat-min').text(s.min  !== null ? `${s.min.toFixed(2)}°C`  : 'N/A (artifact)');
  d3.select('#stat-max').text(s.max  !== null ? `${s.max.toFixed(2)}°C`  : 'N/A (artifact)');
}

// ── STORM OVERLAY ─────────────────────────────────────────────────────────────
//test
// function updateStormOverlay(frame) {
//   const state = getStormState(frame);
//   currentStormState = state;

//   if (!state || !state.xy) { stormEyeG.attr('display', 'none'); return; }

//   const [px, py] = state.xy;
//   const col = stormColor(state.status);

//   // Position + color the eye marker
//   stormEyeG.attr('display', null).attr('transform', `translate(${px},${py})`);
//   stormEyeG.select('.eye-ring').attr('stroke', col);
//   stormEyeG.select('.eye-dot').attr('fill', col);
//   stormEyeG.select('.eye-label').text('Isaias');

//   // Past track: all HURDAT2 points up to current time + interpolated current position
//   const t = FRAME0_MS + frame * 3600000;
//   const pastXY = ISAIAS_TRACK
//     .filter(d => new Date(d.iso).getTime() <= t)
//     .map(d => latLonToXY(d.lat, d.lon))
//     .filter(Boolean);
//   pastXY.push(state.xy);
//   stormTrackPast.attr('points', pastXY.map(p => p.join(',')).join(' ')).attr('stroke', col);

//   // Update storm stat card
//   const shortStatus = {
//     'Disturbance':        'Disturbance',
//     'Tropical Depression':'Trop. Depression',
//     'Tropical Storm':     'Tropical Storm',
//     'Hurricane':          'Hurricane Cat. 1',
//   }[state.status] || state.status;
//   d3.select('#stat-storm-status').text(shortStatus);
//   d3.select('#stat-storm-wind').text(`${Math.round(state.wind)} kt winds`);
//   d3.select('#stat-storm-name').style('color', col);
// }

// ── STORM FUEL METRICS ─────────────────────────────────────────────────────
function computeFuelMetrics(data, eyeXY) {
  const valid = data.filter(d => d.temp >= 0 && d.temp <= 40);
  const pctAbove = valid.length
    ? valid.filter(d => d.temp >= SST_THRESHOLD).length / valid.length * 100
    : null;

  let nearMean = null;
  if (eyeXY) {
    const [ex, ey] = eyeXY;
    let sum = 0, n = 0;
    for (const d of valid) {
      const dx = xScale(d.x) - ex, dy = yScale(d.y) - ey;
      if (dx * dx + dy * dy <= FUEL_RADIUS_PX * FUEL_RADIUS_PX) { sum += d.temp; n++; }
    }
    if (n > 0) nearMean = sum / n;
  }
  return { pctAbove, nearMean };
}

function updateFuelCard({ pctAbove, nearMean }) {
  const nm = d3.select('#stat-fuel-near');
  const dv = d3.select('#stat-fuel-delta');
  if (nearMean !== null) {
    nm.text(`${nearMean.toFixed(1)}°C`)
      .style('color', nearMean >= SST_THRESHOLD ? '#1f9d55' : '#e05050');
    const delta = nearMean - SST_THRESHOLD;
    dv.text(`${delta >= 0 ? '+' : ''}${delta.toFixed(1)}°C vs 26°C threshold`);
  } else {
    nm.text('—').style('color', '#111');
    dv.text('storm off-map');
  }
  d3.select('#stat-fuel-pct')
    .text(pctAbove !== null ? `${pctAbove.toFixed(0)}% of basin above 26°C` : '—');
}

// ── FRAME INSIGHT ─────────────────────────────────────────────────────────────
// Returns rolling trend over the last n valid frames (negative = cooling).
function getMeanTrend(frame, n = 3) {
  const curr = FRAME_STATS[frame];
  if (!curr || curr.mean === null) return 0;
  let count = 0;
  for (let i = frame - 1; i >= 0; i--) {
    if (FRAME_STATS[i].mean !== null && ++count >= n)
      return curr.mean - FRAME_STATS[i].mean;
  }
  return 0;
}

// Generates a {headline, body} insight object purely from data — no hardcoded
// temperatures or frame numbers, so it works whenever FRAME_STATS is updated.
function getFrameInsight(frame, { nearMean, pctAbove }) {
  const s = FRAME_STATS[frame];
  if (!s || s.mean === null)
    return { headline: 'Data Gap', body: 'Satellite coverage incomplete for this frame — sensor artifacts or heavy cloud cover.' };

  const trend = getMeanTrend(frame);
  const st    = getStormState(frame);
  const near  = nearMean !== null ? `${nearMean.toFixed(1)}°C` : null;
  const pct   = pctAbove !== null ? `${Math.round(pctAbove)}%` : null;

  if (st && st.status === 'Hurricane') {
    const fuelNote = near
      ? (nearMean >= SST_THRESHOLD
          ? ` ${near} near the eye — ${(nearMean - SST_THRESHOLD).toFixed(1)}°C above the 26°C fuel threshold.`
          : ` ${near} near the eye — approaching the 26°C fuel limit, weakening possible.`)
      : '';
    return {
      headline: 'Hurricane Intensity Reached',
      body: `Isaias at ${Math.round(st.wind)} kt.${fuelNote}${pct ? ' ' + pct + ' of the basin remains above 26°C.' : ''}`
    };
  }

  if (trend <= -0.07)
    return {
      headline: 'SST Dropping',
      body: `Basin mean fell ~${Math.abs(trend).toFixed(2)}°C over the last few frames. Overnight radiative cooling or storm-driven upwelling can bring cooler subsurface water to the surface.`
    };

  if (trend >= 0.07)
    return {
      headline: 'SST Rising',
      body: `Basin mean rose ~${trend.toFixed(2)}°C. Solar heating typically peaks in mid-afternoon frames — visible as the orange SST line climbs on the time-series chart.`
    };

  if (st && st.status === 'Tropical Storm')
    return {
      headline: 'Active Tropical Storm',
      body: `Isaias at ${Math.round(st.wind)} kt.${near ? ' SST near eye: ' + near + (nearMean >= SST_THRESHOLD ? ' — above the 26°C fuel threshold.' : ' — near the 26°C limit.') : ''}${pct ? ' ' + pct + ' of the basin is above 26°C.' : ''}`
    };

  if (st && st.status === 'Tropical Depression')
    return {
      headline: 'Tropical Depression',
      body: `Isaias organizing at ${Math.round(st.wind)} kt. Nearby SST: ${near ?? '—'}. Sustained water above 26°C is needed to intensify further.`
    };

  if (st && st.status === 'Disturbance')
    return {
      headline: 'Tropical Disturbance',
      body: `Disorganized wave present. Basin mean SST: ${s.mean.toFixed(2)}°C.${pct ? ' ' + pct + ' of observed water is above the 26°C storm-fuel threshold.' : ''}`
    };

  return {
    headline: 'Conditions Stable',
    body: `Mean SST: ${s.mean.toFixed(2)}°C with minimal change from recent frames.${pct ? ' ' + pct + ' of the basin is above 26°C.' : ''}`
  };
}

function updateInsightCard(frame, fuelMetrics) {
  const { headline, body } = getFrameInsight(frame, fuelMetrics);
  d3.select('#insight-headline').text(headline);
  d3.select('#insight-body').text(body);
}

// ── CONCLUSION CARD ───────────────────────────────────────────────────────────
// Computed entirely from STORM_SUMMARIES — add a new entry there to extend.
function buildConclusionCard() {
  const container = d3.select('#conclusion-content');

  STORM_SUMMARIES.forEach((storm, i) => {
    const trend  = storm.lastMean - storm.firstMean;
    const spread = storm.maxMean - storm.minMean;

    // Diurnal amplitude — computed from the storm's own frames array
    const byHour = d3.rollup(
      storm.frames.filter(f => f.mean !== null),
      v => d3.mean(v, d => d.mean),
      d => +d.time.substring(11, 13)
    );
    const hours   = Array.from(byHour, ([h, m]) => ({ h, m }));
    const peakH   = hours.reduce((a, b) => b.m > a.m ? b : a);
    const troughH = hours.reduce((a, b) => b.m < a.m ? b : a);
    const amp     = peakH.m - troughH.m;

    const findings = [
      `SST ranged ${storm.minMean.toFixed(2)}–${storm.maxMean.toFixed(2)}°C (${spread.toFixed(2)}°C spread).`,
      `Basin mean ${trend >= 0 ? 'rose' : 'fell'} ${Math.abs(trend).toFixed(2)}°C from start to end — ${trend >= 0 ? 'daytime solar heating accumulated through the period' : 'overnight cooling and storm-driven mixing dominated'}.`,
      `${storm.name.split('·')[0].trim()} reached ${storm.peakStatus} (${storm.peakWind} kt) while tracking over water above the 26°C threshold — warm SST was the primary energy source for intensification.`,
      `Diurnal cycle: SST averaged ~${peakH.m.toFixed(2)}°C around ${peakH.h}:00 UTC vs ~${troughH.m.toFixed(2)}°C around ${troughH.h}:00 UTC — a ${amp.toFixed(2)}°C daily swing from solar heating and nocturnal cooling.`,
    ];

    if (i > 0) {
      container.append('div').attr('class', 'conclusion-divider');
    }

    container.append('div').attr('class', 'conclusion-storm-label').text(storm.name);
    findings.forEach(text => {
      container.append('div').attr('class', 'conclusion-finding')
        .html(`<span class="finding-dash">—</span><span>${text}</span>`);
    });
  });

  // Cross-storm summary (auto-renders when 2+ storms are loaded)
  if (STORM_SUMMARIES.length > 1) {
    const avgTrend  = d3.mean(STORM_SUMMARIES, s => s.lastMean - s.firstMean);
    const avgSpread = d3.mean(STORM_SUMMARIES, s => s.maxMean - s.minMean);
    container.append('div').attr('class', 'conclusion-cross')
      .html(`<strong>Cross-storm average (${STORM_SUMMARIES.length} storms):</strong> Basin SST ${avgTrend >= 0 ? 'rose' : 'fell'} ${Math.abs(avgTrend).toFixed(2)}°C on average, with a typical ${avgSpread.toFixed(2)}°C intra-period spread.`);
  } else {
    container.append('p').attr('class', 'conclusion-note')
      .text('Add entries to STORM_SUMMARIES in main.js when integrating additional hurricane datasets to enable automatic cross-storm comparison here.');
  }
}

// ── GRID CELLS ───────────────────────────────────────────────────────────────
const GRID_COLS = 80;
const GRID_ROWS = 60;
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
  d3.select('#timeLabel').text(`Frame ${frameNum} | ${d.toDateString()} ${hhmm} UTC`);

  updateStatCards(frameNum);
  updateTsCursor(frameNum);
  //updateStormOverlay(frameNum);

  
  const fileIdx = frameNum * 2;
  d3.json(`Isaiah/frame_${fileIdx}.json`).then(frame => {
    const data = frame.pixels;
    const gridCells = buildGrid(data);

    const rects = dataG.selectAll('.cell').data(gridCells, d => d.key);
    rects.enter().append('rect')
      .attr('class', 'cell')
      .on('mouseover', showTooltip)
      .on('mousemove', showTooltip)
      .on('mouseleave', hideTooltip)
      .merge(rects)
      .attr('x',      d => xScale(X_MIN + d.col * CELL_W_ANG))
      .attr('y',      d => yScale(Y_MIN + (d.row + 1) * CELL_H_ANG))
      .attr('width',  CELL_W_PX)
      .attr('height', CELL_H_PX)
      .attr('fill',   d => color(d.mean))
      .classed('below-threshold', d => d.mean < SST_THRESHOLD);
    rects.exit().remove();

    //const eyeXY = currentStormState && currentStormState.xy ? currentStormState.xy : null;
    // const fuelMetrics = computeFuelMetrics(data, eyeXY);
    // updateFuelCard(fuelMetrics);
    // updateInsightCard(frameNum, fuelMetrics);

    drawHistogram(data);
  });
}

// ── PLAYBACK CONTROLS ────────────────────────────────────────────────────────
let curFrame = 0;
let running  = false;
let playInterval = null;

function getSpeed() { return +d3.select('#speed-select').property('value'); }

function startPlay() {
  running = true;
  d3.select('#play-btn').html('&#9646;&#9646; Pause');
  playInterval = setInterval(() => {
    curFrame = (curFrame + 1) % 156;
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
d3.select('#speed-select').on('change', () => { if (running) { stopPlay(); startPlay(); } });
d3.select('#slider').on('input', function () { curFrame = +this.value; drawFrame(curFrame); });

// Fuel-zone toggle
let fuelMode = false;
d3.select('#fuel-toggle').on('click', () => {
  fuelMode = !fuelMode;
  mapSvg.classed('fuel-mode', fuelMode);
  d3.select('#fuel-toggle')
    .classed('active', fuelMode)
    .text(fuelMode ? '26°C fuel zone: ON' : 'Show 26°C fuel zone');
});

// ── INIT ─────────────────────────────────────────────────────────────────────
drawLegend();
drawFrame(0);
buildConclusionCard();
