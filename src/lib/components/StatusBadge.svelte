<script>
  const { status } = $props();

  const config = {
    'active':       { label: 'Active',       class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    'off-duty':     { label: 'Off Duty',      class: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
    'on-break':     { label: 'On Break',      class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    'covered':      { label: 'Covered',       class: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    'understaffed': { label: 'Understaffed',  class: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    'vacant':       { label: 'Vacant',        class: 'bg-red-500/20 text-red-400 border-red-500/30' },
  };

  const badge = $derived(config[status] ?? { label: status, class: 'bg-slate-500/20 text-slate-400 border-slate-500/30' });
</script>

<span class="inline-block px-2 py-0.5 rounded text-xs font-medium border {badge.class}">
  {badge.label}
</span>
