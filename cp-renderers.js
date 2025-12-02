const Renderers = {
    voiceItem: (name, isActive) => `
        <button onclick="app.filterBy('${name}')" 
            class="w-full text-left px-4 py-2 text-sm rounded transition-all ${isActive ? 'bg-zinc-100 text-black font-bold' : 'text-zinc-500 hover:text-zinc-200'}">
            ${name}
        </button>`,
    insightCard: (i) => `
        <div class="mb-8 border-b border-zinc-900 pb-8">
            <div class="flex justify-between mb-2">
                <h3 class="text-xl font-bold text-zinc-100">${i.title}</h3>
                <span class="text-xs font-mono text-emerald-600">${i.voice}</span>
            </div>
            <p class="font-serif text-lg text-zinc-400 mb-4">${i.text}</p>
            <div class="flex gap-2">${(i.tags||[]).map(t=>`<span class="text-[10px] uppercase border border-zinc-800 px-2 rounded text-zinc-500">${t}</span>`).join('')}</div>
        </div>`,
    emptyState: () => `<div class="py-20 text-center opacity-50"><p class="text-zinc-600 italic">"Silence..."</p></div>`
};
