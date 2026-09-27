/* @ds-bundle: {"format":4,"namespace":"ComprFCilDesignSystem_3bc5cd","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"IconButton","sourcePath":"components/actions/IconButton.jsx"},{"name":"GlowBackdrop","sourcePath":"components/brand/GlowBackdrop.jsx"},{"name":"NeonHeading","sourcePath":"components/brand/NeonHeading.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"BusinessCard","sourcePath":"components/display/BusinessCard.jsx"},{"name":"CatalogCard","sourcePath":"components/display/CatalogCard.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"SearchInput","sourcePath":"components/forms/SearchInput.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"CATEGORY_ICONS","sourcePath":"components/icons/Icon.jsx"},{"name":"Icon","sourcePath":"components/icons/Icon.jsx"},{"name":"BusinessSheet","sourcePath":"components/map/BusinessSheet.jsx"},{"name":"MapMarker","sourcePath":"components/map/MapMarker.jsx"},{"name":"CategoryChip","sourcePath":"components/selection/CategoryChip.jsx"},{"name":"TypeSelector","sourcePath":"components/selection/TypeSelector.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"4d55029754b8","components/actions/IconButton.jsx":"45ad5a39b3ce","components/brand/GlowBackdrop.jsx":"4ea775f49928","components/brand/NeonHeading.jsx":"6ffde74862a9","components/brand/Wordmark.jsx":"38bdd494e48e","components/display/Badge.jsx":"a712b01a9889","components/display/BusinessCard.jsx":"11852f9793d9","components/display/CatalogCard.jsx":"270575f3b5d8","components/feedback/Toast.jsx":"ea7c03435ff6","components/forms/SearchInput.jsx":"19c1d6340988","components/forms/Switch.jsx":"ff8a15958685","components/forms/TextField.jsx":"6d237c3b559d","components/icons/Icon.jsx":"f96a93686931","components/map/BusinessSheet.jsx":"fb82a30dbc8e","components/map/MapMarker.jsx":"54f008a04d2e","components/selection/CategoryChip.jsx":"3432a814dafd","components/selection/TypeSelector.jsx":"5d07cc306c86","ui_kits/landing/Catalog.jsx":"cf18ff3209ee","ui_kits/landing/Hero.jsx":"bec1ac4d637a","ui_kits/landing/Nav.jsx":"75e0988cf57e","ui_kits/landing/Sections.jsx":"78c02be69323","ui_kits/landing/data.js":"19d5c95d8916","ui_kits/landing/image-slot.js":"fff26d081c8d","ui_kits/map-app/MapChrome.jsx":"88e05c88d8bd","ui_kits/map-app/MapView.jsx":"0f833223f0f5","ui_kits/map-app/map-data.js":"68de4dc4923e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ComprFCilDesignSystem_3bc5cd = window.ComprFCilDesignSystem_3bc5cd || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/GlowBackdrop.jsx
try { (() => {
const K = 'var(--cf-rb-coral)',
  S = 'var(--cf-rb-sky)',
  V = 'var(--cf-rb-violet)';
const P = {
  rainbow: [V, S, K],
  tienda: [K, S, V],
  servicio: [S, V, K],
  emprendimiento: [V, K, S]
};
function GlowBackdrop({
  palette = 'rainbow',
  intensity = .42,
  parallax = true,
  style
}) {
  const ref = React.useRef(null);
  const [y, setY] = React.useState(0);
  React.useEffect(() => {
    if (!parallax) return;
    const rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) return;
    let sc = ref.current && ref.current.closest('[data-scroll]') || window;
    const f = () => {
      const r = ref.current && ref.current.getBoundingClientRect();
      if (r) setY(Math.max(-600, Math.min(600, -r.top)));
    };
    f();
    sc.addEventListener('scroll', f, {
      passive: true
    });
    return () => sc.removeEventListener('scroll', f);
  }, [parallax]);
  const c = P[palette] || P.rainbow;
  const b = (i, x, t, w, sp, dl) => ({
    position: 'absolute',
    left: x,
    top: t,
    width: w,
    height: w,
    borderRadius: '50%',
    background: c[i],
    filter: 'blur(var(--blur-blob))',
    opacity: intensity,
    transform: 'translate3d(0,' + -y * sp + 'px,0)',
    willChange: 'transform'
  });
  const inner = d => ({
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'inherit',
    animation: 'cf-drift var(--dur-drift) var(--ease-in-out) ' + d + 's infinite'
  });
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: b(0, '-10%', '-8%', '46vmax', .15)
  }, /*#__PURE__*/React.createElement("div", {
    style: inner(0)
  })), /*#__PURE__*/React.createElement("div", {
    style: b(1, '45%', '20%', '40vmax', .28)
  }, /*#__PURE__*/React.createElement("div", {
    style: inner(-7)
  })), /*#__PURE__*/React.createElement("div", {
    style: b(2, '70%', '-12%', '36vmax', .08)
  }, /*#__PURE__*/React.createElement("div", {
    style: inner(-13)
  })));
}
Object.assign(__ds_scope, { GlowBackdrop });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/GlowBackdrop.jsx", error: String((e && e.message) || e) }); }

// components/brand/NeonHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function NeonHeading({
  children,
  as = 'h2',
  type,
  size,
  flicker = true,
  style,
  ...rest
}) {
  const ref = React.useRef(null);
  const [on, setOn] = React.useState(!flicker);
  React.useEffect(() => {
    if (!flicker || !ref.current) return;
    const rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    }, {
      threshold: .4
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [flicker]);
  const T = as;
  const fs = size || {
    h1: 'var(--fs-display)',
    h2: 'var(--fs-h1)',
    h3: '28px'
  }[as] || 'var(--fs-h1)';
  return /*#__PURE__*/React.createElement(T, _extends({
    ref: ref,
    "data-type": type,
    className: 'cf-neon' + (flicker && on ? ' cf-neon-on' : '')
  }, rest, {
    style: {
      margin: 0,
      fontSize: fs,
      lineHeight: 1.05,
      opacity: on ? 1 : 0.12,
      textWrap: 'balance',
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { NeonHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/NeonHeading.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function Wordmark({
  size = 32,
  withMark = true,
  stacked,
  markSrc = 'assets/logo/basket-mark.png',
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.3,
      ...style
    },
    "aria-label": "Compr\xE1 F\xE1cil"
  }, withMark && /*#__PURE__*/React.createElement("img", {
    src: markSrc,
    alt: "",
    style: {
      height: size * (stacked ? 2.1 : 1.35),
      width: 'auto'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "cf-neon",
    style: {
      fontSize: size,
      lineHeight: stacked ? 1 : 1,
      whiteSpace: stacked ? 'normal' : 'nowrap'
    }
  }, stacked ? /*#__PURE__*/React.createElement(React.Fragment, null, "COMPR\xC1", /*#__PURE__*/React.createElement("br", null), "F\xC1CIL") : 'COMPRÁ FÁCIL'));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
const TYPE = {
  tienda: {
    a: 'var(--tienda)',
    b: 'var(--tienda-2)',
    g: 'var(--tienda-grad)',
    soft: 'var(--tienda-soft)',
    glow: 'var(--glow-tienda)',
    rgb: '255,111,97'
  },
  servicio: {
    a: 'var(--servicio)',
    b: 'var(--servicio-2)',
    g: 'var(--servicio-grad)',
    soft: 'var(--servicio-soft)',
    glow: 'var(--glow-servicio)',
    rgb: '61,139,255'
  },
  emprendimiento: {
    a: 'var(--emprendimiento)',
    b: 'var(--emprendimiento-2)',
    g: 'var(--emprendimiento-grad)',
    soft: 'var(--emprendimiento-soft)',
    glow: 'var(--glow-emprendimiento)',
    rgb: '155,107,255'
  },
  todas: {
    a: '#FFFFFF',
    b: '#FFFFFF',
    g: 'var(--rainbow-grad)',
    soft: 'rgba(255,255,255,.08)',
    glow: 'var(--glow-rainbow)',
    rgb: '255,255,255'
  }
};
function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  type = 'todas',
  disabled,
  style
}) {
  const [c, setC] = React.useState(!!defaultChecked);
  const on = checked != null ? checked : c;
  const t = TYPE[type] || TYPE.todas;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      minHeight: 44,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? .4 : 1,
      font: '600 15px var(--font-body)',
      color: 'var(--text-strong)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    role: "switch",
    "aria-checked": on,
    disabled: disabled,
    onClick: () => {
      setC(!on);
      onChange && onChange(!on);
    },
    style: {
      position: 'relative',
      width: 48,
      height: 28,
      borderRadius: 999,
      border: 'none',
      padding: 0,
      cursor: 'inherit',
      background: on ? t.g : 'var(--cf-ink-500)',
      boxShadow: on ? t.glow : 'inset 0 0 0 1px var(--border-strong)',
      transition: 'background var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: on ? 23 : 3,
      width: 22,
      height: 22,
      borderRadius: 999,
      background: on ? 'var(--cf-black)' : '#fff',
      transition: 'left var(--dur-base) var(--ease-spring)'
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TextField({
  label,
  hint,
  error,
  value,
  defaultValue,
  onChange,
  type = 'text',
  placeholder,
  id,
  style,
  ...rest
}) {
  const [f, setF] = React.useState(false);
  const fid = id || 'tf-' + (label || '').replace(/\W+/g, '-').toLowerCase();
  const ring = error ? 'var(--cf-danger)' : f ? 'rgba(255,255,255,.6)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      font: '700 13px var(--font-body)',
      color: 'var(--text-strong)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    onChange: e => onChange && onChange(e.target.value)
  }, rest, {
    style: {
      height: 48,
      padding: '0 16px',
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      outline: 'none',
      background: 'var(--surface)',
      boxShadow: 'inset 0 0 0 1px ' + ring,
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      fontWeight: 500,
      transition: 'box-shadow var(--dur-base)'
    }
  })), (error || hint) && /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13px var(--font-body)',
      color: error ? 'var(--cf-danger)' : 'var(--text-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/icons/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CDN = 'https://unpkg.com/lucide-static@0.469.0/icons/';
const cache = {},
  pending = {};
function load(n) {
  if (cache[n] != null) return Promise.resolve(cache[n]);
  if (!pending[n]) pending[n] = fetch(CDN + n + '.svg').then(r => r.ok ? r.text() : '').then(t => {
    t = t.replace(/<!--[\s\S]*?-->/g, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
    cache[n] = t;
    return t;
  }).catch(() => {
    cache[n] = '';
    return '';
  });
  return pending[n];
}
const CATEGORY_ICONS = {
  supermercado: 'store',
  restaurant: 'hand-platter',
  ferreteria: 'wrench',
  ropa: 'shirt',
  electronica: 'headphones',
  farmacia: 'briefcase-medical',
  automotriz: 'car-front',
  mascotas: 'dog',
  hogar: 'sofa',
  entretenimiento: 'gamepad-2',
  otros: 'store'
};
function Icon({
  name = 'store',
  category,
  size = 20,
  color = 'currentColor',
  label,
  style,
  ...rest
}) {
  const n = category ? CATEGORY_ICONS[category] || 'store' : name;
  const [body, setBody] = React.useState(cache[n] || '');
  React.useEffect(() => {
    let on = true;
    if (cache[n] != null) setBody(cache[n]);else load(n).then(t => {
      if (on) setBody(t);
    });
    return () => {
      on = false;
    };
  }, [n]);
  return /*#__PURE__*/React.createElement("span", _extends({
    role: label ? 'img' : undefined,
    "aria-label": label,
    "aria-hidden": label ? undefined : true
  }, rest, {
    style: {
      display: 'inline-flex',
      flex: 'none',
      width: size,
      height: size,
      color,
      ...style
    }
  }), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block'
    },
    dangerouslySetInnerHTML: {
      __html: body
    }
  }));
}
Object.assign(__ds_scope, { CATEGORY_ICONS, Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/icons/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TYPE = {
  tienda: {
    a: 'var(--tienda)',
    b: 'var(--tienda-2)',
    g: 'var(--tienda-grad)',
    soft: 'var(--tienda-soft)',
    glow: 'var(--glow-tienda)',
    rgb: '255,111,97'
  },
  servicio: {
    a: 'var(--servicio)',
    b: 'var(--servicio-2)',
    g: 'var(--servicio-grad)',
    soft: 'var(--servicio-soft)',
    glow: 'var(--glow-servicio)',
    rgb: '61,139,255'
  },
  emprendimiento: {
    a: 'var(--emprendimiento)',
    b: 'var(--emprendimiento-2)',
    g: 'var(--emprendimiento-grad)',
    soft: 'var(--emprendimiento-soft)',
    glow: 'var(--glow-emprendimiento)',
    rgb: '155,107,255'
  },
  todas: {
    a: '#FFFFFF',
    b: '#FFFFFF',
    g: 'var(--rainbow-grad)',
    soft: 'rgba(255,255,255,.08)',
    glow: 'var(--glow-rainbow)',
    rgb: '255,255,255'
  }
};
const SZ = {
  sm: {
    h: 36,
    px: 16,
    fs: 14,
    ic: 16
  },
  md: {
    h: 44,
    px: 22,
    fs: 15,
    ic: 18
  },
  lg: {
    h: 52,
    px: 28,
    fs: 16,
    ic: 20
  }
};
function Button({
  children,
  variant = 'primary',
  type = 'todas',
  size = 'md',
  icon,
  iconRight,
  disabled,
  fullWidth,
  onClick,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const [p, setP] = React.useState(false);
  const t = TYPE[type] || TYPE.todas;
  const s = SZ[size] || SZ.md;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: s.h,
    minHeight: 44,
    padding: '0 ' + s.px + 'px',
    borderRadius: 'var(--radius-pill)',
    fontFamily: 'var(--font-body)',
    fontWeight: 800,
    fontSize: s.fs,
    letterSpacing: '.01em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    width: fullWidth ? '100%' : undefined,
    transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base)',
    transform: p && !disabled ? 'scale(.97)' : 'none',
    opacity: disabled ? .4 : 1,
    whiteSpace: 'nowrap'
  };
  const v = {
    primary: {
      background: t.g,
      color: 'var(--text-on-accent)',
      boxShadow: h && !disabled ? t.glow : 'none'
    },
    secondary: {
      background: h && !disabled ? 'var(--surface-raised)' : 'var(--surface)',
      color: 'var(--text-strong)',
      boxShadow: 'inset 0 0 0 1px ' + (h && !disabled ? 'rgba(' + t.rgb + ',.7)' : 'var(--border-strong)')
    },
    ghost: {
      background: h && !disabled ? 'rgba(255,255,255,.08)' : 'transparent',
      color: 'var(--text-strong)'
    },
    glass: {
      background: h && !disabled ? 'rgba(255,255,255,.28)' : 'var(--surface-glass)',
      color: '#fff',
      backdropFilter: 'blur(var(--blur-glass))',
      WebkitBackdropFilter: 'blur(var(--blur-glass))',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.25)'
    }
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false)
  }, rest, {
    style: {
      ...base,
      ...v,
      ...style
    }
  }), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.ic
  }), children, iconRight && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.ic
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon = 'x',
  label,
  variant = 'surface',
  size = 44,
  active,
  onClick,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const bg = {
    surface: h ? 'var(--surface-raised)' : 'var(--surface)',
    glass: h ? 'rgba(255,255,255,.28)' : 'var(--surface-glass)',
    ghost: h ? 'rgba(255,255,255,.08)' : 'transparent'
  }[variant];
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  }, rest, {
    style: {
      width: size,
      height: size,
      minWidth: 44,
      minHeight: 44,
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#fff',
      background: active ? '#fff' : bg,
      boxShadow: variant === 'ghost' ? 'none' : 'inset 0 0 0 1px var(--border-strong)',
      backdropFilter: variant === 'glass' ? 'blur(16px)' : undefined,
      WebkitBackdropFilter: variant === 'glass' ? 'blur(16px)' : undefined,
      transition: 'background var(--dur-base)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.44),
    color: active ? 'var(--cf-black)' : 'currentColor'
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
const TYPE = {
  tienda: {
    a: 'var(--tienda)',
    b: 'var(--tienda-2)',
    g: 'var(--tienda-grad)',
    soft: 'var(--tienda-soft)',
    glow: 'var(--glow-tienda)',
    rgb: '255,111,97'
  },
  servicio: {
    a: 'var(--servicio)',
    b: 'var(--servicio-2)',
    g: 'var(--servicio-grad)',
    soft: 'var(--servicio-soft)',
    glow: 'var(--glow-servicio)',
    rgb: '61,139,255'
  },
  emprendimiento: {
    a: 'var(--emprendimiento)',
    b: 'var(--emprendimiento-2)',
    g: 'var(--emprendimiento-grad)',
    soft: 'var(--emprendimiento-soft)',
    glow: 'var(--glow-emprendimiento)',
    rgb: '155,107,255'
  },
  todas: {
    a: '#FFFFFF',
    b: '#FFFFFF',
    g: 'var(--rainbow-grad)',
    soft: 'rgba(255,255,255,.08)',
    glow: 'var(--glow-rainbow)',
    rgb: '255,255,255'
  }
};
function Badge({
  children,
  type,
  status,
  icon,
  variant = 'soft',
  style
}) {
  let fg = 'var(--text-strong)',
    bg = 'rgba(255,255,255,.08)',
    ring = 'var(--border-strong)';
  if (status === 'abierto') {
    fg = 'var(--cf-success)';
    bg = 'rgba(91,227,160,.12)';
    ring = 'rgba(91,227,160,.4)';
  } else if (status === 'cerrado') {
    fg = 'var(--cf-danger)';
    bg = 'rgba(255,90,110,.12)';
    ring = 'rgba(255,90,110,.4)';
  } else if (type && TYPE[type]) {
    const t = TYPE[type];
    if (variant === 'solid') {
      fg = 'var(--text-on-accent)';
      bg = t.g;
      ring = 'transparent';
    } else {
      fg = type === 'todas' ? '#fff' : t.b;
      bg = t.soft;
      ring = 'rgba(' + t.rgb + ',.45)';
    }
  }
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 24,
      padding: '0 10px',
      borderRadius: 'var(--radius-pill)',
      font: '700 12px var(--font-body)',
      letterSpacing: '.02em',
      color: fg,
      background: bg,
      boxShadow: 'inset 0 0 0 1px ' + ring,
      whiteSpace: 'nowrap',
      ...style
    }
  }, status && !icon && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 9,
      background: 'currentColor',
      boxShadow: '0 0 6px currentColor'
    }
  }), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 13
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/BusinessCard.jsx
try { (() => {
const TYPE = {
  tienda: {
    a: 'var(--tienda)',
    b: 'var(--tienda-2)',
    g: 'var(--tienda-grad)',
    soft: 'var(--tienda-soft)',
    glow: 'var(--glow-tienda)',
    rgb: '255,111,97'
  },
  servicio: {
    a: 'var(--servicio)',
    b: 'var(--servicio-2)',
    g: 'var(--servicio-grad)',
    soft: 'var(--servicio-soft)',
    glow: 'var(--glow-servicio)',
    rgb: '61,139,255'
  },
  emprendimiento: {
    a: 'var(--emprendimiento)',
    b: 'var(--emprendimiento-2)',
    g: 'var(--emprendimiento-grad)',
    soft: 'var(--emprendimiento-soft)',
    glow: 'var(--glow-emprendimiento)',
    rgb: '155,107,255'
  },
  todas: {
    a: '#FFFFFF',
    b: '#FFFFFF',
    g: 'var(--rainbow-grad)',
    soft: 'rgba(255,255,255,.08)',
    glow: 'var(--glow-rainbow)',
    rgb: '255,255,255'
  }
};
function BusinessCard({
  type = 'tienda',
  name,
  category,
  categoryLabel,
  distance,
  open,
  address,
  image,
  hasOffers,
  selected,
  onClick,
  style
}) {
  const [h, setH] = React.useState(false);
  const t = TYPE[type] || TYPE.tienda;
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      width: '100%',
      padding: 10,
      border: 'none',
      cursor: 'pointer',
      textAlign: 'left',
      borderRadius: 'var(--radius-card)',
      background: h || selected ? 'var(--surface-raised)' : 'var(--surface)',
      boxShadow: selected ? t.glow : 'inset 0 0 0 1px var(--border)',
      transition: 'background var(--dur-base), box-shadow var(--dur-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      flex: 'none',
      borderRadius: 'var(--radius-sm)',
      background: image ? 'url(' + image + ') center/cover' : t.soft,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 0 0 1px rgba(' + t.rgb + ',.5)'
    }
  }, !image && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    category: category,
    size: 26,
    color: t.a
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 16px/1.25 var(--font-body)',
      color: '#fff',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      minWidth: 0,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      font: '600 13px var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    category: category,
    size: 14,
    color: t.a
  }), categoryLabel, address && /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, "\xB7 ", address)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 2,
      flexWrap: 'nowrap',
      minWidth: 0
    }
  }, open != null && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    status: open ? 'abierto' : 'cerrado'
  }, open ? 'Abierto' : 'Cerrado'), distance && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    icon: "map-pin"
  }, distance), hasOffers && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    type: "todas",
    variant: "solid",
    icon: "tag"
  }, "Ofertas"))), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 18,
    color: "var(--text-subtle)"
  }));
}
Object.assign(__ds_scope, { BusinessCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/BusinessCard.jsx", error: String((e && e.message) || e) }); }

// components/display/CatalogCard.jsx
try { (() => {
const TYPE = {
  tienda: {
    a: 'var(--tienda)',
    glow: 'var(--glow-tienda)',
    rgb: '255,111,97'
  },
  servicio: {
    a: 'var(--servicio)',
    glow: 'var(--glow-servicio)',
    rgb: '61,139,255'
  },
  emprendimiento: {
    a: 'var(--emprendimiento)',
    glow: 'var(--glow-emprendimiento)',
    rgb: '155,107,255'
  }
};
function CatalogCard({
  type = 'tienda',
  title,
  description,
  image,
  cta = 'VER MAPA',
  onClick,
  height = 560,
  style
}) {
  const [h, setH] = React.useState(false);
  const t = TYPE[type] || TYPE.tienda;
  const nr = React.useRef(null);
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm || !window.IntersectionObserver) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOn(true);
        io.disconnect();
      }
    }, {
      threshold: .5
    });
    io.observe(nr.current);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    style: {
      position: 'relative',
      height,
      borderRadius: 'var(--radius-sheet)',
      overflow: 'hidden',
      cursor: 'pointer',
      background: 'var(--surface)',
      boxShadow: h ? t.glow : 'inset 0 0 0 1px var(--border)',
      transition: 'box-shadow var(--dur-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'url(' + image + ') center/cover',
      transform: h ? 'scale(1.04)' : 'scale(1)',
      transition: 'transform var(--dur-enter) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg,rgba(7,7,13,0) 50%,rgba(7,7,13,.6) 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 16,
      right: 16,
      bottom: 22,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: nr,
    className: 'cf-neon' + (on ? ' cf-neon-on' : ''),
    "data-type": type,
    style: {
      opacity: on ? 1 : .12,
      maxWidth: '100%',
      padding: '8px 18px',
      borderRadius: 'var(--radius-panel)',
      background: 'var(--surface-glass)',
      backdropFilter: 'blur(var(--blur-glass))',
      WebkitBackdropFilter: 'blur(var(--blur-glass))',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.25)',
      fontSize: 'clamp(22px,2.4vw,34px)',
      lineHeight: 1.05,
      textAlign: 'center',
      overflowWrap: 'anywhere'
    }
  }, title), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: type,
    icon: "map",
    onClick: e => {
      e.stopPropagation();
      onClick && onClick(e);
    },
    style: {
      minWidth: 180,
      letterSpacing: '.06em'
    }
  }, cta))), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      padding: '0 4px',
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      font: '500 15px/1.5 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      marginTop: 7,
      flex: 'none',
      borderRadius: 9,
      background: t.a,
      boxShadow: '0 0 8px ' + t.a
    }
  }), description));
}
Object.assign(__ds_scope, { CatalogCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/CatalogCard.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function Toast({
  children,
  icon = 'map-pin',
  tone = 'neutral',
  action,
  onAction,
  style
}) {
  const c = {
    neutral: '#fff',
    success: 'var(--cf-success)',
    danger: 'var(--cf-danger)'
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      minHeight: 48,
      padding: '8px 8px 8px 16px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-glass-dark)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      boxShadow: 'inset 0 0 0 1px var(--border-strong)',
      font: '600 14px var(--font-body)',
      color: '#fff',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 18,
    color: c
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), action ? /*#__PURE__*/React.createElement("button", {
    onClick: onAction,
    style: {
      height: 36,
      padding: '0 14px',
      borderRadius: 999,
      border: 'none',
      background: 'rgba(255,255,255,.1)',
      color: '#fff',
      font: '800 13px var(--font-body)',
      cursor: 'pointer'
    }
  }, action) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8
    }
  }));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/SearchInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SearchInput({
  value,
  defaultValue,
  onChange,
  placeholder = 'Buscar comercios, servicios…',
  onClear,
  glass,
  style,
  ...rest
}) {
  const [f, setF] = React.useState(false);
  const [v, setV] = React.useState(defaultValue || '');
  const val = value != null ? value : v;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 48,
      padding: '0 6px 0 16px',
      borderRadius: 'var(--radius-pill)',
      background: glass ? 'var(--surface-glass-dark)' : 'var(--surface)',
      backdropFilter: glass ? 'blur(16px)' : undefined,
      WebkitBackdropFilter: glass ? 'blur(16px)' : undefined,
      boxShadow: f ? 'inset 0 0 0 1px rgba(255,255,255,.6), 0 0 18px rgba(255,255,255,.12)' : 'inset 0 0 0 1px var(--border-strong)',
      transition: 'box-shadow var(--dur-base)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 18,
    color: "var(--text-muted)"
  }), /*#__PURE__*/React.createElement("input", _extends({
    value: val,
    placeholder: placeholder,
    onFocus: () => setF(true),
    onBlur: () => setF(false),
    onChange: e => {
      setV(e.target.value);
      onChange && onChange(e.target.value);
    }
  }, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--text-strong)',
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      fontWeight: 500
    }
  })), val ? /*#__PURE__*/React.createElement("button", {
    "aria-label": "Borrar b\xFAsqueda",
    onClick: e => {
      e.preventDefault();
      setV('');
      onClear && onClear();
      onChange && onChange('');
    },
    style: {
      width: 36,
      height: 36,
      borderRadius: 999,
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })) : /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6
    }
  }));
}
Object.assign(__ds_scope, { SearchInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SearchInput.jsx", error: String((e && e.message) || e) }); }

// components/map/BusinessSheet.jsx
try { (() => {
const TYPE = {
  tienda: {
    a: 'var(--tienda)',
    b: 'var(--tienda-2)',
    g: 'var(--tienda-grad)',
    soft: 'var(--tienda-soft)',
    glow: 'var(--glow-tienda)',
    rgb: '255,111,97'
  },
  servicio: {
    a: 'var(--servicio)',
    b: 'var(--servicio-2)',
    g: 'var(--servicio-grad)',
    soft: 'var(--servicio-soft)',
    glow: 'var(--glow-servicio)',
    rgb: '61,139,255'
  },
  emprendimiento: {
    a: 'var(--emprendimiento)',
    b: 'var(--emprendimiento-2)',
    g: 'var(--emprendimiento-grad)',
    soft: 'var(--emprendimiento-soft)',
    glow: 'var(--glow-emprendimiento)',
    rgb: '155,107,255'
  },
  todas: {
    a: '#FFFFFF',
    b: '#FFFFFF',
    g: 'var(--rainbow-grad)',
    soft: 'rgba(255,255,255,.08)',
    glow: 'var(--glow-rainbow)',
    rgb: '255,255,255'
  }
};
const LBL = {
  tienda: 'Tienda',
  servicio: 'Servicio',
  emprendimiento: 'Emprendimiento'
};
function BusinessSheet({
  type = 'tienda',
  name,
  chain,
  branch,
  chainImage,
  category,
  categoryLabel,
  image,
  description,
  address,
  hours,
  distance,
  open,
  hasOffers,
  onClose,
  onWeb,
  onDirections,
  style
}) {
  const t = TYPE[type] || TYPE.tienda;
  const ch = chain || name;
  const br = branch || name;
  const ini = (ch || '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": br,
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 420,
      borderRadius: 'var(--radius-sheet)',
      overflow: 'hidden',
      background: 'var(--surface)',
      boxShadow: 'inset 0 0 0 1px rgba(' + t.rgb + ',.45), 0 0 40px rgba(' + t.rgb + ',.18)',
      fontFamily: 'var(--font-body)',
      flex: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 160,
      position: 'relative',
      background: image ? 'url(' + image + ') center 30%/cover' : t.soft,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, !image && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    category: category,
    size: 48,
    color: t.a
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg,rgba(18,18,28,0) 45%,var(--surface) 100%)'
    }
  })), onClose && /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "x",
    label: "Cerrar",
    variant: "glass",
    size: 40,
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 12,
      right: 12
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    type: type,
    variant: "solid"
  }, LBL[type]), open != null && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    status: open ? 'abierto' : 'cerrado'
  }, open ? 'Abierto' : 'Cerrado'), distance && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    icon: "map-pin"
  }, distance), hasOffers && /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    type: "todas",
    variant: "solid",
    icon: "tag"
  }, "Ofertas")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      flex: 'none',
      borderRadius: 999,
      background: chainImage ? 'url(' + chainImage + ') center/cover' : t.g,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '800 16px var(--font-body)',
      color: 'var(--text-on-accent)',
      boxShadow: '0 0 0 2px var(--surface), 0 0 0 3px rgba(' + t.rgb + ',.7)'
    }
  }, !chainImage && ini), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 13px var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, ch), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 21px/1.2 var(--font-body)',
      color: '#fff'
    }
  }, br))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      font: '600 14px var(--font-body)',
      color: t.b
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    category: category,
    size: 16
  }), categoryLabel), description && /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 15px/1.55 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: '12px 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, address && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      font: '500 14px var(--font-body)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "map-pin",
    size: 16,
    color: "var(--text-muted)"
  }), address), hours && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      font: '500 14px var(--font-body)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "clock",
    size: 16,
    color: "var(--text-muted)"
  }), hours)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: type,
    icon: "globe",
    onClick: onWeb,
    style: {
      flex: 1
    }
  }, "Visitar web"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    type: type,
    icon: "navigation",
    onClick: onDirections
  }, "C\xF3mo llegar"))));
}
Object.assign(__ds_scope, { BusinessSheet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/map/BusinessSheet.jsx", error: String((e && e.message) || e) }); }

// components/map/MapMarker.jsx
try { (() => {
const TYPE = {
  tienda: {
    a: 'var(--tienda)',
    b: 'var(--tienda-2)',
    g: 'var(--tienda-grad)',
    soft: 'var(--tienda-soft)',
    glow: 'var(--glow-tienda)',
    rgb: '255,111,97'
  },
  servicio: {
    a: 'var(--servicio)',
    b: 'var(--servicio-2)',
    g: 'var(--servicio-grad)',
    soft: 'var(--servicio-soft)',
    glow: 'var(--glow-servicio)',
    rgb: '61,139,255'
  },
  emprendimiento: {
    a: 'var(--emprendimiento)',
    b: 'var(--emprendimiento-2)',
    g: 'var(--emprendimiento-grad)',
    soft: 'var(--emprendimiento-soft)',
    glow: 'var(--glow-emprendimiento)',
    rgb: '155,107,255'
  },
  todas: {
    a: '#FFFFFF',
    b: '#FFFFFF',
    g: 'var(--rainbow-grad)',
    soft: 'rgba(255,255,255,.08)',
    glow: 'var(--glow-rainbow)',
    rgb: '255,255,255'
  }
};
function MapMarker({
  type = 'tienda',
  category,
  selected,
  label,
  onClick,
  style
}) {
  const t = TYPE[type] || TYPE.tienda;
  const s = selected ? 52 : 40;
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    onClick: onClick,
    style: {
      position: 'relative',
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      transform: selected ? 'translateY(-4px)' : 'none',
      transition: 'transform var(--dur-base) var(--ease-spring)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: s,
      height: s,
      borderRadius: 999,
      padding: selected ? 3 : 2,
      background: t.g,
      boxShadow: selected ? t.glow : '0 0 12px rgba(' + t.rgb + ',.55)',
      transition: 'all var(--dur-base) var(--ease-spring)',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 999,
      background: selected ? 'transparent' : 'var(--cf-black)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    category: category,
    size: selected ? 24 : 18,
    color: selected ? 'var(--cf-black)' : t.a
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      height: selected ? 10 : 7,
      background: t.a,
      marginTop: -1,
      boxShadow: '0 0 6px ' + t.a
    }
  }), selected && label && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '100%',
      marginTop: 4,
      padding: '4px 10px',
      borderRadius: 999,
      background: 'var(--surface-glass-dark)',
      backdropFilter: 'blur(12px)',
      boxShadow: 'inset 0 0 0 1px rgba(' + t.rgb + ',.5)',
      font: '800 12px var(--font-body)',
      color: '#fff',
      whiteSpace: 'nowrap'
    }
  }, label));
}
Object.assign(__ds_scope, { MapMarker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/map/MapMarker.jsx", error: String((e && e.message) || e) }); }

// components/selection/CategoryChip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TYPE = {
  tienda: {
    a: 'var(--tienda)',
    b: 'var(--tienda-2)',
    g: 'var(--tienda-grad)',
    soft: 'var(--tienda-soft)',
    glow: 'var(--glow-tienda)',
    rgb: '255,111,97'
  },
  servicio: {
    a: 'var(--servicio)',
    b: 'var(--servicio-2)',
    g: 'var(--servicio-grad)',
    soft: 'var(--servicio-soft)',
    glow: 'var(--glow-servicio)',
    rgb: '61,139,255'
  },
  emprendimiento: {
    a: 'var(--emprendimiento)',
    b: 'var(--emprendimiento-2)',
    g: 'var(--emprendimiento-grad)',
    soft: 'var(--emprendimiento-soft)',
    glow: 'var(--glow-emprendimiento)',
    rgb: '155,107,255'
  },
  todas: {
    a: '#FFFFFF',
    b: '#FFFFFF',
    g: 'var(--rainbow-grad)',
    soft: 'rgba(255,255,255,.08)',
    glow: 'var(--glow-rainbow)',
    rgb: '255,255,255'
  }
};
function CategoryChip({
  label,
  category,
  icon,
  type = 'todas',
  selected,
  count,
  onClick,
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  const t = TYPE[type] || TYPE.todas;
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-pressed": !!selected,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false)
  }, rest, {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      minHeight: 40,
      padding: '0 16px 0 12px',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      flex: 'none',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14,
      background: selected ? t.g : h ? 'var(--surface-raised)' : 'var(--surface)',
      color: selected ? 'var(--text-on-accent)' : 'var(--text-strong)',
      boxShadow: selected ? t.glow : 'inset 0 0 0 1px ' + (h ? 'rgba(' + t.rgb + ',.6)' : 'var(--border-strong)'),
      transition: 'background var(--dur-base), box-shadow var(--dur-base)',
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    category: icon ? undefined : category,
    size: 18,
    color: selected ? 'var(--cf-black)' : type === 'todas' ? 'currentColor' : t.a
  }), label, count != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      fontSize: 12,
      opacity: .7
    }
  }, count));
}
Object.assign(__ds_scope, { CategoryChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/CategoryChip.jsx", error: String((e && e.message) || e) }); }

// components/selection/TypeSelector.jsx
try { (() => {
const TYPE = {
  tienda: {
    a: 'var(--tienda)',
    b: 'var(--tienda-2)',
    g: 'var(--tienda-grad)',
    soft: 'var(--tienda-soft)',
    glow: 'var(--glow-tienda)',
    rgb: '255,111,97'
  },
  servicio: {
    a: 'var(--servicio)',
    b: 'var(--servicio-2)',
    g: 'var(--servicio-grad)',
    soft: 'var(--servicio-soft)',
    glow: 'var(--glow-servicio)',
    rgb: '61,139,255'
  },
  emprendimiento: {
    a: 'var(--emprendimiento)',
    b: 'var(--emprendimiento-2)',
    g: 'var(--emprendimiento-grad)',
    soft: 'var(--emprendimiento-soft)',
    glow: 'var(--glow-emprendimiento)',
    rgb: '155,107,255'
  },
  todas: {
    a: '#FFFFFF',
    b: '#FFFFFF',
    g: 'var(--rainbow-grad)',
    soft: 'rgba(255,255,255,.08)',
    glow: 'var(--glow-rainbow)',
    rgb: '255,255,255'
  }
};
const DEF = [{
  value: 'todas',
  label: 'Todas',
  icon: 'layout-grid'
}, {
  value: 'tienda',
  label: 'Tiendas',
  icon: 'shopping-bag'
}, {
  value: 'servicio',
  label: 'Servicios',
  icon: 'wrench'
}, {
  value: 'emprendimiento',
  label: 'Emprendimientos',
  short: 'Emprend.',
  icon: 'sparkles'
}];
function TypeSelector({
  value = 'todas',
  onChange,
  options = DEF,
  compact,
  dense,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      gap: 4,
      padding: 4,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-sunken)',
      boxShadow: 'inset 0 0 0 1px var(--border)',
      width: dense ? '100%' : 'max-content',
      maxWidth: '100%',
      minWidth: 0,
      boxSizing: 'border-box',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      ...style
    }
  }, options.map(o => {
    const on = o.value === value;
    const t = TYPE[o.value] || TYPE.todas;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(o.value),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        height: dense ? 36 : 40,
        minHeight: dense ? 36 : 40,
        padding: dense ? '0 8px' : compact ? '0 12px' : '0 16px',
        flex: dense ? '1 1 auto' : undefined,
        minWidth: 0,
        borderRadius: 'var(--radius-pill)',
        border: 'none',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        fontFamily: 'var(--font-body)',
        fontWeight: 800,
        fontSize: dense ? 12 : 14,
        background: on ? t.g : 'transparent',
        color: on ? 'var(--text-on-accent)' : 'var(--text-muted)',
        boxShadow: on ? t.glow : 'none',
        transition: 'all var(--dur-base) var(--ease-out)'
      }
    }, !dense && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: o.icon,
      size: 16,
      color: on ? 'var(--cf-black)' : o.value === 'todas' ? 'currentColor' : t.a
    }), dense ? o.short || o.label : !compact || on ? o.label : null);
  }));
}
Object.assign(__ds_scope, { TypeSelector });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/selection/TypeSelector.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Catalog.jsx
try { (() => {
function Reveal({
  children,
  i = 0,
  fill
}) {
  const r = React.useRef(null);
  const [v, setV] = React.useState(false);
  React.useEffect(() => {
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rm) {
      setV(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setV(true);
        io.disconnect();
      }
    }, {
      threshold: .15
    });
    io.observe(r.current);
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: r,
    style: {
      width: fill ? '100%' : undefined,
      opacity: v ? 1 : 0,
      transform: v ? 'none' : 'translateY(18px)',
      transition: 'opacity var(--dur-enter) var(--ease-out) ' + i * 70 + 'ms, transform var(--dur-enter) var(--ease-out) ' + i * 70 + 'ms'
    }
  }, children);
}
function LandingCatalog({
  onOpenMap
}) {
  const {
    CatalogCard,
    NeonHeading,
    GlowBackdrop
  } = window.ComprFCilDesignSystem_3bc5cd;
  const cards = [['tienda', 'TIENDAS', 'Supermercados, ropa, electrónica y todo lo del día a día.', 'tiendas-clerk'], ['servicio', 'SERVICIOS', 'Mecánicos, ferreterías, técnicos y más, a pocas cuadras.', 'servicios-mechanic'], ['emprendimiento', 'EMPRENDIMIENTOS', 'Lo que hacen tus vecinos: comida, diseño, oficios.', 'emprendimientos-cake']];
  return /*#__PURE__*/React.createElement("section", {
    id: "explorar",
    className: "lp-sec",
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: '72px var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(GlowBackdrop, {
    palette: "emprendimiento",
    intensity: .22
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      maxWidth: 'var(--container)',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 'clamp(12px,2vw,20px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "catalog-art",
    "aria-hidden": "true",
    style: {
      flex: 'none',
      width: 'clamp(64px,7vw,104px)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrations/map-catalog-3d.png",
    alt: "",
    style: {
      display: 'block',
      width: '100%',
      height: 'auto',
      filter: 'drop-shadow(0 12px 14px rgba(0,0,0,.5)) drop-shadow(0 0 22px rgba(79,169,238,.35)) drop-shadow(0 0 36px rgba(250,110,78,.2))'
    }
  })), /*#__PURE__*/React.createElement(NeonHeading, {
    as: "h2",
    style: {
      lineHeight: .95
    }
  }, "CAT\xC1LOGO VIRTUAL")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 16px/1.35 var(--font-body)',
      color: 'var(--text-muted)',
      maxWidth: 560,
      textWrap: 'pretty'
    }
  }, "Selecciona la opci\xF3n que desees y explora los comercios y emprendedores cercanos a tu ubicaci\xF3n en el mapa.")), /*#__PURE__*/React.createElement("div", {
    className: "lp-cards",
    style: {
      display: 'grid',
      gap: 16
    }
  }, cards.map(([t, ti, d, p], i) => /*#__PURE__*/React.createElement(Reveal, {
    key: t,
    i: i
  }, /*#__PURE__*/React.createElement("div", {
    id: ti.toLowerCase()
  }, /*#__PURE__*/React.createElement(CatalogCard, {
    type: t,
    title: ti,
    description: d,
    image: '../../assets/photos/' + p + '.png',
    cta: "VER MAPA",
    height: 420,
    onClick: () => onOpenMap(t)
  })))))));
}
function NearbyStoreCard({
  b,
  onClick
}) {
  const {
    Icon,
    Badge
  } = window.ComprFCilDesignSystem_3bc5cd;
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: 0,
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      height: '100%',
      boxSizing: 'border-box',
      padding: 12,
      borderRadius: 'var(--radius-panel)',
      cursor: 'pointer',
      background: h ? 'var(--surface-raised)' : 'var(--surface)',
      boxShadow: h ? 'var(--glow-tienda)' : 'inset 0 0 0 1px var(--border)',
      transition: 'background var(--dur-base), box-shadow var(--dur-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '16 / 10',
      borderRadius: 'var(--radius-card)',
      overflow: 'hidden',
      boxShadow: 'inset 0 0 0 1px rgba(255,111,97,.45)'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: 'nearby-store-' + b.id,
    shape: "rect",
    placeholder: "Foto de la sucursal",
    style: {
      position: 'absolute',
      inset: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: '0 4px 4px',
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: 'chain-avatar-' + b.id,
    shape: "circle",
    placeholder: "Logo",
    style: {
      width: 36,
      height: 36,
      flex: 'none',
      borderRadius: '50%',
      boxShadow: '0 0 0 2px var(--surface), 0 0 0 3px rgba(255,111,97,.7)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 13px var(--font-body)',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--text-body)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, b.chain || b.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 19px/1.2 var(--font-body)',
      color: '#fff'
    }
  }, b.branch || b.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      font: '600 14px var(--font-body)',
      color: 'var(--tienda-2)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    category: b.category,
    size: 16
  }), b.categoryLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      font: '500 13px var(--font-body)',
      color: 'var(--text-muted)',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, b.address)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginTop: 'auto',
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    status: b.open ? 'abierto' : 'cerrado'
  }, b.open ? 'Abierto' : 'Cerrado'), /*#__PURE__*/React.createElement(Badge, {
    icon: "map-pin"
  }, b.distance), b.hasOffers && /*#__PURE__*/React.createElement(Badge, {
    type: "todas",
    variant: "solid",
    icon: "tag"
  }, "Ofertas"))));
}
function LandingNearby({
  onOpenMap
}) {
  const {
    NeonHeading,
    Button
  } = window.ComprFCilDesignSystem_3bc5cd;
  const list = window.CF_DATA.businesses.filter(b => b.type === 'tienda');
  return /*#__PURE__*/React.createElement("section", {
    className: "lp-sec",
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: '56px 0 72px',
      background: 'linear-gradient(180deg,rgba(255,255,255,.025),rgba(255,255,255,.01))',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,.06)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      background: 'radial-gradient(40% 55% at 8% 100%,rgba(250,110,78,.2),transparent 70%),radial-gradient(38% 50% at 92% 95%,rgba(164,116,245,.22),transparent 70%),radial-gradient(45% 40% at 55% 0%,rgba(79,169,238,.14),transparent 70%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1,
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(NeonHeading, {
    as: "h2",
    type: "tienda"
  }, "CERCA TUYO"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconRight: "arrow-right",
    onClick: () => onOpenMap('tienda')
  }, "Ver todo en el mapa")), /*#__PURE__*/React.createElement("div", {
    className: "nearby-track",
    style: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      gap: 16,
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: '24px var(--gutter) 20px',
      scrollSnapType: 'x mandatory',
      scrollPaddingLeft: 'var(--gutter)',
      scrollbarWidth: 'none',
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, list.map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: b.id,
    style: {
      flex: '0 0 min(84vw,380px)',
      scrollSnapAlign: 'start',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    i: i,
    fill: true
  }, /*#__PURE__*/React.createElement(NearbyStoreCard, {
    b: b,
    onClick: () => onOpenMap(b.type, b.id)
  }))))));
}
function LandingJoin() {
  const {
    NeonHeading,
    Button,
    GlowBackdrop
  } = window.ComprFCilDesignSystem_3bc5cd;
  return /*#__PURE__*/React.createElement("section", {
    className: "lp-sec",
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: '72px var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement(GlowBackdrop, {
    palette: "tienda",
    intensity: .3
  }), /*#__PURE__*/React.createElement("div", {
    className: "lp-join",
    style: {
      position: 'relative',
      zIndex: 1,
      maxWidth: 'var(--container)',
      margin: '0 auto',
      display: 'grid',
      gap: 28,
      alignItems: 'center',
      padding: 28,
      borderRadius: 'var(--radius-panel)',
      background: 'var(--surface)',
      boxShadow: 'inset 0 0 0 1px var(--border)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrations/storefront-check.png",
    alt: "",
    style: {
      width: '100%',
      maxWidth: 280,
      justifySelf: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(NeonHeading, {
    as: "h2",
    type: "tienda",
    size: "var(--fs-h1)"
  }, "SUM\xC1 TU COMERCIO"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 16px/1.55 var(--font-body)',
      color: 'var(--text-muted)',
      maxWidth: 480
    }
  }, "Que te encuentren los vecinos que est\xE1n a pocas cuadras. Carg\xE1s tu negocio una vez y aparec\xE9s en el mapa."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    type: "tienda",
    size: "lg",
    icon: "store"
  }, "Sumar mi comercio")))));
}
function LandingFooter() {
  const {
    Wordmark
  } = window.ComprFCilDesignSystem_3bc5cd;
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: '32px var(--gutter) 48px',
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 16,
    markSrc: "../../assets/logo/basket-mark.png"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 13px var(--font-body)',
      color: 'var(--text-subtle)'
    }
  }, "Hecho en Tunuy\xE1n, Mendoza.")));
}
Object.assign(window, {
  LandingCatalog,
  LandingNearby,
  LandingJoin,
  LandingFooter,
  Reveal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Catalog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Hero.jsx
try { (() => {
const FLICKER = {
  1: [9.5, 2.1],
  4: [13, 5.4],
  7: [11, 8.2],
  9: [15.5, 3.3]
};
function FlickerWord({
  text,
  seed
}) {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, text.split('').map((ch, j) => {
    const f = FLICKER[seed + j];
    return /*#__PURE__*/React.createElement("span", {
      key: j,
      className: f ? 'hero-letter' : undefined,
      style: f ? {
        animationDuration: f[0] + 's',
        animationDelay: f[1] + 's'
      } : undefined
    }, ch);
  }));
}
function HeroCity() {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({
    x: 0,
    y: 0
  });
  React.useEffect(() => {
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(pointer: fine)').matches;
    if (rm || !fine) return;
    const f = e => {
      const r = ref.current.getBoundingClientRect();
      setT({
        x: (e.clientX - r.left) / r.width - .5,
        y: (e.clientY - r.top) / r.height - .5
      });
    };
    window.addEventListener('mousemove', f);
    return () => window.removeEventListener('mousemove', f);
  }, []);
  const fade = 'radial-gradient(ellipse 72% 68% at 50% 50%,#000 55%,transparent 100%)';
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "aria-label": "Escena 3D de la ciudad",
    role: "img",
    style: {
      position: 'relative',
      width: '100%',
      maxWidth: 720,
      justifySelf: 'center',
      alignSelf: 'center',
      aspectRatio: '916 / 452',
      perspective: 1200
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      transform: 'rotateX(' + -t.y * 6 + 'deg) rotateY(' + t.x * 8 + 'deg) translate3d(' + t.x * -12 + 'px,' + t.y * -8 + 'px,0)',
      transition: 'transform 600ms var(--ease-out)',
      WebkitMaskImage: fade,
      maskImage: fade
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/scenes/kenney-city-preview.png",
    alt: "",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'brightness(.62) saturate(1.15) contrast(1.08)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg,rgba(155,107,255,.38),rgba(61,139,255,.28) 50%,rgba(255,111,97,.26))',
      mixBlendMode: 'color'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(7,7,13,.28)'
    }
  })));
}
function LandingHero({
  onOpenMap
}) {
  const {
    Button,
    SearchInput,
    GlowBackdrop,
    Icon
  } = window.ComprFCilDesignSystem_3bc5cd;
  return /*#__PURE__*/React.createElement("section", {
    id: "hero",
    className: "lp-sec",
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: '32px var(--gutter) 48px'
    }
  }, /*#__PURE__*/React.createElement(GlowBackdrop, {
    palette: "rainbow",
    intensity: .38
  }), /*#__PURE__*/React.createElement("div", {
    className: "lp-hero",
    style: {
      position: 'relative',
      zIndex: 1,
      maxWidth: 'var(--container)',
      margin: '0 auto',
      display: 'grid',
      gap: 32,
      alignItems: 'stretch',
      minHeight: 'min(760px,calc(100vh - 140px))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-brand",
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 'clamp(12px,2vw,20px)',
      marginTop: 'clamp(8px,5vw,64px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-basket",
    style: {
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo/basket-mark.png",
    alt: "",
    className: "hero-basket-img",
    style: {
      display: 'block',
      height: 'clamp(110px,19vw,240px)',
      width: 'auto'
    }
  })), /*#__PURE__*/React.createElement("h1", {
    className: "cf-neon cf-neon-on",
    "aria-label": "Compr\xE1 F\xE1cil",
    style: {
      margin: 0,
      fontSize: 'clamp(44px,7vw,100px)',
      lineHeight: .95,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(FlickerWord, {
    text: "COMPR\xC1",
    seed: 0
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(FlickerWord, {
    text: "F\xC1CIL",
    seed: 6
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      flex: 'none',
      borderRadius: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255,255,255,.2)',
      boxShadow: 'inset 0 0 0 2.5px rgba(255,255,255,.6), 0 0 14px rgba(255,255,255,.35), 0 0 32px rgba(255,255,255,.18)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pinned",
    size: 20,
    color: "#fff",
    style: {
      filter: 'drop-shadow(0 0 2px rgba(255,255,255,.9)) drop-shadow(0 0 6px rgba(255,255,255,.6))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 clamp(18px,2.4vw,26px)/1.2 var(--font-body)',
      letterSpacing: '.12em',
      textTransform: 'uppercase',
      color: '#fff',
      textShadow: 'var(--neon-text-soft)'
    }
  }, "EXPLOR\xC1 TU CIUDAD")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      maxWidth: 500,
      font: '500 var(--fs-body-lg)/1.5 var(--font-body)',
      color: 'var(--text-body)',
      textWrap: 'pretty'
    }
  }, "Tiendas, servicios y emprendimientos de tu ciudad en un mapa. Encontr\xE1 lo que necesit\xE1s, cerca tuyo."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      width: '100%',
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onOpenMap();
    },
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    placeholder: "\xBFQu\xE9 busc\xE1s cerca tuyo?",
    style: {
      flex: 1,
      minWidth: 0
    }
  }), /*#__PURE__*/React.createElement(Button, {
    icon: "search",
    style: {
      height: 48,
      flex: 'none',
      color: '#fff'
    }
  }, "Buscar")), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconRight: "map",
    fullWidth: true,
    onClick: onOpenMap,
    style: {
      height: 48
    }
  }, "abrir mapa")))), /*#__PURE__*/React.createElement(HeroCity, null)));
}
window.LandingHero = LandingHero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Nav.jsx
try { (() => {
const NAV_LINKS = [{
  id: 'tiendas',
  label: 'Tiendas',
  icon: 'shopping-bag',
  c: 'var(--tienda)',
  c2: 'var(--tienda-2)',
  rgb: '255,111,97'
}, {
  id: 'servicios',
  label: 'Servicios',
  icon: 'wrench',
  c: 'var(--servicio)',
  c2: 'var(--servicio-2)',
  rgb: '61,139,255'
}, {
  id: 'emprendimientos',
  label: 'Emprendimientos',
  icon: 'sparkles',
  c: 'var(--emprendimiento)',
  c2: 'var(--emprendimiento-2)',
  rgb: '155,107,255'
}, {
  id: 'ofertas',
  label: 'Ofertas',
  icon: 'badge-percent',
  c: '#FFFFFF',
  c2: '#FFFFFF',
  rgb: '255,255,255',
  grad: 'var(--rainbow-grad)'
}];
function NeonNavLink({
  l,
  i,
  base = ''
}) {
  const {
    Icon
  } = window.ComprFCilDesignSystem_3bc5cd;
  const [on, setOn] = React.useState(false);
  const [k, setK] = React.useState(0);
  const enter = () => {
    setOn(true);
    setK(x => x + 1);
  };
  return /*#__PURE__*/React.createElement("a", {
    href: base + '#' + l.id,
    "aria-label": l.label,
    title: l.label,
    onMouseEnter: enter,
    onFocus: enter,
    onMouseLeave: () => setOn(false),
    onBlur: () => setOn(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 44,
      padding: '0 14px',
      borderRadius: 999,
      textDecoration: 'none',
      font: '700 14px var(--font-body)',
      color: on ? '#fff' : 'var(--text-body)',
      transition: 'color var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: '12%',
      right: '12%',
      bottom: -2,
      height: 18,
      borderRadius: '50%',
      background: 'radial-gradient(closest-side,rgba(' + l.rgb + ',' + (on ? .75 : .28) + '),transparent)',
      filter: 'blur(6px)',
      transition: 'background var(--dur-slow) var(--ease-out)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    key: 'i' + k,
    className: on ? 'nav-tube-on' : 'nav-idle',
    style: {
      display: 'inline-flex',
      animationDelay: on ? '0ms' : i * 260 + 400 + 'ms',
      filter: on ? 'drop-shadow(0 0 4px ' + l.c + ') drop-shadow(0 0 10px ' + l.c + ')' : 'none',
      transition: 'filter var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: l.icon,
    size: 18,
    color: on ? l.c2 : l.c
  })), /*#__PURE__*/React.createElement("span", {
    className: "nav-lbl-wrap",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "nav-lbl"
  }, l.label), /*#__PURE__*/React.createElement("span", {
    key: 'l' + k,
    "aria-hidden": "true",
    className: on ? 'nav-tube-on' : 'nav-idle',
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: -7,
      height: 2,
      borderRadius: 2,
      background: l.grad || 'linear-gradient(90deg,' + l.c + ',' + l.c2 + ')',
      opacity: on ? 1 : .45,
      boxShadow: on ? '0 0 6px ' + l.c + ', 0 0 14px ' + l.c + ', 0 0 26px rgba(' + l.rgb + ',.6)' : '0 0 4px rgba(' + l.rgb + ',.4)',
      animationDelay: on ? '0ms' : i * 260 + 400 + 'ms',
      transition: 'opacity var(--dur-base), box-shadow var(--dur-base)'
    }
  })));
}
function LandingNav({
  onOpenMap,
  base = '',
  sticky = true,
  cta = true
}) {
  const {
    Wordmark,
    Button
  } = window.ComprFCilDesignSystem_3bc5cd;
  return /*#__PURE__*/React.createElement("header", {
    className: "lp-nav",
    style: {
      position: sticky ? 'sticky' : 'relative',
      top: 0,
      zIndex: sticky ? 20 : 800,
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      minHeight: 76,
      padding: '14px var(--gutter)',
      background: 'rgba(7,7,13,.72)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: base + '#hero',
    className: "nav-brand",
    style: {
      display: 'flex',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 18,
    markSrc: "../../assets/logo/basket-mark.png"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "lp-links",
    style: {
      display: 'flex',
      gap: 6
    }
  }, NAV_LINKS.map((l, i) => /*#__PURE__*/React.createElement(NeonNavLink, {
    key: l.id,
    l: l,
    i: i,
    base: base
  }))), cta && /*#__PURE__*/React.createElement("div", {
    className: "nav-cta"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "sm",
    iconRight: "map",
    onClick: onOpenMap,
    style: {
      color: '#fff'
    }
  }, "abrir mapa")));
}
window.LandingNav = LandingNav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/Sections.jsx
try { (() => {
function LocationRow({
  city = 'Tunuyán'
}) {
  const {
    Icon
  } = window.ComprFCilDesignSystem_3bc5cd;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      flex: 'none',
      borderRadius: 999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255,255,255,.2)',
      boxShadow: 'inset 0 0 0 2.5px rgba(255,255,255,.6), 0 0 14px rgba(255,255,255,.35), 0 0 32px rgba(255,255,255,.18)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 20,
    color: "#fff",
    style: {
      filter: 'drop-shadow(0 0 2px rgba(255,255,255,.9)) drop-shadow(0 0 6px rgba(255,255,255,.6))'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 44,
      padding: '0 18px',
      borderRadius: 999,
      background: 'var(--rainbow-grad)',
      boxShadow: 'var(--glow-rainbow)',
      font: '800 15px var(--font-body)',
      color: '#fff',
      textShadow: '0 1px 2px rgba(0,0,0,.35)'
    }
  }, city));
}
function SectionHead({
  title,
  subtitle,
  type,
  city,
  action,
  onAction,
  className
}) {
  const {
    NeonHeading,
    Button
  } = window.ComprFCilDesignSystem_3bc5cd;
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      maxWidth: 'var(--container)',
      margin: '0 auto',
      padding: '0 var(--gutter)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(NeonHeading, {
    as: "h2",
    type: type
  }, title), action && /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconRight: "arrow-right",
    onClick: onAction
  }, action)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: '500 16px/1.55 var(--font-body)',
      color: 'var(--text-muted)',
      maxWidth: 560
    }
  }, subtitle), city && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(LocationRow, {
    city: city
  })));
}
const OFFER_C = {
  tienda: 'var(--tienda-2)',
  servicio: 'var(--servicio-2)',
  emprendimiento: 'var(--emprendimiento-2)'
};
function OfferCard({
  o,
  onMore
}) {
  const {
    Button,
    Icon
  } = window.ComprFCilDesignSystem_3bc5cd;
  const [h, setH] = React.useState(false);
  const biz = window.CF_DATA.businesses.find(b => b.id === o.businessId) || {};
  const grad = {
    tienda: 'var(--tienda-grad)',
    servicio: 'var(--servicio-grad)',
    emprendimiento: 'var(--emprendimiento-grad)'
  }[o.type];
  const acc = {
    tienda: 'var(--tienda)',
    servicio: 'var(--servicio)',
    emprendimiento: 'var(--emprendimiento)'
  }[o.type];
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '2.15 / 1',
      borderRadius: 'var(--radius-panel)',
      overflow: 'hidden',
      background: 'var(--surface)',
      boxShadow: h ? 'var(--glow-' + o.type + ')' : 'inset 0 0 0 1px var(--border)',
      transition: 'box-shadow var(--dur-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: 'offer-' + o.id,
    shape: "rect",
    placeholder: "Imagen de la oferta",
    style: {
      position: 'absolute',
      inset: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 4,
      padding: '0 2px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: 'store-avatar-' + o.businessId,
    shape: "circle",
    placeholder: "Foto",
    style: {
      width: 44,
      height: 44,
      flex: 'none',
      boxShadow: 'inset 0 0 0 1px var(--border-strong)',
      borderRadius: '50%'
    }
  }), /*#__PURE__*/React.createElement(TypeAvatar, {
    type: o.type,
    category: biz.category
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 15px/1.2 var(--font-body)',
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--text-strong)'
    }
  }, o.store)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: '800 clamp(18px,1.8vw,24px)/1.2 var(--font-body)',
      textTransform: 'uppercase',
      color: OFFER_C[o.type]
    }
  }, o.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      font: '400 14px/1.5 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, o.description), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: o.type,
    size: "sm",
    iconRight: "arrow-right",
    onClick: onMore
  }, "m\xE1s info"))));
}
function OfferMore({
  onOpenMap
}) {
  const {
    Button,
    GlowBackdrop
  } = window.ComprFCilDesignSystem_3bc5cd;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '2.15 / 1',
      borderRadius: 'var(--radius-panel)',
      overflow: 'hidden',
      background: 'var(--surface)',
      boxShadow: 'inset 0 0 0 1px var(--border-strong)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: 20,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(GlowBackdrop, {
    palette: "rainbow",
    intensity: .35,
    parallax: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "cf-neon cf-neon-on",
    style: {
      position: 'relative',
      fontSize: 'clamp(20px,2.2vw,30px)',
      lineHeight: 1.15
    }
  }, "DESCUBR\xCD M\xC1S OFERTAS", /*#__PURE__*/React.createElement("br", null), "EN TU ZONA"), /*#__PURE__*/React.createElement(Button, {
    iconRight: "arrow-right",
    onClick: () => onOpenMap(),
    style: {
      position: 'relative',
      color: '#fff'
    }
  }, "ver ofertas"));
}
function OfferCarousel({
  offers,
  onOpenMap
}) {
  return /*#__PURE__*/React.createElement(SlideCarousel, {
    items: offers,
    render: o => /*#__PURE__*/React.createElement(OfferCard, {
      o: o,
      onMore: () => onOpenMap(o.type, o.businessId)
    }),
    tail: /*#__PURE__*/React.createElement(OfferMore, {
      onOpenMap: onOpenMap
    })
  });
}
function SlideCarousel({
  items,
  render,
  tail
}) {
  const {
    IconButton
  } = window.ComprFCilDesignSystem_3bc5cd;
  const ref = React.useRef(null);
  const [edge, setEdge] = React.useState({
    l: true,
    r: false
  });
  const upd = () => {
    const e = ref.current;
    if (!e) return;
    setEdge({
      l: e.scrollLeft < 8,
      r: e.scrollLeft + e.clientWidth >= e.scrollWidth - 8
    });
  };
  React.useEffect(() => {
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);
  const go = d => {
    const e = ref.current;
    e.scrollBy({
      left: d * e.clientWidth * 0.9,
      behavior: 'smooth'
    });
  };
  const arrow = side => ({
    position: 'absolute',
    top: 'calc((100% - 150px) / 2)',
    [side]: 'max(4px, calc(var(--gutter) - 22px))',
    zIndex: 3
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: ref,
    onScroll: upd,
    className: "offer-track",
    style: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: 'clamp(16px,2vw,28px)',
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: '28px var(--gutter) 16px',
      scrollSnapType: 'x mandatory',
      scrollPaddingLeft: 'var(--gutter)',
      scrollbarWidth: 'none'
    }
  }, items.map((o, i) => /*#__PURE__*/React.createElement("div", {
    key: o.id,
    style: {
      scrollSnapAlign: 'start'
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    i: i
  }, render(o)))), tail && /*#__PURE__*/React.createElement("div", {
    style: {
      scrollSnapAlign: 'start'
    }
  }, /*#__PURE__*/React.createElement(Reveal, {
    i: items.length
  }, tail))), !edge.l && /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-left",
    label: "Anteriores",
    onClick: () => go(-1),
    style: arrow('left')
  }), !edge.r && /*#__PURE__*/React.createElement(IconButton, {
    icon: "chevron-right",
    label: "Siguientes",
    onClick: () => go(1),
    style: arrow('right')
  }));
}
function Carousel({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: '24px var(--gutter) 16px',
      scrollSnapType: 'x mandatory',
      scrollbarWidth: 'thin'
    }
  }, children));
}
function LandingOffers({
  onOpenMap
}) {
  const offers = window.CF_DATA.offers;
  return /*#__PURE__*/React.createElement("section", {
    id: "ofertas",
    className: "lp-sec",
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: '64px 0'
    }
  }, /*#__PURE__*/React.createElement(GlowBackdropLite, {
    palette: "tienda"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container)',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    className: "offers-head",
    title: /*#__PURE__*/React.createElement(React.Fragment, null, "OFERTAS DESTACADAS", /*#__PURE__*/React.createElement("br", null), "DE TU ZONA"),
    subtitle: "Te presentamos las ofertas vigentes en: ",
    city: "Tunuy\xE1n"
  }), /*#__PURE__*/React.createElement("div", {
    className: "offers-art",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: '50%',
      right: 'var(--gutter)',
      width: 'clamp(150px,13vw,220px)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrations/cart-offers-3d.png",
    alt: "",
    style: {
      display: 'block',
      width: '100%',
      height: 'auto',
      transform: 'perspective(900px) rotateY(-14deg) rotateX(4deg)',
      filter: 'drop-shadow(0 20px 22px rgba(0,0,0,.55)) drop-shadow(0 0 30px rgba(164,116,245,.35)) drop-shadow(0 0 50px rgba(79,169,238,.2))'
    }
  }))), /*#__PURE__*/React.createElement(OfferCarousel, {
    offers: offers,
    onOpenMap: onOpenMap
  })));
}
function TypeAvatar({
  type,
  category,
  size = 36
}) {
  const {
    Icon
  } = window.ComprFCilDesignSystem_3bc5cd;
  const grad = {
    tienda: 'var(--tienda-grad)',
    servicio: 'var(--servicio-grad)',
    emprendimiento: 'var(--emprendimiento-grad)'
  }[type];
  const acc = {
    tienda: 'var(--tienda)',
    servicio: 'var(--servicio)',
    emprendimiento: 'var(--emprendimiento)'
  }[type];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      flex: 'none',
      borderRadius: 999,
      padding: 2,
      background: grad,
      boxSizing: 'border-box',
      boxShadow: '0 0 12px ' + acc
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 999,
      background: 'var(--cf-black)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    category: category,
    size: Math.round(size * .44),
    color: acc
  })));
}
function RequestedCard({
  r,
  onConnect
}) {
  const {
    Button
  } = window.ComprFCilDesignSystem_3bc5cd;
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '1.7 / 1',
      borderRadius: 'var(--radius-panel)',
      overflow: 'hidden',
      background: 'var(--surface)',
      boxShadow: h ? 'var(--glow-' + r.type + ')' : 'inset 0 0 0 1px var(--border)',
      transition: 'box-shadow var(--dur-slow) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: 'requested-' + r.id,
    shape: "rect",
    placeholder: "Foto del servicio o emprendimiento",
    style: {
      position: 'absolute',
      inset: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      right: 12,
      display: 'flex',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      maxWidth: '100%',
      padding: '4px 14px 4px 4px',
      borderRadius: 999,
      background: 'var(--surface-glass-dark)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: 'inset 0 0 0 1px var(--border-strong)',
      pointerEvents: 'auto'
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: 'person-avatar-' + r.id,
    shape: "circle",
    placeholder: "Foto",
    style: {
      width: 40,
      height: 40,
      flex: 'none',
      borderRadius: '50%'
    }
  }), /*#__PURE__*/React.createElement(TypeAvatar, {
    type: r.type,
    category: r.category,
    size: 32
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '800 14px/1.2 var(--font-body)',
      letterSpacing: '.04em',
      textTransform: 'uppercase',
      color: '#fff',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, r.person)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 4,
      padding: '0 2px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: '800 clamp(18px,1.8vw,24px)/1.2 var(--font-body)',
      textTransform: 'uppercase',
      color: OFFER_C[r.type]
    }
  }, r.service), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      font: '400 14px/1.5 var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, r.description), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: r.type,
    size: "sm",
    icon: "message-circle",
    onClick: onConnect
  }, "conectar"))));
}
function LandingMostRequested({
  onOpenMap
}) {
  const list = window.CF_DATA.requested;
  return /*#__PURE__*/React.createElement("section", {
    className: "lp-sec",
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: '56px 0'
    }
  }, /*#__PURE__*/React.createElement(GlowBackdropLite, {
    palette: "servicio"
  }), /*#__PURE__*/React.createElement("div", {
    className: "requested-art",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      zIndex: 0,
      top: 4,
      left: 'calc(-1 * clamp(64px,6vw,120px))',
      width: 'clamp(150px,15vw,260px)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/illustrations/plus-requested-3d.png",
    alt: "",
    style: {
      display: 'block',
      width: '100%',
      height: 'auto',
      opacity: .85,
      transform: 'perspective(900px) rotateY(18deg) rotate(-8deg)',
      filter: 'drop-shadow(0 20px 24px rgba(0,0,0,.55)) drop-shadow(0 0 34px rgba(164,116,245,.4)) drop-shadow(0 0 60px rgba(79,169,238,.25))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    title: "M\xC1S SOLICITADOS",
    subtitle: "Servicios y emprendimientos m\xE1s demandados en:",
    city: "Tunuy\xE1n",
    action: "ver todos",
    onAction: () => onOpenMap('servicio')
  }), /*#__PURE__*/React.createElement(SlideCarousel, {
    items: list,
    render: r => /*#__PURE__*/React.createElement(RequestedCard, {
      r: r,
      onConnect: () => onOpenMap(r.type, r.businessId)
    })
  })));
}
function GlowBackdropLite({
  palette
}) {
  const {
    GlowBackdrop
  } = window.ComprFCilDesignSystem_3bc5cd;
  return /*#__PURE__*/React.createElement(GlowBackdrop, {
    palette: palette,
    intensity: .3
  });
}
Object.assign(window, {
  LocationRow,
  SectionHead,
  OfferCard,
  LandingOffers,
  LandingMostRequested
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/landing/data.js
try { (() => {
window.CF_DATA = {
  businesses: [{
    id: 1,
    type: 'tienda',
    chain: 'Del Valle Supermercados',
    branch: 'Súper Del Valle Centro',
    hasOffers: true,
    name: 'Súper Del Valle',
    category: 'supermercado',
    categoryLabel: 'Supermercado',
    distance: '350 m',
    open: true,
    lat: -33.5762,
    lng: -69.0149,
    address: 'Av. San Martín 1020',
    hours: 'Todos los días · 8 a 22 h',
    description: 'Almacén, verdulería y carnicería en un solo lugar.'
  }, {
    id: 2,
    type: 'servicio',
    name: 'Taller Don Luis',
    category: 'automotriz',
    categoryLabel: 'Mecánica general',
    distance: '600 m',
    open: true,
    lat: -33.5731,
    lng: -69.0192,
    address: 'Av. San Martín 820',
    hours: 'Lun a Vie · 8 a 18 h',
    description: 'Service, frenos y tren delantero. Atendemos con turno.',
    image: '../../assets/photos/servicios-mechanic.png'
  }, {
    id: 3,
    type: 'emprendimiento',
    name: 'Dulce Taller',
    category: 'otros',
    categoryLabel: 'Pastelería',
    distance: '1,2 km',
    open: false,
    lat: -33.5809,
    lng: -69.0106,
    address: 'Belgrano 455',
    hours: 'Lun a Sáb · 9 a 20 h',
    description: 'Tortas por encargo y mesa dulce para eventos.',
    image: '../../assets/photos/emprendimientos-cake.png'
  }, {
    id: 4,
    type: 'tienda',
    chain: 'Punto Tech',
    branch: 'Punto Tech Sarmiento',
    hasOffers: true,
    name: 'Punto Tech',
    category: 'electronica',
    categoryLabel: 'Electrónica',
    distance: '450 m',
    open: true,
    lat: -33.5779,
    lng: -69.0171,
    address: 'Sarmiento 210',
    hours: 'Lun a Sáb · 9 a 13 y 17 a 21 h',
    description: 'Celulares, accesorios y reparaciones al toque.',
    image: '../../assets/photos/tiendas-clerk.png'
  }, {
    id: 5,
    type: 'servicio',
    name: 'Ferretería El Tornillo',
    category: 'ferreteria',
    categoryLabel: 'Ferretería',
    distance: '800 m',
    open: true,
    lat: -33.5745,
    lng: -69.0121,
    address: 'Godoy Cruz 330',
    hours: 'Lun a Sáb · 8 a 20 h',
    description: 'Herramientas, bulonería y cortes a medida.'
  }, {
    id: 6,
    type: 'tienda',
    chain: 'Patitas Pet Shop',
    branch: 'Patitas Alem',
    hasOffers: true,
    name: 'Patitas',
    category: 'mascotas',
    categoryLabel: 'Mascotas',
    distance: '900 m',
    open: true,
    lat: -33.5794,
    lng: -69.0211,
    address: 'Alem 118',
    hours: 'Lun a Sáb · 9 a 21 h',
    description: 'Alimento balanceado, accesorios y peluquería.'
  }, {
    id: 7,
    type: 'tienda',
    chain: 'Farmacias Central',
    branch: 'Farmacia Central San Martín',
    hasOffers: false,
    name: 'Farmacia Central',
    category: 'farmacia',
    categoryLabel: 'Farmacia',
    distance: '300 m',
    open: true,
    lat: -33.5771,
    lng: -69.0137,
    address: 'San Martín 1105',
    hours: '24 h',
    description: 'De turno esta semana.'
  }, {
    id: 8,
    type: 'emprendimiento',
    name: 'Cocina de Marta',
    category: 'restaurant',
    categoryLabel: 'Viandas',
    distance: '1,5 km',
    open: true,
    lat: -33.5716,
    lng: -69.0098,
    address: 'Las Heras 77',
    hours: 'Lun a Vie · 11 a 15 h',
    description: 'Viandas caseras con envío en el centro.'
  }, {
    id: 9,
    type: 'tienda',
    chain: 'Moda Andina',
    branch: 'Moda Andina Roca',
    hasOffers: false,
    name: 'Moda Andina',
    category: 'ropa',
    categoryLabel: 'Ropa',
    distance: '700 m',
    open: false,
    lat: -33.5822,
    lng: -69.0165,
    address: 'Roca 402',
    hours: 'Lun a Sáb · 9 a 13 y 17 a 21 h',
    description: 'Ropa urbana y de montaña.'
  }, {
    id: 10,
    type: 'emprendimiento',
    name: 'Madera Viva',
    category: 'hogar',
    categoryLabel: 'Muebles',
    distance: '2 km',
    open: true,
    lat: -33.5700,
    lng: -69.0230,
    address: 'Ruta 40 km 3',
    hours: 'Lun a Sáb · 9 a 18 h',
    description: 'Muebles a medida en madera maciza.'
  }, {
    id: 11,
    type: 'servicio',
    name: 'GameZone',
    category: 'entretenimiento',
    categoryLabel: 'Entretenimiento',
    distance: '1 km',
    open: true,
    lat: -33.5752,
    lng: -69.0080,
    address: 'Mitre 60',
    hours: 'Todos los días · 15 a 00 h',
    description: 'Consolas, PC gamer y torneos los viernes.'
  }],
  offers: [{
    id: 1,
    type: 'tienda',
    chain: 'Del Valle Supermercados',
    branch: 'Súper Del Valle Centro',
    hasOffers: true,
    businessId: 4,
    store: 'Punto Tech',
    title: 'Auriculares bluetooth a $23.999',
    description: 'Precio especial pagando en efectivo o transferencia.'
  }, {
    id: 2,
    type: 'servicio',
    businessId: 5,
    store: 'Ferretería El Tornillo',
    title: 'Feria de herramientas 15% off',
    description: 'En productos seleccionados, hasta el 31 de octubre.'
  }, {
    id: 3,
    type: 'emprendimiento',
    businessId: 10,
    store: 'Madera Viva',
    title: 'Muebles de interior 30% off',
    description: 'Mesas y racks a medida, válido hasta fin de año.'
  }, {
    id: 4,
    type: 'tienda',
    chain: 'Punto Tech',
    branch: 'Punto Tech Sarmiento',
    hasOffers: true,
    businessId: 1,
    store: 'Súper Del Valle',
    title: '2x1 en panificados',
    description: 'Todos los martes, hasta agotar stock.'
  }, {
    id: 5,
    type: 'servicio',
    businessId: 2,
    store: 'Taller Don Luis',
    title: '20% off en service completo',
    description: 'Con turno previo durante septiembre.'
  }, {
    id: 6,
    type: 'emprendimiento',
    businessId: 3,
    store: 'Dulce Taller',
    title: 'Mesa dulce para 20',
    description: 'Encargando con 5 días de anticipación.'
  }],
  requested: [{
    id: 1,
    type: 'emprendimiento',
    category: 'restaurant',
    businessId: 3,
    person: 'Ana María Rossi',
    service: 'Pastelería',
    description: 'Tortas de cumpleaños personalizadas, tartas dulces, cupcakes, postres individuales, etc.'
  }, {
    id: 2,
    type: 'servicio',
    category: 'electronica',
    businessId: 4,
    person: 'Juan Carlos Martínez',
    service: 'Reparación de celulares',
    description: 'Reparación de pantallas, cambios de placa, pin de carga, actualización de software, etc.'
  }, {
    id: 3,
    type: 'servicio',
    category: 'automotriz',
    businessId: 2,
    person: 'Luis Fernández',
    service: 'Mecánica general',
    description: 'Service, frenos, tren delantero y diagnóstico computarizado.'
  }, {
    id: 4,
    type: 'emprendimiento',
    category: 'hogar',
    businessId: 10,
    person: 'Martín Aguirre',
    service: 'Muebles a medida',
    description: 'Mesas, racks y placares en madera maciza, con diseño a pedido.'
  }, {
    id: 5,
    type: 'servicio',
    category: 'ferreteria',
    businessId: 5,
    person: 'Silvia Gómez',
    service: 'Electricista matriculada',
    description: 'Instalaciones, tableros, reparaciones y certificados.'
  }],
  categories: [['supermercado', 'Supermercado'], ['restaurant', 'Restaurant'], ['ferreteria', 'Ferretería'], ['ropa', 'Ropa'], ['electronica', 'Electrónica'], ['farmacia', 'Farmacia'], ['automotriz', 'Automotriz'], ['mascotas', 'Mascotas'], ['hogar', 'Hogar y muebles'], ['entretenimiento', 'Entretenimiento'], ['otros', 'Otros']]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/data.js", error: String((e && e.message) || e) }); }

// ui_kits/landing/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  // color:inherit (not a fixed near-black): the placeholder chrome —
  // empty-state icon/caption (currentColor) and the dashed ring — must
  // read on dark decks too, and the slide's own text color is the one
  // color guaranteed to contrast with the slide background. The soft
  // look comes from opacity on those parts, not from a baked-in alpha.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.empty .cap,.empty .sub{opacity:.75}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px}' + '.empty:hover .sub{opacity:1}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' + '  opacity:.35;transition:border-color .12s,opacity .12s}' + ':host([data-over]) .ring{border-color:#c96442;opacity:1}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(127,127,127,.25);border-top-color:currentColor;' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Print must ship just the image too: the hover-gated controls can be
  // mid-hover when print() fires, and the credit chip is screen chrome —
  // the same rule the capture window gets, keyed on print media instead
  // of the host's data-om-exporting mark (the print path sets no mark).
  '@media print{.ctl,.credit{display:none !important}}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }

    // A src write is a newer intent for this slot's content — the host
    // pick path (setImageSlotImage) or an agent edit — so it must win
    // over any encode still in flight from an earlier drop: left live,
    // that encode lands later, passes _ingest's gen guard, and its
    // setSlot silently overwrites the pick (the stored value shadows
    // src in _render). Bumping _gen kills the encode before its own
    // _swapGen clear runs, so clear the dead claim here too — otherwise
    // _releaseMask (gated on !_swapGen) never fires and the pick's
    // spinner is stranded. src ONLY: the pick sets credit/credit-href
    // in the same task, and clearing _swapGen on those would let the
    // same-src branch unmask the old image mid-encode.
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'src' && oldVal !== newVal) {
        this._gen++;
        this._swapGen = 0;
      }
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/landing/image-slot.js", error: String((e && e.message) || e) }); }

// ui_kits/map-app/MapChrome.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SUGGEST = [['Pantalón', 'shirt'], ['Zapatillas', 'footprints'], ['Celulares', 'smartphone'], ['Auriculares', 'headphones'], ['Pizza', 'pizza'], ['Herramientas', 'hammer'], ['Alimento para perros', 'bone'], ['Muebles', 'sofa'], ['Tortas', 'cake']];
function SuggestChip({
  label,
  icon,
  on,
  onClick
}) {
  const {
    Icon
  } = window.ComprFCilDesignSystem_3bc5cd;
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setH(true),
    onMouseLeave: () => setH(false),
    "aria-pressed": on,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '0 14px 0 4px',
      flex: 'none',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 999,
      font: '700 13px var(--font-body)',
      whiteSpace: 'nowrap',
      color: '#fff',
      background: on ? 'var(--rainbow-grad)' : h ? 'rgba(255,255,255,.14)' : 'var(--surface-glass-dark)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: on ? 'var(--glow-rainbow)' : 'inset 0 0 0 1px ' + (h ? 'rgba(255,255,255,.35)' : 'var(--border-strong)'),
      transition: 'background var(--dur-base), box-shadow var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 999,
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: on ? 'rgba(7,7,13,.35)' : 'var(--rainbow-grad)',
      boxShadow: '0 0 10px rgba(164,116,245,.35)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 16,
    color: "#fff"
  })), label);
}
function MapTopBar({
  type,
  setType,
  cat,
  setCat,
  query,
  setQuery,
  picked,
  onPick
}) {
  const {
    SearchInput,
    TypeSelector,
    CategoryChip,
    Button
  } = window.ComprFCilDesignSystem_3bc5cd;
  const cats = window.CF_DATA.categories;
  const ref = React.useRef(null);
  const [dense, setDense] = React.useState(window.innerWidth < 600);
  React.useEffect(() => {
    const f = () => setDense(window.innerWidth < 600);
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  const [draft, setDraft] = React.useState(query);
  React.useEffect(() => {
    const ro = new ResizeObserver(() => document.documentElement.style.setProperty('--mp-top', ref.current.offsetHeight + 'px'));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  const submit = e => {
    e.preventDefault();
    setQuery(draft);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 500,
      padding: 'var(--mp-pad,24px) 12px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--mp-gap,14px)',
      background: 'linear-gradient(180deg,rgba(7,7,13,.94) 0%,rgba(7,7,13,.7) 75%,rgba(7,7,13,0) 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "../landing/index.html",
    "aria-label": "Inicio",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      textDecoration: 'none',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "mp-logo",
    src: "../../assets/logo/basket-mark.png",
    alt: "",
    style: {
      height: 48,
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "mp-title",
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(34px,4vw,48px)',
      lineHeight: 1,
      letterSpacing: 'var(--ls-display)',
      color: '#fff',
      textShadow: 'var(--neon-text-soft)',
      whiteSpace: 'nowrap'
    }
  }, "MAPA VIRTUAL")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: '1 1 340px',
      maxWidth: 640,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(SearchInput, {
    glass: true,
    value: draft,
    onChange: v => {
      setDraft(v);
      if (!v) setQuery('');
    },
    placeholder: "Buscar cerca tuyo\u2026",
    style: {
      flex: 1,
      minWidth: 0
    }
  }), /*#__PURE__*/React.createElement(Button, {
    type: "todas",
    icon: "search",
    style: {
      height: 48,
      flex: 'none',
      color: '#fff'
    }
  }, "Buscar")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollbarWidth: 'none',
      padding: '4px 2px',
      margin: '-4px -2px'
    }
  }, SUGGEST.map(([l, ic]) => /*#__PURE__*/React.createElement(SuggestChip, {
    key: l,
    label: l,
    icon: ic,
    on: query === l,
    onClick: () => {
      setDraft(l);
      setQuery(query === l ? '' : l);
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'nowrap',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      font: '800 12px var(--font-body)',
      letterSpacing: '.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Filtros"), /*#__PURE__*/React.createElement(TypeSelector, {
    value: picked ? type : null,
    onChange: t => {
      setType(t);
      setCat('todas');
      onPick();
    },
    dense: dense,
    style: dense ? {
      flex: 1
    } : undefined
  })), picked ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: '14px 24px 22px',
      margin: '-12px -12px -8px',
      scrollbarWidth: 'none'
    }
  }, /*#__PURE__*/React.createElement(CategoryChip, {
    label: "Todas",
    icon: "layout-grid",
    type: type,
    selected: cat === 'todas',
    onClick: () => setCat('todas')
  }), cats.map(([k, l]) => /*#__PURE__*/React.createElement(CategoryChip, {
    key: k,
    label: l,
    category: k,
    type: type,
    selected: cat === k,
    onClick: () => setCat(k)
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: 4
    }
  }));
}
function ResultsPanel({
  items,
  selectedId,
  onSelect,
  expanded,
  setExpanded,
  type,
  desk
}) {
  const {
    BusinessCard,
    Icon
  } = window.ComprFCilDesignSystem_3bc5cd;
  const lbl = {
    todas: 'lugares',
    tienda: 'tiendas',
    servicio: 'servicios',
    emprendimiento: 'emprendimientos'
  }[type];
  const chev = desk ? expanded ? 'chevron-up' : 'chevron-down' : expanded ? 'chevron-down' : 'chevron-up';
  return /*#__PURE__*/React.createElement("div", {
    className: "mp-panel",
    "data-open": expanded ? 'true' : 'false',
    style: {
      position: 'absolute',
      zIndex: 550,
      left: 0,
      right: 0,
      bottom: 0,
      height: expanded ? '62%' : 128,
      background: 'rgba(12,12,20,.9)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderRadius: 'var(--radius-sheet) var(--radius-sheet) 0 0',
      boxShadow: 'inset 0 1px 0 var(--border-strong)',
      transition: 'height var(--dur-slow) var(--ease-out)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setExpanded(!expanded),
    "aria-expanded": expanded,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px 12px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#fff',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mp-grip",
    style: {
      width: 40,
      height: 4,
      borderRadius: 9,
      background: 'var(--cf-ink-400)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      font: '800 16px var(--font-body)'
    }
  }, /*#__PURE__*/React.createElement("span", null, items.length, " ", lbl, " cerca tuyo"), /*#__PURE__*/React.createElement(Icon, {
    name: chev,
    size: 20,
    color: "var(--text-muted)"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mp-list",
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: '10px 14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map(b => /*#__PURE__*/React.createElement(BusinessCard, _extends({
    key: b.id
  }, b, {
    name: b.branch || b.name,
    selected: b.id === selectedId,
    onClick: () => onSelect(b.id),
    style: {
      flex: 'none'
    }
  }))), items.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 8px',
      textAlign: 'center',
      font: '500 14px var(--font-body)',
      color: 'var(--text-muted)'
    }
  }, "No encontramos nada con ese filtro. Prob\xE1 con otra categor\xEDa.")));
}
function OfferRow({
  d,
  type,
  category
}) {
  const {
    Icon,
    Badge
  } = window.ComprFCilDesignSystem_3bc5cd;
  const rgb = {
    tienda: '255,111,97',
    servicio: '61,139,255',
    emprendimiento: '155,107,255'
  }[type];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 10,
      borderRadius: 'var(--radius-card)',
      background: 'rgba(18,18,28,.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      boxShadow: 'inset 0 0 0 1px rgba(' + rgb + ',.35)',
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 96,
      height: 64,
      flex: 'none',
      borderRadius: 12,
      background: d.image ? 'url(' + d.image + ') center/cover' : 'var(--' + type + '-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 0 0 1px rgba(' + rgb + ',.4)'
    }
  }, !d.image && /*#__PURE__*/React.createElement(Icon, {
    category: category,
    size: 26,
    color: 'var(--' + type + ')'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 3
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 14px/1.25 var(--font-body)',
      color: '#fff'
    }
  }, d.name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 12px/1.4 var(--font-body)',
      color: 'var(--text-muted)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, d.description), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      font: '700 11px var(--font-body)',
      color: 'var(--' + type + '-2)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-clock",
    size: 13
  }), "Vigente hasta ", d.until))), d.products && d.products.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      scrollbarWidth: 'none'
    }
  }, d.products.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    title: p.name,
    style: {
      position: 'relative',
      width: 60,
      height: 60,
      flex: 'none',
      borderRadius: 12,
      background: p.image ? 'url(' + p.image + ') center/cover' : 'rgba(255,255,255,.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'inset 0 0 0 1px var(--border-strong)'
    }
  }, !p.image && /*#__PURE__*/React.createElement(Icon, {
    category: category,
    size: 20,
    color: "var(--text-subtle)"
  }), /*#__PURE__*/React.createElement(Badge, {
    type: "todas",
    variant: "solid",
    style: {
      position: 'absolute',
      left: 4,
      bottom: 4,
      height: 18,
      padding: '0 6px',
      fontSize: 10,
      fontWeight: 800
    }
  }, p.discount)))));
}
function OffersStrip({
  b
}) {
  if (!b.deals || !b.deals.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 420,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      flex: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '800 12px var(--font-body)',
      letterSpacing: '.1em',
      textTransform: 'uppercase',
      color: '#fff',
      textShadow: 'var(--neon-text-soft)'
    }
  }, "Ofertas vigentes"), b.deals.slice(0, 3).map((d, i) => /*#__PURE__*/React.createElement(OfferRow, {
    key: i,
    d: d,
    type: b.type,
    category: b.category
  })));
}
function MapControls({
  onLocate
}) {
  const {
    IconButton
  } = window.ComprFCilDesignSystem_3bc5cd;
  return /*#__PURE__*/React.createElement("div", {
    className: "mp-ctrl",
    style: {
      position: 'absolute',
      zIndex: 540,
      right: 12,
      bottom: 144,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "plus",
    label: "Acercar",
    variant: "glass",
    onClick: () => window.__cfMap.zoomIn()
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "minus",
    label: "Alejar",
    variant: "glass",
    onClick: () => window.__cfMap.zoomOut()
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "locate-fixed",
    label: "Mi ubicaci\xF3n",
    onClick: onLocate
  }));
}
Object.assign(window, {
  MapTopBar,
  ResultsPanel,
  MapControls,
  OffersStrip
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/map-app/MapChrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/map-app/MapView.jsx
try { (() => {
function MapView({
  items,
  selectedId,
  onSelect,
  center = [-33.5765, -69.0155]
}) {
  const {
    MapMarker
  } = window.ComprFCilDesignSystem_3bc5cd;
  const el = React.useRef(null);
  const map = React.useRef(null);
  const [, tick] = React.useState(0);
  React.useEffect(() => {
    const m = L.map(el.current, {
      zoomControl: false,
      attributionControl: true
    }).setView(center, 15);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles © Esri',
      maxZoom: 16
    }).addTo(m);
    const f = () => tick(t => t + 1);
    m.on('move zoom resize', f);
    map.current = m;
    window.__cfMap = m;
    setTimeout(() => {
      m.invalidateSize();
      f();
    }, 50);
    return () => m.remove();
  }, []);
  React.useEffect(() => {
    const s = items.find(i => i.id === selectedId);
    if (s && map.current) map.current.panTo([s.lat - 0.0015, s.lng], {
      animate: true
    });
  }, [selectedId]);
  const pts = map.current ? items.map(b => ({
    b,
    p: map.current.latLngToContainerPoint([b.lat, b.lng])
  })) : [];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: el,
    style: {
      position: 'absolute',
      inset: 0,
      background: '#0b0b12'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 400
    }
  }, pts.map(({
    b,
    p
  }) => {
    const s = b.id === selectedId;
    return /*#__PURE__*/React.createElement("div", {
      key: b.id,
      style: {
        position: 'absolute',
        left: p.x,
        top: p.y,
        transform: 'translate(-50%,-100%)',
        pointerEvents: 'auto',
        zIndex: s ? 2 : 1
      }
    }, /*#__PURE__*/React.createElement(MapMarker, {
      type: b.type,
      category: b.category,
      selected: s,
      label: b.name,
      onClick: () => onSelect(b.id)
    }));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 99,
      background: '#fff',
      boxShadow: '0 0 0 4px rgba(255,255,255,.2), 0 0 18px rgba(255,255,255,.7)',
      animation: 'cf-pulse 2.4s infinite'
    }
  }))));
}
window.MapView = MapView;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/map-app/MapView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/map-app/map-data.js
try { (() => {
(() => {
  const P = {
    tienda: '../../assets/photos/tiendas-clerk.png',
    servicio: '../../assets/photos/servicios-mechanic.png',
    emprendimiento: '../../assets/photos/emprendimientos-cake.png'
  };
  const D = {
    1: [{
      name: 'Martes de panificados',
      description: '2x1 en pan, facturas y prepizzas.',
      until: '30 de septiembre',
      products: [{
        name: 'Pan francés',
        discount: '2x1'
      }, {
        name: 'Facturas',
        discount: '2x1'
      }, {
        name: 'Prepizzas',
        discount: '2x1'
      }]
    }, {
      name: 'Almacén',
      description: 'Llevando 2 unidades del mismo producto.',
      until: '15 de octubre',
      products: [{
        name: 'Aceite 1,5 L',
        discount: '-25%'
      }, {
        name: 'Yerba 1 kg',
        discount: '-20%'
      }, {
        name: 'Fideos',
        discount: '-15%'
      }, {
        name: 'Arroz',
        discount: '-15%'
      }]
    }, {
      name: 'Verdulería',
      description: 'Frutas de estación, precio por kilo.',
      until: '5 de octubre',
      products: [{
        name: 'Manzanas',
        discount: '-15%'
      }, {
        name: 'Naranjas',
        discount: '-10%'
      }]
    }],
    2: [{
      name: 'Service completo',
      description: 'Aceite, filtros y revisión general con turno.',
      until: '30 de septiembre',
      products: [{
        name: 'Cambio de aceite',
        discount: '-20%'
      }, {
        name: 'Filtros',
        discount: '-20%'
      }]
    }],
    3: [{
      name: 'Mesa dulce para eventos',
      description: 'Encargando con 5 días de anticipación.',
      until: '31 de octubre',
      products: [{
        name: 'Mesa para 20',
        discount: '-10%'
      }, {
        name: 'Cupcakes x12',
        discount: '-15%'
      }]
    }, {
      name: 'Tortas de cumpleaños',
      description: 'Diseño personalizado de 2 kg.',
      until: '20 de octubre',
      products: [{
        name: 'Torta temática',
        discount: '-15%'
      }]
    }],
    4: [{
      name: 'Semana del audio',
      description: 'Pagando en efectivo o transferencia.',
      until: '6 de octubre',
      products: [{
        name: 'Auriculares BT',
        discount: '-30%'
      }, {
        name: 'Parlante',
        discount: '-25%'
      }, {
        name: 'Earbuds',
        discount: '-20%'
      }]
    }, {
      name: 'Protegé tu celu',
      description: 'Funda + vidrio templado en combo.',
      until: '15 de octubre',
      products: [{
        name: 'Funda',
        discount: '-20%'
      }, {
        name: 'Vidrio templado',
        discount: '-20%'
      }]
    }, {
      name: 'Carga rápida',
      description: 'Cable USB-C incluido.',
      until: '31 de octubre',
      products: [{
        name: 'Cargador 25 W',
        discount: '-15%'
      }, {
        name: 'Power bank',
        discount: '-10%'
      }]
    }],
    5: [{
      name: 'Feria de herramientas',
      description: 'Productos seleccionados.',
      until: '31 de octubre',
      products: [{
        name: 'Taladro',
        discount: '-15%'
      }, {
        name: 'Amoladora',
        discount: '-15%'
      }, {
        name: 'Juego de llaves',
        discount: '-10%'
      }]
    }, {
      name: 'Bulonería por kilo',
      description: 'Comprando más de 2 kg.',
      until: '15 de octubre',
      products: [{
        name: 'Tornillos',
        discount: '-10%'
      }, {
        name: 'Tarugos',
        discount: '-10%'
      }]
    }],
    6: [{
      name: 'Alimento balanceado',
      description: 'Bolsas de 15 kg, marcas seleccionadas.',
      until: '10 de octubre',
      products: [{
        name: 'Perro adulto',
        discount: '-20%'
      }, {
        name: 'Cachorro',
        discount: '-15%'
      }, {
        name: 'Gato',
        discount: '-15%'
      }]
    }, {
      name: 'Peluquería',
      description: 'Baño y corte de lunes a miércoles.',
      until: '31 de octubre',
      products: [{
        name: 'Baño',
        discount: '-15%'
      }, {
        name: 'Corte',
        discount: '-15%'
      }]
    }],
    10: [{
      name: 'Muebles de interior',
      description: 'Mesas y racks a medida.',
      until: '31 de diciembre',
      products: [{
        name: 'Mesa comedor',
        discount: '-30%'
      }, {
        name: 'Rack TV',
        discount: '-30%'
      }, {
        name: 'Estantería',
        discount: '-20%'
      }]
    }]
  };
  const street = a => (a || '').replace(/[0-9].*$/, '').replace(/^(Av\.|Ruta)\s*/, '').trim();
  window.CF_DATA.businesses.forEach(b => {
    b.image = b.image || P[b.type];
    b.chain = b.chain || b.name;
    b.branch = b.branch || b.name + ' ' + street(b.address);
    b.deals = D[b.id] || [];
    b.hasOffers = b.deals.length > 0;
    b.search = [b.name, b.branch, b.chain, b.categoryLabel, b.description, ...b.deals.flatMap(x => [x.name, ...(x.products || []).map(p => p.name)])].join(' ').toLowerCase();
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/map-app/map-data.js", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.GlowBackdrop = __ds_scope.GlowBackdrop;

__ds_ns.NeonHeading = __ds_scope.NeonHeading;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.BusinessCard = __ds_scope.BusinessCard;

__ds_ns.CatalogCard = __ds_scope.CatalogCard;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.SearchInput = __ds_scope.SearchInput;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.CATEGORY_ICONS = __ds_scope.CATEGORY_ICONS;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.BusinessSheet = __ds_scope.BusinessSheet;

__ds_ns.MapMarker = __ds_scope.MapMarker;

__ds_ns.CategoryChip = __ds_scope.CategoryChip;

__ds_ns.TypeSelector = __ds_scope.TypeSelector;

})();
