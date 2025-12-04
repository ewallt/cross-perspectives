const Renderers = {
    voiceItem: (name, isActive) => `
        <button onclick="app.filterBy('${name}')" 
            class="w-full text-left px-4 py-3 text-sm rounded-md transition-all duration-200 border border-transparent
            ${isActive 
                ? 'bg-slate-800 text-sky-100 font-bold border-slate-700 shadow-lg shadow-black/50 translate-x-1' 
                : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
            }">
            ${name}
        </button>`,

    insightCard: (i) => `
        <div class="mb-12 group relative">
            <div class="absolute -left-6 top-2 bottom-0 w-px bg-slate-800 group-last:hidden lg:-left-12"></div>
            
            <div class="flex flex-col gap-1 mb-3">
                <div class="flex justify-between items-baseline">
                    <h3 class="text-2xl font-bold text-slate-100 font-serif leading-tight group-hover:text-sky-200 transition-colors">
                        ${i.title}
                    </h3>
                    <span class="text-[10px] font-mono text-slate-500 whitespace-nowrap ml-4">
                        ${new Date(i.created_at).toLocaleDateString()}
                    </span>
                </div>
                <span class="text-xs font-bold tracking-widest uppercase text-cyan-500/80">
                    ${i.voice}
                </span>
            </div>

            <p class="font-serif text-lg text-slate-300 leading-relaxed mb-5 border-l-2 border-slate-800 pl-4 group-hover:border-cyan-500/30 transition-colors">
                ${i.text}
            </p>

            <div class="flex flex-wrap gap-2 pl-4">
                ${(i.tags || []).map(t => `
                    <span class="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 group-hover:border-cyan-900/50 group-hover:text-cyan-400 transition-colors">
                        ${t}
                    </span>
                `).join('')}
            </div>
        </div>`,

    emptyState: () => `
        <div class="py-32 text-center opacity-50 select-none">
            <div class="text-6xl mb-4 text-slate-800">❦</div>
            <p class="text-slate-500 font-serif italic text-xl">"Select a voice from the archive..."</p>
        </div>`
};
