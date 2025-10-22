(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/components/magicui/particles.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Particles": (()=>Particles)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
function MousePosition() {
    _s();
    const [mousePosition, setMousePosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MousePosition.useEffect": ()=>{
            const handleMouseMove = {
                "MousePosition.useEffect.handleMouseMove": (event)=>{
                    setMousePosition({
                        x: event.clientX,
                        y: event.clientY
                    });
                }
            }["MousePosition.useEffect.handleMouseMove"];
            window.addEventListener("mousemove", handleMouseMove);
            return ({
                "MousePosition.useEffect": ()=>{
                    window.removeEventListener("mousemove", handleMouseMove);
                }
            })["MousePosition.useEffect"];
        }
    }["MousePosition.useEffect"], []);
    return mousePosition;
}
_s(MousePosition, "xsZ4oXLkOP0KnqTwAbN+/ZVPhrg=");
_c = MousePosition;
function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
        hex = hex.split("").map((char)=>char + char).join("");
    }
    const hexInt = parseInt(hex, 16);
    const red = hexInt >> 16 & 255;
    const green = hexInt >> 8 & 255;
    const blue = hexInt & 255;
    return [
        red,
        green,
        blue
    ];
}
const Particles = ({ className = "", quantity = 100, staticity = 50, ease = 50, size = 0.4, refresh = false, color = "#ffffff", vx = 0, vy = 0, ...props })=>{
    _s1();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const circles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const mousePosition = MousePosition();
    const mouse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const canvasSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        w: 0,
        h: 0
    });
    const dpr = ("TURBOPACK compile-time truthy", 1) ? window.devicePixelRatio : ("TURBOPACK unreachable", undefined);
    const rafID = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const resizeTimeout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Particles.useEffect": ()=>{
            if (canvasRef.current) {
                context.current = canvasRef.current.getContext("2d");
            }
            initCanvas();
            animate();
            const handleResize = {
                "Particles.useEffect.handleResize": ()=>{
                    if (resizeTimeout.current) {
                        clearTimeout(resizeTimeout.current);
                    }
                    resizeTimeout.current = setTimeout({
                        "Particles.useEffect.handleResize": ()=>{
                            initCanvas();
                        }
                    }["Particles.useEffect.handleResize"], 200);
                }
            }["Particles.useEffect.handleResize"];
            window.addEventListener("resize", handleResize);
            return ({
                "Particles.useEffect": ()=>{
                    if (rafID.current != null) {
                        window.cancelAnimationFrame(rafID.current);
                    }
                    if (resizeTimeout.current) {
                        clearTimeout(resizeTimeout.current);
                    }
                    window.removeEventListener("resize", handleResize);
                }
            })["Particles.useEffect"];
        }
    }["Particles.useEffect"], [
        color
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Particles.useEffect": ()=>{
            onMouseMove();
        }
    }["Particles.useEffect"], [
        mousePosition.x,
        mousePosition.y
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Particles.useEffect": ()=>{
            initCanvas();
        }
    }["Particles.useEffect"], [
        refresh
    ]);
    const initCanvas = ()=>{
        resizeCanvas();
        drawParticles();
    };
    const onMouseMove = ()=>{
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const { w, h } = canvasSize.current;
            const x = mousePosition.x - rect.left - w / 2;
            const y = mousePosition.y - rect.top - h / 2;
            const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
            if (inside) {
                mouse.current.x = x;
                mouse.current.y = y;
            }
        }
    };
    const resizeCanvas = ()=>{
        if (canvasContainerRef.current && canvasRef.current && context.current) {
            canvasSize.current.w = canvasContainerRef.current.offsetWidth;
            canvasSize.current.h = canvasContainerRef.current.offsetHeight;
            canvasRef.current.width = canvasSize.current.w * dpr;
            canvasRef.current.height = canvasSize.current.h * dpr;
            canvasRef.current.style.width = `${canvasSize.current.w}px`;
            canvasRef.current.style.height = `${canvasSize.current.h}px`;
            context.current.scale(dpr, dpr);
            // Clear existing particles and create new ones with exact quantity
            circles.current = [];
            for(let i = 0; i < quantity; i++){
                const circle = circleParams();
                drawCircle(circle);
            }
        }
    };
    const circleParams = ()=>{
        const x = Math.floor(Math.random() * canvasSize.current.w);
        const y = Math.floor(Math.random() * canvasSize.current.h);
        const translateX = 0;
        const translateY = 0;
        const pSize = Math.floor(Math.random() * 2) + size;
        const alpha = 0;
        const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
        const dx = (Math.random() - 0.5) * 0.1;
        const dy = (Math.random() - 0.5) * 0.1;
        const magnetism = 0.1 + Math.random() * 4;
        return {
            x,
            y,
            translateX,
            translateY,
            size: pSize,
            alpha,
            targetAlpha,
            dx,
            dy,
            magnetism
        };
    };
    const rgb = hexToRgb(color);
    const drawCircle = (circle, update = false)=>{
        if (context.current) {
            const { x, y, translateX, translateY, size, alpha } = circle;
            context.current.translate(translateX, translateY);
            context.current.beginPath();
            context.current.arc(x, y, size, 0, 2 * Math.PI);
            context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
            context.current.fill();
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
            if (!update) {
                circles.current.push(circle);
            }
        }
    };
    const clearContext = ()=>{
        if (context.current) {
            context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
        }
    };
    const drawParticles = ()=>{
        clearContext();
        const particleCount = quantity;
        for(let i = 0; i < particleCount; i++){
            const circle = circleParams();
            drawCircle(circle);
        }
    };
    const remapValue = (value, start1, end1, start2, end2)=>{
        const remapped = (value - start1) * (end2 - start2) / (end1 - start1) + start2;
        return remapped > 0 ? remapped : 0;
    };
    const animate = ()=>{
        clearContext();
        circles.current.forEach((circle, i)=>{
            // Handle the alpha value
            const edge = [
                circle.x + circle.translateX - circle.size,
                canvasSize.current.w - circle.x - circle.translateX - circle.size,
                circle.y + circle.translateY - circle.size,
                canvasSize.current.h - circle.y - circle.translateY - circle.size
            ];
            const closestEdge = edge.reduce((a, b)=>Math.min(a, b));
            const remapClosestEdge = parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));
            if (remapClosestEdge > 1) {
                circle.alpha += 0.02;
                if (circle.alpha > circle.targetAlpha) {
                    circle.alpha = circle.targetAlpha;
                }
            } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge;
            }
            circle.x += circle.dx + vx;
            circle.y += circle.dy + vy;
            circle.translateX += (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
            circle.translateY += (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;
            drawCircle(circle, true);
            // circle gets out of the canvas
            if (circle.x < -circle.size || circle.x > canvasSize.current.w + circle.size || circle.y < -circle.size || circle.y > canvasSize.current.h + circle.size) {
                // remove the circle from the array
                circles.current.splice(i, 1);
                // create a new circle
                const newCircle = circleParams();
                drawCircle(newCircle);
            }
        });
        rafID.current = window.requestAnimationFrame(animate);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pointer-events-none", className),
        ref: canvasContainerRef,
        "aria-hidden": "true",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            className: "size-full"
        }, void 0, false, {
            fileName: "[project]/components/magicui/particles.tsx",
            lineNumber: 310,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/magicui/particles.tsx",
        lineNumber: 304,
        columnNumber: 5
    }, this);
};
_s1(Particles, "kQytM4IwEsZEEZPcKoDJ19JXfoI=");
_c1 = Particles;
var _c, _c1;
__turbopack_context__.k.register(_c, "MousePosition");
__turbopack_context__.k.register(_c1, "Particles");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/magicui/aurora-text.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuroraText": (()=>AuroraText)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
const AuroraText = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"])(_c = ({ children, className = "", colors = [
    "#FF0080",
    "#7928CA",
    "#0070F3",
    "#38bdf8"
], speed = 1 })=>{
    const gradientStyle = {
        backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animationDuration: `${10 / speed}s`
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `relative inline-block ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/magicui/aurora-text.tsx",
                lineNumber: 30,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent",
                style: gradientStyle,
                "aria-hidden": "true",
                children: children
            }, void 0, false, {
                fileName: "[project]/components/magicui/aurora-text.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/magicui/aurora-text.tsx",
        lineNumber: 29,
        columnNumber: 7
    }, this);
});
_c1 = AuroraText;
AuroraText.displayName = "AuroraText";
var _c, _c1;
__turbopack_context__.k.register(_c, "AuroraText$memo");
__turbopack_context__.k.register(_c1, "AuroraText");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/magicui/typing-animation.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "TypingAnimation": (()=>TypingAnimation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function TypingAnimation({ children, className, duration = 100, delay = 0, as: Component = "div", startOnView = false, ...props }) {
    _s();
    const MotionComponent = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].create(Component, {
        forwardMotionProps: true
    });
    const [displayedText, setDisplayedText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const elementRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TypingAnimation.useEffect": ()=>{
            if (!startOnView) {
                const startTimeout = setTimeout({
                    "TypingAnimation.useEffect.startTimeout": ()=>{
                        setStarted(true);
                    }
                }["TypingAnimation.useEffect.startTimeout"], delay);
                return ({
                    "TypingAnimation.useEffect": ()=>clearTimeout(startTimeout)
                })["TypingAnimation.useEffect"];
            }
            const observer = new IntersectionObserver({
                "TypingAnimation.useEffect": ([entry])=>{
                    if (entry.isIntersecting) {
                        setTimeout({
                            "TypingAnimation.useEffect": ()=>{
                                setStarted(true);
                            }
                        }["TypingAnimation.useEffect"], delay);
                        observer.disconnect();
                    }
                }
            }["TypingAnimation.useEffect"], {
                threshold: 0.1
            });
            if (elementRef.current) {
                observer.observe(elementRef.current);
            }
            return ({
                "TypingAnimation.useEffect": ()=>observer.disconnect()
            })["TypingAnimation.useEffect"];
        }
    }["TypingAnimation.useEffect"], [
        delay,
        startOnView
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TypingAnimation.useEffect": ()=>{
            if (!started) return;
            let i = 0;
            const typingEffect = setInterval({
                "TypingAnimation.useEffect.typingEffect": ()=>{
                    if (i < children.length) {
                        setDisplayedText(children.substring(0, i + 1));
                        i++;
                    } else {
                        clearInterval(typingEffect);
                    }
                }
            }["TypingAnimation.useEffect.typingEffect"], duration);
            return ({
                "TypingAnimation.useEffect": ()=>{
                    clearInterval(typingEffect);
                }
            })["TypingAnimation.useEffect"];
        }
    }["TypingAnimation.useEffect"], [
        children,
        duration,
        started
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MotionComponent, {
        ref: elementRef,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-4xl font-bold leading-[5rem] tracking-[-0.02em]", className),
        ...props,
        children: displayedText
    }, void 0, false, {
        fileName: "[project]/components/magicui/typing-animation.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(TypingAnimation, "cgC9c70UhVmUWhDZFXHoDtEBlXs=");
_c = TypingAnimation;
var _c;
__turbopack_context__.k.register(_c, "TypingAnimation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=components_magicui_5072b277._.js.map