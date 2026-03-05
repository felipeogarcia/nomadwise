import { a as useTrips, i as format, o as CarFront, r as ptBR, s as Calendar, t as TripFormSheet } from "./TripFormSheet-ChpAuMhn.js";
import { c as Badge, o as usePrevious, u as Plus } from "./select-B4dnUX5f.js";
import { t as CircleCheck } from "./circle-check-DN4OGHal.js";
import { n as MapPin, t as Progress } from "./progress-Dw87TgS8.js";
import { t as Trash2 } from "./trash-2-D8tEx9xi.js";
import { $ as cn, Ct as toast, D as DropdownMenuLabel, E as DropdownMenuItem, L as useDirection, M as Item, Mt as __toESM, N as Root, O as DropdownMenuSeparator, P as createRovingFocusGroupScope, Q as useId, R as Button, S as Input, St as composeEventHandlers, T as DropdownMenuContent, V as useDataStore, Z as useSize, a as Skeleton, at as Check, bt as require_jsx_runtime, c as SheetDescription, ht as Primitive, jt as require_react, k as DropdownMenuTrigger, l as SheetHeader, lt as useControllableState, o as Sheet, ot as createLucideIcon, s as SheetContent, u as SheetTitle, ut as Presence, w as DropdownMenu, xt as useComposedRefs, yt as createContextScope } from "./index-DfyIcUCt.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-CR8iOSgq.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, t as Card } from "./card-cbK2y9CX.js";
import "./form-D4hQrF_5.js";
var Ellipsis = createLucideIcon("ellipsis", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "1",
		key: "41hilf"
	}],
	["circle", {
		cx: "19",
		cy: "12",
		r: "1",
		key: "1wjl8i"
	}],
	["circle", {
		cx: "5",
		cy: "12",
		r: "1",
		key: "1pcz8c"
	}]
]);
var SquareCheckBig = createLucideIcon("square-check-big", [["path", {
	d: "M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344",
	key: "2acyp4"
}], ["path", {
	d: "m9 11 3 3L22 4",
	key: "1pflzl"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [createRovingFocusGroupScope]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value: valueProp, onValueChange, defaultValue, orientation = "horizontal", dir, activationMode = "automatic", ...tabsProps } = props;
	const direction = useDirection(dir);
	const [value, setValue] = useControllableState({
		prop: valueProp,
		onChange: onValueChange,
		defaultProp: defaultValue ?? "",
		caller: TABS_NAME
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsProvider, {
		scope: __scopeTabs,
		baseId: useId(),
		value,
		onValueChange: setValue,
		orientation,
		dir: direction,
		activationMode,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			dir: direction,
			"data-orientation": orientation,
			...tabsProps,
			ref: forwardedRef
		})
	});
});
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, loop = true, ...listProps } = props;
	const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		asChild: true,
		...rovingFocusGroupScope,
		orientation: context.orientation,
		dir: context.dir,
		loop,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			role: "tablist",
			"aria-orientation": context.orientation,
			...listProps,
			ref: forwardedRef
		})
	});
});
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME$1 = "TabsTrigger";
var TabsTrigger$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
	const context = useTabsContext(TRIGGER_NAME$1, __scopeTabs);
	const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		asChild: true,
		...rovingFocusGroupScope,
		focusable: !disabled,
		active: isSelected,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			type: "button",
			role: "tab",
			"aria-selected": isSelected,
			"aria-controls": contentId,
			"data-state": isSelected ? "active" : "inactive",
			"data-disabled": disabled ? "" : void 0,
			disabled,
			id: triggerId,
			...triggerProps,
			ref: forwardedRef,
			onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
				if (!disabled && event.button === 0 && event.ctrlKey === false) context.onValueChange(value);
				else event.preventDefault();
			}),
			onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
				if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
			}),
			onFocus: composeEventHandlers(props.onFocus, () => {
				const isAutomaticActivation = context.activationMode !== "manual";
				if (!isSelected && !disabled && isAutomaticActivation) context.onValueChange(value);
			})
		})
	});
});
TabsTrigger$1.displayName = TRIGGER_NAME$1;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
	const context = useTabsContext(CONTENT_NAME, __scopeTabs);
	const triggerId = makeTriggerId(context.baseId, value);
	const contentId = makeContentId(context.baseId, value);
	const isSelected = value === context.value;
	const isMountAnimationPreventedRef = import_react.useRef(isSelected);
	import_react.useEffect(() => {
		const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
		return () => cancelAnimationFrame(rAF);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isSelected,
		children: ({ present }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": isSelected ? "active" : "inactive",
			"data-orientation": context.orientation,
			role: "tabpanel",
			"aria-labelledby": triggerId,
			hidden: !present,
			id: contentId,
			tabIndex: 0,
			...contentProps,
			ref: forwardedRef,
			style: {
				...props.style,
				animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
			},
			children: present && children
		})
	});
});
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
	return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
	return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function TripCard({ trip, onEdit, onChecklist, onStatusChange, onDelete }) {
	const { vehicles, checklistItems } = useDataStore();
	const vehicle = vehicles.find((v) => v.id === trip.vehicleId);
	const items = checklistItems.filter((i) => i.tripId === trip.id);
	const completedItems = items.filter((i) => i.isCompleted).length;
	const checklistProgress = items.length > 0 ? Math.round(completedItems / items.length * 100) : 0;
	const getStatusConfig = (status) => {
		switch (status) {
			case "planejada": return {
				label: "Planejada",
				classes: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200"
			};
			case "em_andamento": return {
				label: "Em Andamento",
				classes: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200"
			};
			case "concluida": return {
				label: "Concluída",
				classes: "bg-muted text-muted-foreground"
			};
		}
	};
	const statusConfig = getStatusConfig(trip.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col overflow-hidden h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "pb-3 bg-muted/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: `cursor-pointer transition-colors ${statusConfig.classes} hover:opacity-80`,
								children: statusConfig.label
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "start",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Atualizar Status" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									onClick: () => onStatusChange("planejada"),
									children: "Planejada"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									onClick: () => onStatusChange("em_andamento"),
									children: "Em Andamento"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									onClick: () => onStatusChange("concluida"),
									children: "Concluída"
								})
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "h-8 w-8 p-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									onClick: onEdit,
									children: "Editar Detalhes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									onClick: onChecklist,
									children: "Ver Checklist"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									onClick: onDelete,
									className: "text-destructive focus:text-destructive",
									children: "Excluir Viagem"
								})
							]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-xl mt-3 line-clamp-1 group-hover:text-primary transition-colors",
						children: trip.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center text-sm text-muted-foreground mt-1 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 mr-1 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate max-w-[120px]",
								title: trip.destination,
								children: trip.destination
							})]
						}), vehicle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarFront, { className: "h-3.5 w-3.5 mr-1 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate max-w-[100px]",
								title: vehicle.nickname,
								children: vehicle.nickname
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex-1 pb-4 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center text-sm text-muted-foreground mb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 mr-2 shrink-0 text-primary/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [trip.startDate && format(new Date(trip.startDate), "dd 'de' MMM", { locale: ptBR }), trip.endDate ? ` - ${format(new Date(trip.endDate), "dd 'de' MMM, yy", { locale: ptBR })}` : ` (${new Date(trip.startDate).getFullYear()})`] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground font-medium",
								children: "Orçamento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground",
								children: [
									new Intl.NumberFormat("pt-BR", {
										style: "currency",
										currency: "BRL"
									}).format(trip.spent),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground font-normal mx-1",
										children: "/"
									}),
									new Intl.NumberFormat("pt-BR", {
										style: "currency",
										currency: "BRL",
										maximumFractionDigits: 0
									}).format(trip.budget)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: trip.budget > 0 ? Math.min(trip.spent / trip.budget * 100, 100) : 0,
							className: `h-1.5 ${trip.budget > 0 && trip.spent / trip.budget > .9 ? "[&>div]:bg-destructive" : ""}`
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5 cursor-pointer group/chk",
						onClick: onChecklist,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground flex items-center gap-1.5 font-medium group-hover/chk:text-primary transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, { className: "h-3.5 w-3.5" }), "Checklist"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-foreground",
								children: [checklistProgress, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: checklistProgress,
							className: "h-1.5 bg-muted"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
				className: "pt-0 pb-4 px-6 gap-2 mt-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "w-full text-xs",
					onClick: onChecklist,
					children: "Preparativos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full text-xs",
					onClick: onEdit,
					children: "Detalhes"
				})]
			})
		]
	});
}
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
	const { __scopeCheckbox, checked: checkedProp, children, defaultChecked, disabled, form, name, onCheckedChange, required, value = "on", internal_do_not_use_render } = props;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: CHECKBOX_NAME
	});
	const [control, setControl] = import_react.useState(null);
	const [bubbleInput, setBubbleInput] = import_react.useState(null);
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const isFormControl = control ? !!form || !!control.closest("form") : true;
	const context = {
		checked,
		disabled,
		setChecked,
		control,
		setControl,
		name,
		form,
		value,
		hasConsumerStoppedPropagationRef,
		required,
		defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
		isFormControl,
		bubbleInput,
		setBubbleInput
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProviderImpl, {
		scope: __scopeCheckbox,
		...context,
		children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
	});
}
var TRIGGER_NAME = "CheckboxTrigger";
var CheckboxTrigger = import_react.forwardRef(({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) => {
	const { control, value, disabled, checked, required, setControl, setChecked, hasConsumerStoppedPropagationRef, isFormControl, bubbleInput } = useCheckboxContext(TRIGGER_NAME, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setControl);
	const initialCheckedStateRef = import_react.useRef(checked);
	import_react.useEffect(() => {
		const form = control?.form;
		if (form) {
			const reset = () => setChecked(initialCheckedStateRef.current);
			form.addEventListener("reset", reset);
			return () => form.removeEventListener("reset", reset);
		}
	}, [control, setChecked]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": isIndeterminate(checked) ? "mixed" : checked,
		"aria-required": required,
		"data-state": getState(checked),
		"data-disabled": disabled ? "" : void 0,
		disabled,
		value,
		...checkboxProps,
		ref: composedRefs,
		onKeyDown: composeEventHandlers(onKeyDown, (event) => {
			if (event.key === "Enter") event.preventDefault();
		}),
		onClick: composeEventHandlers(onClick, (event) => {
			setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
			if (bubbleInput && isFormControl) {
				hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
				if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
			}
		})
	});
});
CheckboxTrigger.displayName = TRIGGER_NAME;
var Checkbox$1 = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCheckbox, name, checked, defaultChecked, required, disabled, value, onCheckedChange, form, ...checkboxProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProvider, {
		__scopeCheckbox,
		checked,
		defaultChecked,
		disabled,
		required,
		onCheckedChange,
		name,
		form,
		value,
		internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxTrigger, {
			...checkboxProps,
			ref: forwardedRef,
			__scopeCheckbox
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxBubbleInput, { __scopeCheckbox })] })
	});
});
Checkbox$1.displayName = CHECKBOX_NAME;
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = import_react.forwardRef((props, forwardedRef) => {
	const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
	const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isIndeterminate(context.checked) || context.checked === true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			"data-state": getState(context.checked),
			"data-disabled": context.disabled ? "" : void 0,
			...indicatorProps,
			ref: forwardedRef,
			style: {
				pointerEvents: "none",
				...props.style
			}
		})
	});
});
CheckboxIndicator.displayName = INDICATOR_NAME;
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = import_react.forwardRef(({ __scopeCheckbox, ...props }, forwardedRef) => {
	const { control, hasConsumerStoppedPropagationRef, checked, defaultChecked, required, disabled, name, value, form, bubbleInput, setBubbleInput } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
	const prevChecked = usePrevious(checked);
	const controlSize = useSize(control);
	import_react.useEffect(() => {
		const input = bubbleInput;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		const bubbles = !hasConsumerStoppedPropagationRef.current;
		if (prevChecked !== checked && setChecked) {
			const event = new Event("click", { bubbles });
			input.indeterminate = isIndeterminate(checked);
			setChecked.call(input, isIndeterminate(checked) ? false : checked);
			input.dispatchEvent(event);
		}
	}, [
		bubbleInput,
		prevChecked,
		checked,
		hasConsumerStoppedPropagationRef
	]);
	const defaultCheckedRef = import_react.useRef(isIndeterminate(checked) ? false : checked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		type: "checkbox",
		"aria-hidden": true,
		defaultChecked: defaultChecked ?? defaultCheckedRef.current,
		required,
		disabled,
		name,
		value,
		form,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
});
CheckboxBubbleInput.displayName = BUBBLE_INPUT_NAME;
function isFunction(value) {
	return typeof value === "function";
}
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
function getState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("flex items-center justify-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
function useChecklist(tripId) {
	const { checklistItems, categories, addChecklistItem, updateChecklistItem, deleteChecklistItem, seedChecklist } = useDataStore();
	const items = checklistItems.filter((i) => i.tripId === tripId);
	(0, import_react.useEffect)(() => {
		if (items.length === 0 && tripId) seedChecklist(tripId);
	}, [
		tripId,
		items.length,
		seedChecklist
	]);
	const toggleStatus = (id, isCompleted) => {
		updateChecklistItem(id, { isCompleted });
	};
	const addCustomItem = (categoryId, title) => {
		try {
			addChecklistItem({
				tripId,
				categoryId,
				title,
				isCompleted: false,
				isCustom: true
			});
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Erro",
				description: "Não foi possível adicionar o item."
			});
		}
	};
	const deleteCustomItem = (id) => {
		const item = checklistItems.find((i) => i.id === id);
		if (item && item.isCustom) deleteChecklistItem(id);
		else toast({
			variant: "destructive",
			title: "Ação não permitida",
			description: "Não é possível remover itens base do sistema."
		});
	};
	return {
		items,
		categories,
		toggleStatus,
		addCustomItem,
		deleteCustomItem
	};
}
function ChecklistSheet({ open, onOpenChange, trip }) {
	const { items, categories, toggleStatus, addCustomItem, deleteCustomItem } = useChecklist(trip.id);
	const [newItemTitles, setNewItemTitles] = (0, import_react.useState)({});
	const completedCount = items.filter((i) => i.isCompleted).length;
	const progress = items.length > 0 ? completedCount / items.length * 100 : 0;
	const handleAddItem = (categoryId) => {
		const title = newItemTitles[categoryId]?.trim();
		if (title) {
			addCustomItem(categoryId, title);
			setNewItemTitles((prev) => ({
				...prev,
				[categoryId]: ""
			}));
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			className: "w-full sm:max-w-md overflow-y-auto flex flex-col h-[100dvh]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "pb-6 pt-2 border-b",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetTitle, {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-primary" }), "Checklist Pré-viagem"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetDescription, { children: ["Preparativos para: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-foreground",
						children: trip.title
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground font-medium",
								children: "Itens concluídos"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-primary",
								children: [
									completedCount,
									" de ",
									items.length
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: progress,
							className: "h-2"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 py-6 overflow-y-auto pr-2 -mr-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "multiple",
					defaultValue: categories.map((c) => c.id),
					className: "space-y-4",
					children: categories.map((category) => {
						const catItems = items.filter((i) => i.categoryId === category.id);
						const completedCatItems = catItems.filter((i) => i.isCompleted).length;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
							value: category.id,
							className: "border rounded-lg px-4 bg-card shadow-sm data-[state=open]:border-primary/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
								className: "hover:no-underline py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 font-semibold",
									children: [category.title, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-medium bg-muted/80 text-muted-foreground px-2 py-0.5 rounded-full ml-2",
										children: [
											completedCatItems,
											"/",
											catItems.length
										]
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionContent, {
								className: "pt-1 pb-5 space-y-3",
								children: [catItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3 group/item",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											id: `item-${item.id}`,
											checked: item.isCompleted,
											onCheckedChange: (c) => toggleStatus(item.id, !!c),
											className: "mt-0.5"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: `item-${item.id}`,
											className: `flex-1 text-sm cursor-pointer leading-tight transition-colors ${item.isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`,
											children: item.title
										}),
										item.isCustom && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "h-6 w-6 opacity-0 group-hover/item:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-1",
											onClick: () => deleteCustomItem(item.id),
											title: "Remover item",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
										})
									]
								}, item.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 mt-4 pt-3 border-t border-dashed border-border/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Adicionar novo item...",
										className: "h-8 text-sm bg-muted/30",
										value: newItemTitles[category.id] || "",
										onChange: (e) => setNewItemTitles((p) => ({
											...p,
											[category.id]: e.target.value
										})),
										onKeyDown: (e) => {
											if (e.key === "Enter") handleAddItem(category.id);
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "secondary",
										className: "h-8 w-8 p-0 shrink-0",
										disabled: !newItemTitles[category.id]?.trim(),
										onClick: () => handleAddItem(category.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
									})]
								})]
							})]
						}, category.id);
					})
				})
			})]
		})
	});
}
function TripsPage() {
	const { trips, isInitialLoading, update, remove } = useTrips();
	const [filter, setFilter] = (0, import_react.useState)("todas");
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [editingTrip, setEditingTrip] = (0, import_react.useState)(null);
	const [isChecklistOpen, setIsChecklistOpen] = (0, import_react.useState)(false);
	const [checklistTrip, setChecklistTrip] = (0, import_react.useState)(null);
	const filteredTrips = (0, import_react.useMemo)(() => {
		return trips.filter((t) => filter === "todas" || t.status === filter);
	}, [trips, filter]);
	const handleEdit = (trip) => {
		setEditingTrip(trip);
		setIsFormOpen(true);
	};
	const handleOpenChecklist = (trip) => {
		setChecklistTrip(trip);
		setIsChecklistOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-fade-in pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-bold tracking-tight",
					children: "Minhas Viagens"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mt-1",
					children: "Gerencie seus roteiros, veículos e checklists."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => {
						setEditingTrip(null);
						setIsFormOpen(true);
					},
					className: "shadow-sm shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-2" }), "Nova Viagem"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center overflow-x-auto pb-2 border-b",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: filter,
					onValueChange: (v) => setFilter(v),
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
						className: "bg-transparent h-auto p-0 space-x-1 sm:space-x-2",
						children: [
							"todas",
							"planejada",
							"em_andamento",
							"concluida"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: f,
							className: "rounded-full px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary capitalize border border-transparent data-[state=active]:border-primary/20",
							children: [f === "todas" ? "Todas" : f.replace("_", " "), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-xs font-medium bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground",
								children: f === "todas" ? trips.length : trips.filter((t) => t.status === f).length
							})]
						}, f))
					})
				})
			}),
			isInitialLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: [
					1,
					2,
					3
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "pb-3 bg-muted/10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-1/3 mb-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-2/3" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-1/2 mt-2" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
							className: "flex-1 space-y-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-3/4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-3 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-2 w-full rounded-full" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
							className: "pt-0 pb-4 px-6 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-9 w-full rounded-md" })]
						})
					]
				}, i))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
				children: [filteredTrips.map((trip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripCard, {
					trip,
					onEdit: () => handleEdit(trip),
					onChecklist: () => handleOpenChecklist(trip),
					onStatusChange: (status) => update(trip.id, { status }),
					onDelete: () => remove(trip.id)
				}, trip.id)), filteredTrips.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-full py-16 px-4 text-center border-2 border-dashed rounded-xl bg-muted/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto h-16 w-16 bg-muted flex items-center justify-center rounded-full mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-8 w-8 text-muted-foreground/60" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xl font-medium tracking-tight",
							children: "Nenhuma viagem encontrada"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground mt-2 mb-6 max-w-sm mx-auto",
							children: "Que tal organizar sua próxima aventura? Adicione um novo roteiro e comece a preparar seu checklist."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => {
								setEditingTrip(null);
								setIsFormOpen(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-2" }), " Planejar Nova Viagem"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripFormSheet, {
				open: isFormOpen,
				onOpenChange: setIsFormOpen,
				trip: editingTrip
			}),
			checklistTrip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChecklistSheet, {
				open: isChecklistOpen,
				onOpenChange: setIsChecklistOpen,
				trip: checklistTrip
			})
		]
	});
}
export { TripsPage as default };

//# sourceMappingURL=TripsPage-CDFNExQH.js.map