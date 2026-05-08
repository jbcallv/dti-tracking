<script>
  const { label, value, sub = '' } = $props();
</script>

<div class="bg-slate-800 border border-slate-700 rounded-lg p-5">
  <p class="text-slate-400 text-sm mb-1">{label}</p>
  <p class="text-3xl font-bold text-white">{value}</p>
  {#if sub}
    <p class="text-slate-500 text-xs mt-1">{sub}</p>
  {/if}
</div>
