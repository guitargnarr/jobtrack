module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lib/parser.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// LinkedIn paste parser - converts relative dates to absolute dates
__turbopack_context__.s([
    "parseLinkedInPaste",
    ()=>parseLinkedInPaste
]);
function parseLinkedInPaste(rawText) {
    const lines = rawText.split('\n').filter((line)=>line.trim());
    const applications = [];
    for (const line of lines){
        // Try to parse in multiple formats
        // Format 1: "Company - Position - Location - Applied X ago"
        // Format 2: "Company - Position - Applied X ago"
        // Format 3: Just "Company - Position" (default to today)
        const parts = line.split(' - ').map((p)=>p.trim());
        if (parts.length < 2) continue; // Need at least company and position
        const company = parts[0];
        const position = parts[1];
        // Find "Applied X ago" part (if exists)
        const appliedIndex = parts.findIndex((p)=>p.toLowerCase().includes('applied'));
        let dateApplied;
        let location;
        if (appliedIndex !== -1) {
            // Has "Applied X ago"
            location = appliedIndex > 2 ? parts[2] : undefined;
            const appliedText = parts[appliedIndex];
            dateApplied = parseRelativeDate(appliedText);
        } else {
            // No "Applied" text, check if there's a location
            location = parts.length > 2 ? parts[2] : undefined;
            // Default to today
            dateApplied = new Date().toISOString().split('T')[0];
        }
        applications.push({
            company,
            position,
            location,
            dateApplied,
            source: 'LinkedIn'
        });
    }
    return applications;
}
function parseRelativeDate(text) {
    const today = new Date();
    // Extract number and unit from "Applied 2 days ago", "Applied 1 week ago", etc.
    const match = text.match(/(\d+)\s*(minute|min|hour|hr|day|week|wk|month|mo)s?\s*ago/i);
    if (!match) {
        // Default to today if can't parse
        return today.toISOString().split('T')[0];
    }
    const amount = parseInt(match[1]);
    const unit = match[2].toLowerCase();
    let daysAgo = 0;
    if (unit.startsWith('min')) {
        daysAgo = 0; // Same day
    } else if (unit.startsWith('hour') || unit === 'hr') {
        daysAgo = 0; // Same day
    } else if (unit.startsWith('day')) {
        daysAgo = amount;
    } else if (unit.startsWith('week') || unit === 'wk') {
        daysAgo = amount * 7;
    } else if (unit.startsWith('month') || unit === 'mo') {
        daysAgo = amount * 30;
    }
    const appliedDate = new Date(today);
    appliedDate.setDate(appliedDate.getDate() - daysAgo);
    return appliedDate.toISOString().split('T')[0];
}
}),
"[project]/app/api/import/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/parser.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const { rawText } = await request.json();
        if (!rawText) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No text provided'
            }, {
                status: 400
            });
        }
        // Parse the LinkedIn paste
        const parsed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$parser$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["parseLinkedInPaste"])(rawText);
        if (parsed.length === 0) {
            console.log('Parse failed. Raw text:', rawText);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No applications found. Format: "Company - Position - Applied X ago"',
                received: rawText.substring(0, 100)
            }, {
                status: 400
            });
        }
        // Convert to database format
        const applications = parsed.map((app)=>({
                company: app.company,
                position: app.position,
                location: app.location,
                date_applied: app.dateApplied,
                source: app.source,
                status: 'applied'
            }));
        // For MVP: Return parsed data (client will use localStorage)
        // Supabase integration can be added later
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            imported: applications.length,
            applications: applications
        });
    } catch (error) {
        console.error('Import error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to import applications'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f3bcc7aa._.js.map