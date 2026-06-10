import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

// ── HURDAT2 APPROXIMATE BEST TRACKS ────────────────────────────────────────
const ISAIAH_TRACK = [
  { iso:'2020-07-28T00:00:00Z', lat:12.2, lon:-55.2, wind:25,  status:'Disturbance'         },
  { iso:'2020-07-28T06:00:00Z', lat:12.5, lon:-57.0, wind:25,  status:'Disturbance'         },
  { iso:'2020-07-28T12:00:00Z', lat:12.9, lon:-58.8, wind:25,  status:'Disturbance'         },
  { iso:'2020-07-28T18:00:00Z', lat:13.2, lon:-60.3, wind:30,  status:'Tropical Depression' },
  { iso:'2020-07-29T00:00:00Z', lat:13.7, lon:-62.2, wind:30,  status:'Tropical Depression' },
  { iso:'2020-07-29T06:00:00Z', lat:14.2, lon:-64.1, wind:35,  status:'Tropical Storm'      },
  { iso:'2020-07-29T12:00:00Z', lat:14.8, lon:-66.3, wind:40,  status:'Tropical Storm'      },
  { iso:'2020-07-29T18:00:00Z', lat:15.5, lon:-68.4, wind:40,  status:'Tropical Storm'      },
  { iso:'2020-07-30T00:00:00Z', lat:16.4, lon:-70.0, wind:45,  status:'Tropical Storm'      },
  { iso:'2020-07-30T06:00:00Z', lat:17.3, lon:-71.8, wind:55,  status:'Tropical Storm'      },
  { iso:'2020-07-30T12:00:00Z', lat:18.2, lon:-73.0, wind:60,  status:'Tropical Storm'      },
  { iso:'2020-07-30T18:00:00Z', lat:19.5, lon:-74.3, wind:65,  status:'Hurricane'           },
  { iso:'2020-07-31T00:00:00Z', lat:21.0, lon:-75.5, wind:60,  status:'Tropical Storm'      },
  { iso:'2020-07-31T06:00:00Z', lat:22.5, lon:-76.5, wind:55,  status:'Tropical Storm'      },
  { iso:'2020-07-31T12:00:00Z', lat:24.0, lon:-77.5, wind:55,  status:'Tropical Storm'      },
  { iso:'2020-07-31T18:00:00Z', lat:25.5, lon:-77.5, wind:60,  status:'Tropical Storm'      },
  { iso:'2020-08-01T00:00:00Z', lat:27.5, lon:-79.0, wind:65,  status:'Hurricane'           },
  { iso:'2020-08-01T06:00:00Z', lat:29.5, lon:-79.5, wind:65,  status:'Hurricane'           },
  { iso:'2020-08-01T12:00:00Z', lat:31.5, lon:-80.0, wind:65,  status:'Hurricane'           },
  { iso:'2020-08-01T18:00:00Z', lat:33.5, lon:-80.0, wind:60,  status:'Tropical Storm'      },
  { iso:'2020-08-02T00:00:00Z', lat:35.0, lon:-79.0, wind:50,  status:'Tropical Storm'      },
  { iso:'2020-08-02T06:00:00Z', lat:36.5, lon:-76.0, wind:40,  status:'Tropical Storm'      },
  { iso:'2020-08-02T12:00:00Z', lat:38.0, lon:-73.0, wind:35,  status:'Tropical Storm'      },
  { iso:'2020-08-03T00:00:00Z', lat:41.0, lon:-69.0, wind:35,  status:'Tropical Storm'      },
];

const IAN_TRACK = [
  { iso:'2022-09-23T12:00:00Z', lat:15.0, lon:-79.0, wind:30,  status:'Tropical Depression' },
  { iso:'2022-09-24T00:00:00Z', lat:16.5, lon:-80.5, wind:35,  status:'Tropical Storm'      },
  { iso:'2022-09-24T06:00:00Z', lat:17.5, lon:-81.5, wind:40,  status:'Tropical Storm'      },
  { iso:'2022-09-24T12:00:00Z', lat:18.5, lon:-82.0, wind:50,  status:'Tropical Storm'      },
  { iso:'2022-09-24T18:00:00Z', lat:19.5, lon:-82.5, wind:60,  status:'Tropical Storm'      },
  { iso:'2022-09-25T00:00:00Z', lat:20.5, lon:-82.8, wind:70,  status:'Hurricane'           },
  { iso:'2022-09-25T06:00:00Z', lat:21.5, lon:-83.0, wind:80,  status:'Hurricane'           },
  { iso:'2022-09-25T12:00:00Z', lat:22.5, lon:-83.5, wind:90,  status:'Hurricane'           },
  { iso:'2022-09-25T18:00:00Z', lat:23.2, lon:-83.5, wind:90,  status:'Hurricane'           },
  { iso:'2022-09-26T00:00:00Z', lat:23.6, lon:-83.0, wind:95,  status:'Hurricane'           },
  { iso:'2022-09-26T06:00:00Z', lat:24.0, lon:-83.0, wind:100, status:'Hurricane'           },
  { iso:'2022-09-26T12:00:00Z', lat:24.2, lon:-82.5, wind:105, status:'Hurricane'           },
  { iso:'2022-09-26T18:00:00Z', lat:24.8, lon:-82.0, wind:110, status:'Hurricane'           },
  { iso:'2022-09-27T00:00:00Z', lat:25.2, lon:-82.0, wind:115, status:'Hurricane'           },
  { iso:'2022-09-27T06:00:00Z', lat:25.5, lon:-82.0, wind:115, status:'Hurricane'           },
  { iso:'2022-09-27T12:00:00Z', lat:26.0, lon:-82.5, wind:120, status:'Hurricane'           },
  { iso:'2022-09-27T18:00:00Z', lat:26.3, lon:-82.2, wind:130, status:'Hurricane'           },
  { iso:'2022-09-28T00:00:00Z', lat:26.5, lon:-82.0, wind:130, status:'Hurricane'           },
  { iso:'2022-09-28T06:00:00Z', lat:26.6, lon:-82.0, wind:130, status:'Hurricane'           },
  { iso:'2022-09-28T12:00:00Z', lat:26.9, lon:-81.9, wind:130, status:'Hurricane'           },
  { iso:'2022-09-28T18:00:00Z', lat:27.8, lon:-81.8, wind:75,  status:'Hurricane'           },
  { iso:'2022-09-29T00:00:00Z', lat:28.5, lon:-80.8, wind:55,  status:'Tropical Storm'      },
  { iso:'2022-09-29T06:00:00Z', lat:29.0, lon:-80.2, wind:40,  status:'Tropical Storm'      },
  { iso:'2022-09-29T12:00:00Z', lat:30.5, lon:-79.5, wind:45,  status:'Tropical Storm'      },
  { iso:'2022-09-29T18:00:00Z', lat:31.5, lon:-79.0, wind:55,  status:'Tropical Storm'      },
  { iso:'2022-09-30T00:00:00Z', lat:32.8, lon:-79.5, wind:65,  status:'Hurricane'           },
  { iso:'2022-09-30T06:00:00Z', lat:33.5, lon:-79.0, wind:70,  status:'Hurricane'           },
  { iso:'2022-09-30T12:00:00Z', lat:33.9, lon:-79.0, wind:65,  status:'Hurricane'           },
  { iso:'2022-09-30T18:00:00Z', lat:34.5, lon:-79.5, wind:55,  status:'Tropical Storm'      },
  { iso:'2022-10-01T00:00:00Z', lat:36.0, lon:-79.5, wind:40,  status:'Tropical Storm'      },
  { iso:'2022-10-01T12:00:00Z', lat:38.0, lon:-76.0, wind:35,  status:'Tropical Storm'      },
  { iso:'2022-10-02T00:00:00Z', lat:40.5, lon:-72.0, wind:35,  status:'Tropical Storm'      },
];

const IDA_TRACK = [
  { iso:'2021-08-24T00:00:00Z', lat:16.5, lon:-73.5, wind:30,  status:'Tropical Depression' },
  { iso:'2021-08-24T12:00:00Z', lat:17.5, lon:-76.5, wind:35,  status:'Tropical Storm'      },
  { iso:'2021-08-25T00:00:00Z', lat:18.5, lon:-80.0, wind:50,  status:'Tropical Storm'      },
  { iso:'2021-08-25T12:00:00Z', lat:20.0, lon:-83.0, wind:65,  status:'Hurricane'           },
  { iso:'2021-08-25T18:00:00Z', lat:21.5, lon:-84.5, wind:70,  status:'Hurricane'           },
  { iso:'2021-08-26T00:00:00Z', lat:22.5, lon:-85.5, wind:70,  status:'Hurricane'           },
  { iso:'2021-08-26T06:00:00Z', lat:23.0, lon:-86.5, wind:70,  status:'Hurricane'           },
  { iso:'2021-08-26T12:00:00Z', lat:23.5, lon:-87.5, wind:75,  status:'Hurricane'           },
  { iso:'2021-08-26T18:00:00Z', lat:24.5, lon:-88.5, wind:80,  status:'Hurricane'           },
  { iso:'2021-08-27T00:00:00Z', lat:25.5, lon:-89.0, wind:95,  status:'Hurricane'           },
  { iso:'2021-08-27T06:00:00Z', lat:26.5, lon:-89.5, wind:100, status:'Hurricane'           },
  { iso:'2021-08-27T12:00:00Z', lat:27.5, lon:-89.5, wind:110, status:'Hurricane'           },
  { iso:'2021-08-27T18:00:00Z', lat:28.0, lon:-89.5, wind:120, status:'Hurricane'           },
  { iso:'2021-08-28T00:00:00Z', lat:28.5, lon:-90.0, wind:120, status:'Hurricane'           },
  { iso:'2021-08-28T06:00:00Z', lat:29.0, lon:-90.2, wind:125, status:'Hurricane'           },
  { iso:'2021-08-28T12:00:00Z', lat:29.3, lon:-90.4, wind:130, status:'Hurricane'           },
  { iso:'2021-08-29T00:00:00Z', lat:29.5, lon:-90.6, wind:130, status:'Hurricane'           },
  { iso:'2021-08-29T12:00:00Z', lat:30.5, lon:-91.0, wind:65,  status:'Hurricane'           },
  { iso:'2021-08-29T18:00:00Z', lat:31.5, lon:-91.5, wind:45,  status:'Tropical Storm'      },
  { iso:'2021-08-30T00:00:00Z', lat:33.0, lon:-91.5, wind:35,  status:'Tropical Storm'      },
  { iso:'2021-08-30T12:00:00Z', lat:35.0, lon:-90.5, wind:30,  status:'Tropical Depression' },
  { iso:'2021-08-31T00:00:00Z', lat:38.5, lon:-87.5, wind:25,  status:'Disturbance'         },
];

const LAURA_TRACK = [
  { iso:'2020-08-21T00:00:00Z', lat:15.0, lon:-68.0, wind:35,  status:'Tropical Storm'      },
  { iso:'2020-08-21T12:00:00Z', lat:16.0, lon:-71.5, wind:40,  status:'Tropical Storm'      },
  { iso:'2020-08-22T00:00:00Z', lat:16.5, lon:-75.0, wind:45,  status:'Tropical Storm'      },
  { iso:'2020-08-22T12:00:00Z', lat:17.5, lon:-78.0, wind:50,  status:'Tropical Storm'      },
  { iso:'2020-08-23T00:00:00Z', lat:18.5, lon:-80.0, wind:60,  status:'Tropical Storm'      },
  { iso:'2020-08-23T12:00:00Z', lat:20.0, lon:-82.0, wind:65,  status:'Hurricane'           },
  { iso:'2020-08-24T00:00:00Z', lat:21.5, lon:-84.0, wind:70,  status:'Hurricane'           },
  { iso:'2020-08-24T12:00:00Z', lat:23.0, lon:-86.5, wind:60,  status:'Hurricane'           },
  { iso:'2020-08-25T00:00:00Z', lat:24.0, lon:-88.0, wind:65,  status:'Hurricane'           },
  { iso:'2020-08-25T12:00:00Z', lat:25.5, lon:-90.0, wind:85,  status:'Hurricane'           },
  { iso:'2020-08-26T00:00:00Z', lat:26.5, lon:-91.5, wind:100, status:'Hurricane'           },
  { iso:'2020-08-26T12:00:00Z', lat:27.5, lon:-92.5, wind:120, status:'Hurricane'           },
  { iso:'2020-08-26T18:00:00Z', lat:28.5, lon:-92.8, wind:130, status:'Hurricane'           },
  { iso:'2020-08-27T00:00:00Z', lat:29.0, lon:-93.0, wind:130, status:'Hurricane'           },
  { iso:'2020-08-27T06:00:00Z', lat:29.8, lon:-93.3, wind:130, status:'Hurricane'           },
  { iso:'2020-08-27T12:00:00Z', lat:30.5, lon:-93.5, wind:85,  status:'Hurricane'           },
  { iso:'2020-08-27T18:00:00Z', lat:31.5, lon:-93.5, wind:55,  status:'Tropical Storm'      },
  { iso:'2020-08-28T00:00:00Z', lat:33.0, lon:-92.5, wind:40,  status:'Tropical Storm'      },
  { iso:'2020-08-28T12:00:00Z', lat:35.0, lon:-90.5, wind:30,  status:'Tropical Storm'      },
  { iso:'2020-08-29T00:00:00Z', lat:37.5, lon:-87.0, wind:25,  status:'Disturbance'         },
];

// ── STORM CONFIGURATIONS ────────────────────────────────────────────────────
// Display frame N maps to file frame_{N * fileStep}.json
// Each display frame represents 2 hours from startISO
const STORM_CONFIGS = {
  isaiah: {
    id: 'isaiah',
    displayName: 'Isaiah',
    dataDir: 'Isaiah',
    startISO: '2020-07-22T00:00:00Z',
    frameCount: 153,   // files: frame_0 … frame_304
    fileStep: 2,
    track: ISAIAH_TRACK,
    peakStatus: 'Category 1 Hurricane',
    peakWind: 65,
    observationDates: 'Jul 22 – Aug 3, 2020',
    periodSub: '13 days · 2-hr frames',
    milestones: [
      { frame: 81,  label: 'TD forms',  color: '#ffd700' },
      { frame: 87,  label: 'TS Isaiah', color: '#ff8c00' },
      { frame: 105, label: 'Hurricane', color: '#ff3b3b' },
      { frame: 120, label: 'HU again',  color: '#ff3b3b' },
    ],
  },
  ian: {
    id: 'ian',
    displayName: 'Ian',
    dataDir: 'Ian',
    startISO: '2022-09-21T00:00:00Z',
    frameCount: 157,   // files: frame_0 … frame_312
    fileStep: 2,
    track: IAN_TRACK,
    peakStatus: 'Category 4 Hurricane',
    peakWind: 130,
    observationDates: 'Sep 21 – Oct 3, 2022',
    periodSub: '13 days · 2-hr frames',
    milestones: [
      { frame: 30,  label: 'TD',        color: '#ffd700' },
      { frame: 36,  label: 'TS Ian',    color: '#ff8c00' },
      { frame: 48,  label: 'Hurricane', color: '#ff3b3b' },
      { frame: 78,  label: 'Cat. 4',    color: '#d00000' },
      { frame: 87,  label: 'Landfall',  color: '#ffffff' },
    ],
  },
  ida: {
    id: 'ida',
    displayName: 'Ida',
    dataDir: 'Ida',
    startISO: '2021-08-22T00:00:00Z',
    frameCount: 156,   // files: frame_0 … frame_310
    fileStep: 2,
    track: IDA_TRACK,
    peakStatus: 'Category 4 Hurricane',
    peakWind: 130,
    observationDates: 'Aug 22 – Sep 3, 2021',
    periodSub: '13 days · 2-hr frames',
    milestones: [
      { frame: 24,  label: 'TD',        color: '#ffd700' },
      { frame: 30,  label: 'TS Ida',    color: '#ff8c00' },
      { frame: 42,  label: 'Hurricane', color: '#ff3b3b' },
      { frame: 78,  label: 'Cat. 4',    color: '#d00000' },
      { frame: 84,  label: 'Landfall',  color: '#ffffff' },
    ],
  },
  laura: {
    id: 'laura',
    displayName: 'Laura',
    dataDir: 'Laura',
    startISO: '2020-08-20T00:00:00Z',
    frameCount: 156,   // files: frame_0 … frame_310
    fileStep: 2,
    track: LAURA_TRACK,
    peakStatus: 'Category 4 Hurricane',
    peakWind: 130,
    observationDates: 'Aug 20 – Sep 1, 2020',
    periodSub: '13 days · 2-hr frames',
    milestones: [
      { frame: 12,  label: 'TS Laura',  color: '#ff8c00' },
      { frame: 42,  label: 'Hurricane', color: '#ff3b3b' },
      { frame: 78,  label: 'Cat. 4',    color: '#d00000' },
      { frame: 87,  label: 'Landfall',  color: '#ffffff' },
    ],
  },
};

// ── ACTIVE STATE ────────────────────────────────────────────────────────────
let ACTIVE_STORM = STORM_CONFIGS.ian;
let currentStormState = null;

// Per-storm stats cache: stormId → Map<displayFrame, {mean, min, max}>
const STATS_CACHE = {};
Object.keys(STORM_CONFIGS).forEach(id => { STATS_CACHE[id] = new Map(); });

// ── COLOR SCALE ─────────────────────────────────────────────────────────────
const COLOR_DOMAIN = [16, 32];
const color = d3.scaleSequential()
  .domain(COLOR_DOMAIN)
  .interpolator(d3.interpolateInferno)
  .clamp(true);

// ── MAP ──────────────────────────────────────────────────────────────────────
const MAP_W = 900, MAP_H = 630;
const mapSvg = d3.select('#map-svg')
  .attr('viewBox', `0 0 ${MAP_W} ${MAP_H}`)
  .attr('preserveAspectRatio', 'xMidYMid meet');

const xScale = d3.scaleLinear().domain([-0.151, 0.151]).range([0, MAP_W]);
const yScale = d3.scaleLinear().domain([0.151, -0.151]).range([0, MAP_H]);

const mapG   = mapSvg.append('g').attr('id', 'map-g');
const dataG  = mapG.append('g').attr('id', 'data-g');
const geoG   = mapG.append('g').attr('id', 'geo-g');
const stormG = mapG.append('g').attr('id', 'storm-g');

// ── GOES-16 PROJECTION ───────────────────────────────────────────────────────
const H   = 42164.16;
const Re  = 6378.137;
const Rp  = 6356.7523;
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
    if (xy) this.stream.point(xy[0], xy[1]);
  }
});
const geoPath = d3.geoPath().projection(geoProjection);

fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
  .then(r => r.json())
  .then(world => {
    geoG.append('path')
      .datum(topojson.mesh(world, world.objects.land, (a, b) => a === b))
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.85)')
      .attr('stroke-width', 0.9)
      .attr('pointer-events', 'none')
      .attr('d', d => { const p = geoPath(d); return (!p || /^Z+$/.test(p)) ? null : p; });

    geoG.append('g')
      .selectAll('path')
      .data(topojson.feature(world, world.objects.countries).features)
      .enter().append('path')
      .attr('fill', '#0a0a0f')
      .attr('stroke', 'rgba(255,255,255,0.45)')
      .attr('stroke-width', 0.5)
      .attr('pointer-events', 'none')
      .attr('d', d => { const p = geoPath(d); return (!p || /^Z+$/.test(p)) ? null : p; });
  });

// ── ZOOM/PAN ─────────────────────────────────────────────────────────────────
const zoom = d3.zoom()
  .scaleExtent([1, 12])
  .translateExtent([[0, 0], [MAP_W, MAP_H]])
  .on('zoom', (event) => { mapG.attr('transform', event.transform); });

mapSvg.call(zoom);
mapSvg.on('dblclick.zoom', () => {
  mapSvg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
});

// ── STORM HELPERS ────────────────────────────────────────────────────────────
function getFrameMS(storm, displayFrame) {
  return new Date(storm.startISO).getTime() + displayFrame * 2 * 3600000;
}

function getStormStateAt(storm, displayFrame) {
  const t   = getFrameMS(storm, displayFrame);
  const pts = storm.track.map(d => ({ ...d, ms: new Date(d.iso).getTime() }));
  if (!pts.length || t < pts[0].ms || t > pts[pts.length - 1].ms) return null;
  for (let i = 0; i < pts.length - 1; i++) {
    if (t >= pts[i].ms && t < pts[i + 1].ms) {
      const f   = (t - pts[i].ms) / (pts[i + 1].ms - pts[i].ms);
      const lat  = pts[i].lat  + f * (pts[i + 1].lat  - pts[i].lat);
      const lon  = pts[i].lon  + f * (pts[i + 1].lon  - pts[i].lon);
      const wind = pts[i].wind + f * (pts[i + 1].wind - pts[i].wind);
      return { lat, lon, wind, status: pts[i].status, xy: latLonToXY(lat, lon) };
    }
  }
  return null;
}

function getStormState(displayFrame) {
  return getStormStateAt(ACTIVE_STORM, displayFrame);
}

function stormColor(status) {
  if (status === 'Hurricane')           return '#ff3b3b';
  if (status === 'Tropical Storm')      return '#ff8c00';
  if (status === 'Tropical Depression') return '#ffd700';
  return '#aaaaaa';
}

// ── STORM TRACK OVERLAY ──────────────────────────────────────────────────────
let stormTrackPast, stormEyeG;

function rebuildTrackOverlay() {
  stormG.selectAll('*').remove();

  const storm = ACTIVE_STORM;
  const allXY = storm.track.map(d => latLonToXY(d.lat, d.lon)).filter(Boolean);

  stormG.append('polyline')
    .attr('points', allXY.map(p => p.join(',')).join(' '))
    .attr('fill', 'none').attr('stroke', '#ffffff')
    .attr('stroke-width', 1.5).attr('stroke-dasharray', '4 5')
    .attr('opacity', 0.45).attr('pointer-events', 'none');

  stormTrackPast = stormG.append('polyline')
    .attr('fill', 'none').attr('stroke-width', 2.5)
    .attr('stroke-linecap', 'round').attr('stroke-linejoin', 'round')
    .attr('opacity', 0.9).attr('pointer-events', 'none');

  stormEyeG = stormG.append('g').attr('class', 'storm-eye')
    .attr('display', 'none').style('cursor', 'pointer');
  stormEyeG.append('circle').attr('class', 'eye-ring').attr('r', 14)
    .attr('fill', 'none').attr('stroke-width', 2.5);
  stormEyeG.append('circle').attr('class', 'fuel-ring')
    .attr('r', FUEL_RADIUS_PX).attr('fill', 'none')
    .attr('stroke', '#fff').attr('stroke-width', 1)
    .attr('stroke-dasharray', '2 4').attr('opacity', 0.35)
    .attr('pointer-events', 'none');
  stormEyeG.append('circle').attr('class', 'eye-dot').attr('r', 6);
  stormEyeG.append('text').attr('class', 'eye-label')
    .attr('dy', -16).attr('text-anchor', 'middle')
    .attr('font-size', 10).attr('font-weight', 700)
    .attr('fill', '#fff').attr('pointer-events', 'none')
    .attr('paint-order', 'stroke').attr('stroke', '#000').attr('stroke-width', 2);

  stormEyeG
    .on('mouseover', (event) => {
      if (!currentStormState) return;
      const { wind, status, lat, lon } = currentStormState;
      tooltip.classed('hidden', false)
        .style('left', (event.clientX + 14) + 'px')
        .style('top',  (event.clientY - 32) + 'px')
        .html(`<strong>${ACTIVE_STORM.displayName}</strong><br>${status}<br>${Math.round(wind)} kt &nbsp;(${Math.round(wind * 1.852)} km/h)<br>${lat.toFixed(1)}°N, ${Math.abs(lon).toFixed(1)}°W`);
    })
    .on('mousemove', (event) => {
      tooltip.style('left', (event.clientX + 14) + 'px').style('top', (event.clientY - 32) + 'px');
    })
    .on('mouseleave', hideTooltip);
}

// ── TOOLTIP ──────────────────────────────────────────────────────────────────
const tooltip = d3.select('#tooltip');

function showTooltip(event, d) {
  const val = d.mean !== undefined ? d.mean : d.temp;
  tooltip.classed('hidden', false)
    .style('left', (event.clientX + 14) + 'px')
    .style('top',  (event.clientY - 32) + 'px')
    .html(`<strong>${val.toFixed(2)}°C</strong>`);
}
function hideTooltip() { tooltip.classed('hidden', true); }

// ── STORM FUEL ───────────────────────────────────────────────────────────────
const SST_THRESHOLD  = 26;
const FUEL_RADIUS_PX = 60;

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

// ── FRAME INSIGHT ────────────────────────────────────────────────────────────
function getMeanTrend(displayFrame, n = 3) {
  const cache = STATS_CACHE[ACTIVE_STORM.id];
  const curr  = cache.get(displayFrame);
  if (!curr) return 0;
  let count = 0;
  for (let i = displayFrame - 1; i >= 0; i--) {
    const s = cache.get(i);
    if (s && ++count >= n) return curr.mean - s.mean;
  }
  return 0;
}

function getFrameInsight(displayFrame, { nearMean, pctAbove }) {
  const cache = STATS_CACHE[ACTIVE_STORM.id];
  const s     = cache.get(displayFrame);
  if (!s) return { headline: 'Loading…', body: 'Frame data is being fetched.' };

  const st    = getStormState(displayFrame);
  const name  = ACTIVE_STORM.displayName;
  const trend = getMeanTrend(displayFrame);
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
      body: `${name} at ${Math.round(st.wind)} kt.${fuelNote}${pct ? ' ' + pct + ' of the basin remains above 26°C.' : ''}`
    };
  }
  if (trend <= -0.07) return {
    headline: 'SST Dropping',
    body: `Basin mean fell ~${Math.abs(trend).toFixed(2)}°C over the last few cached frames. Overnight cooling or storm-driven upwelling can expose cooler subsurface water.`
  };
  if (trend >= 0.07) return {
    headline: 'SST Rising',
    body: `Basin mean rose ~${trend.toFixed(2)}°C. Solar heating typically peaks in mid-afternoon UTC frames.`
  };
  if (st && st.status === 'Tropical Storm') return {
    headline: 'Active Tropical Storm',
    body: `${name} at ${Math.round(st.wind)} kt.${near ? ' SST near eye: ' + near + (nearMean >= SST_THRESHOLD ? ' — above 26°C fuel threshold.' : ' — near the 26°C limit.') : ''}${pct ? ' ' + pct + ' of the basin is above 26°C.' : ''}`
  };
  if (st && st.status === 'Tropical Depression') return {
    headline: 'Tropical Depression',
    body: `${name} organizing at ${Math.round(st.wind)} kt. Nearby SST: ${near ?? '—'}. Sustained water above 26°C is needed for intensification.`
  };
  if (st && st.status === 'Disturbance') return {
    headline: 'Tropical Disturbance',
    body: `Disorganized wave present. Basin mean SST: ${s.mean.toFixed(2)}°C.${pct ? ' ' + pct + ' of observed water is above the 26°C storm-fuel threshold.' : ''}`
  };
  return {
    headline: 'Conditions Stable',
    body: `Mean SST: ${s.mean.toFixed(2)}°C with minimal change from recent frames.${pct ? ' ' + pct + ' of the basin is above 26°C.' : ''}`
  };
}

function updateInsightCard(displayFrame, fuelMetrics) {
  const { headline, body } = getFrameInsight(displayFrame, fuelMetrics);
  d3.select('#insight-headline').text(headline);
  d3.select('#insight-body').text(body);
}

// ── CONCLUSION CARD ───────────────────────────────────────────────────────────
function buildConclusionCard() {
  const container = d3.select('#conclusion-content');
  container.selectAll('*').remove();

  const entries = Object.values(STORM_CONFIGS);
  entries.forEach((storm, i) => {
    if (i > 0) container.append('div').attr('class', 'conclusion-divider');

    container.append('div').attr('class', 'conclusion-storm-label')
      .text(`${storm.displayName} · ${storm.observationDates} · ${storm.peakStatus} (${storm.peakWind} kt)`);

    const cache  = STATS_CACHE[storm.id];
    const cached = Array.from(cache.values());

    if (cached.length < 5) {
      container.append('div').attr('class', 'conclusion-finding')
        .html(`<span class="finding-dash">—</span><span>Explore frames for this storm to generate SST statistics.</span>`);
      return;
    }

    const means  = cached.map(s => s.mean).filter(Boolean);
    const minM   = d3.min(means), maxM = d3.max(means);
    const spread = maxM - minM;

    const sortedFrames = Array.from(cache.entries()).sort((a, b) => a[0] - b[0]);
    const firstMean = sortedFrames[0][1].mean;
    const lastMean  = sortedFrames[sortedFrames.length - 1][1].mean;
    const trend     = lastMean - firstMean;

    const findings = [
      `SST ranged ${minM.toFixed(2)}–${maxM.toFixed(2)}°C (${spread.toFixed(2)}°C spread across visited frames).`,
      `Basin mean ${trend >= 0 ? 'rose' : 'fell'} ${Math.abs(trend).toFixed(2)}°C from first to last visited frame.`,
      `${storm.displayName} reached ${storm.peakStatus} (${storm.peakWind} kt) while tracking over water above the 26°C threshold — warm SST provided the primary energy source.`,
    ];

    findings.forEach(text => {
      container.append('div').attr('class', 'conclusion-finding')
        .html(`<span class="finding-dash">—</span><span>${text}</span>`);
    });
  });

  const allCached = Object.values(STORM_CONFIGS).filter(s => STATS_CACHE[s.id].size >= 5);
  if (allCached.length >= 2) {
    const avgPeak = d3.mean(allCached, s => s.peakWind);
    container.append('div').attr('class', 'conclusion-cross')
      .html(`<strong>Cross-storm (${allCached.length} storms with data):</strong> All storms intensified rapidly over SST > 26°C. Average peak wind: ${avgPeak.toFixed(0)} kt. Warm Gulf and Caribbean waters were the consistent energy driver across all events.`);
  } else {
    container.append('p').attr('class', 'conclusion-note')
      .text('Scrub through frames for multiple storms to enable cross-storm comparison.');
  }
}

// ── TIME SERIES CHART ─────────────────────────────────────────────────────────
const TS_M = { top: 18, right: 46, bottom: 40, left: 46 };
const TS_FULL_W = 348, TS_FULL_H = 200;
const tsW = TS_FULL_W - TS_M.left - TS_M.right;
const tsH = TS_FULL_H - TS_M.top - TS_M.bottom;

let xTs, yTs, yWind, tsG, tsCursor, tsCursorDot, yTsAxisG;

const tsSvg = d3.select('#ts-svg')
  .attr('viewBox', `0 0 ${TS_FULL_W} ${TS_FULL_H}`)
  .attr('preserveAspectRatio', 'xMidYMid meet');

function buildTsChart() {
  tsSvg.selectAll('*').remove();

  const storm = ACTIVE_STORM;
  const fc    = storm.frameCount;
  const startMs = new Date(storm.startISO).getTime();

  xTs   = d3.scaleTime()
    .domain([new Date(startMs), new Date(startMs + (fc - 1) * 2 * 3600000)])
    .range([0, tsW]);
  yTs   = d3.scaleLinear().domain([23.5, 32]).range([tsH, 0]);
  yWind = d3.scaleLinear().domain([20, storm.peakWind + 15]).range([tsH, 0]);

  tsG = tsSvg.append('g').attr('transform', `translate(${TS_M.left},${TS_M.top})`);

  // Day separator lines
  for (let day = 1; day <= 13; day++) {
    const dayMs  = startMs + day * 86400000;
    const dayDate = new Date(dayMs);
    if (dayDate > new Date(startMs + (fc - 1) * 2 * 3600000)) break;
    tsG.append('line')
      .attr('x1', xTs(dayDate)).attr('x2', xTs(dayDate))
      .attr('y1', 0).attr('y2', tsH)
      .attr('stroke', '#e8e8e8').attr('stroke-width', 1);
    tsG.append('text')
      .attr('x', xTs(dayDate) + 2).attr('y', 10)
      .attr('font-size', 8).attr('fill', '#aaa')
      .text(dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }));
  }

  // Axes
  tsG.append('g').attr('transform', `translate(0,${tsH})`)
    .call(d3.axisBottom(xTs).ticks(5).tickFormat(d3.timeFormat('%b %d')))
    .call(g => g.select('.domain').attr('stroke', '#ddd'));

  yTsAxisG = tsG.append('g')
    .call(d3.axisLeft(yTs).ticks(5).tickFormat(d => `${d}°`))
    .call(g => g.select('.domain').attr('stroke', '#ddd'));

  tsG.append('text').attr('class', 'axis-label')
    .attr('transform', 'rotate(-90)')
    .attr('x', -tsH / 2).attr('y', -38)
    .attr('text-anchor', 'middle')
    .text('Mean SST (°C)');

  // Wind right axis
  tsG.append('g').attr('transform', `translate(${tsW},0)`)
    .call(d3.axisRight(yWind).ticks(4).tickFormat(d => `${d}kt`))
    .call(g => g.select('.domain').attr('stroke', '#ddd'))
    .call(g => g.selectAll('text').attr('fill', '#c0392b'));

  tsG.append('text')
    .attr('x', tsW).attr('y', -6).attr('text-anchor', 'end')
    .attr('font-size', 8).attr('fill', '#c0392b').attr('font-weight', 700)
    .text(`${storm.displayName} winds (kt)`);

  // Wind line from track
  const windSeries = d3.range(fc).map(f => {
    const st = getStormStateAt(storm, f);
    return { date: new Date(getFrameMS(storm, f)), wind: st ? st.wind : null };
  });
  tsG.append('path')
    .attr('class', 'ts-wind-line')
    .datum(windSeries)
    .attr('fill', 'none').attr('stroke', '#c0392b')
    .attr('stroke-width', 1.8).attr('stroke-dasharray', '5 3').attr('opacity', 0.85)
    .attr('d', d3.line()
      .x(d => xTs(d.date))
      .y(d => yWind(d.wind))
      .defined(d => d.wind !== null));

  // Intensity milestones
  storm.milestones.forEach(({ frame, label, color: c }) => {
    if (frame >= fc) return;
    const x = xTs(new Date(getFrameMS(storm, frame)));
    tsG.append('line')
      .attr('x1', x).attr('x2', x).attr('y1', 0).attr('y2', tsH)
      .attr('stroke', c).attr('stroke-width', 1.2)
      .attr('stroke-dasharray', '3 3').attr('opacity', 0.8);
    tsG.append('text')
      .attr('x', x + 2).attr('y', 26)
      .attr('font-size', 7).attr('fill', c).attr('font-weight', 700)
      .text(label);
  });

  // SST line (empty until frames are cached)
  tsG.append('path').attr('class', 'ts-sst-line')
    .attr('fill', 'none').attr('stroke', '#e07b39').attr('stroke-width', 2);

  // Hint text
  tsG.append('text').attr('class', 'ts-hint')
    .attr('x', tsW / 2).attr('y', tsH / 2 + 10)
    .attr('text-anchor', 'middle').attr('font-size', 9).attr('fill', '#bbb')
    .text('Scrub through frames to populate');

  // Cursor
  tsCursor = tsG.append('line')
    .attr('y1', 0).attr('y2', tsH)
    .attr('stroke', '#333').attr('stroke-width', 1.5)
    .attr('stroke-dasharray', '4 3');

  tsCursorDot = tsG.append('circle')
    .attr('r', 5).attr('fill', '#fff')
    .attr('stroke', '#333').attr('stroke-width', 1.5);

  updateTsLine();
}

function updateTsLine() {
  if (!tsG) return;
  const storm = ACTIVE_STORM;
  const cache = STATS_CACHE[storm.id];
  const points = [];
  cache.forEach((s, f) => {
    if (s.mean !== null) points.push({ date: new Date(getFrameMS(storm, f)), mean: s.mean });
  });
  points.sort((a, b) => a.date - b.date);

  if (points.length > 3) {
    tsG.select('.ts-hint').attr('opacity', 0);
    const ext = d3.extent(points, p => p.mean);
    yTs.domain([ext[0] - 0.4, ext[1] + 0.4]);
    yTsAxisG.call(d3.axisLeft(yTs).ticks(5).tickFormat(d => `${d.toFixed(1)}°`))
      .call(g => g.select('.domain').attr('stroke', '#ddd'));
  }

  tsG.select('.ts-sst-line')
    .datum(points)
    .attr('d', d3.line().x(d => xTs(d.date)).y(d => yTs(d.mean)));

  const dots = tsG.selectAll('.ts-dot').data(points, d => d.date.getTime());
  dots.enter().append('circle').attr('class', 'ts-dot')
    .attr('r', 2).attr('fill', '#e07b39')
    .merge(dots)
    .attr('cx', d => xTs(d.date)).attr('cy', d => yTs(d.mean));
  dots.exit().remove();
}

function updateTsCursor(displayFrame) {
  if (!tsCursor || !xTs) return;
  const d = new Date(getFrameMS(ACTIVE_STORM, displayFrame));
  tsCursor.attr('x1', xTs(d)).attr('x2', xTs(d));
  const s = STATS_CACHE[ACTIVE_STORM.id].get(displayFrame);
  if (s && s.mean !== null) {
    tsCursorDot.attr('cx', xTs(d)).attr('cy', yTs(s.mean)).attr('opacity', 1);
  } else {
    tsCursorDot.attr('opacity', 0);
  }
}

// ── HISTOGRAM ────────────────────────────────────────────────────────────────
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
const yHistAxis = histG.append('g')
  .call(d3.axisLeft(yHist).ticks(4).tickFormat(d3.format('.2s')))
  .call(g => g.select('.domain').attr('stroke', '#ddd'));

histG.append('g').attr('transform', `translate(0,${hH})`)
  .call(d3.axisBottom(xHist).ticks(8).tickFormat(d => `${d}°`))
  .call(g => g.select('.domain').attr('stroke', '#ddd'));
histG.append('text').attr('class', 'axis-label')
  .attr('transform', 'rotate(-90)').attr('x', -hH / 2).attr('y', -38)
  .attr('text-anchor', 'middle').text('Pixel count');
histG.append('text').attr('class', 'axis-label')
  .attr('x', hW / 2).attr('y', hH + 30)
  .attr('text-anchor', 'middle').text('SST (°C)');

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

// ── COLOR LEGEND ──────────────────────────────────────────────────────────────
function drawLegend() {
  const svg = d3.select('#legend-svg');
  const lX = 0, lY = 6, lW = 260, lH = 16;
  const defs = svg.append('defs');
  const grad = defs.append('linearGradient').attr('id', 'legend-grad');
  d3.range(0, 1.01, 0.05).forEach(t => {
    grad.append('stop').attr('offset', `${(t * 100).toFixed(0)}%`)
      .attr('stop-color', color(COLOR_DOMAIN[0] + t * (COLOR_DOMAIN[1] - COLOR_DOMAIN[0])));
  });
  svg.append('rect').attr('x', lX).attr('y', lY)
    .attr('width', lW).attr('height', lH)
    .attr('fill', 'url(#legend-grad)').attr('rx', 3);
  const xLeg = d3.scaleLinear().domain(COLOR_DOMAIN).range([lX, lX + lW]);
  svg.append('g').attr('transform', `translate(0,${lY + lH})`)
    .call(d3.axisBottom(xLeg).ticks(5).tickFormat(d => `${d}°C`))
    .call(g => g.select('.domain').remove());
}

// ── STAT CARDS ────────────────────────────────────────────────────────────────
function updateStormInfoCards() {
  const storm = ACTIVE_STORM;
  d3.select('#stat-obs-value').text(storm.observationDates);
  d3.select('#stat-obs-sub').text(storm.periodSub);
  d3.select('#stat-storm-name').text(storm.displayName).style('color', '#111');
  d3.select('#stat-storm-status').text(storm.peakStatus);
  d3.select('#stat-storm-wind').text(`Peak: ${storm.peakWind} kt`);
}

function updateFrameStatCards(displayFrame) {
  const t    = getFrameMS(ACTIVE_STORM, displayFrame);
  const d    = new Date(t);
  const hhmm = d.toISOString().substring(11, 16);
  d3.select('#stat-time').text(d.toDateString() + ' ' + hhmm + ' UTC');

  const s = STATS_CACHE[ACTIVE_STORM.id].get(displayFrame);
  d3.select('#stat-mean').text(s ? `${s.mean.toFixed(2)}°C` : '—');
  d3.select('#stat-min').text(s  ? `${s.min.toFixed(2)}°C`  : '—');
  d3.select('#stat-max').text(s  ? `${s.max.toFixed(2)}°C`  : '—');
}

// ── STORM OVERLAY UPDATE ─────────────────────────────────────────────────────
function updateStormOverlay(displayFrame) {
  if (!stormEyeG) return;
  const state = getStormState(displayFrame);
  currentStormState = state;

  if (!state || !state.xy) { stormEyeG.attr('display', 'none'); return; }

  const [px, py] = state.xy;
  const col = stormColor(state.status);

  stormEyeG.attr('display', null).attr('transform', `translate(${px},${py})`);
  stormEyeG.select('.eye-ring').attr('stroke', col);
  stormEyeG.select('.eye-dot').attr('fill', col);
  stormEyeG.select('.eye-label').text(ACTIVE_STORM.displayName);

  const t = getFrameMS(ACTIVE_STORM, displayFrame);
  const pastXY = ACTIVE_STORM.track
    .filter(d => new Date(d.iso).getTime() <= t)
    .map(d => latLonToXY(d.lat, d.lon))
    .filter(Boolean);
  pastXY.push(state.xy);
  stormTrackPast.attr('points', pastXY.map(p => p.join(',')).join(' ')).attr('stroke', col);

  const shortStatus = {
    'Disturbance':        'Disturbance',
    'Tropical Depression':'Trop. Depression',
    'Tropical Storm':     'Tropical Storm',
    'Hurricane':          'Hurricane',
  }[state.status] || state.status;
  d3.select('#stat-storm-status').text(shortStatus);
  d3.select('#stat-storm-wind').text(`${Math.round(state.wind)} kt winds`);
  d3.select('#stat-storm-name').style('color', col);
}

// ── GRID CELLS ────────────────────────────────────────────────────────────────
const GRID_COLS = 80, GRID_ROWS = 56;
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

// ── DRAW FRAME ────────────────────────────────────────────────────────────────
function drawFrame(displayFrame) {
  const storm = ACTIVE_STORM;
  const t     = getFrameMS(storm, displayFrame);
  const d     = new Date(t);
  const hhmm  = d.toISOString().substring(11, 16);
  d3.select('#timeLabel').text(`Frame ${displayFrame} | ${d.toDateString()} ${hhmm} UTC`);

  updateFrameStatCards(displayFrame);
  updateTsCursor(displayFrame);
  updateStormOverlay(displayFrame);

  const fileFrame = displayFrame * storm.fileStep;
  d3.json(`${storm.dataDir}/frame_${fileFrame}.json`).then(raw => {
    // Support both flat array [{x,y,temp}] and {time, pixels:[...]} formats
    const data = Array.isArray(raw) ? raw : raw.pixels;

    // Compute and cache stats for this frame
    const validTemps = data.map(d => d.temp).filter(t => t >= 0 && t <= 45);
    if (validTemps.length > 0 && !STATS_CACHE[storm.id].has(displayFrame)) {
      const mean = validTemps.reduce((a, b) => a + b, 0) / validTemps.length;
      const min  = d3.min(validTemps);
      const max  = d3.max(validTemps);
      STATS_CACHE[storm.id].set(displayFrame, { mean, min, max });
      updateFrameStatCards(displayFrame);
      updateTsCursor(displayFrame);
      updateTsLine();
      buildConclusionCard();
    }

    const gridCells = buildGrid(data);
    const rects = dataG.selectAll('.cell').data(gridCells, d => d.key);
    rects.enter().append('rect').attr('class', 'cell')
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

    const eyeXY = currentStormState?.xy ?? null;
    const fuelMetrics = computeFuelMetrics(data, eyeXY);
    updateFuelCard(fuelMetrics);
    updateInsightCard(displayFrame, fuelMetrics);
    drawHistogram(data);
  });
}

// ── SWITCH STORM ─────────────────────────────────────────────────────────────
function switchStorm(id) {
  stopPlay();
  ACTIVE_STORM = STORM_CONFIGS[id];
  curFrame = 0;
  currentStormState = null;

  d3.select('#slider').attr('max', ACTIVE_STORM.frameCount - 1).property('value', 0);
  d3.select('#panel-sub-ts').text(`Mean SST per frame (orange) with ${ACTIVE_STORM.displayName} wind speed (red, right axis)`);

  updateStormInfoCards();
  rebuildTrackOverlay();
  buildTsChart();
  dataG.selectAll('.cell').remove();
  drawFrame(0);
}

// ── PLAYBACK ──────────────────────────────────────────────────────────────────
let curFrame = 0;
let running  = false;
let playInterval = null;

function getSpeed() { return +d3.select('#speed-select').property('value'); }

function startPlay() {
  running = true;
  d3.select('#play-btn').html('&#9646;&#9646; Pause');
  playInterval = setInterval(() => {
    curFrame = (curFrame + 1) % ACTIVE_STORM.frameCount;
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

// Storm dropdown
d3.select('#storm-select').on('change', function () { switchStorm(this.value); });

// Fuel-zone toggle
let fuelMode = false;
d3.select('#fuel-toggle').on('click', () => {
  fuelMode = !fuelMode;
  mapSvg.classed('fuel-mode', fuelMode);
  d3.select('#fuel-toggle')
    .classed('active', fuelMode)
    .text(fuelMode ? '26°C fuel zone: ON' : 'Show 26°C fuel zone');
});

// ── INIT ──────────────────────────────────────────────────────────────────────
drawLegend();
updateStormInfoCards();
rebuildTrackOverlay();
buildTsChart();
buildConclusionCard();
d3.select('#slider').attr('max', ACTIVE_STORM.frameCount - 1);
drawFrame(0);
