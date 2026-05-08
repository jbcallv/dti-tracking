<script>
  import StatusBadge from './StatusBadge.svelte';
  const { team, guards } = $props();

  const members = $derived(guards.filter(g => team.memberIds.includes(g.id)));
</script>

<div class="bg-slate-800 border border-slate-700 rounded-lg p-5">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-white font-semibold">{team.name}</h3>
    <span class="text-slate-400 text-sm">{members.length} members</span>
  </div>
  <div class="space-y-2">
    {#each members as guard}
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 text-xs font-bold">
            {guard.name[0]}
          </div>
          <span class="text-slate-300 text-sm">{guard.name}</span>
          <span class="text-slate-600 text-xs">{guard.badgeId}</span>
        </div>
        <StatusBadge status={guard.status} />
      </div>
    {/each}
  </div>
</div>
