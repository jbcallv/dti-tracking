// ---------------------------------------------------------------------------
// Auth session — mutable reactive state
// ---------------------------------------------------------------------------
export const session = $state({ user: null });

export const stubUsers = [
  { id: 'u1', name: 'Alex Carter',   email: 'admin@dti.com',    password: 'password', role: 'admin',   badgeId: 'ADM-001' },
  { id: 'u2', name: 'Jordan Lee',    email: 'monitor@dti.com',  password: 'password', role: 'monitor', badgeId: 'MON-002' },
  { id: 'u3', name: 'Sam Rivera',    email: 'guard@dti.com',    password: 'password', role: 'guard',   badgeId: 'GRD-003' },
];

export function login(email, password) {
  const match = stubUsers.find(u => u.email === email && u.password === password);
  if (match) session.user = match;
  return !!match;
}

export function logout() {
  session.user = null;
}

// ---------------------------------------------------------------------------
// Guards
// ---------------------------------------------------------------------------
export const guards = $state([
  { id: 'g1', name: 'Marcus Webb',   badgeId: 'GRD-101', status: 'active',   teamId: 't1', lat: 37.7749, lng: -122.4194, zone: 'Zone A' },
  { id: 'g2', name: 'Priya Nair',    badgeId: 'GRD-102', status: 'active',   teamId: 't1', lat: 37.7751, lng: -122.4180, zone: 'Zone A' },
  { id: 'g3', name: 'Derek Stone',   badgeId: 'GRD-103', status: 'on-break', teamId: 't2', lat: 37.7740, lng: -122.4210, zone: 'Zone B' },
  { id: 'g4', name: 'Lena Park',     badgeId: 'GRD-104', status: 'active',   teamId: 't2', lat: 37.7760, lng: -122.4170, zone: 'Zone B' },
  { id: 'g5', name: 'Omar Hassan',   badgeId: 'GRD-105', status: 'off-duty', teamId: 't1', lat: 37.7730, lng: -122.4230, zone: 'Zone C' },
  { id: 'g6', name: 'Tanya Brooks',  badgeId: 'GRD-106', status: 'active',   teamId: 't3', lat: 37.7770, lng: -122.4150, zone: 'Zone C' },
  { id: 'g7', name: 'Carlos Vega',   badgeId: 'GRD-107', status: 'active',   teamId: 't3', lat: 37.7745, lng: -122.4200, zone: 'Zone D' },
  { id: 'g8', name: 'Nina Okafor',   badgeId: 'GRD-108', status: 'off-duty', teamId: 't2', lat: 37.7755, lng: -122.4160, zone: 'Zone D' },
]);

// ---------------------------------------------------------------------------
// Teams
// ---------------------------------------------------------------------------
export const teams = $state([
  { id: 't1', name: 'Alpha Team',  adminId: 'u1', memberIds: ['g1', 'g2', 'g5'] },
  { id: 't2', name: 'Bravo Team',  adminId: 'u1', memberIds: ['g3', 'g4', 'g8'] },
  { id: 't3', name: 'Charlie Team', adminId: 'u1', memberIds: ['g6', 'g7'] },
]);

// ---------------------------------------------------------------------------
// Sites
// ---------------------------------------------------------------------------
export const sites = $state([
  { id: 's1', name: 'City Hall',        address: '1 Dr Carlton B Goodlett Pl, SF', lat: 37.7793, lng: -122.4193, requiredGuards: 3, assignedGuardIds: ['g1', 'g2', 'g4'] },
  { id: 's2', name: 'Moscone Center',   address: '747 Howard St, SF',              lat: 37.7844, lng: -122.3996, requiredGuards: 4, assignedGuardIds: ['g6', 'g7'] },
  { id: 's3', name: 'Ferry Building',   address: '1 Ferry Building, SF',           lat: 37.7955, lng: -122.3937, requiredGuards: 2, assignedGuardIds: [] },
  { id: 's4', name: 'Union Square',     address: '333 Post St, SF',                lat: 37.7880, lng: -122.4075, requiredGuards: 2, assignedGuardIds: ['g3'] },
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
export function siteStatus(site) {
  if (site.assignedGuardIds.length === 0) return 'vacant';
  if (site.assignedGuardIds.length < site.requiredGuards) return 'understaffed';
  return 'covered';
}

export function assignGuardToSite(siteId, guardId) {
  const site = sites.find(s => s.id === siteId);
  if (site && !site.assignedGuardIds.includes(guardId)) {
    site.assignedGuardIds.push(guardId);
  }
}

export function removeGuardFromSite(siteId, guardId) {
  const site = sites.find(s => s.id === siteId);
  if (site) {
    site.assignedGuardIds = site.assignedGuardIds.filter(id => id !== guardId);
  }
}
