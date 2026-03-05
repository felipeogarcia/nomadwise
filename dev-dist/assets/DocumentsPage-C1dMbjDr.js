import { a as SelectValue, c as Badge, i as SelectTrigger, l as Plus, n as SelectContent, r as SelectItem, t as Select } from "./select-DFZV7kxn.js";
import { n as CircleAlert, t as Pen } from "./pen-stcQEGKI.js";
import { t as CircleCheck } from "./circle-check-DhNgcZvx.js";
import { t as EllipsisVertical } from "./ellipsis-vertical-BIrB5fb9.js";
import { t as Trash2 } from "./trash-2-C158cnQe.js";
import { A as DropdownMenuTrigger, C as Input, D as DropdownMenuItem, E as DropdownMenuContent, H as useDocumentStore, K as useDataStore, Mt as toast, T as DropdownMenu, U as documentService, Vt as require_react, Wt as __toESM, _ as Root, dt as LoaderCircle, f as Close, ft as FileText$1, g as Portal, h as Overlay, it as cn, k as DropdownMenuSeparator, kt as require_jsx_runtime, m as Description, mt as createLucideIcon, ot as X, p as Content, v as Title, w as ErrorBoundary, y as Trigger, z as Button } from "./index-Dxf5OCU-.js";
import { a as CardHeader, i as CardFooter, n as CardContent, t as Card } from "./card-CEe05NtZ.js";
import { _ as a, a as FormItem, g as string, h as object, i as FormField, n as FormControl, o as FormLabel, s as FormMessage, t as Form, u as any, y as useForm } from "./form-CFwaUMfl.js";
var Car = createLucideIcon("car", [
	["path", {
		d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
		key: "5owen"
	}],
	["circle", {
		cx: "7",
		cy: "17",
		r: "2",
		key: "u2ysq9"
	}],
	["path", {
		d: "M9 17h6",
		key: "r8uit2"
	}],
	["circle", {
		cx: "17",
		cy: "17",
		r: "2",
		key: "axvx0g"
	}]
]);
var Clock = createLucideIcon("clock", [["circle", {
	cx: "12",
	cy: "12",
	r: "10",
	key: "1mglay"
}], ["path", {
	d: "M12 6v6l4 2",
	key: "mmk7yg"
}]]);
var CloudUpload = createLucideIcon("cloud-upload", [
	["path", {
		d: "M12 13v8",
		key: "1l5pq0"
	}],
	["path", {
		d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
		key: "1pljnt"
	}],
	["path", {
		d: "m8 17 4-4 4 4",
		key: "1quai1"
	}]
]);
var ExternalLink = createLucideIcon("external-link", [
	["path", {
		d: "M15 3h6v6",
		key: "1q9fwt"
	}],
	["path", {
		d: "M10 14 21 3",
		key: "gplh6r"
	}],
	["path", {
		d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
		key: "a6xqqp"
	}]
]);
var Eye = createLucideIcon("eye", [["path", {
	d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
	key: "1nclc0"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
var ShieldCheck = createLucideIcon("shield-check", [["path", {
	d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
	key: "oel41y"
}], ["path", {
	d: "m9 12 2 2 4-4",
	key: "dzmm74"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const DOCUMENT_TYPES = [
	{
		value: "cnh",
		label: "CNH"
	},
	{
		value: "pid",
		label: "PID (Internacional)"
	},
	{
		value: "crlv",
		label: "CRLV (Veículo)"
	},
	{
		value: "passport",
		label: "Passaporte"
	},
	{
		value: "insurance",
		label: "Seguro"
	},
	{
		value: "other",
		label: "Outros"
	}
];
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function ExpirationBadge({ expiryDate }) {
	const { status, label, colorClass, icon: Icon } = (0, import_react.useMemo)(() => {
		if (!expiryDate) return {
			status: "none",
			label: "Sem validade",
			colorClass: "bg-muted text-muted-foreground hover:bg-muted/80",
			icon: CircleCheck
		};
		const today = /* @__PURE__ */ new Date();
		today.setHours(0, 0, 0, 0);
		const diffTime = new Date(expiryDate).getTime() - today.getTime();
		const diffDays = Math.ceil(diffTime / (1e3 * 3600 * 24));
		if (diffDays < 0) return {
			status: "expired",
			label: "Vencido",
			colorClass: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
			icon: CircleAlert
		};
		if (diffDays <= 90) return {
			status: "warning",
			label: `Vence em ${diffDays} dias`,
			colorClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25 border-transparent",
			icon: Clock
		};
		return {
			status: "valid",
			label: "Válido",
			colorClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 border-transparent",
			icon: CircleCheck
		};
	}, [expiryDate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: "outline",
		className: `flex items-center gap-1.5 px-2.5 py-0.5 ${colorClass}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }), label]
	});
}
function DocumentCard({ document, onEdit, onDelete }) {
	const { vehicles } = useDataStore();
	const [isOpening, setIsOpening] = (0, import_react.useState)(false);
	const vehicle = document.vehicle_id ? vehicles.find((v) => v.id === document.vehicle_id) : null;
	const typeLabel = DOCUMENT_TYPES.find((t) => t.value === document.type)?.label || "Documento";
	const handleView = async () => {
		if (!document.file_path) {
			toast({ description: "Nenhum arquivo anexado a este documento." });
			return;
		}
		try {
			setIsOpening(true);
			const url = await documentService.getSignedUrl(document.file_path);
			window.open(url, "_blank");
		} catch (error) {
			toast({
				title: "Erro",
				description: "Não foi possível abrir o arquivo.",
				variant: "destructive"
			});
		} finally {
			setIsOpening(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "group flex flex-col overflow-hidden transition-all hover:shadow-md animate-fade-in-up",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "flex flex-row items-start justify-between space-y-0 p-5 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText$1, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold leading-none tracking-tight line-clamp-1",
							title: document.name,
							children: document.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mt-1.5",
							children: typeLabel
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "icon",
						className: "h-8 w-8 -mr-2 opacity-0 group-hover:opacity-100 transition-opacity",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Opções"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
					align: "end",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: handleView,
							disabled: !document.file_path || isOpening,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "mr-2 h-4 w-4" }), " Visualizar Arquivo"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => onEdit(document),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "mr-2 h-4 w-4" }), " Editar"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
							onClick: () => onDelete(document.id, document.file_path),
							className: "text-destructive focus:bg-destructive focus:text-destructive-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-4 w-4" }), " Excluir"]
						})
					]
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "flex-1 p-5 pt-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 mt-2",
					children: [vehicle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Car, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							vehicle.nickname,
							" (",
							vehicle.plate,
							")"
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpirationBadge, { expiryDate: document.expiry_date })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
				className: "p-5 pt-0 flex justify-end border-t bg-muted/20 px-5 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "text-primary hover:text-primary/80",
					onClick: handleView,
					disabled: !document.file_path || isOpening,
					children: [
						isOpening ? "Aberto..." : "Acessar",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-2 h-3 w-3" })
					]
				})
			})
		]
	});
}
var Dialog = Root;
var DialogPortal = Portal;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = Overlay.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg overflow-y-auto max-h-screen", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = Title.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = Description.displayName;
var MAX_FILE_SIZE = 10 * 1024 * 1024;
var ACCEPTED_FILE_TYPES = [
	"application/pdf",
	"image/jpeg",
	"image/jpg",
	"image/png"
];
var formSchema = object({
	name: string().min(2, "Nome deve ter pelo menos 2 caracteres"),
	type: string().min(1, "Selecione um tipo de documento"),
	vehicle_id: string().optional().nullable(),
	expiry_date: string().optional().nullable(),
	file: any().refine((files) => {
		if (!files || files.length === 0) return true;
		return files[0]?.size <= MAX_FILE_SIZE;
	}, "Tamanho máximo permitido é 10MB.").refine((files) => {
		if (!files || files.length === 0) return true;
		return ACCEPTED_FILE_TYPES.includes(files[0]?.type);
	}, "Apenas PDF, JPG e PNG são suportados.").optional()
});
function DocumentForm({ open, onOpenChange, document, onSubmit }) {
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [selectedFile, setSelectedFile] = (0, import_react.useState)(null);
	const { vehicles } = useDataStore();
	const form = useForm({
		resolver: a(formSchema),
		defaultValues: {
			name: document?.name || "",
			type: document?.type || "",
			vehicle_id: document?.vehicle_id || "",
			expiry_date: document?.expiry_date ? document.expiry_date.split("T")[0] : "",
			file: void 0
		}
	});
	const handleFileChange = (e) => {
		const files = e.target.files;
		if (files && files.length > 0) {
			setSelectedFile(files[0]);
			form.setValue("file", files);
			form.trigger("file");
		}
	};
	const handleClearFile = () => {
		setSelectedFile(null);
		form.setValue("file", void 0);
	};
	const handleSubmit = async (values) => {
		try {
			setIsSubmitting(true);
			await onSubmit({
				name: values.name,
				type: values.type,
				vehicle_id: values.vehicle_id || null,
				expiry_date: values.expiry_date ? new Date(values.expiry_date).toISOString() : null
			}, selectedFile);
			onOpenChange(false);
			form.reset();
			setSelectedFile(null);
		} catch (error) {} finally {
			setIsSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-[500px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: document ? "Editar Documento" : "Novo Documento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Armazene seus documentos de forma segura. Arquivos limitados a 10MB (PDF/Imagens)." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: form.handleSubmit(handleSubmit),
					className: "space-y-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "name",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Nome do Documento" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Ex: CNH João, CRLV da Bessie",
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
										defaultValue: field.value,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione" }) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: DOCUMENT_TYPES.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: type.value,
											children: type.label
										}, type.value)) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								control: form.control,
								name: "expiry_date",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Data de Vencimento" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										...field,
										value: field.value || ""
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
								] })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "vehicle_id",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Veículo Vinculado (Opcional)" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									onValueChange: field.onChange,
									value: field.value || "",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione um veículo" }) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "",
										children: "Nenhum veículo"
									}), vehicles.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: v.id,
										children: [
											v.nickname,
											" (",
											v.plate,
											")"
										]
									}, v.id))] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "file",
							render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Arquivo Anexo" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2",
									children: !selectedFile && !document?.file_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex w-full items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											htmlFor: "dropzone-file",
											className: "flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/10 hover:bg-muted/30 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-col items-center justify-center pb-6 pt-5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "mb-2 h-8 w-8 text-muted-foreground" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mb-1 text-sm text-muted-foreground",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold",
															children: "Clique para enviar"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground",
														children: "PDF, PNG, JPG (Max 10MB)"
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "dropzone-file",
												type: "file",
												className: "hidden",
												accept: ".pdf,image/png,image/jpeg,image/jpg",
												onChange: handleFileChange
											})]
										})
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-md border p-3 bg-muted/20",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate text-sm font-medium",
												children: selectedFile ? selectedFile.name : "Arquivo já salvo no cofre"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											variant: "ghost",
											size: "icon",
											onClick: handleClearFile,
											className: "h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
										})]
									})
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
							className: "pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => onOpenChange(false),
								disabled: isSubmitting,
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								disabled: isSubmitting,
								children: [isSubmitting && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), document ? "Salvar Alterações" : "Adicionar Documento"]
							})]
						})
					]
				})
			})]
		})
	});
}
function DocumentsPage() {
	const { documents, isLoading, addDocument, updateDocument, deleteDocument } = useDocumentStore();
	const { vehicles } = useDataStore();
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [editingDoc, setEditingDoc] = (0, import_react.useState)(null);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [typeFilter, setTypeFilter] = (0, import_react.useState)("all");
	const [vehicleFilter, setVehicleFilter] = (0, import_react.useState)("all");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	const handleAdd = () => {
		setEditingDoc(null);
		setIsFormOpen(true);
	};
	const handleEdit = (doc) => {
		setEditingDoc(doc);
		setIsFormOpen(true);
	};
	const handleSubmit = async (data, file) => {
		if (editingDoc) await updateDocument(editingDoc.id, data, file);
		else await addDocument(data, file);
	};
	const filteredDocuments = (0, import_react.useMemo)(() => {
		return documents.filter((doc) => {
			if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
			if (typeFilter !== "all" && doc.type !== typeFilter) return false;
			if (vehicleFilter !== "all" && doc.vehicle_id !== vehicleFilter) return false;
			if (statusFilter !== "all") {
				const today = /* @__PURE__ */ new Date();
				today.setHours(0, 0, 0, 0);
				const expiry = doc.expiry_date ? new Date(doc.expiry_date) : null;
				if (statusFilter === "valid") {
					if (!expiry) return true;
					return expiry >= today;
				}
				if (statusFilter === "expiring") {
					if (!expiry) return false;
					const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1e3 * 3600 * 24));
					return diffDays >= 0 && diffDays <= 90;
				}
				if (statusFilter === "expired") {
					if (!expiry) return false;
					return expiry < today;
				}
			}
			return true;
		});
	}, [
		documents,
		searchTerm,
		typeFilter,
		vehicleFilter,
		statusFilter
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row md:items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Cofre de Documentos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mt-1",
					children: "Armazene e gerencie passaportes, CNH, CRLV e seguros com segurança."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleAdd,
					className: "w-full md:w-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Novo Documento"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row gap-4 bg-card p-4 rounded-xl border shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-3 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Buscar documento...",
							className: "pl-9",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: typeFilter,
						onValueChange: setTypeFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-full md:w-[180px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Tipo" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "Todos os Tipos"
						}), DOCUMENT_TYPES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: t.value,
							children: t.label
						}, t.value))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: vehicleFilter,
						onValueChange: setVehicleFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-full md:w-[180px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Veículo" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "Todos os Veículos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "",
								children: "(Sem vínculo)"
							}),
							vehicles.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: v.id,
								children: v.nickname
							}, v.id))
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: statusFilter,
						onValueChange: setStatusFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-full md:w-[180px]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Status" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "Todos os Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "valid",
								children: "Válidos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "expiring",
								children: "Vencendo em breve"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "expired",
								children: "Vencidos"
							})
						] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary, { children: isLoading && documents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" })
			}) : filteredDocuments.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: filteredDocuments.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentCard, {
					document: doc,
					onEdit: handleEdit,
					onDelete: deleteDocument
				}, doc.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-20 text-center bg-card rounded-xl border border-dashed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-6 w-6 text-muted-foreground" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-semibold",
						children: "Nenhum documento encontrado"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground mt-1 max-w-sm",
						children: documents.length === 0 ? "Seu cofre está vazio. Adicione seu primeiro documento para manter tudo organizado na estrada." : "Nenhum documento corresponde aos filtros selecionados."
					}),
					documents.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleAdd,
						variant: "outline",
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-2 h-4 w-4" }), " Adicionar Agora"]
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DocumentForm, {
				open: isFormOpen,
				onOpenChange: setIsFormOpen,
				document: editingDoc,
				onSubmit: handleSubmit
			})
		]
	});
}
export { DocumentsPage as default };

//# sourceMappingURL=DocumentsPage-C1dMbjDr.js.map