if (typeof Dexie === 'undefined') console.error("Dexie.js missing.");class CrossStore {
    constructor() {
        this.db = new Dexie("CrossPerspectivesDB");
        this.db.version(1).stores({ insights: '++id, voice, title, *tags, created_at' });
    }
    async init() {
        if (!this.db.isOpen()) await this.db.open();
        const count = await this.db.insights.count();
        if (count === 0) {
            await this.db.insights.add({
                voice: "René Girard", title: "The Scapegoat Mechanism",
                text: "Communities unify by channeling violence toward a single victim.",
                tags: ["Non-Violence"], created_at: new Date().toISOString()
            });
        }
    }
    async getAll() { return await this.db.insights.orderBy('created_at').reverse().toArray(); }
    async getByVoice(voice) { return await this.db.insights.where('voice').equals(voice).toArray(); }
    async add(data) { return await this.db.insights.add({ ...data, created_at: new Date().toISOString() }); }
}
window.store = new CrossStore();
