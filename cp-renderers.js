const Renderers = {
    voiceItem: (name, isActive) => `
        <button onclick="app.filterBy('${name}')" 
            class="w-full text-left px-3 py-2 text-xs font-medium rounded transition-all duration-200 border border-transparent
            ${isActive 
                ? 'bg-slate-800 text-emerald-400 border-slate-700 shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }">
            <span class="inline-block w-1.5 h-1.5 rounded-full mr-2 ${isActive ? 'bg-emerald-400' : 'bg-slate-600'}"></span>
            ${name}
        </button>`,

    insightCard: (i) => `
        <div class="bg-[#151F32] border border-slate-700/50 rounded-lg p-6 hover:border-slate-600 transition-colors shadow-sm group">
            
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-xl font-bold text-slate-100 mb-1 group-hover:text-emerald-400 transition-colors">${i.title}</h3>
                    <div class="flex items-center gap-2">
                        <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-500/80">
                            ${i.voice}
                        </span>
                        <span class="text-slate-600 text-[10px]">•</span>
                        <span class="text-[10px] font-mono text-slate-500">
                            ${new Date(i.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>

            <p class="font-serif text-[17px] leading-relaxed text-slate-300 mb-6 pl-1">
                ${i.text}
            </p>

            <div class="flex flex-wrap gap-2 pt-4 border-t border-slate-800/50">
                ${(i.tags || []).map(t => `
                    <span class="text-[10px] uppercase font-bold tracking-wide px-2 py-1 rounded bg-[#0B1120] border border-slate-700 text-slate-400 group-hover:text-slate-300 group-hover:border-slate-600 transition-colors">
                        ${t}
                    </span>
                `).join('')}
            </div>
        </div>`,

    emptyState: () => `
        <div class="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-lg bg-slate-900/30">
            <div class="text-slate-600 mb-2 text-4xl">∅</div>
            <p class="text-slate-500 font-medium text-sm">No insights found in this collection.</p>
        </div>`
};
