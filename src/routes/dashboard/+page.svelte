<script>
  import { guards, sites, siteStatus } from '$lib/stub.svelte.js';
  import StatCard from '$lib/components/StatCard.svelte';
  import GuardRow from '$lib/components/GuardRow.svelte';

  const activeCount       = $derived(guards.filter(g => g.status === 'active').length);
  const offDutyCount      = $derived(guards.filter(g => g.status === 'off-duty').length);
  const coveredCount      = $derived(sites.filter(s => siteStatus(s) === 'covered').length);
  const understaffedCount = $derived(sites.filter(s => siteStatus(s) === 'understaffed').length);
</script>

<div class="p-4 lg:p-6">
  <div class="mb-5">
    <h1 class="text-xl font-bold text-white">Dashboard</h1>
    <p class="text-slate-400 text-sm mt-0.5">Live overview of personnel and site coverage</p>
  </div>

  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
    <StatCard label="Active Guards" value={activeCount}       sub="{guards.length} total" />
    <StatCard label="Sites Covered" value={coveredCount}      sub="{sites.length} total sites" />
    <StatCard label="Understaffed"  value={understaffedCount} sub="sites need more guards" />
    <StatCard label="Off Duty"      value={offDutyCount}      sub="guards offline" />
  </div>

  <div class="bg-slate-800 border border-slate-700 rounded-lg p-4 lg:p-5">
    <h2 class="text-white font-medium mb-4">All Personnel</h2>
    {#each guards as guard}
      <GuardRow {guard} />
    {/each}
  </div>
</div>
