<script>
  import StatusBadge from './StatusBadge.svelte';
  const { guard } = $props();
</script>

<div class="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
  <div class="flex items-center gap-3">
    <div class="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 text-sm font-bold">
      {guard.name[0]}
    </div>
    <div>
      <p class="text-white text-sm font-medium">{guard.name}</p>
      <p class="text-slate-500 text-xs">{guard.badgeId}</p>
    </div>
  </div>
  <div class="flex items-center gap-4 text-right">
    <span class="text-slate-400 text-xs hidden sm:block">{guard.zone}</span>
    <StatusBadge status={guard.status} />
  </div>
</div>
