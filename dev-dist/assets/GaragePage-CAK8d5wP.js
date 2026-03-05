import { a as SelectTrigger, i as SelectItem, l as number, n as Select, o as SelectValue, r as SelectContent, t as Badge, u as Plus } from "./badge-BO2Z08JV.js";
import { t as Trash2 } from "./trash-2-B_ljEtOH.js";
import { B as buttonVariants, C as Input, Ct as createContextScope, Et as composeEventHandlers, It as require_react, Ot as useToast, St as createSlottable, Tt as useComposedRefs, _ as Root, a as Skeleton, b as WarningProvider, c as SheetDescription, f as Close, g as Portal, h as Overlay, l as SheetHeader, lt as createLucideIcon, m as Description, o as Sheet, p as Content, s as SheetContent, tt as cn, u as SheetTitle, v as Title, w as ErrorBoundary, wt as require_jsx_runtime, x as createDialogScope, y as Trigger, z as Button, zt as __toESM } from "./index-DbO1TcoC.js";
import { n as CardContent, t as Card } from "./card-Daq2xIzu.js";
import { a as FormItem, f as object, g as useForm, i as FormField, l as _enum, m as a, n as FormControl, o as FormLabel, p as string, s as FormMessage, t as Form } from "./form-CpbiUkZ2.js";
var CircleAlert = createLucideIcon("circle-alert", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "8",
		y2: "12",
		key: "1pkeuh"
	}],
	["line", {
		x1: "12",
		x2: "12.01",
		y1: "16",
		y2: "16",
		key: "4dfq90"
	}]
]);
var Fuel = createLucideIcon("fuel", [
	["path", {
		d: "M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5",
		key: "1wtuz0"
	}],
	["path", {
		d: "M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16",
		key: "e09ifn"
	}],
	["path", {
		d: "M2 21h13",
		key: "1x0fut"
	}],
	["path", {
		d: "M3 9h11",
		key: "1p7c0w"
	}]
]);
var Pen = createLucideIcon("pen", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}]]);
var Save = createLucideIcon("save", [
	["path", {
		d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
		key: "1c8476"
	}],
	["path", {
		d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",
		key: "1ydtos"
	}],
	["path", {
		d: "M7 3v4a1 1 0 0 0 1 1h7",
		key: "t51u73"
	}]
]);
var Settings = createLucideIcon("settings", [["path", {
	d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
	key: "1i5ecw"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
var Upload = createLucideIcon("upload", [
	["path", {
		d: "M12 3v12",
		key: "1x0j5s"
	}],
	["path", {
		d: "m17 8-5-5-5 5",
		key: "7q97r8"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var mockVehicles = [{
	id: "v1",
	nickname: "Bessie",
	type: "van",
	make: "Mercedes-Benz",
	model: "Sprinter 416",
	year: 2022,
	plate: "NOM-4D22",
	odometer: 15e3,
	tankCapacity: 75,
	nextMaintenance: "2024-06-01",
	imageUrl: "https://img.usecurling.com/p/400/300?q=campervan&color=gray"
}, {
	id: "v2",
	nickname: "Fera",
	type: "carro",
	make: "Land Rover",
	model: "Defender 110",
	year: 2015,
	plate: "ADV-0X99",
	odometer: 12e4,
	tankCapacity: 80,
	nextMaintenance: "2024-04-15",
	imageUrl: "https://img.usecurling.com/p/400/300?q=suv&color=green"
}];
var getSignedUrl = (url) => {
	if (!url) return "";
	if (url.includes("sig=")) return url;
	return `${url}&sig=${Math.random().toString(36).substring(2, 9)}&expires=3600`;
};
const vehicleService = {
	async getVehicles() {
		await new Promise((resolve) => setTimeout(resolve, 800));
		return mockVehicles.map((v) => ({
			...v,
			imageUrl: getSignedUrl(v.imageUrl)
		}));
	},
	async createVehicle(vehicle, photoFile) {
		await new Promise((resolve) => setTimeout(resolve, 1e3));
		const objectPath = photoFile ? `https://img.usecurling.com/p/400/300?q=${vehicle.type}&color=blue` : vehicle.imageUrl || `https://img.usecurling.com/p/400/300?q=vehicle&color=gray`;
		const newVehicle = {
			...vehicle,
			id: Math.random().toString(36).substring(2, 9),
			imageUrl: objectPath
		};
		mockVehicles = [newVehicle, ...mockVehicles];
		return {
			...newVehicle,
			imageUrl: getSignedUrl(newVehicle.imageUrl)
		};
	},
	async updateVehicle(id, updates, photoFile) {
		await new Promise((resolve) => setTimeout(resolve, 1e3));
		const index = mockVehicles.findIndex((v) => v.id === id);
		if (index === -1) throw new Error("Vehicle not found");
		let imageUrl = updates.imageUrl;
		if (photoFile) imageUrl = `https://img.usecurling.com/p/400/300?q=${updates.type || mockVehicles[index].type}&color=red`;
		const updatedVehicle = {
			...mockVehicles[index],
			...updates,
			...imageUrl && { imageUrl }
		};
		mockVehicles[index] = updatedVehicle;
		return {
			...updatedVehicle,
			imageUrl: getSignedUrl(updatedVehicle.imageUrl)
		};
	},
	async deleteVehicle(id) {
		await new Promise((resolve) => setTimeout(resolve, 800));
		mockVehicles = mockVehicles.filter((v) => v.id !== id);
	}
};
function useVehicles() {
	const [vehicles, setVehicles] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const { toast } = useToast();
	const fetchVehicles = (0, import_react.useCallback)(async () => {
		try {
			setIsLoading(true);
			setVehicles(await vehicleService.getVehicles());
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err : /* @__PURE__ */ new Error("Falha ao carregar veículos"));
			toast({
				variant: "destructive",
				title: "Erro",
				description: "Não foi possível carregar sua frota."
			});
		} finally {
			setIsLoading(false);
		}
	}, [toast]);
	(0, import_react.useEffect)(() => {
		fetchVehicles();
	}, [fetchVehicles]);
	const addVehicle = async (vehicle, photo) => {
		const tempId = `temp-${Date.now()}`;
		const optimisticVehicle = {
			...vehicle,
			id: tempId,
			imageUrl: vehicle.imageUrl || ""
		};
		setVehicles((prev) => [optimisticVehicle, ...prev]);
		try {
			const newVehicle = await vehicleService.createVehicle(vehicle, photo);
			setVehicles((prev) => prev.map((v) => v.id === tempId ? newVehicle : v));
			toast({
				title: "Sucesso",
				description: "Veículo adicionado com sucesso."
			});
		} catch (err) {
			setVehicles((prev) => prev.filter((v) => v.id !== tempId));
			toast({
				variant: "destructive",
				title: "Erro",
				description: "Falha ao adicionar veículo."
			});
			throw err;
		}
	};
	const editVehicle = async (id, updates, photo) => {
		const previousVehicles = [...vehicles];
		setVehicles((prev) => prev.map((v) => v.id === id ? {
			...v,
			...updates
		} : v));
		try {
			const updatedVehicle = await vehicleService.updateVehicle(id, updates, photo);
			setVehicles((prev) => prev.map((v) => v.id === id ? updatedVehicle : v));
			toast({
				title: "Sucesso",
				description: "Informações atualizadas."
			});
		} catch (err) {
			setVehicles(previousVehicles);
			toast({
				variant: "destructive",
				title: "Erro",
				description: "Falha ao atualizar veículo."
			});
			throw err;
		}
	};
	const removeVehicle = async (id) => {
		const previousVehicles = [...vehicles];
		setVehicles((prev) => prev.filter((v) => v.id !== id));
		try {
			await vehicleService.deleteVehicle(id);
			toast({
				title: "Removido",
				description: "Veículo excluído com sucesso."
			});
		} catch (err) {
			setVehicles(previousVehicles);
			toast({
				variant: "destructive",
				title: "Erro",
				description: "Falha ao excluir veículo."
			});
			throw err;
		}
	};
	return {
		vehicles,
		isLoading,
		error,
		addVehicle,
		editVehicle,
		removeVehicle,
		refetch: fetchVehicles
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var ROOT_NAME = "AlertDialog";
var [createAlertDialogContext, createAlertDialogScope] = createContextScope(ROOT_NAME, [createDialogScope]);
var useDialogScope = createDialogScope();
var AlertDialog$1 = (props) => {
	const { __scopeAlertDialog, ...alertDialogProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		...dialogScope,
		...alertDialogProps,
		modal: true
	});
};
AlertDialog$1.displayName = ROOT_NAME;
var TRIGGER_NAME = "AlertDialogTrigger";
var AlertDialogTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...triggerProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		...dialogScope,
		...triggerProps,
		ref: forwardedRef
	});
});
AlertDialogTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "AlertDialogPortal";
var AlertDialogPortal$1 = (props) => {
	const { __scopeAlertDialog, ...portalProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, {
		...dialogScope,
		...portalProps
	});
};
AlertDialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "AlertDialogOverlay";
var AlertDialogOverlay$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...overlayProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
		...dialogScope,
		...overlayProps,
		ref: forwardedRef
	});
});
AlertDialogOverlay$1.displayName = OVERLAY_NAME;
var CONTENT_NAME = "AlertDialogContent";
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext(CONTENT_NAME);
var Slottable = createSlottable("AlertDialogContent");
var AlertDialogContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, children, ...contentProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, contentRef);
	const cancelRef = import_react.useRef(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningProvider, {
		contentName: CONTENT_NAME,
		titleName: TITLE_NAME,
		docsSlug: "alert-dialog",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContentProvider, {
			scope: __scopeAlertDialog,
			cancelRef,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
				role: "alertdialog",
				...dialogScope,
				...contentProps,
				ref: composedRefs,
				onOpenAutoFocus: composeEventHandlers(contentProps.onOpenAutoFocus, (event) => {
					event.preventDefault();
					cancelRef.current?.focus({ preventScroll: true });
				}),
				onPointerDownOutside: (event) => event.preventDefault(),
				onInteractOutside: (event) => event.preventDefault(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slottable, { children }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DescriptionWarning, { contentRef })]
			})
		})
	});
});
AlertDialogContent$1.displayName = CONTENT_NAME;
var TITLE_NAME = "AlertDialogTitle";
var AlertDialogTitle$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...titleProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
		...dialogScope,
		...titleProps,
		ref: forwardedRef
	});
});
AlertDialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "AlertDialogDescription";
var AlertDialogDescription$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...descriptionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
		...dialogScope,
		...descriptionProps,
		ref: forwardedRef
	});
});
AlertDialogDescription$1.displayName = DESCRIPTION_NAME;
var ACTION_NAME = "AlertDialogAction";
var AlertDialogAction$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...actionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
		...dialogScope,
		...actionProps,
		ref: forwardedRef
	});
});
AlertDialogAction$1.displayName = ACTION_NAME;
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeAlertDialog, ...cancelProps } = props;
	const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const ref = useComposedRefs(forwardedRef, cancelRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Close, {
		...dialogScope,
		...cancelProps,
		ref
	});
});
AlertDialogCancel$1.displayName = CANCEL_NAME;
var DescriptionWarning = ({ contentRef }) => {
	const MESSAGE = `\`${CONTENT_NAME}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${CONTENT_NAME}\` by passing a \`${DESCRIPTION_NAME}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${CONTENT_NAME}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
	import_react.useEffect(() => {
		if (!document.getElementById(contentRef.current?.getAttribute("aria-describedby"))) console.warn(MESSAGE);
	}, [MESSAGE, contentRef]);
	return null;
};
var Root2 = AlertDialog$1;
var Trigger2 = AlertDialogTrigger$1;
var Portal2 = AlertDialogPortal$1;
var Overlay2 = AlertDialogOverlay$1;
var Content2 = AlertDialogContent$1;
var Action = AlertDialogAction$1;
var Cancel = AlertDialogCancel$1;
var Title2 = AlertDialogTitle$1;
var Description2 = AlertDialogDescription$1;
var AlertDialog = Root2;
var AlertDialogTrigger = Trigger2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
var typeColors = {
	moto: "bg-indigo-500 hover:bg-indigo-600 text-white",
	carro: "bg-blue-600 hover:bg-blue-700 text-white",
	motorhome: "bg-emerald-600 hover:bg-emerald-700 text-white",
	van: "bg-orange-500 hover:bg-orange-600 text-white",
	outro: "bg-slate-500 hover:bg-slate-600 text-white"
};
function VehicleCard({ vehicle, onEdit, onDelete }) {
	const nextMaint = vehicle.nextMaintenance ? new Date(vehicle.nextMaintenance) : null;
	const isUrgent = nextMaint ? nextMaint.getTime() - (/* @__PURE__ */ new Date()).getTime() < 1e3 * 60 * 60 * 24 * 30 : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "overflow-hidden flex flex-col group hover:shadow-lg transition-all border-border/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-48 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: vehicle.imageUrl || "https://img.usecurling.com/p/400/300?q=vehicle",
					alt: vehicle.nickname,
					className: "object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-3 left-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						className: `${typeColors[vehicle.type]} font-medium capitalize border-none`,
						children: vehicle.type
					}), vehicle.plate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "bg-background/90 backdrop-blur font-mono border-none shadow-sm",
						children: vehicle.plate
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "icon",
						variant: "secondary",
						className: "h-8 w-8 bg-background/90 shadow-sm",
						onClick: onEdit,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialog, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "destructive",
							className: "h-8 w-8 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Excluir veículo?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
						"Esta ação não pode ser desfeita. O veículo \"",
						vehicle.nickname,
						"\" e todos os seus registros serão removidos permanentemente."
					] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancelar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						onClick: onDelete,
						className: "bg-destructive hover:bg-destructive/90",
						children: "Excluir"
					})] })] })] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-5 flex-1 flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xl font-bold group-hover:text-primary transition-colors line-clamp-1",
						children: vehicle.nickname
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground line-clamp-1",
						children: [
							vehicle.make,
							" ",
							vehicle.model,
							" • ",
							vehicle.year
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-4 mb-5 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "h-4 w-4 shrink-0 text-primary/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							children: [vehicle.odometer.toLocaleString("pt-BR"), " km"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fuel, { className: "h-4 w-4 shrink-0 text-primary/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "truncate",
							children: [vehicle.tankCapacity, "L Tanque"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center justify-between text-sm p-3 rounded-lg border ${isUrgent ? "bg-destructive/10 border-destructive/20 text-destructive" : "bg-muted/50 border-transparent"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: `h-4 w-4 shrink-0 ${isUrgent ? "animate-pulse" : ""}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: "Próx. Revisão"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono opacity-90",
						children: nextMaint ? nextMaint.toLocaleDateString("pt-BR") : "Não agendada"
					})]
				})
			]
		})]
	});
}
var vehicleSchema = object({
	nickname: string().min(1, "Apelido é obrigatório"),
	type: _enum([
		"moto",
		"carro",
		"motorhome",
		"van",
		"outro"
	], { required_error: "Tipo é obrigatório" }),
	make: string().min(1, "Marca é obrigatória"),
	model: string().min(1, "Modelo é obrigatório"),
	year: number().min(1950, "Ano inválido").max((/* @__PURE__ */ new Date()).getFullYear(), "Ano no futuro"),
	plate: string().optional(),
	odometer: number().min(0, "Não pode ser negativo"),
	tankCapacity: number().min(0, "Não pode ser negativo"),
	nextMaintenance: string().optional()
});
function VehicleFormSheet({ isOpen, onOpenChange, vehicle, onSubmit }) {
	const [photo, setPhoto] = (0, import_react.useState)();
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const form = useForm({
		resolver: a(vehicleSchema),
		defaultValues: {
			nickname: "",
			type: "carro",
			make: "",
			model: "",
			year: (/* @__PURE__ */ new Date()).getFullYear(),
			plate: "",
			odometer: 0,
			tankCapacity: 50,
			nextMaintenance: ""
		}
	});
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			if (vehicle) form.reset({
				nickname: vehicle.nickname,
				type: vehicle.type,
				make: vehicle.make,
				model: vehicle.model,
				year: vehicle.year,
				plate: vehicle.plate || "",
				odometer: vehicle.odometer,
				tankCapacity: vehicle.tankCapacity,
				nextMaintenance: vehicle.nextMaintenance?.split("T")[0] || ""
			});
			else form.reset({
				nickname: "",
				type: "carro",
				make: "",
				model: "",
				year: (/* @__PURE__ */ new Date()).getFullYear(),
				plate: "",
				odometer: 0,
				tankCapacity: 50,
				nextMaintenance: ""
			});
			setPhoto(void 0);
		}
	}, [
		isOpen,
		vehicle,
		form
	]);
	const handleSubmit = async (values) => {
		setIsSubmitting(true);
		try {
			await onSubmit(values, photo);
			form.reset();
		} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: isOpen,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "w-full sm:max-w-xl overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: vehicle ? "Editar Veículo" : "Novo Veículo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: vehicle ? "Atualize as informações do seu veículo." : "Cadastre os detalhes do novo veículo da sua frota." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: form.handleSubmit(handleSubmit),
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "nickname",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										className: "col-span-2 sm:col-span-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Apelido" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												placeholder: "Ex: Bessie",
												...field
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "type",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, {
										className: "col-span-2 sm:col-span-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Tipo" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												onValueChange: field.onChange,
												defaultValue: field.value,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione" }) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "carro",
														children: "Carro"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "moto",
														children: "Moto"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "motorhome",
														children: "Motorhome"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "van",
														children: "Van/Camper"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
														value: "outro",
														children: "Outro"
													})
												] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "make",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Marca" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Ex: VW",
											...field
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "model",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Modelo" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Ex: Kombi",
											...field
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "year",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Ano" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											...field
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "plate",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Placa" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "ABC-1234",
											...field
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "odometer",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Hodômetro (km)" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											...field
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
									] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
									control: form.control,
									name: "tankCapacity",
									render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Tanque (L)" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											...field
										}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
									] })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "nextMaintenance",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Próxima Revisão (Opcional)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									...field
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Foto do Veículo (Opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								className: "w-full h-20 border-dashed bg-muted/30",
								onClick: () => document.getElementById("photo-upload")?.click(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-5 w-5 mr-3 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: photo ? photo.name : "Selecionar imagem"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "photo-upload",
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: (e) => setPhoto(e.target.files?.[0])
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full mt-2",
							disabled: isSubmitting,
							children: isSubmitting ? "Salvando..." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4 mr-2" }), " Salvar Veículo"] })
						})
					]
				})
			})]
		})
	});
}
function EmptyVehicles({ onAdd }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-muted/10 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-primary/10 p-5 rounded-full mb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-10 w-10 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-2xl font-bold tracking-tight mb-2",
				children: "Nenhum veículo cadastrado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground max-w-md mb-8",
				children: "Você ainda não registrou nenhum veículo na sua garagem. Adicione seu primeiro veículo para acompanhar manutenções, gastos e logística de viagens."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "lg",
				onClick: onAdd,
				className: "shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 mr-2" }), "Adicionar Primeiro Veículo"]
			})
		]
	});
}
function GaragePageContent() {
	const { vehicles, isLoading, error, addVehicle, editVehicle, removeVehicle } = useVehicles();
	const [isSheetOpen, setIsSheetOpen] = (0, import_react.useState)(false);
	const [editingVehicle, setEditingVehicle] = (0, import_react.useState)();
	if (error) throw error;
	const handleAdd = () => {
		setEditingVehicle(void 0);
		setIsSheetOpen(true);
	};
	const handleEdit = (vehicle) => {
		setEditingVehicle(vehicle);
		setIsSheetOpen(true);
	};
	const handleSubmit = async (data, photo) => {
		if (editingVehicle) await editVehicle(editingVehicle.id, data, photo);
		else await addVehicle({
			...data,
			imageUrl: ""
		}, photo);
		setIsSheetOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-fade-in pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-xl border shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold tracking-tight mb-1",
					children: "Garagem e Frota"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground",
					children: "Gerencie seus veículos, acompanhe manutenções e organize sua logística."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "shadow-sm shrink-0",
					onClick: handleAdd,
					size: "lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 mr-2" }), "Novo Veículo"]
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
				children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[380px] w-full rounded-xl" }, i))
			}) : vehicles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyVehicles, { onAdd: handleAdd }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
				children: vehicles.map((vehicle) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VehicleCard, {
					vehicle,
					onEdit: () => handleEdit(vehicle),
					onDelete: () => removeVehicle(vehicle.id)
				}, vehicle.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VehicleFormSheet, {
				isOpen: isSheetOpen,
				onOpenChange: setIsSheetOpen,
				vehicle: editingVehicle,
				onSubmit: handleSubmit
			})
		]
	});
}
function GaragePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GaragePageContent, {}) });
}
export { GaragePage as default };

//# sourceMappingURL=GaragePage-CAK8d5wP.js.map