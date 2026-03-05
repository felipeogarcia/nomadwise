import { i as ArrowLeft, n as SquarePen, r as EllipsisVertical, t as Textarea } from "./textarea-DD0bJhgK.js";
import { n as CarFront, r as Calendar, t as TripFormSheet } from "./TripFormSheet-DSQ8d2KX.js";
import { a as SelectTrigger, i as SelectItem, l as number, n as Select, o as SelectValue, r as SelectContent, t as Badge, u as Plus } from "./badge-h1FfoPLL.js";
import { t as CircleCheck } from "./circle-check-CrraeYCb.js";
import { t as MapPin } from "./map-pin-1etKIf2K.js";
import { t as Tent } from "./tent-DA12TeIY.js";
import { A as DropdownMenuTrigger, At as Link, Bt as __toESM, C as Input, D as DropdownMenuItem, E as DropdownMenuContent, J as TooltipTrigger, K as Tooltip, Lt as require_react, Ot as toast, Pt as useParams, T as DropdownMenu, Tt as require_jsx_runtime, W as useDataStore, c as SheetDescription, jt as Navigate, k as DropdownMenuSeparator, l as SheetHeader, nt as cn, o as Sheet, q as TooltipContent, s as SheetContent, st as Map, u as SheetTitle, ut as createLucideIcon, z as Button } from "./index-AWciCX9O.js";
import { n as CardContent, t as Card } from "./card-DOV_J1KS.js";
import { a as FormItem, f as literal, g as a, h as string, i as FormField, l as _enum, m as object, n as FormControl, o as FormLabel, s as FormMessage, t as Form, v as useForm } from "./form-b3NvORVd.js";
import { t as Progress } from "./progress-DMi3KODQ.js";
import { t as format } from "./format-C94UVCH7.js";
import { n as ScrollArea, r as useTrips, t as ptBR } from "./pt-BR-CDqrU7XZ.js";
var CircleDashed = createLucideIcon("circle-dashed", [
	["path", {
		d: "M10.1 2.182a10 10 0 0 1 3.8 0",
		key: "5ilxe3"
	}],
	["path", {
		d: "M13.9 21.818a10 10 0 0 1-3.8 0",
		key: "11zvb9"
	}],
	["path", {
		d: "M17.609 3.721a10 10 0 0 1 2.69 2.7",
		key: "1iw5b2"
	}],
	["path", {
		d: "M2.182 13.9a10 10 0 0 1 0-3.8",
		key: "c0bmvh"
	}],
	["path", {
		d: "M20.279 17.609a10 10 0 0 1-2.7 2.69",
		key: "1ruxm7"
	}],
	["path", {
		d: "M21.818 10.1a10 10 0 0 1 0 3.8",
		key: "qkgqxc"
	}],
	["path", {
		d: "M3.721 6.391a10 10 0 0 1 2.7-2.69",
		key: "1mcia2"
	}],
	["path", {
		d: "M6.391 20.279a10 10 0 0 1-2.69-2.7",
		key: "1fvljs"
	}]
]);
var CircleX = createLucideIcon("circle-x", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]);
var GripVertical = createLucideIcon("grip-vertical", [
	["circle", {
		cx: "9",
		cy: "12",
		r: "1",
		key: "1vctgf"
	}],
	["circle", {
		cx: "9",
		cy: "5",
		r: "1",
		key: "hp0tcf"
	}],
	["circle", {
		cx: "9",
		cy: "19",
		r: "1",
		key: "fkjjf6"
	}],
	["circle", {
		cx: "15",
		cy: "12",
		r: "1",
		key: "1tmaij"
	}],
	["circle", {
		cx: "15",
		cy: "5",
		r: "1",
		key: "19l28e"
	}],
	["circle", {
		cx: "15",
		cy: "19",
		r: "1",
		key: "f4zoj3"
	}]
]);
var Info = createLucideIcon("info", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "M12 16v-4",
		key: "1dtifu"
	}],
	["path", {
		d: "M12 8h.01",
		key: "e9boi3"
	}]
]);
var Navigation = createLucideIcon("navigation", [["polygon", {
	points: "3 11 22 2 13 21 11 13 3 11",
	key: "1ltx0t"
}]]);
var Receipt = createLucideIcon("receipt", [
	["path", {
		d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",
		key: "q3az6g"
	}],
	["path", {
		d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",
		key: "1h4pet"
	}],
	["path", {
		d: "M12 17.5v-11",
		key: "1jc1ny"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const ItineraryService = {
	reorderStops: (stops, sourceIndex, destinationIndex) => {
		if (sourceIndex === destinationIndex) return stops;
		const result = Array.from(stops).sort((a$1, b) => a$1.orderIndex - b.orderIndex);
		const [removed] = result.splice(sourceIndex, 1);
		result.splice(destinationIndex, 0, removed);
		return result.map((stop, index) => ({
			...stop,
			orderIndex: index
		}));
	},
	calculateProgress: (stops) => {
		if (stops.length === 0) return 0;
		const completed = stops.filter((s) => s.status === "visited" || s.status === "skipped").length;
		return Math.round(completed / stops.length * 100);
	}
};
function useItinerary(tripId) {
	const { stops, addStop, updateStop, deleteStop, updateStopsBatch } = useDataStore();
	const tripStops = (0, import_react.useMemo)(() => {
		return stops.filter((s) => s.tripId === tripId).sort((a$1, b) => a$1.orderIndex - b.orderIndex);
	}, [stops, tripId]);
	const handleAddStop = (data) => {
		const maxOrder = tripStops.length > 0 ? Math.max(...tripStops.map((s) => s.orderIndex)) : -1;
		addStop({
			...data,
			tripId,
			orderIndex: maxOrder + 1
		});
		toast({
			title: "Parada Adicionada",
			description: "Sua rota foi atualizada."
		});
	};
	const handleUpdateStop = (id, data) => {
		updateStop(id, data);
		toast({
			title: "Parada Atualizada",
			description: "Os detalhes foram salvos."
		});
	};
	const handleDeleteStop = (id) => {
		deleteStop(id);
		toast({
			title: "Parada Removida",
			description: "Item removido do itinerário."
		});
	};
	const handleReorder = (sourceIndex, destinationIndex) => {
		updateStopsBatch(ItineraryService.reorderStops(tripStops, sourceIndex, destinationIndex));
	};
	return {
		stops: tripStops,
		progress: (0, import_react.useMemo)(() => ItineraryService.calculateProgress(tripStops), [tripStops]),
		addStop: handleAddStop,
		updateStop: handleUpdateStop,
		deleteStop: handleDeleteStop,
		reorderStops: handleReorder
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function TripSummaryBar({ trip }) {
	const { vehicles } = useDataStore();
	const { progress: routeProgress } = useItinerary(trip.id);
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const vehicle = vehicles.find((v) => v.id === trip.vehicleId);
	const getStatusConfig = (status) => {
		switch (status) {
			case "planejada": return {
				label: "Planejada",
				classes: "bg-blue-100 text-blue-800 border-blue-200"
			};
			case "em_andamento": return {
				label: "Em Andamento",
				classes: "bg-green-100 text-green-800 border-green-200"
			};
			case "concluida": return {
				label: "Concluída",
				classes: "bg-muted text-muted-foreground"
			};
		}
	};
	const statusConfig = getStatusConfig(trip.status);
	const budgetProgress = trip.budget > 0 ? Math.min(trip.spent / trip.budget * 100, 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "border-border shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5 flex flex-col md:flex-row gap-6 items-center md:items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-3 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-bold tracking-tight",
						children: trip.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: statusConfig.classes,
						children: statusConfig.label
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: trip.destination })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [format(new Date(trip.startDate), "dd MMM yy", { locale: ptBR }), trip.endDate && ` - ${format(new Date(trip.endDate), "dd MMM yy", { locale: ptBR })}`] })]
						}),
						vehicle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarFront, { className: "h-4 w-4" }),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: vehicle.nickname })
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-5 w-full md:w-auto md:min-w-[320px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-3.5 w-3.5" }), " Orçamento"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round(budgetProgress), "%"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: budgetProgress,
							className: "h-1.5"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), " Rota (Paradas)"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [routeProgress, "%"] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: routeProgress,
							className: "h-1.5"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 shrink-0 w-32",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "default",
						size: "sm",
						asChild: true,
						className: "w-full justify-start shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: `/app/trips/${trip.id}/overnights`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tent, { className: "h-4 w-4 mr-2" }), " Pernoites"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => setIsEditing(true),
						className: "w-full justify-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "h-4 w-4 mr-2" }), " Editar"]
					})]
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripFormSheet, {
		open: isEditing,
		onOpenChange: setIsEditing,
		trip
	})] });
}
function ItineraryMap({ tripId }) {
	const { stops } = useItinerary(tripId);
	const [hoveredStop, setHoveredStop] = (0, import_react.useState)(null);
	const { polylinePoints, projectedStops, viewBox } = (0, import_react.useMemo)(() => {
		const valid = stops.filter((s) => s.lat !== void 0 && s.lng !== void 0);
		if (valid.length === 0) return {
			polylinePoints: "",
			projectedStops: [],
			viewBox: "0 0 1000 1000"
		};
		const lats = valid.map((s) => s.lat);
		const lngs = valid.map((s) => s.lng);
		const minLat = Math.min(...lats), maxLat = Math.max(...lats);
		const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
		const latDiff = maxLat - minLat || 1;
		const padX = (maxLng - minLng || 1) * .2;
		const padY = latDiff * .2;
		const vMinX = minLng - padX;
		const vMaxX = maxLng + padX;
		const vMinY = minLat - padY;
		const vMaxY = maxLat + padY;
		const svgW = 1e3, svgH = 1e3;
		const project = (lat, lng) => {
			return {
				x: (lng - vMinX) / (vMaxX - vMinX) * svgW,
				y: svgH - (lat - vMinY) / (vMaxY - vMinY) * svgH
			};
		};
		const projected = valid.map((stop) => ({
			...stop,
			...project(stop.lat, stop.lng)
		}));
		return {
			polylinePoints: projected.map((p) => `${p.x},${p.y}`).join(" "),
			projectedStops: projected,
			viewBox: `0 0 ${svgW} ${svgH}`
		};
	}, [stops]);
	if (stops.filter((s) => s.lat && s.lng).length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 flex flex-col items-center justify-center bg-muted/20 text-muted-foreground p-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-12 w-12 mb-4 opacity-20" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-medium text-foreground",
				children: "Mapa do Itinerário"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm max-w-sm mt-2",
				children: "Adicione paradas com coordenadas (latitude/longitude) para visualizar a rota esquemática da sua viagem."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex-1 relative bg-slate-50 dark:bg-slate-900/50 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-[0.03] dark:opacity-[0.05]",
				style: {
					backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
					backgroundSize: "20px 20px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-md shadow-sm border text-xs font-medium flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-3.5 w-3.5 text-primary" }), " Rota Esquemática"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox,
				preserveAspectRatio: "xMidYMid meet",
				className: "w-full h-full p-8 drop-shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
					points: polylinePoints,
					fill: "none",
					stroke: "hsl(var(--primary))",
					strokeWidth: "6",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					className: "opacity-40",
					strokeDasharray: "12 12"
				}), projectedStops.map((stop, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip, {
					delayDuration: 100,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "cursor-pointer transition-transform hover:scale-110 origin-center",
							onMouseEnter: () => setHoveredStop(stop.id),
							onMouseLeave: () => setHoveredStop(null),
							style: { transformOrigin: `${stop.x}px ${stop.y}px` },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: stop.x,
									cy: stop.y,
									r: "24",
									fill: "hsl(var(--primary))",
									className: "opacity-10"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: stop.x,
									cy: stop.y + 4,
									r: "10",
									fill: "rgba(0,0,0,0.2)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: stop.x,
									cy: stop.y,
									r: hoveredStop === stop.id ? "16" : "12",
									fill: stop.status === "visited" ? "hsl(var(--primary))" : "hsl(var(--background))",
									stroke: "hsl(var(--primary))",
									strokeWidth: "4",
									className: "transition-all duration-300"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
									x: stop.x,
									y: stop.y,
									textAnchor: "middle",
									dy: ".3em",
									className: "text-[12px] font-bold fill-current",
									fill: stop.status === "visited" ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
									children: i + 1
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipContent, {
						side: "top",
						className: "font-medium flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }), stop.name]
					})]
				}, stop.id))]
			})
		]
	});
}
var stopSchema = object({
	name: string().min(2, "Nome deve ter no mínimo 2 caracteres"),
	address: string().optional(),
	date: string().optional(),
	status: _enum([
		"planned",
		"visited",
		"skipped"
	]),
	lat: number().optional().or(literal("")),
	lng: number().optional().or(literal("")),
	notes: string().optional()
});
function StopFormSheet({ open, onOpenChange, stop, onSave }) {
	const form = useForm({
		resolver: a(stopSchema),
		defaultValues: {
			name: "",
			address: "",
			date: "",
			status: "planned",
			lat: "",
			lng: "",
			notes: ""
		}
	});
	(0, import_react.useEffect)(() => {
		if (open) if (stop) form.reset({
			name: stop.name,
			address: stop.address || "",
			date: stop.date || "",
			status: stop.status,
			lat: stop.lat ?? "",
			lng: stop.lng ?? "",
			notes: stop.notes || ""
		});
		else form.reset({
			name: "",
			address: "",
			date: "",
			status: "planned",
			lat: "",
			lng: "",
			notes: ""
		});
	}, [
		stop,
		open,
		form
	]);
	const onSubmit = (data) => {
		onSave({
			...data,
			lat: data.lat === "" ? void 0 : Number(data.lat),
			lng: data.lng === "" ? void 0 : Number(data.lng)
		});
		onOpenChange(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "w-full sm:max-w-md flex flex-col p-0 h-[100dvh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-6 py-4 border-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-primary" }), stop ? "Editar Parada" : "Nova Parada"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Defina os detalhes deste ponto no itinerário." })] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "flex-1 px-6 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
						...form,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							id: "stop-form",
							onSubmit: form.handleSubmit(onSubmit),
							className: "space-y-5 pb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "name",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Nome do Local / Ponto" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Ex: Parque Nacional Tierra del Fuego",
											...field
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "date",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Data Planejada" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "date",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "status",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Status" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												onValueChange: field.onChange,
												value: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione..." }) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "planned",
														children: "Planejado"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "visited",
														children: "Visitado"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "skipped",
														children: "Pulado"
													})
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "address",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Endereço / Referência" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Ex: R. San Martín, Ushuaia",
											...field
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 bg-muted/30 border rounded-lg space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-2 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 shrink-0 mt-0.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Coordenadas são necessárias para exibir a parada no mapa. Você pode copiá-las do Google Maps clicando com o botão direito no local desejado." })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											control: form.control,
											name: "lat",
											render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Latitude" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "-54.8019",
													...field
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
											control: form.control,
											name: "lng",
											render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Longitude" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "-68.3030",
													...field
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
											] })
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "notes",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Anotações" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											placeholder: "O que fazer, onde comer, dicas...",
											className: "resize-none h-24",
											...field
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
									] })
								})
							]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 border-t bg-background",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						form: "stop-form",
						className: "w-full",
						children: stop ? "Salvar Alterações" : "Adicionar ao Roteiro"
					})
				})
			]
		})
	});
}
function ItineraryList({ tripId }) {
	const { stops, addStop, updateStop, deleteStop, reorderStops } = useItinerary(tripId);
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [editingStop, setEditingStop] = (0, import_react.useState)(null);
	const [draggedIdx, setDraggedIdx] = (0, import_react.useState)(null);
	const dragItem = (0, import_react.useRef)(null);
	const dragOverItem = (0, import_react.useRef)(null);
	const handleDragStart = (e, index) => {
		dragItem.current = index;
		setDraggedIdx(index);
		e.dataTransfer.effectAllowed = "move";
		if (e.target instanceof HTMLElement) e.dataTransfer.setDragImage(e.target, 20, 20);
	};
	const handleDragEnter = (e, index) => {
		e.preventDefault();
		dragOverItem.current = index;
	};
	const handleDragEnd = () => {
		if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) reorderStops(dragItem.current, dragOverItem.current);
		dragItem.current = null;
		dragOverItem.current = null;
		setDraggedIdx(null);
	};
	const openNewForm = () => {
		setEditingStop(null);
		setIsFormOpen(true);
	};
	const openEditForm = (stop) => {
		setEditingStop(stop);
		setIsFormOpen(true);
	};
	const handleSave = (data) => {
		if (editingStop) updateStop(editingStop.id, data);
		else addStop(data);
	};
	const getStatusIcon = (status) => {
		switch (status) {
			case "visited": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-green-500" });
			case "skipped": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 text-muted-foreground" });
			default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDashed, { className: "h-4 w-4 text-primary" });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full relative bg-muted/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-3 border-b bg-background flex items-center justify-between z-10 shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "font-semibold text-foreground flex items-center gap-2",
					children: [
						"Itinerário",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: "font-mono",
							children: stops.length
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					onClick: openNewForm,
					className: "h-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " Nova Parada"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 space-y-3",
					onDragOver: (e) => e.preventDefault(),
					children: stops.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg bg-background",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm mb-4",
							children: "Nenhuma parada cadastrada no roteiro."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: openNewForm,
							children: "Começar a planejar"
						})]
					}) : stops.map((stop, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						draggable: true,
						onDragStart: (e) => handleDragStart(e, index),
						onDragEnter: (e) => handleDragEnter(e, index),
						onDragEnd: handleDragEnd,
						className: cn("group relative flex items-start gap-3 p-3 bg-background border rounded-lg shadow-sm transition-all duration-200", draggedIdx === index && "opacity-40 scale-95 border-primary", stop.status === "skipped" && "opacity-70 bg-muted/50"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground opacity-50 group-hover:opacity-100 transition-opacity",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center mt-1 w-6 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-6 w-6 rounded-full bg-secondary text-xs font-bold flex items-center justify-center mb-1",
									children: index + 1
								}), index < stops.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-0.5 h-full bg-border" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0 py-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: cn("font-medium text-sm truncate", stop.status === "visited" && "text-muted-foreground"),
											children: stop.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 shrink-0",
											children: [getStatusIcon(stop.status), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "ghost",
													size: "icon",
													className: "h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-4 w-4" })
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
												align: "end",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
														onClick: () => openEditForm(stop),
														children: "Editar Detalhes"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
														onClick: () => updateStop(stop.id, { status: stop.status === "visited" ? "planned" : "visited" }),
														children: ["Marcar como ", stop.status === "visited" ? "Planejado" : "Visitado"]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
														onClick: () => deleteStop(stop.id),
														className: "text-destructive",
														children: "Remover Parada"
													})
												]
											})] })]
										})]
									}),
									stop.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground truncate mt-0.5",
										children: stop.address
									}),
									stop.date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-xs text-muted-foreground mt-2 bg-muted w-fit px-2 py-0.5 rounded-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), format(new Date(stop.date), "dd MMM yy", { locale: ptBR })]
									})
								]
							})
						]
					}, stop.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StopFormSheet, {
				open: isFormOpen,
				onOpenChange: setIsFormOpen,
				stop: editingStop,
				onSave: handleSave
			})
		]
	});
}
function TripDetailPage() {
	const { id } = useParams();
	const { trips } = useTrips();
	const trip = trips.find((t) => t.id === id);
	if (!trip) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/app/trips",
		replace: true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6 animate-fade-in pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				asChild: true,
				className: "-ml-4 mb-2 text-muted-foreground hover:text-foreground transition-colors",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/app/trips",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-2" }), " Voltar para Viagens"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripSummaryBar, { trip }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-5 gap-6 lg:h-[650px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-3 rounded-xl border bg-card overflow-hidden shadow-sm flex flex-col relative h-[400px] lg:h-auto order-2 lg:order-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItineraryMap, { tripId: trip.id })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-2 rounded-xl border bg-card shadow-sm flex flex-col h-[500px] lg:h-auto overflow-hidden order-1 lg:order-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItineraryList, { tripId: trip.id })
				})]
			})
		]
	});
}
export { TripDetailPage as default };

//# sourceMappingURL=TripDetailPage-5cDY3-yc.js.map