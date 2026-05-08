<script>
  import StatusBadge from './StatusBadge.svelte';
  import { assignGuardToSite, removeGuardFromSite } from '$lib/stub.svelte.js';

  const { site, guards, onClose } = $props();

  let selectedGuardId = $state('');

  const assignedGuards = $derived(guards.filter(g => site.assignedGuardIds.includes(g.id)));
  const availableGuards = $derived(guards.filter(g => !site.assignedGuardIds.includes(g.id)));

  function handleAssign() {
    if (!selectedGuardId) return;
    assignGuardToSite(site.id, selectedGuardId);
    selectedGuardId = '';
  }
</script>

<div
  class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
  role="dialog"
  aria-modal="true"
  onclick={onClose}
  onkeydown={e => e.key === 'Escape' && onClose()}
>
  <div class="bg-slate-800 border border-slate-700 rounded-lg p-4 lg:p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto" onclick={e => e.stopPropagation()} onkeydown={e => e.stopPropagation()}>
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-white font-semibold">{site.name}</h2>
      <button onclick={onClose} class="text-slate-500 hover:text-white text-xl leading-none">&times;</button>
    </div>

    <p class="text-slate-400 text-xs mb-4">{site.address}</p>

    <div class="mb-5">
      <p class="text-slate-400 text-sm mb-2">Assigned Guards ({site.assignedGuardIds.length}/{site.requiredGuards})</p>
      {#if assignedGuards.length === 0}
        <p class="text-slate-600 text-sm">No guards assigned.</p>
      {:else}
        <div class="space-y-2">
          {#each assignedGuards as guard}
            <div class="flex items-center justify-between bg-slate-700/50 rounded px-3 py-2">
              <div>
                <span class="text-white text-sm">{guard.name}</span>
                <span class="text-slate-500 text-xs ml-2">{guard.badgeId}</span>
              </div>
              <div class="flex items-center gap-2">
                <StatusBadge status={guard.status} />
                <button
                  onclick={() => removeGuardFromSite(site.id, guard.id)}
                  class="text-slate-500 hover:text-red-400 text-sm ml-1"
                >Remove</button>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>

    <div class="flex gap-2">
      <select
        bind:value={selectedGuardId}
        class="flex-1 bg-slate-700 border border-slate-600 text-slate-300 rounded px-3 py-2 text-sm"
      >
        <option value="">Select a guard...</option>
        {#each availableGuards as guard}
          <option value={guard.id}>{guard.name} ({guard.badgeId})</option>
        {/each}
      </select>
      <button
        onclick={handleAssign}
        disabled={!selectedGuardId}
        class="px-4 py-2 rounded text-sm bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-colors"
      >
        Assign
      </button>
    </div>
  </div>
</div>
