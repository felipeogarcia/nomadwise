import { n as MapPin, t as Progress } from "./progress--EK9ce2u.js";
import { t as Wallet } from "./wallet-Cgbt-ZkU.js";
import { Dt as require_react, H as useAuthStore, Ot as __toESM, Q as TriangleAlert, R as Button, St as Link, V as useDataStore, _t as require_jsx_runtime, rt as createLucideIcon } from "./index-DKaGFsaS.js";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-D6QDO1M6.js";
var TrendingUp = createLucideIcon("trending-up", [["path", {
	d: "M16 7h6v6",
	key: "box55l"
}], ["path", {
	d: "m22 7-8.5 8.5-5-5L2 17",
	key: "1t1m79"
}]]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
function DashboardPage() {
	const { trips, vehicles } = useDataStore();
	const { user } = useAuthStore();
	const activeTrips = (0, import_react.useMemo)(() => trips.filter((t) => t.status === "em_andamento"), [trips]);
	const totalBudget = (0, import_react.useMemo)(() => activeTrips.reduce((acc, t) => acc + t.budget, 0), [activeTrips]);
	const totalSpent = (0, import_react.useMemo)(() => activeTrips.reduce((acc, t) => acc + t.spent, 0), [activeTrips]);
	const budgetPercentage = totalBudget > 0 ? totalSpent / totalBudget * 100 : 0;
	const needsMaintenance = (0, import_react.useMemo)(() => {
		const today = /* @__PURE__ */ new Date();
		return vehicles.filter((v) => {
			const diffTime = new Date(v.nextMaintenance).getTime() - today.getTime();
			return Math.ceil(diffTime / (1e3 * 60 * 60 * 24)) <= 30;
		});
	}, [vehicles]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "text-3xl font-bold tracking-tight",
				children: [
					"Olá, ",
					user?.name?.split(" ")[0] || "Viajante",
					"!"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground mt-1",
				children: "Aqui está o resumo das suas aventuras e veículos."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "hover:shadow-md transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-sm font-medium",
								children: "Viagens Ativas"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold",
							children: activeTrips.length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: [trips.filter((t) => t.status === "planejada").length, " planejadas"]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "hover:shadow-md transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-sm font-medium",
								children: "Orçamento Atual"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4 text-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-bold",
								children: new Intl.NumberFormat("pt-BR", {
									style: "currency",
									currency: "BRL"
								}).format(totalSpent)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: budgetPercentage,
								className: "h-2 mt-3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-2",
								children: [budgetPercentage.toFixed(1), "% do total planejado consumido"]
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "hover:shadow-md transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-sm font-medium",
								children: "Veículos na Garagem"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold",
							children: vehicles.length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "Prontos para a estrada"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "border-destructive/50 bg-destructive/5 hover:shadow-md transition-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "flex flex-row items-center justify-between space-y-0 pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
								className: "text-sm font-medium text-destructive",
								children: "Atenção Necessária"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 text-destructive" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold text-destructive",
							children: needsMaintenance.length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive/80 mt-1",
							children: "Veículos próximos da manutenção"
						})] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "col-span-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Viagens em Andamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Acompanhamento das suas expedições atuais." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: activeTrips.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-10 w-10 text-muted-foreground mb-4 opacity-50" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "Nenhuma viagem em andamento."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "link",
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/app/trips",
									children: "Planejar nova viagem"
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-6",
						children: activeTrips.map((trip) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b pb-4 last:border-0 last:pb-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium leading-none",
									children: trip.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: ["Destino: ", trip.destination]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: new Intl.NumberFormat("pt-BR", {
										style: "currency",
										currency: "BRL"
									}).format(trip.spent)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"de",
										" ",
										new Intl.NumberFormat("pt-BR", {
											style: "currency",
											currency: "BRL"
										}).format(trip.budget)
									]
								})]
							})]
						}, trip.id))
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Avisos de Manutenção" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Próximas revisões programadas." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: needsMaintenance.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground text-center py-8",
						children: "Tudo em dia com seus veículos!"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: needsMaintenance.map((vehicle) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4 p-3 rounded-lg border bg-card text-card-foreground shadow-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-destructive mt-0.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-medium leading-none",
										children: [
											vehicle.make,
											" ",
											vehicle.model
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: ["Revisão até: ", new Date(vehicle.nextMaintenance).toLocaleDateString("pt-BR")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									size: "sm",
									className: "h-7 text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/app/garage",
										children: "Ver"
									})
								})
							]
						}, vehicle.id))
					}) })]
				})]
			})
		]
	});
}
export { DashboardPage as default };

//# sourceMappingURL=DashboardPage-hwSmtIKL.js.map