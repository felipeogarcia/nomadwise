import { t as ChevronDown } from "./chevron-down-Bme8Z2Cw.js";
import { t as CircleCheck } from "./circle-check-DhNgcZvx.js";
import { t as Star } from "./star-DlJgHySz.js";
import { t as Tent } from "./tent-CvI3sd1u.js";
import { t as Wallet } from "./wallet-x2Zl3uSN.js";
import { Ft as Navigate, Pt as Link, Wt as __toESM, ft as FileText, kt as require_jsx_runtime, mt as createLucideIcon, n as AvatarFallback, q as useAuthStore, r as AvatarImage, st as Wrench, t as Avatar, ut as Map, z as Button } from "./index-Dxf5OCU-.js";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-C9kk6IDy.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CEe05NtZ.js";
var ArrowRight = createLucideIcon("arrow-right", [["path", {
	d: "M5 12h14",
	key: "1ays0h"
}], ["path", {
	d: "m12 5 7 7-7 7",
	key: "xquz4c"
}]]);
var Truck = createLucideIcon("truck", [
	["path", {
		d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",
		key: "wrbu53"
	}],
	["path", {
		d: "M15 18H9",
		key: "1lyqi6"
	}],
	["path", {
		d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
		key: "lysw3i"
	}],
	["circle", {
		cx: "17",
		cy: "18",
		r: "2",
		key: "332jqn"
	}],
	["circle", {
		cx: "7",
		cy: "18",
		r: "2",
		key: "19iecd"
	}]
]);
const features = [
	{
		icon: Map,
		title: "Gestão de Roteiros",
		description: "Planeje cada parada, registre experiências e mantenha um diário organizado das suas viagens."
	},
	{
		icon: Wallet,
		title: "Controle Financeiro",
		description: "Acompanhe orçamentos por viagem, registre gastos com combustível e pedágios."
	},
	{
		icon: Tent,
		title: "Estadias e Acampamentos",
		description: "Salve seus pontos de parada favoritos, avalie campings e locais de wild camping."
	},
	{
		icon: Wrench,
		title: "Garagem Virtual",
		description: "Controle manutenções preventivas e receba alertas antes que problemas aconteçam."
	},
	{
		icon: FileText,
		title: "Documentos na Nuvem",
		description: "Acesse apólices de seguro, documentos do veículo e manuais de qualquer lugar."
	},
	{
		icon: Truck,
		title: "Perfil do Veículo",
		description: "Registre as dimensões, consumo médio e histórico completo do seu companheiro de estrada."
	}
];
const testimonials = [
	{
		name: "Carlos & Ana",
		role: "Viajantes Full-time",
		content: "O Nomadwise mudou a forma como controlamos nossos gastos na estrada. Antes era tudo em planilhas confusas, agora temos clareza total.",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=1"
	},
	{
		name: "Julia Mendes",
		role: "Vanlifer",
		content: "A garagem virtual já me salvou de perder a data da troca de óleo e revisão dos freios. Essencial para quem mora no veículo.",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=female&seed=2"
	},
	{
		name: "Roberto Silva",
		role: "Expedições 4x4",
		content: "Poder guardar todos os documentos offline e ter o roteiro sempre à mão facilita muito nas travessias de fronteira na América do Sul.",
		avatar: "https://img.usecurling.com/ppl/thumbnail?gender=male&seed=3"
	}
];
const faqs = [
	{
		question: "O que é o Nomadwise?",
		answer: "O Nomadwise é uma plataforma SaaS desenvolvida especialmente para nômades digitais, viajantes de longa duração e vanlifers, ajudando a gerenciar viagens, finanças e manutenção de veículos em um só lugar."
	},
	{
		question: "Funciona sem internet?",
		answer: "Sim! Sabemos que na estrada nem sempre há sinal. O Nomadwise sincroniza seus dados localmente e faz o backup na nuvem assim que você se conecta novamente."
	},
	{
		question: "É só para quem tem Motorhome?",
		answer: "Não. Nossa plataforma atende viajantes de motorhome, campervan, expedições 4x4, mochileiros e até cicloturistas. O sistema é flexível às suas necessidades."
	},
	{
		question: "Posso compartilhar meu roteiro?",
		answer: "Sim, você pode gerar um link público do seu roteiro atual e compartilhar com amigos e familiares para que acompanhem sua jornada em tempo real."
	},
	{
		question: "Como funciona o período gratuito?",
		answer: "Durante nosso período de lançamento, o Nomadwise é 100% gratuito. Todos os usuários que se cadastrarem agora terão acesso vitalício aos recursos da versão Pro."
	}
];
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function Landing() {
	const { user, isAuthenticated, login } = useAuthStore();
	if (isAuthenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: user?.status === "active" ? "/app/dashboard" : "/onboarding",
		replace: true
	});
	const scrollTo = (id) => (e) => {
		e.preventDefault();
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-20 overflow-hidden bg-background",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/40 via-background to-background" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "container relative z-10 px-4 md:px-6 flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 max-w-5xl animate-fade-in-up",
								children: [
									"Sua vida na estrada,",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60",
										children: "finalmente organizada."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl animate-fade-in-up",
								style: { animationDelay: "100ms" },
								children: "A plataforma definitiva para quem vive em movimento. Roteiros, finanças e manutenção do veículo em um único lugar."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-fade-in-up",
								style: { animationDelay: "200ms" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									className: "h-14 px-8 text-lg shadow-lg hover:shadow-primary/25 transition-all",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/login",
										onClick: (e) => {
											e.preventDefault();
											login();
										},
										children: ["Começar grátis ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-5 w-5" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									variant: "outline",
									className: "h-14 px-8 text-lg",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#features",
										onClick: scrollTo("features"),
										children: "Ver como funciona"
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground hidden md:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-8 w-8" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "features",
				className: "py-24 bg-muted/40 border-y",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container px-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center mb-16 max-w-3xl mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-4xl font-bold tracking-tight mb-4",
							children: "Tudo que você precisa para a estrada"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg text-muted-foreground",
							children: "Projetado especificamente para as necessidades de quem vive em movimento."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-2 lg:grid-cols-3 gap-8",
						children: features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "bg-card/50 backdrop-blur border shadow-sm hover:-translate-y-1 transition-all group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-all",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(f.icon, { className: "h-6 w-6 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-xl",
								children: f.title
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: f.description
							}) })]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "testimonials",
				className: "py-24 bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container px-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mb-16 max-w-3xl mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-4xl font-bold tracking-tight mb-4",
							children: "Quem usa, recomenda"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid md:grid-cols-3 gap-8",
						children: testimonials.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "bg-card border shadow-sm h-full flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1 mb-2",
									children: [
										1,
										2,
										3,
										4,
										5
									].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-primary text-primary" }, s))
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "flex-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-lg italic text-muted-foreground",
										children: [
											"\"",
											t.content,
											"\""
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardFooter, {
									className: "flex items-center gap-4 border-t pt-6 mt-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
										src: t.avatar,
										alt: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: t.name.charAt(0) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold leading-none",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground mt-1",
										children: t.role
									})] })]
								})
							]
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "pricing",
				className: "py-24 bg-muted/40 border-y",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container px-4 md:px-6 flex flex-col items-center text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-12 max-w-3xl mx-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-4xl font-bold tracking-tight mb-4",
							children: "Simples e transparente"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "w-full max-w-md border-primary/50 shadow-xl shadow-primary/10 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg",
								children: "LANÇAMENTO"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
								className: "text-center pb-8 pt-10",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										className: "text-2xl mb-2",
										children: "Pioneiros"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-baseline justify-center gap-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-5xl font-extrabold",
											children: "Grátis"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
										className: "text-base mt-2",
										children: "Acesso total aos recursos premium por tempo limitado."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-4 text-left",
								children: [
									"Roteiros ilimitados",
									"Gestão financeira completa",
									"Múltiplos veículos",
									"Armazenamento de documentos"
								].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
								}, i))
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
								className: "pt-8 pb-10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									className: "w-full h-14 text-lg",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/login",
										onClick: (e) => {
											e.preventDefault();
											login();
										},
										children: "Garantir acesso"
									})
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "faq",
				className: "py-24 bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container px-4 md:px-6 max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mb-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-4xl font-bold tracking-tight mb-4",
							children: "Perguntas Frequentes"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
						type: "single",
						collapsible: true,
						className: "w-full",
						children: faqs.map((faq, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
							value: `item-${i}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
								className: "text-left text-lg font-medium",
								children: faq.question
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
								className: "text-muted-foreground text-base leading-relaxed",
								children: faq.answer
							})]
						}, i))
					})]
				})
			})
		]
	});
}
export { Landing as default };

//# sourceMappingURL=Landing-L4uhcbA_.js.map