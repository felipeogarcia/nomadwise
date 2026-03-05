import { i as ArrowLeft, n as SquarePen, r as EllipsisVertical, t as Textarea } from "./textarea-DD0bJhgK.js";
import { a as SelectTrigger, c as clamp, i as SelectItem, l as number, n as Select, o as SelectValue, r as SelectContent, s as usePrevious, t as Badge, u as Plus } from "./badge-h1FfoPLL.js";
import { t as MapPin } from "./map-pin-1etKIf2K.js";
import { t as Star } from "./star-D5FzvcXN.js";
import { t as Tent } from "./tent-DA12TeIY.js";
import { A as DropdownMenuTrigger, At as Link, Bt as __toESM, C as Input, D as DropdownMenuItem, Dt as composeEventHandlers, E as DropdownMenuContent, Et as useComposedRefs, F as createRovingFocusGroupScope, H as useOvernightStore, Lt as require_react, N as Item, P as Root$2, Pt as useParams, R as useDirection, T as DropdownMenu, Tt as require_jsx_runtime, bt as Primitive, c as SheetDescription, dt as cva, et as useSize, jt as Navigate, l as SheetHeader, mt as useControllableState, nt as cn, o as Sheet, rt as formatCurrency, s as SheetContent, u as SheetTitle, ut as createLucideIcon, wt as createContextScope, xt as createCollection, z as Button } from "./index-AWciCX9O.js";
import { a as FormItem, d as boolean, g as a, h as string, i as FormField, m as object, n as FormControl, o as FormLabel, p as number$1, s as FormMessage, t as Form, u as array, v as useForm } from "./form-b3NvORVd.js";
import { t as format } from "./format-C94UVCH7.js";
import { t as Switch } from "./switch-Ci6PIf-r.js";
import { n as ScrollArea, r as useTrips, t as ptBR } from "./pt-BR-CDqrU7XZ.js";
var Droplet = createLucideIcon("droplet", [["path", {
	d: "M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",
	key: "c7niix"
}]]);
var Shield = createLucideIcon("shield", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}]]);
var Trash = createLucideIcon("trash", [
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]);
var Wifi = createLucideIcon("wifi", [
	["path", {
		d: "M12 20h.01",
		key: "zekei9"
	}],
	["path", {
		d: "M2 8.82a15 15 0 0 1 20 0",
		key: "dnpr2z"
	}],
	["path", {
		d: "M5 12.859a10 10 0 0 1 14 0",
		key: "1x1e6c"
	}],
	["path", {
		d: "M8.5 16.429a5 5 0 0 1 7 0",
		key: "1bycff"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function OvernightMap({ tripId }) {
	const mapRef = (0, import_react.useRef)(null);
	const mapInstanceRef = (0, import_react.useRef)(null);
	const [isLeafletLoaded, setIsLeafletLoaded] = (0, import_react.useState)(false);
	const { overnights } = useOvernightStore();
	const tripOvernights = overnights.filter((o) => o.tripId === tripId && typeof o.lat === "number" && typeof o.lng === "number");
	(0, import_react.useEffect)(() => {
		if (window.L) {
			setIsLeafletLoaded(true);
			return;
		}
		const css = document.createElement("link");
		css.rel = "stylesheet";
		css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
		document.head.appendChild(css);
		const script = document.createElement("script");
		script.id = "leaflet-script";
		script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
		script.async = true;
		script.onload = () => setIsLeafletLoaded(true);
		document.head.appendChild(script);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isLeafletLoaded || !mapRef.current) return;
		const L = window.L;
		if (!L) return;
		if (!mapInstanceRef.current) {
			mapInstanceRef.current = L.map(mapRef.current).setView([-15.7801, -47.9292], 4);
			L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { attribution: "&copy; OpenStreetMap contributors" }).addTo(mapInstanceRef.current);
		}
		const map = mapInstanceRef.current;
		map.eachLayer((layer) => {
			if (layer instanceof L.Marker) map.removeLayer(layer);
		});
		if (tripOvernights.length === 0) return;
		const bounds = L.latLngBounds();
		const customIcon = L.divIcon({
			html: `<div class="bg-background rounded-full p-1.5 shadow-md border border-primary/40 flex items-center justify-center text-primary hover:scale-110 transition-transform cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary fill-primary/10"><path d="M19 20 10 4"/><path d="m5 20 9-16"/><path d="M3 20h18"/><path d="m12 15-3 5"/><path d="m12 15 3 5"/></svg></div>`,
			className: "",
			iconSize: [32, 32],
			iconAnchor: [16, 16],
			popupAnchor: [0, -16]
		});
		tripOvernights.forEach((o) => {
			if (o.lat === void 0 || o.lng === void 0) return;
			const marker = L.marker([o.lat, o.lng], { icon: customIcon }).addTo(map);
			bounds.extend([o.lat, o.lng]);
			const costStr = o.cost > 0 ? `R$ ${o.cost.toFixed(2)}` : "Gratuito";
			const popupContent = `
        <div class="p-1 min-w-[150px] font-sans">
          <h3 class="font-bold text-sm mb-0.5">${o.name}</h3>
          <p class="text-xs text-muted-foreground mb-2 capitalize">${o.type}</p>
          <div class="flex justify-between items-center">
            <span class="text-xs font-semibold">${costStr}</span>
            <span class="text-yellow-500 text-xs font-medium flex items-center">★ ${o.rating}</span>
          </div>
        </div>
      `;
			marker.bindPopup(popupContent);
		});
		if (tripOvernights.length > 0) map.fitBounds(bounds, {
			padding: [50, 50],
			maxZoom: 14
		});
	}, [isLeafletLoaded, tripOvernights]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full h-full relative bg-muted/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { dangerouslySetInnerHTML: { __html: `
        .leaflet-pane { z-index: 10 !important; }
        .leaflet-top, .leaflet-bottom { z-index: 10 !important; }
        .leaflet-popup-content-wrapper { border-radius: 0.5rem; background: hsl(var(--background)); color: hsl(var(--foreground)); border: 1px solid hsl(var(--border)); }
        .leaflet-popup-tip { background: hsl(var(--background)); border: 1px solid hsl(var(--border)); }
        .leaflet-container { font-family: inherit; }
      ` } }),
			!isLeafletLoaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground text-sm font-medium animate-pulse",
					children: "Carregando mapa interativo..."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: mapRef,
				className: "w-full h-full z-0"
			})
		]
	});
}
function OvernightEmptyState({ onAdd }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 flex flex-col items-center justify-center p-8 text-center animate-fade-in bg-muted/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-16 w-16 bg-background border rounded-full flex items-center justify-center mb-5 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tent, { className: "h-8 w-8 text-muted-foreground opacity-60" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold mb-2",
				children: "Nenhum pernoite registrado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-sm max-w-sm mb-6 leading-relaxed",
				children: "Acompanhe onde você dormiu, os custos, os serviços disponíveis e a qualidade de cada local durante a viagem."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: onAdd,
				className: "shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-2" }), " Registrar pernoite"]
			})
		]
	});
}
function OvernightList({ tripId, onEdit, onAdd }) {
	const { overnights, deleteOvernight } = useOvernightStore();
	const tripOvernights = overnights.filter((o) => o.tripId === tripId).sort((a$1, b) => new Date(b.checkinDate).getTime() - new Date(a$1.checkinDate).getTime());
	if (tripOvernights.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvernightEmptyState, { onAdd });
	const getAmenityIcon = (amenity) => {
		switch (amenity) {
			case "wifi": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "h-3 w-3 mr-1" });
			case "water": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "h-3 w-3 mr-1" });
			case "security": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3 w-3 mr-1" });
			default: return null;
		}
	};
	const translateAmenity = (amenity) => {
		switch (amenity) {
			case "wifi": return "Wi-Fi";
			case "water": return "Água";
			case "security": return "Segurança";
			default: return amenity;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full bg-muted/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 py-3 border-b bg-background flex justify-between items-center shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "font-semibold text-foreground flex items-center gap-2",
				children: ["Histórico ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					children: tripOvernights.length
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
			className: "flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 space-y-4",
				children: tripOvernights.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-background border rounded-lg p-4 shadow-sm group transition-all hover:border-primary/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "font-semibold text-base flex items-center gap-2",
								children: [o.name, o.isPublic && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									className: "text-[10px] h-5 px-1.5 font-medium border-primary/30 text-primary",
									children: "Público"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground capitalize flex items-center gap-1 mt-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
									" ",
									o.type
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "h-8 w-8 -mr-2 -mt-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-4 w-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => onEdit(o),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4 mr-2" }), " Editar Detalhes"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => deleteOvernight(o.id),
									className: "text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, { className: "h-4 w-4 mr-2" }), " Remover Pernoite"]
								})]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 text-sm mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center text-muted-foreground font-medium",
								children: [format(new Date(o.checkinDate), "dd MMM yy", { locale: ptBR }), o.checkoutDate && ` - ${format(new Date(o.checkoutDate), "dd MMM yy", { locale: ptBR })}`]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center font-semibold",
								children: o.cost > 0 ? formatCurrency(o.cost) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-emerald-600 dark:text-emerald-500",
									children: "Gratuito"
								})
							})]
						}),
						o.rating > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center mb-3",
							children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-3.5 w-3.5 ${i < o.rating ? "text-yellow-500 fill-yellow-500" : "text-muted border-muted-foreground/30"}` }, i))
						}),
						o.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground line-clamp-2 mb-3 bg-muted/40 p-2.5 rounded-md italic border border-border/50",
							children: [
								"\"",
								o.notes,
								"\""
							]
						}),
						o.amenities && o.amenities.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5 mt-2",
							children: o.amenities.map((a$1) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "secondary",
								className: "text-[10px] font-medium px-2 py-0.5 bg-muted",
								children: [
									getAmenityIcon(a$1),
									" ",
									translateAmenity(a$1)
								]
							}, a$1))
						})
					]
				}, o.id))
			})
		})]
	});
}
var PAGE_KEYS = ["PageUp", "PageDown"];
var ARROW_KEYS = [
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight"
];
var BACK_KEYS = {
	"from-left": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-right": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowRight"
	],
	"from-bottom": [
		"Home",
		"PageDown",
		"ArrowDown",
		"ArrowLeft"
	],
	"from-top": [
		"Home",
		"PageDown",
		"ArrowUp",
		"ArrowLeft"
	]
};
var SLIDER_NAME = "Slider";
var [Collection, useCollection, createCollectionScope] = createCollection(SLIDER_NAME);
var [createSliderContext, createSliderScope] = createContextScope(SLIDER_NAME, [createCollectionScope]);
var [SliderProvider, useSliderContext] = createSliderContext(SLIDER_NAME);
var Slider$1 = import_react.forwardRef((props, forwardedRef) => {
	const { name, min = 0, max = 100, step = 1, orientation = "horizontal", disabled = false, minStepsBetweenThumbs = 0, defaultValue = [min], value, onValueChange = () => {}, onValueCommit = () => {}, inverted = false, form, ...sliderProps } = props;
	const thumbRefs = import_react.useRef(/* @__PURE__ */ new Set());
	const valueIndexToChangeRef = import_react.useRef(0);
	const SliderOrientation = orientation === "horizontal" ? SliderHorizontal : SliderVertical;
	const [values = [], setValues] = useControllableState({
		prop: value,
		defaultProp: defaultValue,
		onChange: (value2) => {
			[...thumbRefs.current][valueIndexToChangeRef.current]?.focus();
			onValueChange(value2);
		}
	});
	const valuesBeforeSlideStartRef = import_react.useRef(values);
	function handleSlideStart(value2) {
		updateValues(value2, getClosestValueIndex(values, value2));
	}
	function handleSlideMove(value2) {
		updateValues(value2, valueIndexToChangeRef.current);
	}
	function handleSlideEnd() {
		const prevValue = valuesBeforeSlideStartRef.current[valueIndexToChangeRef.current];
		if (values[valueIndexToChangeRef.current] !== prevValue) onValueCommit(values);
	}
	function updateValues(value2, atIndex, { commit } = { commit: false }) {
		const decimalCount = getDecimalCount(step);
		const nextValue = clamp(roundValue(Math.round((value2 - min) / step) * step + min, decimalCount), [min, max]);
		setValues((prevValues = []) => {
			const nextValues = getNextSortedValues(prevValues, nextValue, atIndex);
			if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs * step)) {
				valueIndexToChangeRef.current = nextValues.indexOf(nextValue);
				const hasChanged = String(nextValues) !== String(prevValues);
				if (hasChanged && commit) onValueCommit(nextValues);
				return hasChanged ? nextValues : prevValues;
			} else return prevValues;
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderProvider, {
		scope: props.__scopeSlider,
		name,
		disabled,
		min,
		max,
		valueIndexToChangeRef,
		thumbs: thumbRefs.current,
		values,
		orientation,
		form,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Provider, {
			scope: props.__scopeSlider,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.Slot, {
				scope: props.__scopeSlider,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderOrientation, {
					"aria-disabled": disabled,
					"data-disabled": disabled ? "" : void 0,
					...sliderProps,
					ref: forwardedRef,
					onPointerDown: composeEventHandlers(sliderProps.onPointerDown, () => {
						if (!disabled) valuesBeforeSlideStartRef.current = values;
					}),
					min,
					max,
					inverted,
					onSlideStart: disabled ? void 0 : handleSlideStart,
					onSlideMove: disabled ? void 0 : handleSlideMove,
					onSlideEnd: disabled ? void 0 : handleSlideEnd,
					onHomeKeyDown: () => !disabled && updateValues(min, 0, { commit: true }),
					onEndKeyDown: () => !disabled && updateValues(max, values.length - 1, { commit: true }),
					onStepKeyDown: ({ event, direction: stepDirection }) => {
						if (!disabled) {
							const multiplier = PAGE_KEYS.includes(event.key) || event.shiftKey && ARROW_KEYS.includes(event.key) ? 10 : 1;
							const atIndex = valueIndexToChangeRef.current;
							const value2 = values[atIndex];
							updateValues(value2 + step * multiplier * stepDirection, atIndex, { commit: true });
						}
					}
				})
			})
		})
	});
});
Slider$1.displayName = SLIDER_NAME;
var [SliderOrientationProvider, useSliderOrientationContext] = createSliderContext(SLIDER_NAME, {
	startEdge: "left",
	endEdge: "right",
	size: "width",
	direction: 1
});
var SliderHorizontal = import_react.forwardRef((props, forwardedRef) => {
	const { min, max, dir, inverted, onSlideStart, onSlideMove, onSlideEnd, onStepKeyDown, ...sliderProps } = props;
	const [slider, setSlider] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setSlider(node));
	const rectRef = import_react.useRef(void 0);
	const direction = useDirection(dir);
	const isDirectionLTR = direction === "ltr";
	const isSlidingFromLeft = isDirectionLTR && !inverted || !isDirectionLTR && inverted;
	function getValueFromPointer(pointerPosition) {
		const rect = rectRef.current || slider.getBoundingClientRect();
		const value = linearScale([0, rect.width], isSlidingFromLeft ? [min, max] : [max, min]);
		rectRef.current = rect;
		return value(pointerPosition - rect.left);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderOrientationProvider, {
		scope: props.__scopeSlider,
		startEdge: isSlidingFromLeft ? "left" : "right",
		endEdge: isSlidingFromLeft ? "right" : "left",
		direction: isSlidingFromLeft ? 1 : -1,
		size: "width",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderImpl, {
			dir: direction,
			"data-orientation": "horizontal",
			...sliderProps,
			ref: composedRefs,
			style: {
				...sliderProps.style,
				["--radix-slider-thumb-transform"]: "translateX(-50%)"
			},
			onSlideStart: (event) => {
				const value = getValueFromPointer(event.clientX);
				onSlideStart?.(value);
			},
			onSlideMove: (event) => {
				const value = getValueFromPointer(event.clientX);
				onSlideMove?.(value);
			},
			onSlideEnd: () => {
				rectRef.current = void 0;
				onSlideEnd?.();
			},
			onStepKeyDown: (event) => {
				const isBackKey = BACK_KEYS[isSlidingFromLeft ? "from-left" : "from-right"].includes(event.key);
				onStepKeyDown?.({
					event,
					direction: isBackKey ? -1 : 1
				});
			}
		})
	});
});
var SliderVertical = import_react.forwardRef((props, forwardedRef) => {
	const { min, max, inverted, onSlideStart, onSlideMove, onSlideEnd, onStepKeyDown, ...sliderProps } = props;
	const sliderRef = import_react.useRef(null);
	const ref = useComposedRefs(forwardedRef, sliderRef);
	const rectRef = import_react.useRef(void 0);
	const isSlidingFromBottom = !inverted;
	function getValueFromPointer(pointerPosition) {
		const rect = rectRef.current || sliderRef.current.getBoundingClientRect();
		const value = linearScale([0, rect.height], isSlidingFromBottom ? [max, min] : [min, max]);
		rectRef.current = rect;
		return value(pointerPosition - rect.top);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderOrientationProvider, {
		scope: props.__scopeSlider,
		startEdge: isSlidingFromBottom ? "bottom" : "top",
		endEdge: isSlidingFromBottom ? "top" : "bottom",
		size: "height",
		direction: isSlidingFromBottom ? 1 : -1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderImpl, {
			"data-orientation": "vertical",
			...sliderProps,
			ref,
			style: {
				...sliderProps.style,
				["--radix-slider-thumb-transform"]: "translateY(50%)"
			},
			onSlideStart: (event) => {
				const value = getValueFromPointer(event.clientY);
				onSlideStart?.(value);
			},
			onSlideMove: (event) => {
				const value = getValueFromPointer(event.clientY);
				onSlideMove?.(value);
			},
			onSlideEnd: () => {
				rectRef.current = void 0;
				onSlideEnd?.();
			},
			onStepKeyDown: (event) => {
				const isBackKey = BACK_KEYS[isSlidingFromBottom ? "from-bottom" : "from-top"].includes(event.key);
				onStepKeyDown?.({
					event,
					direction: isBackKey ? -1 : 1
				});
			}
		})
	});
});
var SliderImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSlider, onSlideStart, onSlideMove, onSlideEnd, onHomeKeyDown, onEndKeyDown, onStepKeyDown, ...sliderProps } = props;
	const context = useSliderContext(SLIDER_NAME, __scopeSlider);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		...sliderProps,
		ref: forwardedRef,
		onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
			if (event.key === "Home") {
				onHomeKeyDown(event);
				event.preventDefault();
			} else if (event.key === "End") {
				onEndKeyDown(event);
				event.preventDefault();
			} else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
				onStepKeyDown(event);
				event.preventDefault();
			}
		}),
		onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
			const target = event.target;
			target.setPointerCapture(event.pointerId);
			event.preventDefault();
			if (context.thumbs.has(target)) target.focus();
			else onSlideStart(event);
		}),
		onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
			if (event.target.hasPointerCapture(event.pointerId)) onSlideMove(event);
		}),
		onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
			const target = event.target;
			if (target.hasPointerCapture(event.pointerId)) {
				target.releasePointerCapture(event.pointerId);
				onSlideEnd(event);
			}
		})
	});
});
var TRACK_NAME = "SliderTrack";
var SliderTrack = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSlider, ...trackProps } = props;
	const context = useSliderContext(TRACK_NAME, __scopeSlider);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-disabled": context.disabled ? "" : void 0,
		"data-orientation": context.orientation,
		...trackProps,
		ref: forwardedRef
	});
});
SliderTrack.displayName = TRACK_NAME;
var RANGE_NAME = "SliderRange";
var SliderRange = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSlider, ...rangeProps } = props;
	const context = useSliderContext(RANGE_NAME, __scopeSlider);
	const orientation = useSliderOrientationContext(RANGE_NAME, __scopeSlider);
	const composedRefs = useComposedRefs(forwardedRef, import_react.useRef(null));
	const valuesCount = context.values.length;
	const percentages = context.values.map((value) => convertValueToPercentage(value, context.min, context.max));
	const offsetStart = valuesCount > 1 ? Math.min(...percentages) : 0;
	const offsetEnd = 100 - Math.max(...percentages);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		"data-orientation": context.orientation,
		"data-disabled": context.disabled ? "" : void 0,
		...rangeProps,
		ref: composedRefs,
		style: {
			...props.style,
			[orientation.startEdge]: offsetStart + "%",
			[orientation.endEdge]: offsetEnd + "%"
		}
	});
});
SliderRange.displayName = RANGE_NAME;
var THUMB_NAME = "SliderThumb";
var SliderThumb = import_react.forwardRef((props, forwardedRef) => {
	const getItems = useCollection(props.__scopeSlider);
	const [thumb, setThumb] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setThumb(node));
	const index = import_react.useMemo(() => thumb ? getItems().findIndex((item) => item.ref.current === thumb) : -1, [getItems, thumb]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumbImpl, {
		...props,
		ref: composedRefs,
		index
	});
});
var SliderThumbImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeSlider, index, name, ...thumbProps } = props;
	const context = useSliderContext(THUMB_NAME, __scopeSlider);
	const orientation = useSliderOrientationContext(THUMB_NAME, __scopeSlider);
	const [thumb, setThumb] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, (node) => setThumb(node));
	const isFormControl = thumb ? context.form || !!thumb.closest("form") : true;
	const size = useSize(thumb);
	const value = context.values[index];
	const percent = value === void 0 ? 0 : convertValueToPercentage(value, context.min, context.max);
	const label = getLabel(index, context.values.length);
	const orientationSize = size?.[orientation.size];
	const thumbInBoundsOffset = orientationSize ? getThumbInBoundsOffset(orientationSize, percent, orientation.direction) : 0;
	import_react.useEffect(() => {
		if (thumb) {
			context.thumbs.add(thumb);
			return () => {
				context.thumbs.delete(thumb);
			};
		}
	}, [thumb, context.thumbs]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		style: {
			transform: "var(--radix-slider-thumb-transform)",
			position: "absolute",
			[orientation.startEdge]: `calc(${percent}% + ${thumbInBoundsOffset}px)`
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collection.ItemSlot, {
			scope: props.__scopeSlider,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
				role: "slider",
				"aria-label": props["aria-label"] || label,
				"aria-valuemin": context.min,
				"aria-valuenow": value,
				"aria-valuemax": context.max,
				"aria-orientation": context.orientation,
				"data-orientation": context.orientation,
				"data-disabled": context.disabled ? "" : void 0,
				tabIndex: context.disabled ? void 0 : 0,
				...thumbProps,
				ref: composedRefs,
				style: value === void 0 ? { display: "none" } : props.style,
				onFocus: composeEventHandlers(props.onFocus, () => {
					context.valueIndexToChangeRef.current = index;
				})
			})
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderBubbleInput, {
			name: name ?? (context.name ? context.name + (context.values.length > 1 ? "[]" : "") : void 0),
			form: context.form,
			value
		}, index)]
	});
});
SliderThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "RadioBubbleInput";
var SliderBubbleInput = import_react.forwardRef(({ __scopeSlider, value, ...props }, forwardedRef) => {
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(ref, forwardedRef);
	const prevValue = usePrevious(value);
	import_react.useEffect(() => {
		const input = ref.current;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setValue = Object.getOwnPropertyDescriptor(inputProto, "value").set;
		if (prevValue !== value && setValue) {
			const event = new Event("input", { bubbles: true });
			setValue.call(input, value);
			input.dispatchEvent(event);
		}
	}, [prevValue, value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		style: { display: "none" },
		...props,
		ref: composedRefs,
		defaultValue: value
	});
});
SliderBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getNextSortedValues(prevValues = [], nextValue, atIndex) {
	const nextValues = [...prevValues];
	nextValues[atIndex] = nextValue;
	return nextValues.sort((a$1, b) => a$1 - b);
}
function convertValueToPercentage(value, min, max) {
	return clamp(100 / (max - min) * (value - min), [0, 100]);
}
function getLabel(index, totalValues) {
	if (totalValues > 2) return `Value ${index + 1} of ${totalValues}`;
	else if (totalValues === 2) return ["Minimum", "Maximum"][index];
	else return;
}
function getClosestValueIndex(values, nextValue) {
	if (values.length === 1) return 0;
	const distances = values.map((value) => Math.abs(value - nextValue));
	const closestDistance = Math.min(...distances);
	return distances.indexOf(closestDistance);
}
function getThumbInBoundsOffset(width, left, direction) {
	const halfWidth = width / 2;
	return (halfWidth - linearScale([0, 50], [0, halfWidth])(left) * direction) * direction;
}
function getStepsBetweenValues(values) {
	return values.slice(0, -1).map((value, index) => values[index + 1] - value);
}
function hasMinStepsBetweenValues(values, minStepsBetweenValues) {
	if (minStepsBetweenValues > 0) {
		const stepsBetweenValues = getStepsBetweenValues(values);
		return Math.min(...stepsBetweenValues) >= minStepsBetweenValues;
	}
	return true;
}
function linearScale(input, output) {
	return (value) => {
		if (input[0] === input[1] || output[0] === output[1]) return output[0];
		const ratio = (output[1] - output[0]) / (input[1] - input[0]);
		return output[0] + ratio * (value - input[0]);
	};
}
function getDecimalCount(value) {
	return (String(value).split(".")[1] || "").length;
}
function roundValue(value, decimalCount) {
	const rounder = Math.pow(10, decimalCount);
	return Math.round(value * rounder) / rounder;
}
var Root$1 = Slider$1;
var Track = SliderTrack;
var Range = SliderRange;
var Thumb = SliderThumb;
var Slider = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root$1, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Track, {
		className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Range, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thumb, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = Root$1.displayName;
var NAME = "Toggle";
var Toggle$1 = import_react.forwardRef((props, forwardedRef) => {
	const { pressed: pressedProp, defaultPressed, onPressedChange, ...buttonProps } = props;
	const [pressed, setPressed] = useControllableState({
		prop: pressedProp,
		onChange: onPressedChange,
		defaultProp: defaultPressed ?? false,
		caller: NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-pressed": pressed,
		"data-state": pressed ? "on" : "off",
		"data-disabled": props.disabled ? "" : void 0,
		...buttonProps,
		ref: forwardedRef,
		onClick: composeEventHandlers(props.onClick, () => {
			if (!props.disabled) setPressed(!pressed);
		})
	});
});
Toggle$1.displayName = NAME;
var Root = Toggle$1;
var TOGGLE_GROUP_NAME = "ToggleGroup";
var [createToggleGroupContext, createToggleGroupScope] = createContextScope(TOGGLE_GROUP_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var ToggleGroup$1 = import_react.forwardRef((props, forwardedRef) => {
	const { type, ...toggleGroupProps } = props;
	if (type === "single") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImplSingle, {
		...toggleGroupProps,
		ref: forwardedRef
	});
	if (type === "multiple") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImplMultiple, {
		...toggleGroupProps,
		ref: forwardedRef
	});
	throw new Error(`Missing prop \`type\` expected on \`${TOGGLE_GROUP_NAME}\``);
});
ToggleGroup$1.displayName = TOGGLE_GROUP_NAME;
var [ToggleGroupValueProvider, useToggleGroupValueContext] = createToggleGroupContext(TOGGLE_GROUP_NAME);
var ToggleGroupImplSingle = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, ...toggleGroupSingleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? "",
		onChange: onValueChange,
		caller: TOGGLE_GROUP_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupValueProvider, {
		scope: props.__scopeToggleGroup,
		type: "single",
		value: import_react.useMemo(() => value ? [value] : [], [value]),
		onItemActivate: setValue,
		onItemDeactivate: import_react.useCallback(() => setValue(""), [setValue]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImpl, {
			...toggleGroupSingleProps,
			ref: forwardedRef
		})
	});
});
var ToggleGroupImplMultiple = import_react.forwardRef((props, forwardedRef) => {
	const { value: valueProp, defaultValue, onValueChange = () => {}, ...toggleGroupMultipleProps } = props;
	const [value, setValue] = useControllableState({
		prop: valueProp,
		defaultProp: defaultValue ?? [],
		onChange: onValueChange,
		caller: TOGGLE_GROUP_NAME
	});
	const handleButtonActivate = import_react.useCallback((itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]), [setValue]);
	const handleButtonDeactivate = import_react.useCallback((itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)), [setValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupValueProvider, {
		scope: props.__scopeToggleGroup,
		type: "multiple",
		value,
		onItemActivate: handleButtonActivate,
		onItemDeactivate: handleButtonDeactivate,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupImpl, {
			...toggleGroupMultipleProps,
			ref: forwardedRef
		})
	});
});
ToggleGroup$1.displayName = TOGGLE_GROUP_NAME;
var [ToggleGroupContext$1, useToggleGroupContext] = createToggleGroupContext(TOGGLE_GROUP_NAME);
var ToggleGroupImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeToggleGroup, disabled = false, rovingFocus = true, orientation, dir, loop = true, ...toggleGroupProps } = props;
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeToggleGroup);
	const direction = useDirection(dir);
	const commonProps = {
		role: "group",
		dir: direction,
		...toggleGroupProps
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupContext$1, {
		scope: __scopeToggleGroup,
		rovingFocus,
		disabled,
		children: rovingFocus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$2, {
			asChild: true,
			...rovingFocusGroupScope,
			orientation,
			dir: direction,
			loop,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				...commonProps,
				ref: forwardedRef
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			...commonProps,
			ref: forwardedRef
		})
	});
});
var ITEM_NAME = "ToggleGroupItem";
var ToggleGroupItem$1 = import_react.forwardRef((props, forwardedRef) => {
	const valueContext = useToggleGroupValueContext(ITEM_NAME, props.__scopeToggleGroup);
	const context = useToggleGroupContext(ITEM_NAME, props.__scopeToggleGroup);
	const rovingFocusGroupScope = useRovingFocusGroupScope(props.__scopeToggleGroup);
	const pressed = valueContext.value.includes(props.value);
	const disabled = context.disabled || props.disabled;
	const commonProps = {
		...props,
		pressed,
		disabled
	};
	const ref = import_react.useRef(null);
	return context.rovingFocus ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: pressed,
		ref,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItemImpl, {
			...commonProps,
			ref: forwardedRef
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupItemImpl, {
		...commonProps,
		ref: forwardedRef
	});
});
ToggleGroupItem$1.displayName = ITEM_NAME;
var ToggleGroupItemImpl = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeToggleGroup, value, ...itemProps } = props;
	const valueContext = useToggleGroupValueContext(ITEM_NAME, __scopeToggleGroup);
	const singleProps = {
		role: "radio",
		"aria-checked": props.pressed,
		"aria-pressed": void 0
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle$1, {
		...valueContext.type === "single" ? singleProps : void 0,
		...itemProps,
		ref: forwardedRef,
		onPressedChange: (pressed) => {
			if (pressed) valueContext.onItemActivate(value);
			else valueContext.onItemDeactivate(value);
		}
	});
});
var Root2 = ToggleGroup$1;
var Item2 = ToggleGroupItem$1;
var toggleVariants = cva("inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2", {
	variants: {
		variant: {
			default: "bg-transparent",
			outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
		},
		size: {
			default: "h-10 px-3 min-w-10",
			sm: "h-9 px-2.5 min-w-9",
			lg: "h-11 px-5 min-w-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Toggle = import_react.forwardRef(({ className, variant, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(toggleVariants({
		variant,
		size,
		className
	})),
	...props
}));
Toggle.displayName = Root.displayName;
var ToggleGroupContext = import_react.createContext({
	size: "default",
	variant: "default"
});
var ToggleGroup = import_react.forwardRef(({ className, variant, size, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
	ref,
	className: cn("flex items-center justify-center gap-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleGroupContext.Provider, {
		value: {
			variant,
			size
		},
		children
	})
}));
ToggleGroup.displayName = Root2.displayName;
var ToggleGroupItem = import_react.forwardRef(({ className, children, variant, size, ...props }, ref) => {
	const context = import_react.useContext(ToggleGroupContext);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		ref,
		className: cn(toggleVariants({
			variant: context.variant || variant,
			size: context.size || size
		}), className),
		...props,
		children
	});
});
ToggleGroupItem.displayName = Item2.displayName;
var formSchema = object({
	name: string().min(1, "Nome é obrigatório"),
	type: string().min(1, "Tipo é obrigatório"),
	checkinDate: string().min(1, "Data de check-in é obrigatória"),
	checkoutDate: string().optional(),
	cost: number().min(0, "Custo não pode ser negativo").default(0),
	rating: array(number$1()).default([0]),
	notes: string().optional(),
	isPublic: boolean().default(false),
	lat: number().optional(),
	lng: number().optional(),
	amenities: array(string()).default([])
});
function OvernightFormSheet({ tripId, open, onOpenChange, overnight }) {
	const { addOvernight, updateOvernight } = useOvernightStore();
	const form = useForm({
		resolver: a(formSchema),
		defaultValues: {
			name: "",
			type: "campground",
			checkinDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			checkoutDate: "",
			cost: 0,
			rating: [0],
			notes: "",
			isPublic: false,
			lat: void 0,
			lng: void 0,
			amenities: []
		}
	});
	(0, import_react.useEffect)(() => {
		if (open) if (overnight) form.reset({
			...overnight,
			checkinDate: overnight.checkinDate.split("T")[0],
			checkoutDate: overnight.checkoutDate?.split("T")[0] || "",
			rating: [overnight.rating]
		});
		else form.reset({
			name: "",
			type: "campground",
			checkinDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			checkoutDate: "",
			cost: 0,
			rating: [0],
			notes: "",
			isPublic: false,
			lat: void 0,
			lng: void 0,
			amenities: []
		});
	}, [
		open,
		overnight,
		form
	]);
	const onSubmit = (data) => {
		if (data.checkoutDate && new Date(data.checkoutDate) < new Date(data.checkinDate)) {
			form.setError("checkoutDate", { message: "O check-out não pode ser anterior ao check-in" });
			return;
		}
		const payload = {
			...data,
			tripId,
			rating: data.rating[0] || 0,
			checkinDate: new Date(data.checkinDate).toISOString(),
			checkoutDate: data.checkoutDate ? new Date(data.checkoutDate).toISOString() : void 0
		};
		if (overnight) updateOvernight(overnight.id, payload);
		else addOvernight(payload);
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "w-full sm:max-w-md overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: overnight ? "Editar Pernoite" : "Registrar Pernoite" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Guarde os detalhes de onde você dormiu durante a viagem." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: form.handleSubmit(onSubmit),
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "name",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Nome do Local" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Ex: Camping da Serra",
									...field
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								control: form.control,
								name: "type",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Tipo" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										onValueChange: field.onChange,
										value: field.value,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione" }) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "wild",
												children: "Camping Selvagem"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "campground",
												children: "Camping Pago"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "hotel",
												children: "Hotel/Pousada"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "hostel",
												children: "Hostel"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "other",
												children: "Outro"
											})
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								control: form.control,
								name: "cost",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Custo (R$)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "0.01",
										...field
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
								] })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								control: form.control,
								name: "checkinDate",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Data de Check-in" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										...field
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								control: form.control,
								name: "checkoutDate",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Data de Check-out" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										...field
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
								] })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								control: form.control,
								name: "lat",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Latitude (Opcional)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "any",
										placeholder: "-15.78",
										...field,
										value: field.value ?? ""
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								control: form.control,
								name: "lng",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Longitude (Opcional)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "any",
										placeholder: "-47.92",
										...field,
										value: field.value ?? ""
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
								] })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "rating",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Avaliação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-primary",
										children: [field.value[0], " / 5"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
									min: 0,
									max: 5,
									step: 1,
									value: field.value,
									onValueChange: field.onChange,
									className: "py-2"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "amenities",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Comodidades" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroup, {
									type: "multiple",
									value: field.value,
									onValueChange: field.onChange,
									className: "justify-start gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroupItem, {
											value: "wifi",
											"aria-label": "Toggle Wifi",
											className: "data-[state=on]:bg-primary/20 data-[state=on]:text-primary border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "h-4 w-4 mr-2" }), " Wi-Fi"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroupItem, {
											value: "water",
											"aria-label": "Toggle Water",
											className: "data-[state=on]:bg-primary/20 data-[state=on]:text-primary border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "h-4 w-4 mr-2" }), " Água"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ToggleGroupItem, {
											value: "security",
											"aria-label": "Toggle Security",
											className: "data-[state=on]:bg-primary/20 data-[state=on]:text-primary border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4 mr-2" }), " Segurança"]
										})
									]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "notes",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Anotações e Dicas" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									placeholder: "Como foi a estadia? Algo a destacar?",
									className: "resize-none h-20",
									...field
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "isPublic",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
								className: "flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Tornar Público" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: "Compartilhar localização com a comunidade"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									checked: field.value,
									onCheckedChange: field.onChange
								}) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full mt-4",
							children: overnight ? "Salvar Alterações" : "Adicionar Pernoite"
						})
					]
				})
			})]
		})
	});
}
function OvernightsPage() {
	const { id } = useParams();
	const { trips } = useTrips();
	const trip = trips.find((t) => t.id === id);
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [editingOvernight, setEditingOvernight] = (0, import_react.useState)(null);
	if (!trip) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/app/trips",
		replace: true
	});
	const handleEdit = (overnight) => {
		setEditingOvernight(overnight);
		setIsFormOpen(true);
	};
	const handleOpenChange = (open) => {
		setIsFormOpen(open);
		if (!open) setTimeout(() => setEditingOvernight(null), 300);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-[calc(100vh-8rem)] flex flex-col space-y-4 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						asChild: true,
						className: "-ml-4 text-muted-foreground hover:text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: `/app/trips/${trip.id}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-2" }), " Voltar para Viagem"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-2xl font-bold tracking-tight flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tent, { className: "h-6 w-6 text-primary" }), " Pernoites"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setIsFormOpen(true),
					className: "shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-2" }), " Novo Pernoite"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden min-h-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[280px] lg:h-full lg:w-[55%] rounded-xl border bg-card shadow-sm overflow-hidden shrink-0 lg:shrink",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvernightMap, { tripId: trip.id })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 lg:w-[45%] rounded-xl border bg-card shadow-sm overflow-hidden flex flex-col min-h-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvernightList, {
						tripId: trip.id,
						onEdit: handleEdit,
						onAdd: () => setIsFormOpen(true)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OvernightFormSheet, {
				tripId: trip.id,
				open: isFormOpen,
				onOpenChange: handleOpenChange,
				overnight: editingOvernight
			})
		]
	});
}
export { OvernightsPage as default };

//# sourceMappingURL=OvernightsPage-0jY5V8Mn.js.map