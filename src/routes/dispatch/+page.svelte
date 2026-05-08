<script>
  import { sites, guards, siteStatus } from '$lib/stub.svelte.js';
  import SiteCard from '$lib/components/SiteCard.svelte';
  import AssignPanel from '$lib/components/AssignPanel.svelte';

  let activeSite = $state(null);

  const coveredCount      = $derived(sites.filter(s => siteStatus(s) === 'covered').length);
  const understaffedCount = $derived(sites.filter(s => siteStatus(s) === 'understaffed').length);
  const vacantCount       = $derived(sites.filter(s => siteStatus(s) === 'vacant').length);
</script>

<div class="p-6">
  <div class="mb-6">
    <h1 class="text-xl font-bold text-white">Dispatch</h1>
    <p class="text-slate-400 text-sm mt-0.5">Assign personnel to secured locations</p>
  </div>

  <div class="flex gap-6 mb-6 text-sm">
    <span class="text-slate-400">Covered: <span class="text-emerald-400 font-medium">{coveredCount}</span></span>
    <span class="text-slate-400">Understaffed: <span class="text-amber-400 font-medium">{understaffedCount}</span></span>
    <span class="text-slate-400">Vacant: <span class="text-red-400 font-medium">{vacantCount}</span></span>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {#each sites as site}
      <SiteCard {site} {guards} onManage={() => activeSite = site} />
    {/each}
  </div>
</div>

{#if activeSite}
  <AssignPanel site={activeSite} {guards} onClose={() => activeSite = null} />
{/if}
