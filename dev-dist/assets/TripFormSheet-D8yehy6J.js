import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DFZV7kxn.js";
import { C as Input, K as useDataStore, Vt as require_react, Wt as __toESM, c as SheetDescription, kt as require_jsx_runtime, l as SheetHeader, mt as createLucideIcon, o as Sheet, s as SheetContent, u as SheetTitle, z as Button } from "./index-Dxf5OCU-.js";
import { _ as a, a as FormItem, g as string, h as object, i as FormField, l as _enum, n as FormControl, o as FormLabel, r as FormDescription, s as FormMessage, t as Form, y as useForm } from "./form-CFwaUMfl.js";
import { t as number } from "./coerce-B-RMzuqD.js";
import { n as ScrollArea, r as useTrips } from "./pt-BR-TtjGbqGA.js";
var Calendar = createLucideIcon("calendar", [
	["path", {
		d: "M8 2v4",
		key: "1cmpym"
	}],
	["path", {
		d: "M16 2v4",
		key: "4m81vk"
	}],
	["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "4",
		rx: "2",
		key: "1hopcy"
	}],
	["path", {
		d: "M3 10h18",
		key: "8toen8"
	}]
]);
var CarFront = createLucideIcon("car-front", [
	["path", {
		d: "m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8",
		key: "1imjwt"
	}],
	["path", {
		d: "M7 14h.01",
		key: "1qa3f1"
	}],
	["path", {
		d: "M17 14h.01",
		key: "7oqj8z"
	}],
	["rect", {
		width: "18",
		height: "8",
		x: "3",
		y: "10",
		rx: "2",
		key: "a7itu8"
	}],
	["path", {
		d: "M5 18v2",
		key: "ppbyun"
	}],
	["path", {
		d: "M19 18v2",
		key: "gy7782"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var tripSchema = object({
	title: string().min(3, "Título deve ter no mínimo 3 caracteres"),
	destination: string().min(2, "Destino obrigatório"),
	status: _enum([
		"planejada",
		"em_andamento",
		"concluida"
	]),
	budget: number().min(0, "Orçamento não pode ser negativo"),
	startDate: string().min(10, "Data inicial obrigatória"),
	endDate: string().optional(),
	vehicleId: string().optional(),
	estimatedKm: number().min(0).optional()
}).refine((data) => {
	if (data.endDate && new Date(data.endDate) < new Date(data.startDate)) return false;
	return true;
}, {
	message: "Data final deve ser após a inicial",
	path: ["endDate"]
});
function TripFormSheet({ open, onOpenChange, trip }) {
	const { create, update } = useTrips();
	const { vehicles } = useDataStore();
	const form = useForm({
		resolver: a(tripSchema),
		defaultValues: {
			title: "",
			destination: "",
			status: "planejada",
			budget: 0,
			startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			endDate: "",
			vehicleId: "none",
			estimatedKm: 0
		}
	});
	(0, import_react.useEffect)(() => {
		if (trip && open) form.reset({
			title: trip.title,
			destination: trip.destination,
			status: trip.status,
			budget: trip.budget,
			startDate: trip.startDate,
			endDate: trip.endDate || "",
			vehicleId: trip.vehicleId || "none",
			estimatedKm: trip.estimatedKm || 0
		});
		else if (open) form.reset({
			title: "",
			destination: "",
			status: "planejada",
			budget: 0,
			startDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			endDate: "",
			vehicleId: "none",
			estimatedKm: 0
		});
	}, [
		trip,
		form,
		open
	]);
	const onSubmit = (data) => {
		const payload = {
			...data,
			vehicleId: data.vehicleId === "none" ? void 0 : data.vehicleId,
			endDate: data.endDate || void 0
		};
		if (trip) update(trip.id, payload);
		else create(payload);
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: trip ? "Editar Viagem" : "Nova Viagem" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Preencha os detalhes da sua aventura." })] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
					className: "flex-1 px-6 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
						...form,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							id: "trip-form",
							onSubmit: form.handleSubmit(onSubmit),
							className: "space-y-5 pb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "title",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Título da Expedição" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Ex: Patagônia 2024",
											...field
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "destination",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Destino" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "Ex: Ushuaia",
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
														value: "planejada",
														children: "Planejada"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "em_andamento",
														children: "Em Andamento"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "concluida",
														children: "Concluída"
													})
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "startDate",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Data Inicial" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "date",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "endDate",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Data Final" }),
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
										name: "budget",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Orçamento (R$)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												step: "0.01",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
										control: form.control,
										name: "estimatedKm",
										render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Distância (KM)" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												type: "number",
												placeholder: "Ex: 5000",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										] })
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "vehicleId",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Veículo" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											onValueChange: field.onChange,
											value: field.value,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione um veículo" }) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: "none",
												children: "Nenhum veículo"
											}), vehicles.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
												value: v.id,
												children: [
													v.nickname,
													" (",
													v.model,
													")"
												]
											}, v.id))] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormDescription, { children: "Qual veículo te levará nessa viagem?" }),
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
						form: "trip-form",
						className: "w-full",
						children: trip ? "Salvar Alterações" : "Criar Viagem"
					})
				})
			]
		})
	});
}
export { CarFront as n, Calendar as r, TripFormSheet as t };

//# sourceMappingURL=TripFormSheet-D8yehy6J.js.map