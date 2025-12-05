# Cross Perspectives Database Integration Guide

## Overview
Cross Perspectives uses IndexedDB via Dexie.js to store theological insights. This guide explains how to read from the database to create front-end interfaces.

## Database Schema

**Database Name:** `CrossPerspectivesDB`

**Store Name:** `insights`

**Schema Definition:**
```javascript
insights: '++id, voice, title, *tags, created_at'
```

**Field Descriptions:**
- `id` - Auto-incrementing primary key
- `voice` - String (indexed) - The theological voice/author
- `title` - String (indexed) - The insight title
- `tags` - Array of strings (multi-entry index) - Topic tags
- `created_at` - ISO date string (indexed) - Timestamp

## Data Structure

Each insight object has this structure:
```javascript
{
  id: 1,                                    // Auto-generated
  voice: "N. T. Wright",                    // Author/voice name
  title: "Victory over Powers",             // Insight title
  text: "The cross was the moment...",      // Main content (not indexed)
  tags: ["Atonement", "Justice"],          // Array of topic tags
  created_at: "2024-12-05T10:30:00.000Z"   // ISO timestamp
}
```

## Basic Setup

### 1. Include Dexie.js
```html
<script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script>
```

### 2. Initialize Database Connection
```javascript
class CrossStore {
    constructor() {
        this.db = new Dexie("CrossPerspectivesDB");
        this.db.version(1).stores({ 
            insights: '++id, voice, title, *tags, created_at' 
        });
    }
    
    async init() {
        if (!this.db.isOpen()) {
            await this.db.open();
        }
    }
    
    async getAll() {
        return await this.db.insights
            .orderBy('created_at')
            .reverse()
            .toArray();
    }
    
    async getByVoice(voice) {
        return await this.db.insights
            .where('voice')
            .equals(voice)
            .toArray();
    }
}

const store = new CrossStore();
```

### 3. Load Data in Your Application
```javascript
async function init() {
    // Initialize database connection
    await store.init();
    
    // Get all insights
    const allInsights = await store.getAll();
    
    // Extract unique voices from data
    const voices = [...new Set(allInsights.map(i => i.voice))].sort();
    
    // Extract unique tags from data
    const tagsSet = new Set();
    allInsights.forEach(insight => {
        if (insight.tags) {
            insight.tags.forEach(tag => tagsSet.add(tag));
        }
    });
    const tags = Array.from(tagsSet).sort();
    
    // Now render your UI with this data
    renderUI(allInsights, voices, tags);
}
```

## Common Query Patterns

### Get All Insights (Most Recent First)
```javascript
const insights = await store.db.insights
    .orderBy('created_at')
    .reverse()
    .toArray();
```

### Get Insights by Specific Voice
```javascript
const wrightInsights = await store.db.insights
    .where('voice')
    .equals('N. T. Wright')
    .toArray();
```

### Get Insights by Tag
```javascript
const atonementInsights = await store.db.insights
    .where('tags')
    .equals('Atonement')
    .toArray();
```

### Get Count of All Insights
```javascript
const total = await store.db.insights.count();
```

### Get Unique Voices (Sorted Alphabetically)
```javascript
const voices = await store.db.insights
    .orderBy('voice')
    .uniqueKeys();
voices.sort();
```

### Filter by Multiple Criteria (Client-Side)
```javascript
const all = await store.getAll();

// Filter by selected voices
const filtered = all.filter(insight => 
    selectedVoices.includes(insight.voice)
);

// Filter by selected tags
const filtered = all.filter(insight => 
    insight.tags && insight.tags.some(t => selectedTags.includes(t))
);

// Search text content
const filtered = all.filter(insight => {
    const searchText = `${insight.title} ${insight.text} ${insight.voice}`.toLowerCase();
    return searchText.includes(query.toLowerCase());
});
```

## Complete Example: Simple Reader
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cross Perspectives Reader</title>
    <script src="https://unpkg.com/dexie@latest/dist/dexie.js"></script>
</head>
<body>
    <div id="app">
        <h1>Cross Perspectives</h1>
        <select id="voiceFilter">
            <option value="">All Voices</option>
        </select>
        <div id="content"></div>
    </div>

    <script>
        // 1. Setup Database
        class CrossStore {
            constructor() {
                this.db = new Dexie("CrossPerspectivesDB");
                this.db.version(1).stores({ 
                    insights: '++id, voice, title, *tags, created_at' 
                });
            }
            async init() {
                if (!this.db.isOpen()) await this.db.open();
            }
            async getAll() {
                return await this.db.insights
                    .orderBy('created_at')
                    .reverse()
                    .toArray();
            }
        }

        const store = new CrossStore();

        // 2. Initialize App
        async function init() {
            await store.init();
            
            // Load all data
            const allInsights = await store.getAll();
            
            // Get unique voices for dropdown
            const voices = [...new Set(allInsights.map(i => i.voice))].sort();
            
            // Populate voice filter
            const select = document.getElementById('voiceFilter');
            voices.forEach(voice => {
                const option = document.createElement('option');
                option.value = voice;
                option.textContent = voice;
                select.appendChild(option);
            });
            
            // Render initial content
            render(allInsights);
            
            // Setup filter listener
            select.addEventListener('change', async (e) => {
                const filtered = e.target.value 
                    ? allInsights.filter(i => i.voice === e.target.value)
                    : allInsights;
                render(filtered);
            });
        }

        // 3. Render Content
        function render(insights) {
            const content = document.getElementById('content');
            
            if (insights.length === 0) {
                content.innerHTML = '<p>No insights found.</p>';
                return;
            }
            
            content.innerHTML = insights.map(insight => `
                <div class="card">
                    <h3>${insight.title}</h3>
                    <p><strong>${insight.voice}</strong></p>
                    <p>${insight.text}</p>
                    <div>
                        ${insight.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        }

        // 4. Start Application
        init();
    </script>
</body>
</html>
```

## Important Notes for AI Front-End Creation

### 1. **Always Read Dynamically**
Never hardcode voice names or tags. Always extract them from the database:
```javascript
// ✅ CORRECT - Dynamic
const voices = [...new Set(allInsights.map(i => i.voice))].sort();

// ❌ WRONG - Hardcoded
const voices = ["N. T. Wright", "Greg Boyd", ...];
```

### 2. **Handle Missing Data Gracefully**
Some insights may not have tags:
```javascript
// ✅ CORRECT
const tags = insight.tags && insight.tags.length > 0 
    ? insight.tags.map(t => `<span>${t}</span>`).join('')
    : '';

// ❌ WRONG - Will crash if tags is undefined
const tags = insight.tags.map(t => `<span>${t}</span>`).join('');
```

### 3. **Initialize Before Querying**
Always call `store.init()` before any database operations:
```javascript
async function init() {
    await store.init();  // REQUIRED FIRST
    const data = await store.getAll();  // Then query
}
```

### 4. **Sort Results Appropriately**
Default order is most recent first (reverse chronological):
```javascript
// Most recent first (default)
await store.db.insights.orderBy('created_at').reverse().toArray();

// Alphabetical by voice
const sorted = allInsights.sort((a, b) => a.voice.localeCompare(b.voice));

// Alphabetical by title
const sorted = allInsights.sort((a, b) => a.title.localeCompare(b.title));
```

### 5. **Voice Count and Stats**
Calculate statistics from the data:
```javascript
const total = insights.length;
const uniqueVoices = new Set(insights.map(i => i.voice)).size;
const uniqueTags = new Set(insights.flatMap(i => i.tags || [])).size;
```

## Testing Database Connection

Use browser console to verify database content:
```javascript
// Check if database exists
const db = new Dexie("CrossPerspectivesDB");
db.version(1).stores({ insights: '++id, voice, title, *tags, created_at' });
await db.open();

// Get count
const count = await db.insights.count();
console.log(`Total insights: ${count}`);

// Get all data
const all = await db.insights.toArray();
console.table(all);

// Get unique voices
const voices = await db.insights.orderBy('voice').uniqueKeys();
console.log('Voices:', voices);
```

## Database Persistence

- Data persists across page reloads
- Data is stored in the browser's IndexedDB
- Each browser/device has its own separate database
- Clearing browser data will delete the database

## Summary Checklist

When creating a new front-end:

- [ ] Include Dexie.js library
- [ ] Create CrossStore class with init() and query methods
- [ ] Call `await store.init()` before any queries
- [ ] Extract voices and tags dynamically from database
- [ ] Sort voices and tags alphabetically
- [ ] Handle cases where `tags` array might be empty or undefined
- [ ] Render data with appropriate filtering/sorting
- [ ] Test with browser console to verify database connection
