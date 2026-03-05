import { Ct as toast, H as useAuthStore, Mt as __toESM, Ot as useNavigate, R as Button, S as Input, bt as require_jsx_runtime, it as LoaderCircle, jt as require_react, ot as createLucideIcon } from "./index-DfyIcUCt.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-cbK2y9CX.js";
import { a as FormItem, d as object, f as string, h as useForm, i as FormField, n as FormControl, o as FormLabel, p as a, r as FormDescription, s as FormMessage, t as Form } from "./form-D4hQrF_5.js";
var Ticket = createLucideIcon("ticket", [
	["path", {
		d: "M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z",
		key: "qn84l0"
	}],
	["path", {
		d: "M13 5v2",
		key: "dyzc3o"
	}],
	["path", {
		d: "M13 17v2",
		key: "1ont0d"
	}],
	["path", {
		d: "M13 11v2",
		key: "1wjjxi"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
const validateCoupon = async (code) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(code.toUpperCase() === "NOMAD2024");
		}, 800);
	});
};
function useOnboarding() {
	const { completeProfile } = useAuthStore();
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const submitProfile = async (data) => {
		setIsLoading(true);
		try {
			if (data.couponCode) {
				if (!await validateCoupon(data.couponCode)) {
					toast({
						title: "Cupom inválido",
						description: "O código informado não é válido ou já expirou.",
						variant: "destructive"
					});
					return false;
				}
				toast({
					title: "Cupom aplicado!",
					description: "Você garantiu benefícios exclusivos na sua assinatura."
				});
			}
			completeProfile({
				name: data.fullName,
				phone: data.phone,
				cpf: data.cpf,
				birthDate: data.birthDate
			});
			toast({
				title: "Perfil ativado",
				description: "Bem-vindo ao Nomadwise!"
			});
			return true;
		} catch (error) {
			toast({
				title: "Erro inesperado",
				description: "Não foi possível salvar seu perfil. Tente novamente.",
				variant: "destructive"
			});
			return false;
		} finally {
			setIsLoading(false);
		}
	};
	return {
		submitProfile,
		isLoading
	};
}
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var profileFormSchema = object({
	fullName: string().min(3, { message: "Nome deve ter pelo menos 3 caracteres." }),
	phone: string().regex(/^\d{10,11}$/, "Telefone deve conter 10 ou 11 dígitos numéricos."),
	cpf: string().regex(/^\d{11}$/, "CPF deve conter 11 dígitos numéricos."),
	birthDate: string().refine((val) => !isNaN(Date.parse(val)), { message: "Data de nascimento inválida." }),
	couponCode: string().optional()
});
function Onboarding() {
	const navigate = useNavigate();
	const { submitProfile, isLoading } = useOnboarding();
	const form = useForm({
		resolver: a(profileFormSchema),
		defaultValues: {
			fullName: "",
			phone: "",
			cpf: "",
			birthDate: "",
			couponCode: ""
		}
	});
	async function onSubmit(data) {
		if (await submitProfile(data)) navigate("/app/dashboard");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col bg-background/50 items-center justify-center p-4 animate-fade-in-up",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg mb-8 text-center space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-extrabold tracking-tight",
				children: "Falta pouco!"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Precisamos de mais alguns detalhes para configurar sua conta Nomadwise."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-lg shadow-elevation border-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-xl",
				children: "Complete seu Perfil"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Suas informações são mantidas de forma segura." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
				...form,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: form.handleSubmit(onSubmit),
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "fullName",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Nome Completo" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "João da Silva",
									...field
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								control: form.control,
								name: "cpf",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "CPF" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Apenas números",
										maxLength: 11,
										...field
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								control: form.control,
								name: "phone",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Telefone" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Ex: 11999999999",
										maxLength: 11,
										...field
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
								] })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
							control: form.control,
							name: "birthDate",
							render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormLabel, { children: "Data de Nascimento" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									...field
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-4 border-t",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormField, {
								control: form.control,
								name: "couponCode",
								render: ({ field }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormItem, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FormLabel, {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "h-4 w-4 text-primary" }),
											"Código de Cupom",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground font-normal",
												children: "(Opcional)"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormControl, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Ex: NOMAD2024",
										className: "uppercase",
										...field
									}) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormDescription, { children: "Insira seu código promocional, se tiver um." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormMessage, {})
								] })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "w-full h-11 text-base shadow-md",
							disabled: isLoading,
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), "Validando e Salvando..."] }) : "Finalizar Cadastro"
						})
					]
				})
			}) })]
		})]
	});
}
export { Onboarding as default };

//# sourceMappingURL=Onboarding-E9PIU9Z1.js.map