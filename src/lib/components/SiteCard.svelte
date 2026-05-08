<script>
  import StatusBadge from './StatusBadge.svelte';
  import { siteStatus } from '$lib/stub.svelte.js';
  const { site, guards, onManage } = $props();

  const assignedGuards = $derived(guards.filter(g => site.assignedGuardIds.includes(g.id)));
  const status = $derived(siteStatus(site));
</script>

<div class="bg-slate-800 border border-slate-700 rounded-lg p-5">
  <div class="flex items-start justify-between mb-3">
    <div>
      <h3 class="text-white font-semibold">{site.name}</h3>
      <p class="text-slate-500 text-xs mt-0.5">{site.address}</p>
    </div>
    <StatusBadge status={status} />
  </div>

  <div class="flex items-center gap-2 mb-4 text-sm">
    <span class="text-slate-400">Coverage:</span>
    <span class="text-white font-medium">{site.assignedGuardIds.length} / {site.requiredGuards}</span>
    <span class="text-slate-500">guards</span>
  </div>

  {#if assignedGuards.length > 0}
    <div class="space-y-1 mb-4">
      {#each assignedGuards as guard}
        <div class="flex items-center gap-2 text-sm text-slate-400">
          <span>&#9632;</span>
          <span>{guard.name}</span>
          <span class="text-slate-600">{guard.badgeId}</span>
        </div>
      {/each}
    </div>
  {/if}

  <button
    onclick={onManage}
    class="w-full py-1.5 rounded text-sm bg-slate-700 hover:bg-slate-600 text-slate-300 transition-colors"
  >
    Manage Assignment
  </button>
</div>
