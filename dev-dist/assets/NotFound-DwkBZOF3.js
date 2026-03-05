import { Dt as require_react, Ot as __toESM, R as Button, St as Link, _t as require_jsx_runtime, rt as createLucideIcon, wt as useLocation } from "./index-DKaGFsaS.js";
var MapPinOff = createLucideIcon("map-pin-off", [
	["path", {
		d: "M12.75 7.09a3 3 0 0 1 2.16 2.16",
		key: "1d4wjd"
	}],
	["path", {
		d: "M17.072 17.072c-1.634 2.17-3.527 3.912-4.471 4.727a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 1.432-4.568",
		key: "12yil7"
	}],
	["path", {
		d: "m2 2 20 20",
		key: "1ooewy"
	}],
	["path", {
		d: "M8.475 2.818A8 8 0 0 1 20 10c0 1.183-.31 2.377-.81 3.533",
		key: "lhrkcz"
	}],
	["path", {
		d: "M9.13 9.13a3 3 0 0 0 3.74 3.74",
		key: "13wojd"
	}]
]);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime(), 1);
var NotFound = () => {
	const location = useLocation();
	(0, import_react.useEffect)(() => {
		console.error("404 Error: Rota não encontrada:", location.pathname);
	}, [location.pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center bg-background text-foreground px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center animate-fade-in-up",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPinOff, { className: "h-20 w-20 mx-auto text-muted-foreground mb-6 opacity-80" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-5xl font-extrabold mb-4 tracking-tight",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl text-muted-foreground mb-8 max-w-md mx-auto",
					children: "Parece que você pegou a saída errada. Essa página não existe no nosso mapa."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Voltar para o Início"
					})
				})
			]
		})
	});
};
var NotFound_default = NotFound;
export { NotFound_default as default };

//# sourceMappingURL=NotFound-DwkBZOF3.js.map